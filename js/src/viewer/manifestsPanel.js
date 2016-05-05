(function($) {

    $.ManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            listItems:                  null,
            appendTo:                   null,
            manifestListItems:          [],
            manifestListElement:        null,
            manifestLoadStatusIndicator: null,
            resultsWidth:               0
        }, options);

        var _this = this;
        _this.init();
        
    };

    $.ManifestsPanel.prototype = {

        init: function() {
            this.element = jQuery(this.template({
                showURLBox : this.state.getStateProperty('showAddFromURLBox')
            })).appendTo(this.appendTo);
            this.manifestListElement = this.element.find('ul');
            
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
          jQuery.subscribe('manifestsPanelVisible.set', function(_, stateValue) {
            _this.onPanelVisible(_, stateValue);
          });

          jQuery.subscribe('manifestReceived', function(event, newManifest) {
            _this.onManifestReceived(event, newManifest);
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
          jQuery.publish('ADD_MANIFEST_FROM_URL', url, "(Added from URL)");
        },
        
        togglePanel: function(event) {
          jQuery.publish('TOGGLE_LOAD_WINDOW');
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
          jQuery.publish("manifestPanelWidthChanged", _this.resultsWidth);
        },
        
        onPanelVisible: function(_, stateValue) {
          var _this = this;
          if (stateValue) { _this.show(); return; }
           _this.hide();
        },

        onManifestReceived: function(event, newManifest) {
          var _this = this;
          _this.manifestListItems.push(new $.ManifestListItem({ 
            manifest: newManifest, 
            resultsWidth: _this.resultsWidth, 
            state: _this.state,
            appendTo: _this.manifestListElement }));
          _this.element.find('#manifest-search').keyup();
        },

        template: Handlebars.compile([
          '<div id="manifest-select-menu">',
          '<div class="container">',
            '<div class="manifest-panel-controls">',
              '<a class="remove-object-option"><i class="fa fa-times fa-lg fa-fw"></i>{{t "close"}}</a>',
              '<div id="load-controls">',
                '{{#if showURLBox}}',
                  '<form action="" id="url-load-form">',
                    '<label for="url-loader">{{t "addNewObject"}}:</label>',
                    '<input type="text" id="url-loader" name="url-load" placeholder="http://...">',
                    '<input type="submit" value="Load">',
                  '</form>',
                '{{/if}}',
                '<form action="" id="manifest-search-form">',
                  '<label for="manifest-search">{{t "filterObjects"}}:</label>',
                  '<input id="manifest-search" type="text" name="manifest-filter">',
                '</form>',
              '</div>',
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

