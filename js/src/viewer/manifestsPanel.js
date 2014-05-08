(function($) {

    $.ManifestsPanel = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            appendTo: null
        }, $.DEFAULT_SETTINGS, options);

        this.init();
    };

    $.ManifestsPanel.prototype = {

        init: function() {
            var tplData = {
                worksets: [

                ]
            };
            this.element = this.template({});
            jQuery(this.element).appendTo(this.appendTo);

            this.bindEvents();

            // should probably retrieve some data in order to populate the template.
            // template data built from the manifests object.
            // 
        },

        bindEvents: function() {
            jQuery.subscribe('manifestPanelVisible.set', this.show());
        },

        show: function() {
            console.log('showing loadMenu.');
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

