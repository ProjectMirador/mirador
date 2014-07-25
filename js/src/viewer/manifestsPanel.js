(function($) {

    $.ManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            listItems:                  null,
            appendTo:                   null,
            parent:                     null,
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
            this.element = jQuery(this.template()).appendTo(this.appendTo);
            this.manifestListElement = this.element.find('ul');
            
            //this code gives us the max width of the results area, used to determine how many preview images to show
            //cloning the element and adjusting the display and visibility means it won't break the normal flow
            var clone = this.element.clone().css("visibility","hidden").css("display", "block").appendTo(this.appendTo);
            this.resultsWidth = clone.find('#select-results').outerWidth();
            clone.remove();
            
            // this.manifestLoadStatus = new $.ManifestLoadStatusIndicator({parent: this});
            this.bindEvents();
        },

        bindEvents: function() {
            var _this = this;
            // handle interface events
            this.element.find('form#url-load-form').on('submit', function() {
                event.preventDefault();
                var url = jQuery(this).find('input').val();
                _this.parent.addManifestFromUrl(url);
            });

            // handle subscribed events
            jQuery.subscribe('manifestsPanelVisible.set', function(_, stateValue) {
               if (stateValue) { _this.show(); return; }
                _this.hide();
            });
            jQuery.subscribe('manifestAdded', function(event, newManifest) {
              _this.manifestListItems.push(new $.ManifestListItem({ parent: _this, manifestId: newManifest, resultsWidth: _this.resultsWidth }));
            });
            
            //Filter manifests based on user input
            this.element.find('#manifest-search').on('keyup input', function() {
               if (this.value.length > 0) {
                  _this.element.find('.items-listing li').show().filter(function() {
                     return jQuery(this).text().toLowerCase().indexOf(_this.element.find('#manifest-search').val().toLowerCase()) === -1;
                  }).hide();
               } else {
                  _this.element.find('.items-listing li').show();
               }
            });
        },
        
        toggleImageView: function(imageID, manifestURI) {
            this.parent.toggleImageViewInWorkspace(imageID, manifestURI);
        },
        
        toggleThumbnailsView: function(manifestURI) {
            this.parent.toggleThumbnailsViewInWorkspace(manifestURI);
        },

        hide: function() {
            jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
        },

        show: function() {
            jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
        },

        template: Handlebars.compile([
          '<div id="manifest-select-menu">',
          '<div class="container">',
              '<div id="load-controls">',
              '<form action="" id="manifest-search-form">',
                  '<input id="manifest-search" type="text" name="manifest-filter" placeholder="Filter objects...">',
              '</form>',
              '<form action="" id="url-load-form">',
                  '<h2>Add new item from URL</h2>',
                  '<input type="text" name="url-load" placeholder="http://...">',
              '</form>',
              '</div>',
              '<div id="select-results">',
                  '<ul class="items-listing">',
                  '</ul>',
              '</div>',
              '</div>',
          '</div>'
        ].join(''))
    };

}(Mirador));

