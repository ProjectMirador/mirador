(function($) {

    $.ManifestsListItem = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            parent:                     null,
            manifestId:                 null,
            loadStatus:                 null
        }, $.DEFAULT_SETTINGS, options);

        this.init();
        
    };

    $.ManifestsListItem.prototype = {

        init: function() {
          var _this = this;
            this.element = jQuery(this.template(this.fetchTplData(this.manifestId))).prependTo(this.parent.manifestListElement).hide().fadeIn();
            this.bindEvents();
            this.fetchImages();
        },

        fetchTplData: function() {
          var _this = this;
          
          var manifest = $.viewer.manifests[_this.manifestId];
          var tplData = { 
            label: manifest.label,
            repository: jQuery.grep($.viewer.data, function(item) {
              return item.manifestUri === _this.manifestId;
            }).location
          };

          return tplData;
        },

        fetchImages: function() {

        },

        bindEvents: function() {
        },

        hide: function() {
            var _this = this;
        },

        show: function() {
            var _this = this;
        },

        template: Handlebars.compile([
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
                      '</li>'
        ].join(''))
    };

}(Mirador));

