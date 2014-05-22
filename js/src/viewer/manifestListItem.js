(function($) {

    $.ManifestsListItem = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            parent:                     null,
            manifestId:                 null,
            loadStatus:                 null
        }, options);

        this.init();
        
    };

    $.ManifestsListItem.prototype = {

        init: function() {
          var _this = this;
            this.element = jQuery(this.template(this.fetchTplData(this.manifestId))).prependTo(this.parent.manifestListElement).hide().fadeIn('slow');
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
            })[0].location
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
                      '<div class="repo-image">',
                        '<img src="images/sul_logo.jpeg" alt="repoImg">',
                      '</div>',
                      '<div class="select-metadata">',
                          '<h3 class="manifest-title">{{label}}</h3>',
                          '<h4 class="repository-label">{{repository}}</h4>',
                      '</div>',
                      '<img src="http://placehold.it/120x90" alt="repoImg">',
                      '<img src="http://placehold.it/120x90" alt="repoImg">',
                      '<img src="http://placehold.it/120x90" alt="repoImg">',
                      '<img src="http://placehold.it/120x90" alt="repoImg">',
                      '</li>'
        ].join(''))
    };

}(Mirador));

