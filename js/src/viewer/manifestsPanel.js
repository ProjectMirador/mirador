(function($) {

    $.ManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            appendTo:                   null,
            parent:                     null
        }, $.DEFAULT_SETTINGS, options);

        var _this = this;
        setTimeout(function() { _this.init(); }, 3000 );
        
    };

    $.ManifestsPanel.prototype = {

        init: function() {
            this.element = jQuery(this.template(this.fetchTplData())).appendTo(this.appendTo);
            this.bindEvents();
        },

        update: function() {
        },

        fetchTplData: function() {
            var _this = this;
            var tplData = {
                worksets: []
            };

            jQuery.each(_this.parent.manifests, function(manifestKey){
                var manifest = _this.parent.manifests[manifestKey];
                var prunedManifest = { 
                    label: manifest.label
                };

                tplData.worksets.push(prunedManifest);
            });
            return tplData;
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
            jQuery.subscribe('manifestPanelVisible.set', function() {
                if ( _this.parent.get('manifestPanelVisible', 'mainMenuPanels')) { _this.show(); return; }
                _this.hide();
            });
            jQuery.subscribe('manifests.set', function() {
                _this.update();
                console.log('added new manifest');
            });
        },

        hide: function() {
            var _this = this;
            _this.element.removeClass('active');
        },

        show: function() {
            var _this = this;
            console.log(_this.element);
            _this.element.addClass('active');
        },

        template: Handlebars.compile([
          '<div id="manifest-select-menu">',
          '<div class="container">',
              '<div id="load-controls">',
              '<form action="" id="manifest-search">',
                  '<i class="fa fa-search"></i>',
                  '<input id="manifest-search" type="text" name="url-load" placeholder="Search...">',
              '</form>',
              '<form action="">',
                  '<h2>Add new item from URL</h2>',
                  '<input type="text" name="url-load" placeholder="http://...">',
              '</form>',
              '</div>',
              '<div id="select-results">',
                  '<ul class="items-listing">',
                  '{{#worksets}}',
                      '<li>',
                      '<img src="http://placehold.it/120x90" alt="repoImg">',
                      '<div class="select-metadata">',
                          '<h2 class="manifest-title">{{label}}</h2>',
                          '<h3 class="repository-label">{{repository}}</h3>',
                      '</div>',
                      '<img src="http://placehold.it/120x90" alt="repoImg">',
                      '<img src="http://placehold.it/120x90" alt="repoImg">',
                      '<img src="http://placehold.it/120x90" alt="repoImg">',
                      '<img src="http://placehold.it/120x90" alt="repoImg">',
                      '</li>',
                  '{{/worksets}}',
                  '</ul>',
              '</div>',
              '</div>',
          '</div>'
        ].join(''))
    };

}(Mirador));

