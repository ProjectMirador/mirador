(function($) {

    $.ManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            listItems:                  null,
            appendTo:                   null,
            parent:                     null,
            manifestListItems:          [],
            manifestListElement:        null,
            manifestLoadStatusIndicator: null
        }, options);

        var _this = this;
        _this.init();
        
    };

    $.ManifestsPanel.prototype = {

        init: function() {
            this.element = jQuery(this.template()).appendTo(this.appendTo);
            this.manifestListElement = this.element.find('ul');
            // this.manifestLoadStatus = new $.ManifestLoadStatusIndicator({parent: this});
            this.bindEvents();
        },

        bindEvents: function() {
            var _this = this;
            // handle interface events
            this.element.find('#load-controls form').on('submit', function() {
                event.preventDefault();
                var url = jQuery(this).find('input').val();
                _this.parent.addManifestFromUrl(url);
            });

            // handle subscribed events
            jQuery.subscribe('manifestsPanelVisible.set', function(_, stateValue) {
                if (stateValue) { _this.show(); return; }
                //if ( _this.parent.get('manifestsPanelVisible', 'uiState')) { _this.show(); return; }
                _this.hide();
            });
            jQuery.subscribe('manifestAdded', function(event, newManifest) {
              _this.manifestListItems.push(new $.ManifestsListItem({ parent: _this, manifestId: newManifest }));
            });
        },
        
        addManifestToWorkspace: function(manifestURI) {
            this.parent.addManifestToWorkspace(manifestURI);
        },

        hide: function() {
            var _this = this;
            _this.element.removeClass('active');
        },

        show: function() {
            var _this = this;
            _this.element.addClass('active');
        },

        template: Handlebars.compile([
          '<div id="manifest-select-menu">',
          '<div class="container">',
              '<div id="load-controls">',
              '<form action="" id="manifest-search">',
                  '<input id="manifest-search" type="text" name="url-load" placeholder="Search...">',
              '</form>',
              '<form action="">',
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

