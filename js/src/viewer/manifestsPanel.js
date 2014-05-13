(function($) {

    $.ManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            appendTo:                   null,
            parent:                     null
        }, $.DEFAULT_SETTINGS, options);

        var _this = this;
        setTimeout(function() { _this.init(); }, 6000 );
        
    };

    $.ManifestsPanel.prototype = {

        init: function() {
            this.element = jQuery(this.template(this.fetchTplData())).appendTo(this.appendTo);
            this.bindEvents();
            console.log(this.fetchTplData());
        },

        fetchTplData: function() {
            var tplData = {
                worksets: []
            };

            jQuery.each($.manifests, function(manifestKey){
                var manifest = $.manifests[manifestKey];
                var prunedManifest = { 
                    label: manifest.label
                };
                console.log(manifest);

                tplData.worksets.push(prunedManifest);
            });
            return tplData;
        },

        bindEvents: function() {
            var _this = this;
            jQuery.subscribe('manifestPanelVisible.set', function() {
                console.log(_this.parent.get('manifestPanelVisible'));
                if ( _this.parent.get('manifestPanelVisible')) { _this.show(); return; }
                _this.hide();
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
              '<input type="text" name="url-load" placeholder="http://...">',
              '</div>',
              '<div id="select-results">',
                  '<ul class="items-listing">',
                  '{{#worksets}}',
                      '<li>',
                      '<img src="http://placehold.it/150x100" alt="repoImg">',
                      '<div class="select-metadata">',
                          '<h2 class="manifest-title">{{label}}</h2>',
                          '<h3 class="repository-label">{{repository}}</h3>',
                      '</div>',
                      '<img src="http://placehold.it/150x100" alt="repoImg">',
                      '<img src="http://placehold.it/150x100" alt="repoImg">',
                      '<img src="http://placehold.it/150x100" alt="repoImg">',
                      '<img src="http://placehold.it/150x100" alt="repoImg">',
                      '</li>',
                  '{{/worksets}}',
                  '</ul>',
              '</div>',
              '</div>',
          '</div>'
        ].join(''))
    };

}(Mirador));

