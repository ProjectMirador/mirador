(function($) {

    $.ManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            appendTo:                   null,
            parent:                     null
        }, $.DEFAULT_SETTINGS, options);

        this.init();
    };

    $.ManifestsPanel.prototype = {

        init: function() {
            this.element = jQuery(this.template(this.fetchTplData())).appendTo(this.appendTo);

        },

        fetchTplData: function() {
            var tplData = {
                manifests: []
            };
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
            jQuery(_this.element).removeClass('active');
        },

        show: function() {
            var _this = this;
            console.log(_this.element);
            jQuery(_this.element).addClass('active');
        },

        template: Handlebars.compile([
          '<div id="manifest-select-menu">',
              '<div id="load-controls">',
              '<input type="text" name="url-load" placeholder="http://...">',
              '</div>',
              '<div id="select-results">',
                  '<ul class="items-listing">',
                  '{{#worksets}}',
                      '<li>',
                      '<img src="http://placekitten.com/85/100" alt="repoImg">',
                      '<div class="select-metadata">',
                          '<h2 class="manifest-title">{{label}}</h2>',
                          '<h3 class="repository-label">{{repository}}</h3>',
                      '</div>',
                      '</li>',
                  '{{/worksets}}',
                  '</ul>',
              '</div>',
          '</div>'
        ].join(''))
    };

}(Mirador));

