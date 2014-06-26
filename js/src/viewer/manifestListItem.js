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
            var remainingOffset = this.element.find('.repo-image').outerWidth(true) + this.element.find('.select-metadata').outerWidth(true) + this.element.find('.preview-images').outerWidth(true);
            // this.element.find('.remaining-items').css('left', remainingOffset);
            this.bindEvents();
        },

        fetchTplData: function() {
          var _this = this;

          var manifest = $.viewer.manifests[_this.manifestId];

          var tplData = { 
            label: manifest.label,
            repository: (function() { 
              var locationData = jQuery.grep($.viewer.data, function(item) {
                return item.manifestUri === _this.manifestId;
              })[0];

              if (locationData === undefined) {
                return '(Added from URL)';
              } else {
                return locationData.location;
              }
            })(),
            canvasCount: manifest.sequences[0].canvases.length,
            remaining: (function() {
              var remaining = manifest.sequences[0].canvases.length - _this.numPreviewImages;
              if (remaining > 0) {
                return remaining;
              }
            })(),
            images: []
          };
          tplData.repoImage = (function() {
            var imageName = $.DEFAULT_SETTINGS.repoImages[tplData.repository || 'other'];

            return 'images/' + imageName;
          })();

          if (_this.numPreviewImages > $.viewer.manifests[_this.manifestId].sequences[0].canvases.length) {
            _this.numPreviewImages = $.viewer.manifests[_this.manifestId].sequences[0].canvases.length;
          }

          for ( var i=0; i < _this.numPreviewImages; i++) {
            var canvas = $.viewer.manifests[_this.manifestId].sequences[0].canvases[i],
            resource = canvas.images[0].resource,
            service = resource['default'] ? resource['default'].service : resource.service,
            url = $.Iiif.getUriWithHeight(service['@id'], _this.thumbHeight),
            aspectRatio = resource.height/resource.width,
            width = (_this.thumbHeight/aspectRatio);

            tplData.images.push({
              url: url,
              width: width,
              id: canvas['@id']
            });
          }

          return tplData;
        },

        render: function() {

        },

        bindEvents: function() {
          var _this = this;
          this.element.find('img').on('load', function() {
            jQuery(this).hide().fadeIn(750);
          });
          this.element.find('.select-metadata').on('click', function() {
            _this.parent.toggleThumbnailsView(_this.manifestId);
          });
          
          this.element.find('.thumbnail-image').on('click', function() {
           _this.parent.toggleImageView(jQuery(this).attr('data-image-id'), _this.manifestId);
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
                        '<img src="{{repoImage}}" alt="repoImg">',
                      '</div>',
                      '<div class="select-metadata">',
                          '<h3 class="manifest-title">{{label}}</h3>',
                          '<h4 >{{canvasCount}} items</h4>',
                      '{{#if repository}}',
                          '<h4 class="repository-label">{{repository}}</h4>',
                      '{{/if}}',
                      '</div>',
                      '<div class="preview-images">',
                      '{{#each images}}',
                        '<img src="{{url}}" width="{{width}}" class="thumbnail-image flash" data-image-id="{{id}}">',
                      '{{/each}}',
                      '</div>',
                      // '{{#if remaining}}',
                      //   '<div class="remaining-items"><h3>{{remaining}} more</h3></div>',
                      // '{{/if}}',
                      '</li>'
        ].join(''))
    };

}(Mirador));

