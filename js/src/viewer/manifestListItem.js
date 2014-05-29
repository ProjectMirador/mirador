(function($) {

    $.ManifestsListItem = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            parent:                     null,
            manifestId:                 null,
            loadStatus:                 null,
            numPreviewImages:           8,
            thumbHeight:                80
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
            repository: (function() { 
              var location = jQuery.grep($.viewer.data, function(item) {
                return item.manifestUri === _this.manifestId;
              })[0].location;

              console.log(location);

              if (location === 'undefined') {
                return 'No Repository Information Available';
              }

              return location;

            })(),
            images: []
          };
          if (_this.numPreviewImages > $.viewer.manifests[_this.manifestId].sequences[0].canvases.length) {
            _this.numPreviewImages = $.viewer.manifests[_this.manifestId].sequences[0].canvases.length;
          }
          for ( var i=0; i < _this.numPreviewImages - 1 ; i++) {
            var resource = $.viewer.manifests[_this.manifestId].sequences[0].canvases[i].images[0].resource,
            service = resource['default'] ? resource['default'].service : resource.service,
            url = $.Iiif.getUriWithHeight(service['@id'], _this.thumbHeight),
            aspectRatio = resource.height/resource.width,
            width = (_this.thumbHeight/aspectRatio);

            tplData.images.push({
              url: url,
              width: width
            });
          }

          return tplData;
        },

        fetchImages: function() {

        },

        bindEvents: function() {
          var _this = this;
          this.element.find('img').on('load', function() {
            //console.log('this image has now loaded');
            //console.log(jQuery(this));
            jQuery(this).hide().fadeIn(750);
          });
          this.element.find('.select-metadata').on('click', function() {
            _this.parent.addManifestToWorkspace(_this.manifestId);
          });
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
                      '{{#each images}}',
                        '<img src="{{url}}" width="{{width}}"class="thumbnail-image flash" >',
                      '{{/each}}',
                      '</li>'
        ].join(''))
    };

}(Mirador));

