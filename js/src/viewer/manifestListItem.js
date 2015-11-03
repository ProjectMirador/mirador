(function($) {

  $.ManifestListItem = function(options) {

    jQuery.extend(true, this, {
      element:                    null,
      parent:                     null,
      manifest:                   null,
      loadStatus:                 null,
      thumbHeight:                80,
      urlHeight:                  150,
      resultsWidth:               0,  // based on screen width
      maxPreviewImagesWidth:      0,
      repoWidth:                  80,
      metadataWidth:              200,
      margin:                     15,
      remainingItemsMinWidth:     80, // set a minimum width for the "more" image
      imagesTotalWidth:           0,
      tplData:                    null,
      allImages:                  []
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

      this.fetchTplData(this.manifestId);
      this.element = jQuery(this.template(this.tplData)).prependTo(this.parent.manifestListElement).hide().fadeIn('slow');

      var remainingOffset = this.repoWidth + this.margin + this.metadataWidth + this.margin + this.imagesTotalWidth;
      _this.noiseImage = $.viewer.buildPath + $.viewer.imagesPath + 'noise.png';
      this.element.find('.remaining-items').css('left', remainingOffset).css('background-image','url('+_this.noiseImage+')').css('background-repeat','repeat');

      this.bindEvents();
    },

    fetchTplData: function() {
      var _this = this,
      location = _this.manifest.location,
      manifest = _this.manifest.jsonLd;

      this.tplData = { 
        label: manifest.label,
        repository: location,
        canvasCount: manifest.sequences[0].canvases.length,
        images: []
      };

      this.tplData.repoImage = (function() {
        var repo = _this.tplData.repository;
        if (manifest.logo) {
          if (typeof manifest.logo === "string")
            return manifest.logo;
          if (typeof manifest.logo['@id'] !== 'undefined')
            return manifest.logo['@id'];
        }
        if (_this.tplData.repository === '(Added from URL)') {
          repo = '';
        }            
        var imageName = $.viewer.repoImages[repo || 'other'] || $.viewer.repoImages.other;

        return $.viewer.buildPath + $.viewer.logosPath + imageName;
      })();

      for ( var i=0; i < manifest.sequences[0].canvases.length; i++) {
        var canvas = manifest.sequences[0].canvases[i];
        if (canvas.width === 0) {
          continue;
        }

        var aspectRatio = canvas.height/canvas.width,
        width = (_this.thumbHeight/aspectRatio);
        url = _this.manifest.getThumbnailForCanvas(canvas, width);

        _this.allImages.push({
          url: url,
          width: width,
          height: _this.thumbHeight,
          id: canvas['@id'],
          index: i
        });
      }

      jQuery.each(_this.allImages, function(index, value) {
        var width = value.width;
        
        _this.imagesTotalWidth += (width + _this.margin);
        if (_this.imagesTotalWidth >= _this.maxPreviewImagesWidth) {
          _this.imagesTotalWidth -= (width + _this.margin);
          return false;
        }
        _this.tplData.images.push(value);
      });

      this.tplData.remaining = (function() {
        var remaining = manifest.sequences[0].canvases.length - _this.tplData.images.length;
        if (remaining > 0) {
          return remaining;
        }
      })();

    },

    render: function() {

    },

    bindEvents: function() {
      var _this = this;

      this.element.find('img').on('load', function() {
        //if img width is not equal to the width in the html, change height
        jQuery(this).hide().fadeIn(600);
      });

      this.element.on('click', function() {
        var windowConfig = {
          manifest: _this.manifest,
          currentCanvasID: null,
          currentFocus: 'ThumbnailsView'
        };
        $.viewer.workspace.addWindow(windowConfig);
      });

      this.element.find('.preview-image').on('click', function(e) {
        e.stopPropagation();
        var windowConfig = {
          manifest: _this.manifest,
          currentCanvasID: jQuery(this).attr('data-image-id'),
          currentFocus: 'ImageView'
        };
        $.viewer.workspace.addWindow(windowConfig);
      });

      jQuery.subscribe('manifestPanelWidthChanged', function(event, newWidth){
        var newMaxPreviewWidth = newWidth - (_this.repoWidth + _this.margin + _this.metadataWidth + _this.margin + _this.remainingItemsMinWidth),
        remainingOffset = 0,
        remaining,
        newRemaining;
        newMaxPreviewWidth = newMaxPreviewWidth * 0.95;
        //width of browser window has been made smaller
        if (newMaxPreviewWidth < _this.maxPreviewImagesWidth ) {
          while (_this.imagesTotalWidth >= newMaxPreviewWidth) {
            image = _this.tplData.images.pop();
            _this.imagesTotalWidth -= (image.width + _this.margin);

            //remove image from dom
            _this.element.find('img[data-image-id="'+image.id+'"]').remove();
            remainingOffset = _this.repoWidth + _this.margin + _this.metadataWidth + _this.margin + _this.imagesTotalWidth;

            //increase remaining # by 1
            remaining = _this.element.find('.remaining-amount');
            if (remaining.length > 0) {
              newRemaining = parseInt(remaining[0].innerHTML, 10) + 1;
              remaining[0].innerHTML = newRemaining;
            } else {
              //add the remaining element
              newRemaining = 1;
              _this.element.find('.preview-images').after('<div class="remaining-items"><h3><span class="remaining-amount">'+newRemaining+'</span> more</h3></div>');
            }

            //update size of "More" icon
            _this.element.find('.remaining-items').css('left', remainingOffset).css('background-image','url('+_this.noiseImage+')').css('background-repeat','repeat');
          }
          //width of browser window has been made larger
        } else if (newMaxPreviewWidth > _this.maxPreviewImagesWidth) {
          var currentLastImage = _this.tplData.images[_this.tplData.images.length-1],
          index = currentLastImage.index+1,
          image = _this.allImages[index];
          if (image) {
            while (_this.imagesTotalWidth + image.width + _this.margin < newMaxPreviewWidth) {
              _this.tplData.images.push(image);
              _this.imagesTotalWidth += (image.width + _this.margin);
              
              //add image to dom
              _this.element.find('.preview-images').append('<img src="'+image.url+'" width="'+image.width+'" height="'+image.height+'" class="preview-image flash" data-image-id="'+image.id+'">');
              remainingOffset = _this.repoWidth + _this.margin + _this.metadataWidth + _this.margin + _this.imagesTotalWidth;
              
              //decrease remaining # by 1
              remaining = _this.element.find('.remaining-amount');
              if (remaining.length > 0) {
                newRemaining = parseInt(remaining[0].innerHTML, 10) - 1;
                if (newRemaining > 0) {
                  remaining[0].innerHTML = newRemaining;
                } else {
                  _this.element.find('.remaining-items').remove();
                }
              }
          
              _this.element.find('.remaining-items').css('left', remainingOffset);

              //get next image
              index++;
              image = _this.allImages[index];
              if (!image) {
                break;
              }
            }
          }
        }
        _this.maxPreviewImagesWidth = newMaxPreviewWidth;
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
                                 '<h4>{{canvasCount}} {{t "items"}}</h4>',
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
                                 '<div class="remaining-items"><h3><span class="remaining-amount">{{remaining}}</span> {{t "more"}}</h3></div>',
                                 '{{/if}}',
                                 '</li>'
    ].join(''))
  };

}(Mirador));

