(function($) {

    $.ManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            listItems:                  null,
            appendTo:                   null,
            manifestListItems:          [],
            manifestListElement:        null,
            manifestLoadStatusIndicator: null,
            treeElement:                null,
            expectedThings:             [],
            preloadedManifests:         [],
            userManifests:              [],
            nodeManifests:              {},
            nodeCollections:            {},
            nodeIdToUri:                {},
            uriToNodeId:                {},
            nodeChildren:               {},
            unexpandedNodes:            {},
            topCollectionsUris:         {},
            treeQueue:                  [], //Holds collections before the tree is ready; will be removed when ready
            resultsWidth:               0,
            state:                      null,
            eventEmitter:               null
        }, options);

        var _this = this;
        _this.init();
        
    };

    $.ManifestsPanel.prototype = {

        init: function() {
            var _this = this;
            this.element = jQuery(this.template({
                showURLBox : this.state.getStateProperty('showAddFromURLBox')
            })).appendTo(this.appendTo);
            this.manifestListElement = this.element.find('ul');
            
            // Collection tree
            jQuery.each(this.state.currentConfig.data, function(_, v) {
              if (v.hasOwnProperty('manifestUri')) {
                _this.preloadedManifests.push(v.manifestUri);
              }
            });
            this.expectedThings = this.preloadedManifests;
            this.treeElement = jQuery('#collection-tree').jstree({
              core: {
                data: [
                  {
                    id: 'preload',
                    text: 'Preloaded Manifests',
                    icon: 'fa fa-suitcase',
                    state: {
                      selected: true
                    },
                    children: []
                  }, 
                  {
                    id: 'user',
                    text: 'My Manifests',
                    icon: 'fa fa-user',
                    children: []
                  }
                ],
                themes: {
                  dots: false
                },
                check_callback: true,
                multiple: false
              }
            }).on('select_node.jstree', function(event, data) {
              _this.changeNode(data.node);
            }).on('open_node.jstree', function(event, data) {
              _this.expandNode(data.node);
            }).on('ready.jstree', function() {
              var theQueue = _this.treeQueue.slice(0);
              delete _this.treeQueue;
              jQuery.each(theQueue, function(_, v) {
                if (v.length == 4) {
                  _this.onCollectionReceived.apply(_this, v);
                } else {
                  _this.onCollectionNotReceived.apply(_this, v);
                }
              });
            });
            
            //this code gives us the max width of the results area, used to determine how many preview images to show
            //cloning the element and adjusting the display and visibility means it won't break the normal flow
            var clone = this.element.clone().css("visibility","hidden").css("display", "block").appendTo(this.appendTo);
            this.resultsWidth = clone.find('.select-results').outerWidth();
            this.controlsHeight = clone.find('.manifest-panel-controls').outerHeight();
            this.paddingListElement = this.controlsHeight;
            this.manifestListElement.css("padding-bottom", this.paddingListElement);
            clone.remove();
            
            // this.manifestLoadStatusIndicator = new $.ManifestLoadStatusIndicator({
            //   manifests: this.parent.manifests,
            //   appendTo: this.element.find('.select-results')
            // });
            this.bindEvents();
            this.listenForActions();
        },

        listenForActions: function() {
          var _this = this;

          // handle subscribed events
          _this.eventEmitter.subscribe('manifestsPanelVisible.set', function(_, stateValue) {
            _this.onPanelVisible(_, stateValue);
          });

          _this.eventEmitter.subscribe('manifestReceived', function(event, newManifest) {
            _this.onManifestReceived(event, newManifest);
          });
          
          _this.eventEmitter.subscribe('collectionReceived', function(event, newCollection, parentUri, parentNodeId) {
            _this.onCollectionReceived(event, newCollection, parentUri, parentNodeId);
          });
          
          _this.eventEmitter.subscribe('collectionNotReceived', function(event, parentUri, parentNodeId) {
            _this.onCollectionNotReceived(event, parentUri, parentNodeId);
          });
          
          _this.eventEmitter.subscribe('ADD_MANIFEST_FROM_URL', function(event, url) {
            if (_this.userManifests.indexOf(url) == -1) {
              _this.userManifests.push(url);
            }
            _this.treeElement.jstree('deselect_all');
            _this.treeElement.jstree('select_node', 'user');
          });
          
          _this.eventEmitter.subscribe('ADD_COLLECTION_FROM_URL', function(event, url, source) {
            _this.addCollectionFromUrl(url, null, true);
          });
          
          _this.eventEmitter.subscribe('ADD_OBJECT_FROM_URL', function(event, url, source) {
            _this.addObjectFromUrl(url, source, true);
          });
        },

        bindEvents: function() {
            var _this = this;

            // handle interface events
            this.element.find('form#url-load-form').on('submit', function(event) {
              event.preventDefault();
              _this.addObjectUrl(jQuery(this).find('input').val());
            });

            this.element.find('.remove-object-option').on('click', function(event) {
              _this.togglePanel(event);
            });

            // Filter manifests based on user input
            this.element.find('#manifest-search').on('keyup input', function(event) {
              _this.filterManifests(this.value);
            });

            this.element.find('#manifest-search-form').on('submit', function(event) {
              event.preventDefault();
            });

            jQuery(window).resize($.throttle(function() {
              _this.resizePanel();
            }, 50, true));
        },
        
        hide: function() {
            var _this = this;
            jQuery(this.element).hide({effect: "fade", duration: 160, easing: "easeOutCubic"});
        },

        show: function() {
            var _this = this;
            jQuery(this.element).show({effect: "fade", duration: 160, easing: "easeInCubic"});
        },
        
        addManifestUrl: function(url) {
          var _this = this;
          _this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', [url, "(Added from URL)"]);
        },
        
        addObjectUrl: function(url) {
          var _this = this;
          _this.eventEmitter.publish('ADD_OBJECT_FROM_URL', [url, "(Added from URL)"]);
        },
        
        togglePanel: function(event) {
          var _this = this;
          _this.eventEmitter.publish('TOGGLE_LOAD_WINDOW');
        },
        
        filterManifests: function(value) {
          var _this = this;
          if (value.length > 0) {
             _this.element.find('.items-listing li').show().filter(function() {
                return jQuery(this).text().toLowerCase().indexOf(value.toLowerCase()) === -1;
             }).hide();
          } else {
             _this.element.find('.items-listing li').show();
          }
        },

        resizePanel: function() {
          var _this = this;
          var clone = _this.element.clone().css("visibility","hidden").css("display", "block").appendTo(_this.appendTo);
          _this.resultsWidth = clone.find('.select-results').outerWidth();
          clone.remove();
          _this.eventEmitter.publish("manifestPanelWidthChanged", _this.resultsWidth);
        },
        
        onPanelVisible: function(_, stateValue) {
          var _this = this;
          if (stateValue) { _this.show(); return; }
           _this.hide();
        },

        onManifestReceived: function(event, newManifest) {
          var _this = this;
          if (_this.expectedThings.indexOf(newManifest.uri) != -1) {
            _this.manifestListItems.push(new $.ManifestListItem({ 
              manifest: newManifest, 
              resultsWidth: _this.resultsWidth, 
              state: _this.state,
              eventEmitter: _this.eventEmitter,
              appendTo: _this.manifestListElement }));
            _this.element.find('#manifest-search').keyup();
          }
        },
        
        onCollectionReceived: function(event, newCollection, uri, parentNodeId) {
          // If the tree isn't ready, hold it and move on
          if (typeof this.treeQueue !== 'undefined') {
            this.treeQueue.push([event, newCollection, uri, parentNodeId]);
            return;
          }
          // Update nodes if the target isn't top; create new node if the target is top
          if (parentNodeId) {
            this.updateCollectionNode(parentNodeId, newCollection);
          } else {
            this.addCollectionNode(parentNodeId, newCollection);
          }
        },
        
        onCollectionNotReceived: function(event, uri, parentNodeId) {
          if (typeof this.treeQueue !== 'undefined') {
            this.treeQueue.push([event, uri, parentNodeId]);
            return;
          }
          // Mark the child node belonging to this as a fail
          var _this = this;
          jQuery.each(this.uriToNodeId[uri], function(_, nodeId) {
            _this.treeElement.jstree('set_icon', nodeId, 'fa fa-ban');
            _this.treeElement.jstree('disable_node', nodeId);
          });
        },
        
        clearManifestItems: function() {
          this.manifestListItems = [];
          this.manifestListElement.html('');
        },
        
        registerNodeIdUriPair: function(nodeId, uri) {
          // Set up 2-way correspondence between node IDs and URIs
          this.nodeIdToUri[nodeId] = uri;
          if (this.uriToNodeId[uri]) {
            this.uriToNodeId[uri].push(nodeId);
          } else {
            this.uriToNodeId[uri] = [nodeId];
          }
        },
        
        changeNode: function(node) {
          var _this = this;
          this.clearManifestItems();
          switch (node.id) {
            case 'preload': _this.expectedThings = _this.preloadedManifests; break;
            case 'user': _this.expectedThings = _this.userManifests; break;
            default: _this.expectedThings = _this.nodeManifests[node.id]; break;
          }
          // Populate and refresh the manifests listings
          jQuery.each(_this.expectedThings, function(_, expectedThing) {
            _this.addManifestFromUrl(expectedThing);
          });
          this.element.find('#manifest-search').keyup();
          
        },
        
        expandNode: function(node) {
          var _this = this;
          jQuery.each(_this.nodeCollections[node.id], function(_, uri) {
            _this.updateCollectionFromUrl(uri, node.id);
          });
        },
        
        addObjectFromUrl: function(url, source) {
          var _this = this,
            object = _this.state.getStateProperty('manifests')[url];
          if (object) {
            if (object.jsonLd) {
              switch (object.jsonLd['@type']) {
                case 'sc:Collection':
                  _this.eventEmitter.publish('ADD_COLLECTION_FROM_URL', [url, source]);
                break;
                case 'sc:Manifest':
                  _this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', [url, source]);
                break;
              }
            }
          }
          else {
            jQuery.ajax({
              url: url,
              dataType: 'json',
              type: 'GET',
              success: function(data) {
                switch (data['@type']) {
                  case 'sc:Collection':
                    object = new $.Collection(url, source, data);
                    _this.eventEmitter.publish('manifestQueued', object, '');
                    _this.eventEmitter.publish('ADD_COLLECTION_FROM_URL', [url, source]);
                  break;
                  case 'sc:Manifest':
                    object = new $.Manifest(url, source, data);
                    _this.eventEmitter.publish('manifestQueued', object, '');
                    _this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', [url, source]);
                  break;
                }
              }
            });
          }
        },
        
        addManifestFromUrl: function(url) {
          var _this = this,
            manifest;
          if (_this.state.getStateProperty('manifests')[url]) {
            manifest = _this.state.getStateProperty('manifests')[url];
            if (manifest.jsonLd) {
              _this.manifestListItems.push(new $.ManifestListItem({ 
                manifest: manifest, 
                resultsWidth: _this.resultsWidth, 
                state: _this.state,
                eventEmitter: _this.eventEmitter,
                appendTo: _this.manifestListElement }));
            }
          }
          else {
            manifest = new $.Manifest(url, '');
            _this.eventEmitter.publish('manifestQueued', manifest, '');
            manifest.request.done(function() {
              _this.eventEmitter.publish('manifestReceived', manifest);
            });
          }
        },
        
        addCollectionFromUrl: function(url, nodeId, jumpToIt) {
          var _this = this,
            collection;
          if (!nodeId) {
            if (_this.topCollectionsUris[url]) {
              return;
            }
            else {
              _this.topCollectionsUris[url] = true;
            }
          }
          if (typeof _this.state.getStateProperty('manifests')[url] !== 'undefined') {
            collection = _this.state.getStateProperty('manifests')[url];
            if (collection.jsonLd) {
              var newNode = _this.addCollectionNode(nodeId, collection);
              if (jumpToIt) {
                _this.treeElement.jstree('deselect_all');
                _this.treeElement.jstree('select_node', newNode);
                if (collection.getCollectionUris().length > 0) {
                  _this.treeElement.jstree('open_node', newNode);
                }
              }
            }
          }
          else {
            collection = new $.Collection(url, '');
            _this.eventEmitter.publish('manifestQueued', collection, '');
            collection.request.done(function() {
              _this.eventEmitter.publish('collectionReceived', [collection, url, nodeId ? nodeId : null]);
            });
            collection.request.fail(function() {
              _this.eventEmitter.publish('collectionNotReceived', [url, nodeId ? nodeId : null]);
            });
          }
        },
        
        updateCollectionFromUrl: function(url, nodeId) {
          var _this = this,
            collection;
          if (typeof _this.state.getStateProperty('manifests')[url] !== 'undefined') {
            collection = _this.state.getStateProperty('manifests')[url];
            if (collection.jsonLd) {
              _this.updateCollectionNode(nodeId, collection);
            }
          }
          else {
            collection = new $.Collection(url, '');
            _this.eventEmitter.publish('manifestQueued', collection, '');
            collection.request.done(function() {
              _this.eventEmitter.publish('collectionReceived', [collection, url, nodeId ? nodeId : null]);
            });
            collection.request.fail(function() {
              _this.eventEmitter.publish('collectionNotReceived', [url, nodeId ? nodeId : null]);
            });
          }
        },
        
        addCollectionNode: function(nodeId, collection, unexpanded) {
          var _this = this,
              subcollectionBlocks = collection.getCollectionBlocks();
          var newNodeId = _this.treeElement.jstree('create_node', nodeId ? nodeId : null, {
            text: collection.jsonLd.label,
            icon: unexpanded ? 'fa fa-spinner fa-pulse' : 'fa fa-folder',
            children: []
          }, 'last');
          if (unexpanded) {
            _this.treeElement.jstree('disable_node', newNodeId);
          }
          // Register the new node's apparent contents
          _this.registerNodeIdUriPair(newNodeId, collection.jsonLd['@id']);
          _this.nodeCollections[newNodeId] = collection.getCollectionUris();
          _this.nodeManifests[newNodeId] = collection.getManifestUris();
          _this.nodeChildren[newNodeId] = [];
          // Add subcollections
          if (!unexpanded) {
            jQuery.each(subcollectionBlocks, function(i, v) {
              var nid = _this.treeElement.jstree('create_node', newNodeId, {
                text: v.label,
                icon: 'fa fa-spinner fa-pulse',
                children: []
              }, 'last');
              _this.registerNodeIdUriPair(nid, v['@id']);
              _this.unexpandedNodes[nid] = true;
              _this.nodeChildren[newNodeId].push(nid);
              _this.treeElement.jstree('disable_node', nid);
            });
          }
          else {
            _this.unexpandedNodes[newNodeId] = true;
          }
          return newNodeId;
        },
        
        updateCollectionNode: function(nodeId, collection) {
          var _this = this,
              atId = collection.uri,
              collectionBlocks = collection.getCollectionBlocks(),
              collectionUris = collection.getCollectionUris(),
              manifestUris = collection.getManifestUris();
          jQuery.each(_this.nodeChildren[nodeId], function(_, n) {
            if (_this.nodeIdToUri[n] == atId && _this.unexpandedNodes[n]) {
              _this.nodeCollections[n] = collectionUris;
              _this.nodeManifests[n] = manifestUris;
              _this.nodeChildren[n] = [];
              jQuery.each(collectionBlocks, function(i, v) {
                var nn = _this.addCollectionNode(n, new $.Collection(v['@id'], null, v), true);
                _this.nodeChildren[n].push(nn);
                _this.unexpandedNodes[nn] = true;
              });
              delete _this.unexpandedNodes[n];
              _this.treeElement.jstree('set_icon', n, 'fa fa-folder');
              _this.treeElement.jstree('enable_node', n);
            }
          });
          
        },

        template: $.Handlebars.compile([
          '<div id="manifest-select-menu">',
          '<div class="container">',
            '<div class="manifest-panel-controls">',
              '<a class="remove-object-option"><i class="fa fa-times fa-lg fa-fw"></i>{{t "close"}}</a>',
              '<div id="load-controls">',
                '{{#if showURLBox}}',
                  '<form action="" id="url-load-form">',
                    '<label for="url-loader">{{t "addNewObject"}}:</label>',
                    '<input type="text" id="url-loader" name="url-load" placeholder="http://...">',
                    '<input type="submit" value="{{t "load"}}">',
                  '</form>',
                '{{/if}}',
                '<form action="" id="manifest-search-form">',
                  '<label for="manifest-search">{{t "filterObjects"}}:</label>',
                  '<input id="manifest-search" type="text" name="manifest-filter">',
                '</form>',
              '</div>',
            '</div>',
              '<div id="collection-tree">',
              '</div>',
              '<div class="select-results">',
                '<ul class="items-listing">',
                '</ul>',
              '</div>',
          '</div>',
          '</div>'
        ].join(''))
    };

}(Mirador));

