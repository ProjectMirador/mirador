(function($) {

    $.ManifestListItem = function(options) {

        jQuery.extend(true, this, {
            element:                    null,
            parent:                     null,
            manifestId:                 null,
            loadStatus:                 null,
            thumbHeight:                80,
            resultsWidth:               0,  //based on screen width
            maxPreviewImagesWidth:      0,
            repoWidth:                  80,
            metadataWidth:              200,
            margin:                     15,
            remainingItemsMinWidth:     80,  //set a minimum width for the "more" image
            imagesTotalWidth:           0
            
        }, options);

        this.init();
        
    };

    $.ManifestListItem.prototype = {

        init: function() {
           var _this = this;
           //need a better way of calculating this because JS can't get width and margin of hidden elements, so must manually set that info
           //ultimately use 95% of space available, since sometimes it still displays too many images
           this.maxPreviewImagesWidth = this.resultsWidth - (this.repoWidth + this.margin + this.metadataWidth + this.margin + this.remainingItemsMinWidth);
           this.maxPreviewImagesWidth = this.maxPreviewImagesWidth * 0.95;
          
           this.element = jQuery(this.template(this.fetchTplData(this.manifestId))).prependTo(this.parent.manifestListElement).hide().fadeIn('slow');

           var remainingOffset = this.repoWidth + this.margin + this.metadataWidth + this.margin + this.imagesTotalWidth;
           this.element.find('.remaining-items').css('left', remainingOffset);

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
            images: []
          };
          tplData.repoImage = (function() {
            var repo = tplData.repository;
            if (tplData.repository === '(Added from URL)') {
               repo = '';
            }            
            var imageName = $.DEFAULT_SETTINGS.repoImages[repo || 'other'];

            return 'images/' + imageName;
          })();

          for ( var i=0; i < manifest.sequences[0].canvases.length; i++) {
            var canvas = manifest.sequences[0].canvases[i],
            resource = canvas.images[0].resource,
            service = resource['default'] ? resource['default'].service : resource.service,
            url = $.Iiif.getUriWithHeight(service['@id'], _this.thumbHeight),
            aspectRatio = resource.height/resource.width,
            width = (_this.thumbHeight/aspectRatio);
            
            _this.imagesTotalWidth += (width + _this.margin);
            if (_this.imagesTotalWidth >= _this.maxPreviewImagesWidth) {
               _this.imagesTotalWidth -= (width + _this.margin);
               break;
            }
                        
            tplData.images.push({
              url: url,
              width: width,
              height: _this.thumbHeight,
              id: canvas['@id']
            });
          }
          
          tplData.remaining = (function() {
              var remaining = manifest.sequences[0].canvases.length - tplData.images.length;
              if (remaining > 0) {
                return remaining;
              }
            })();

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
          
          this.element.find('.preview-image').on('click', function() {
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
                        '<img src="{{url}}" width="{{width}}" height="{{height}}" class="preview-image flash" data-image-id="{{id}}">',
                      '{{/each}}',
                      '</div>',
                       '{{#if remaining}}',
                         '<div class="remaining-items"><h3>{{remaining}} more</h3></div>',
                       '{{/if}}',
                      '</li>'
        ].join(''))
    };

}(Mirador));

