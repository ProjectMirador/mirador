(function($) {

  $.ManifestListItem = function(options) {

    jQuery.extend(true, this, {
      element:                    null,
      appendTo:                   null,
      manifest:                   null,
      loadStatus:                 null,
      thumbHeight:                80,
      urlHeight:                  150,
      resultsWidth:               0,  // based on screen width
      maxPreviewImagesWidth:      0,
      repoWidth:                  80,
      metadataWidth:              450,
      margin:                     15,
      remainingWidth:             20,
      imagesTotalWidth:           0,
      tplData:                    null,
      allImages:                  [],
      remaining:                  0
    }, options);

    this.init();

  };

  $.ManifestListItem.prototype = {

    init: function() {
      var _this = this;
      //need a better way of calculating this because JS can't get width and margin of hidden elements, so must manually set that info
      //ultimately use 95% of space available, since sometimes it still displays too many images
      this.maxPreviewImagesWidth = this.resultsWidth - (this.repoWidth + this.margin + this.metadataWidth + this.margin + this.remainingWidth);
      this.maxPreviewImagesWidth = this.maxPreviewImagesWidth * 0.95;

      Handlebars.registerHelper('pluralize', function(count, singular, plural) {
        if (count === 1) {
          return singular;
        } else {
          return plural;
        }
      });

      this.fetchTplData(this.manifestId);
      this.element = jQuery(this.template(this.tplData)).prependTo(this.appendTo).hide().fadeIn('slow');

      this.bindEvents();
      this.listenForActions();
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
        var imageName = _this.state.getStateProperty('repoImages')[repo || 'other'] || _this.state.getStateProperty('repoImages').other;

        return _this.state.getStateProperty('buildPath') + _this.state.getStateProperty('logosPath') + imageName;
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

      _this.remaining = this.tplData.remaining = (function() {
        var remaining = _this.allImages.length - _this.tplData.images.length;
        if (remaining > 0) {
          return remaining;
        }
      })();

    },

    render: function() {

    },

    listenForActions: function() {
      var _this = this;

      jQuery.subscribe('manifestPanelWidthChanged', function(event, newWidth){
        _this.updateDisplay(newWidth);
      });
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
        jQuery.publish('ADD_WINDOW', windowConfig);
      });

      this.element.find('.preview-image').on('click', function(e) {
        e.stopPropagation();
        var windowConfig = {
          manifest: _this.manifest,
          currentCanvasID: jQuery(this).attr('data-image-id'),
          currentFocus: 'ImageView'
        };
        jQuery.publish('ADD_WINDOW', windowConfig);
      });
    },

    updateDisplay: function(newWidth) {
        var _this = this,
        newMaxPreviewWidth = newWidth - (_this.repoWidth + _this.margin + _this.metadataWidth + _this.margin + _this.remainingWidth);
        newMaxPreviewWidth = newMaxPreviewWidth * 0.95;
        var image = null;

        //width of browser window has been made smaller
        if (newMaxPreviewWidth < _this.maxPreviewImagesWidth ) {
          while (_this.imagesTotalWidth >= newMaxPreviewWidth) {
            image = _this.tplData.images.pop();
            _this.imagesTotalWidth -= (image.width + _this.margin);

            //remove image from dom
            _this.element.find('img[data-image-id="'+image.id+'"]').remove();
          }
          //check if need to add ellipsis
          if (_this.remaining === 0 && _this.allImages.length - _this.tplData.images.length > 0) {
              _this.element.find('.preview-images').after('<i class="fa fa fa-ellipsis-h remaining"></i>');
          }
          _this.remaining = _this.allImages.length - _this.tplData.images.length;

        } else if (newMaxPreviewWidth > _this.maxPreviewImagesWidth) {
          //width of browser window has been made larger
          var currentLastImage = _this.tplData.images[_this.tplData.images.length-1],
            index = currentLastImage ? currentLastImage.index+1 : 0;

          image = _this.allImages[index];

          if (image) {
            while (_this.imagesTotalWidth + image.width + _this.margin < newMaxPreviewWidth) {
              _this.tplData.images.push(image);
              _this.imagesTotalWidth += (image.width + _this.margin);

              //add image to dom
              _this.element.find('.preview-images').append('<img src="'+image.url+'" width="'+image.width+'" height="'+image.height+'" class="preview-image flash" data-image-id="'+image.id+'">');

              //get next image
              index++;
              image = _this.allImages[index];
              if (!image) {
                break;
              }
            }
            //check if need to remove ellipsis
          if (_this.remaining > 0 && _this.allImages.length - _this.tplData.images.length === 0) {
            _this.element.find('.remaining').remove();
          }
          _this.remaining = _this.allImages.length - _this.tplData.images.length;
          }
        }
        _this.maxPreviewImagesWidth = newMaxPreviewWidth;
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
        '<div class="manifest-title">',
          '<h3 title="{{label}}">{{label}}</h3>',
        '</div>',
        '<div class="item-info">',
          '<div class="item-info-row">',
            '{{#if repository}}',
              '<div class="repo-label">{{repository}}</div>',
            '{{/if}}',
            '<div class="canvas-count">{{canvasCount}} {{pluralize canvasCount (t "item") (t "items")}}</div>',
          '</div>',
        '</div>',
      '</div>',
      '<div class="preview-images">',
      '{{#each images}}',
        '<img src="{{url}}" width="{{width}}" height="{{height}}" class="preview-image flash" data-image-id="{{id}}">',
      '{{/each}}',
      '</div>',
      '{{#if remaining}}',
        '<i class="fa fa fa-ellipsis-h remaining"></i>',
      '{{/if}}',
      '</li>'
    ].join(''))
  };

}(Mirador));
