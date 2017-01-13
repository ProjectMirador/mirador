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
                    text: 'My Objects',
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
          
          _this.eventEmitter.subscribe('ADD_MANIFEST_FROM_URL', function(event, stuff) {
            _this.treeElement.jstree('deselect_all');
            _this.treeElement.jstree('select_node', 'user');
            if (_this.userManifests.indexOf(stuff) == -1) {
              _this.userManifests.push(stuff);
            }
            
          });
        },

        bindEvents: function() {
            var _this = this;

            // handle interface events
            this.element.find('form#url-load-form').on('submit', function(event) {
              event.preventDefault();
              _this.addManifestUrl(jQuery(this).find('input').val());
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
        
        clearManifestItems: function() {
          this.manifestListItems = [];
          this.manifestListElement.html('');
        },
        
        changeNode: function(node) {
          var _this = this;
          this.clearManifestItems();
          switch (node.id) {
            case 'preload': _this.expectedThings = _this.preloadedManifests; break;
            case 'user': _this.expectedThings = _this.userManifests; break;
          }
          jQuery.each(_this.expectedThings, function(_, expectedThing) {
            _this.addManifestFromUrl(expectedThing);
          });
          this.element.find('#manifest-search').keyup();
        },
        
        addManifestFromUrl: function(url) {
          var _this = this,
            manifest;
          if (_this.state.getStateProperty('manifests')[url]) {
            manifest = _this.state.getStateProperty('manifests')[url];
            _this.manifestListItems.push(new $.ManifestListItem({ 
              manifest: manifest, 
              resultsWidth: _this.resultsWidth, 
              state: _this.state,
              eventEmitter: _this.eventEmitter,
              appendTo: _this.manifestListElement }));
          }
          else {
            manifest = new $.Manifest(url, '');
            _this.eventEmitter.publish('manifestQueued', manifest, '');
            manifest.request.done(function() {
              _this.eventEmitter.publish('manifestReceived', manifest);
            });
          }
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

