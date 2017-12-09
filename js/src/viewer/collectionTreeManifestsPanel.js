(function($) {

    $.CollectionTreeManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            listItems:                  null,
            appendTo:                   null,
            manifestListItems:          [],
            manifestListElement:        null,
            manifestLoadStatusIndicator: null,
            treeElement:                null, //The container element around the collection tree
            expectedThings:             [], //A list of manifest URIs expected for the current collection "folder"
            preloadedManifests:         [], //A list of manifest URIs loaded in through the data attribute
            userManifests:              [], //A list of manifest URIs loaded in through the "Load Object from URL" form
            nodeManifests:              {}, //Maps node IDs to a list of manifest URIs its collection holds
            nodeCollections:            {}, //Maps node IDs to a list of collection URIs its collection holds
            nodeIdToUri:                {}, //Maps node IDs to their respective URIs
            uriToNodeId:                {}, //Maps URIs to a list of node IDs that represent it (Inverse of nodeIdToUri)
            nodeChildren:               {}, //Maps node IDs to a list of children node IDs
            unexpandedNodes:            {}, //A set of node ID => true entries that contains all node IDs pending expansion (i.e. may have more content)
            topCollectionsUris:         {}, //A set of URIs already placed at the top level of the collection tree
            treeQueue:                  [], //A list that holds event triggers before the tree is ready; will be removed when ready
            resultsWidth:               0,
            state:                      null,
            eventEmitter:               null
        }, options);

        var _this = this;
        _this.init();
        
    };

    $.CollectionTreeManifestsPanel.prototype = {

        init: function() {
            var _this = this;
            this.element = jQuery(this.template({
                showURLBox : this.state.getStateProperty('showAddFromURLBox')
            })).appendTo(this.appendTo);
            this.manifestListElement = this.element.find('ul');
            
            // Populate the preloads folder with manifests in the configuration
            jQuery.each(this.state.currentConfig.data, function(_, v) {
              if (v.hasOwnProperty('manifestUri')) {
                _this.preloadedManifests.push(v.manifestUri);
              }
            });
            // Expect these preloads by default
            this.expectedThings = this.preloadedManifests;
            // Create the collection tree
            this.treeElement = jQuery('#collection-tree').jstree({
              core: {
                // Seed the tree with the two basic "folders"
                data: [
                  {
                    id: 'preload',
                    text: i18next.t('preloadedManifests'),
                    icon: 'fa fa-suitcase',
                    state: {
                      selected: true
                    },
                    children: []
                  }, 
                  {
                    id: 'user',
                    text: i18next.t('myManifests'),
                    icon: 'fa fa-user',
                    children: []
                  }
                ],
                // Tune looks
                themes: {
                  dots: false
                },
                check_callback: true, // IMPORTANT: This line allows code to edit the tree later
                multiple: false // IMPORTANT: This prevents multiple nodes from being selected
              }
            // Hook up event for when a node is selected
            }).on('select_node.jstree', function(event, data) {
              _this.changeNode(data.node);
            // Hook up event for when a node is expanded (> clicked)
            }).on('open_node.jstree', function(event, data) {
              _this.expandNode(data.node);
            // Hook up "ready" event to handle backlogged collection loads
            }).on('ready.jstree', function() {
              // Cache the backlog and remove the original; this signals to other methods that it's OK to manipulate the tree
              var theQueue = _this.treeQueue.slice(0);
              delete _this.treeQueue;
              // Process the backlog
              jQuery.each(theQueue, function(_, v) {
                if (v.length == 4) { // When a collection is loaded successfully, the logged entry is 4 elements long
                  _this.onCollectionReceived.apply(_this, v);
                } else { // When a collection fails to load, the logged entry is 3 elements long
                  _this.onCollectionNotReceived.apply(_this, v);
                }
              });
            });
            
            //this code gives us the max width of the results area, used to determine how many preview images to show
            //cloning the element and adjusting the display and visibility means it won't break the normal flow
            var clone = this.element.clone().css("visibility","hidden").css("display", "block").appendTo(this.appendTo);
            this.resultsWidth = clone.find('.member-select-results').outerWidth();
            this.controlsHeight = clone.find('.manifest-panel-controls').outerHeight();
            this.paddingListElement = this.controlsHeight;
            this.manifestListElement.css("padding-bottom", this.paddingListElement);
            clone.remove();
            
            // this.manifestLoadStatusIndicator = new $.ManifestLoadStatusIndicator({
            //   manifests: this.parent.manifests,
            //   appendTo: this.element.find('.member-select-results')
            // });
            this.bindEvents();
            this.listenForActions();
        },

        listenForActions: function() {
          var _this = this;

          // handle subscribed events
          // When the manifest selection panel is brought up or hidden
          _this.eventEmitter.subscribe('manifestsPanelVisible.set', function(_, stateValue) {
            _this.onPanelVisible(_, stateValue);
          });

          // When a manifest is received
          _this.eventEmitter.subscribe('manifestReceived', function(event, newManifest) {
            _this.onManifestReceived(event, newManifest);
          });
          
          // When a collection is received
          _this.eventEmitter.subscribe('collectionReceived', function(event, newCollection, parentUri, parentNodeId) {
            _this.onCollectionReceived(event, newCollection, parentUri, parentNodeId);
          });
          
          // When a collection failed to load
          _this.eventEmitter.subscribe('collectionNotReceived', function(event, parentUri, parentNodeId) {
            _this.onCollectionNotReceived(event, parentUri, parentNodeId);
          });
          
          // When Mirador gets an explicit request to load a manifest from a URL
          _this.eventEmitter.subscribe('ADD_MANIFEST_FROM_URL', function(event, url) {
            // Add it if it has not been loaded before
            if (_this.userManifests.indexOf(url) == -1) {
              _this.userManifests.push(url);
            }
            // Shift to the "User-Loaded Manifests" folder
            _this.treeElement.jstree('deselect_all');
            _this.treeElement.jstree('select_node', 'user');
          });
          
          // When Mirador gets an explicit request to load a collection from a URL
          _this.eventEmitter.subscribe('ADD_COLLECTION_FROM_URL', function(event, url, source) {
            _this.addCollectionFromUrl(url, null, true);
          });
          
          // When Mirador gets a request to load an object (manifest or collection) from a URL (e.g. the "Add object from URL" form)
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
        
        // Send explicit request for adding a manifest from a URL
        addManifestUrl: function(url) {
          var _this = this;
          _this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', [url, "(Added from URL)"]);
        },
        
        // Send explicit request for adding a manifest or collection from a URL
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
          _this.resultsWidth = clone.find('.member-select-results').outerWidth();
          clone.remove();
          _this.eventEmitter.publish("manifestPanelWidthChanged", _this.resultsWidth);
        },
        
        onPanelVisible: function(_, stateValue) {
          var _this = this;
          if (stateValue) { _this.show(); return; }
           _this.hide();
        },

        // Handler for when manifest data is loaded for the first time
        onManifestReceived: function(event, newManifest) {
          var _this = this;
          // Show a manifest list item only if the currently selected "folder" expects it
          if (_this.expectedThings.indexOf(newManifest.uri) != -1) {
            _this.manifestListItems.push(new $.ManifestListItem({ 
              manifest: newManifest, 
              resultsWidth: _this.resultsWidth, 
              state: _this.state,
              eventEmitter: _this.eventEmitter,
              forcedIndex: _this.expectedThings.indexOf(newManifest.uri),
              appendTo: _this.manifestListElement }));
            _this.element.find('#manifest-search').keyup();
          }
        },
        
        // Handler for when collection data is loaded for the first time
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
        
        // Handler for when collection data is loaded for the first time and failed
        onCollectionNotReceived: function(event, uri, parentNodeId) {
          // If the tree isn't ready, hold it and move on
          if (typeof this.treeQueue !== 'undefined') {
            this.treeQueue.push([event, uri, parentNodeId]);
            return;
          }
          // Mark the child node belonging to this as a fail
          var _this = this;
          jQuery.each(this.uriToNodeId[uri], function(_, nodeId) {
            _this.treeElement.jstree('set_icon', nodeId, 'fa fa-ban'); // Set icon to (/)
            _this.treeElement.jstree('disable_node', nodeId); // Don't let the user click it
          });
        },
        
        // Clean out the list of manifest items on the right side
        clearManifestItems: function() {
          this.manifestListItems = [];
          this.manifestListElement.html('');
        },
        
        // Set up 2-way correspondence between node IDs and URIs
        registerNodeIdUriPair: function(nodeId, uri) {
          // Map node ID to URI
          this.nodeIdToUri[nodeId] = uri;
          if (this.uriToNodeId[uri]) {
            this.uriToNodeId[uri].push(nodeId); // Existing URI => new node ID
          } else {
            this.uriToNodeId[uri] = [nodeId]; // New URI => new node ID
          }
        },
        
        // Handler for selecting a new node
        changeNode: function(node) {
          var _this = this;
          // Clean out manifest items on the right side
          this.clearManifestItems();
          // Listen in on manifests in the "folder" or collection it represents
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
        
        // Handler for expanding a node (> clicked)
        expandNode: function(node) {
          var _this = this;
          // Update its children by loading their stated URIs
          jQuery.each(_this.nodeCollections[node.id], function(_, uri) {
            _this.updateCollectionFromUrl(uri, node.id);
          });
        },
        
        // Helper for loading a manifest or collection from a URL
        addObjectFromUrl: function(url, source) {
          var _this = this,
            object = _this.state.getStateProperty('manifests')[url]; // Attempt to get from cache
          // Cache hit
          if (object) {
            // Fire off the correct event if its cache entry is loaded
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
          // Cache miss
          else {
            // Get the manifest or collection with AJAX
            jQuery.ajax({
              url: url,
              dataType: 'json',
              type: 'GET',
              // Fire off the correct event once it finishes loading
              success: function(data) {
                switch (data['@type']) {
                  case 'sc:Collection':
                    object = new $.Collection(url, source, data);
                    _this.eventEmitter.publish('manifestQueued', object, '');
                    _this.eventEmitter.publish('ADD_COLLECTION_FROM_URL', [url, source]);
                  break;
                  case 'sc:Manifest':
                    object = new $.Manifest(url, source, data);
                    _this.eventEmitter.publish('manifestQueued', object, ''); // Use the state manager's manifest caching to store collections too
                    _this.eventEmitter.publish('ADD_MANIFEST_FROM_URL', [url, source]);
                  break;
                }
              }
            });
          }
        },
        
        // Helper for loading a manifest from a URL
        addManifestFromUrl: function(url) {
          var _this = this,
            manifest;
          // Cache hit: Show the manifest panel item if it is loaded
          if (_this.state.getStateProperty('manifests')[url]) {
            manifest = _this.state.getStateProperty('manifests')[url];
            if (manifest.jsonLd) {
              _this.manifestListItems.push(new $.ManifestListItem({ 
                manifest: manifest, 
                resultsWidth: _this.resultsWidth, 
                state: _this.state,
                eventEmitter: _this.eventEmitter,
                forcedIndex: _this.expectedThings.indexOf(url),
                appendTo: _this.manifestListElement }));
            }
          }
          // Cache miss: Queue the loading and defer the received event until it is done
          else {
            manifest = new $.Manifest(url, '');
            _this.eventEmitter.publish('manifestQueued', manifest, '');
            manifest.request.done(function() {
              _this.eventEmitter.publish('manifestReceived', manifest);
            });
          }
        },
        
        // Helper for loading a manifest from a URL as a child node of some other node (null = top level)
        // Optionally, jump to that new child node if jumpToIt is specified as true
        addCollectionFromUrl: function(url, nodeId, jumpToIt) {
          var _this = this,
            collection;
          // Is it adding to the top level?
          if (!nodeId) {
            // Pass if it is already loaded
            if (_this.topCollectionsUris[url]) {
              return;
            }
            // Otherwise, make note of it
            else {
              _this.topCollectionsUris[url] = true;
            }
          }
          // Cache hit: Add the node right away if it is loaded
          if (typeof _this.state.getStateProperty('manifests')[url] !== 'undefined') {
            collection = _this.state.getStateProperty('manifests')[url];
            if (collection.jsonLd) {
              var newNode = _this.addCollectionNode(nodeId, collection);
              // Also jump to the node if specified
              if (jumpToIt) {
                _this.treeElement.jstree('deselect_all');
                _this.treeElement.jstree('select_node', newNode);
                // Expand the node if it has children
                if (collection.getCollectionUris().length > 0) {
                  _this.treeElement.jstree('open_node', newNode);
                }
              }
            }
          }
          // Cache miss: Queue the loading and defer the received event until it is done or failed
          else {
            collection = new $.Collection(url, '');
            _this.eventEmitter.publish('manifestQueued', collection, ''); // Use the state manager's manifest caching to store collections too
            collection.request.done(function() {
              _this.eventEmitter.publish('collectionReceived', [collection, url, nodeId ? nodeId : null]);
            });
            collection.request.fail(function() {
              _this.eventEmitter.publish('collectionNotReceived', [url, nodeId ? nodeId : null]);
            });
          }
        },
        
        // Helper for updating a subnode of nodeId corresponding to the specified URL
        updateCollectionFromUrl: function(url, nodeId) {
          var _this = this,
            collection;
          // Cache hit: Get the collection object and update right away
          if (typeof _this.state.getStateProperty('manifests')[url] !== 'undefined') {
            collection = _this.state.getStateProperty('manifests')[url];
            if (collection.jsonLd) {
              _this.updateCollectionNode(nodeId, collection);
            }
          }
          // Cache miss: Queue the loading and defer the received event until it is done or failed
          else {
            collection = new $.Collection(url, '');
            _this.eventEmitter.publish('manifestQueued', collection, ''); // Use the state manager's manifest caching to store collections too
            collection.request.done(function() {
              _this.eventEmitter.publish('collectionReceived', [collection, url, nodeId ? nodeId : null]);
            });
            collection.request.fail(function() {
              _this.eventEmitter.publish('collectionNotReceived', [url, nodeId ? nodeId : null]);
            });
          }
        },
        
        // Helper for loading a Collection object as a child of nodeId
        // Optionally, skip seeding subnodes under this collection if unexpanded is specified; this marks it as "still loading"
        addCollectionNode: function(nodeId, collection, unexpanded) {
          var _this = this,
              subcollectionBlocks = collection.getCollectionBlocks();
          // Add the new node
          var newNodeId = _this.treeElement.jstree('create_node', nodeId ? nodeId : null, {
            text: collection.jsonLd.label,
            icon: unexpanded ? 'fa fa-spinner fa-pulse' : 'fa fa-folder', // Unexpanded = still loading, expanded = loaded
            children: []
          }, 'last');
          // Don't let nodes that are still loading be selected
          if (unexpanded) {
            _this.treeElement.jstree('disable_node', newNodeId);
          }
          // Register the new node's apparent contents
          _this.registerNodeIdUriPair(newNodeId, collection.jsonLd['@id']);
          _this.nodeCollections[newNodeId] = collection.getCollectionUris();
          _this.nodeManifests[newNodeId] = collection.getManifestUris();
          _this.nodeChildren[newNodeId] = [];
          // Add subcollections if unexpanded is not specified
          if (!unexpanded) {
            jQuery.each(subcollectionBlocks, function(i, v) {
              // Create the subnode
              var nid = _this.treeElement.jstree('create_node', newNodeId, {
                text: v.label,
                icon: 'fa fa-spinner fa-pulse',
                children: []
              }, 'last');
              // Register the subnode's apparent contents
              _this.registerNodeIdUriPair(nid, v['@id']);
              _this.unexpandedNodes[nid] = true;
              _this.nodeChildren[newNodeId].push(nid);
              // Don't let it be selected yet
              _this.treeElement.jstree('disable_node', nid);
            });
          }
          // If unexpanded is specified, mark this node as requiring expansion later
          else {
            _this.unexpandedNodes[newNodeId] = true;
          }
          // Return newly created node ID for future reference
          return newNodeId;
        },
        
        // Helper for updating a subnode of nodeId corresponding to the specified URL
        updateCollectionNode: function(nodeId, collection) {
          var _this = this,
              atId = collection.uri,
              collectionBlocks = collection.getCollectionBlocks(),
              collectionUris = collection.getCollectionUris(),
              manifestUris = collection.getManifestUris();
          // Find the right node to update that corresponds to the collection's URI
          jQuery.each(_this.nodeChildren[nodeId], function(_, n) {
            if (_this.nodeIdToUri[n] == atId && _this.unexpandedNodes[n]) {
              // Register the node's contents
              _this.nodeCollections[n] = collectionUris;
              _this.nodeManifests[n] = manifestUris;
              _this.nodeChildren[n] = [];
              // Add children under the node if it has any subcollections, but don't expand them yet
              jQuery.each(collectionBlocks, function(i, v) {
                var nn = _this.addCollectionNode(n, new $.Collection(v['@id'], null, v), true);
                _this.nodeChildren[n].push(nn);
                _this.unexpandedNodes[nn] = true;
              });
              // This node is already expanded, unmark it
              delete _this.unexpandedNodes[n];
              // Change its icon to a folder and allow it to be selected
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
                    '<input type="text" id="url-loader" name="url-load" placeholder="https://...">',
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
              '<div class="member-select-results">',
                '<ul class="items-listing">',
                '</ul>',
              '</div>',
          '</div>',
          '</div>'
        ].join(''))
    };

}(Mirador));

