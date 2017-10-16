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
      remaining:                  0,
      forcedIndex:                null,
      state:                      null,
      eventEmitter:               null
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

      $.Handlebars.registerHelper('pluralize', function(count, singular, plural) {
        if (count === 1) {
          return singular;
        } else {
          return plural;
        }
      });

      if (this.manifest) {
        this.fetchTplData(this.manifestId);
      } else if (this.manifestRef) {
        this.fetchRefTpl();
      }
      if (this.forcedIndex !== null) {
        this.tplData.index = this.forcedIndex;
      }

      if (_this.state.getStateProperty('preserveManifestOrder')) {
        if (this.appendTo.children().length === 0) {
          this.element = jQuery(this.template(this.tplData)).prependTo(this.appendTo).hide().fadeIn('slow');
        } else {
          var liList = _this.appendTo.find('li');
          jQuery.each(liList, function(index, item) {
              var prev = parseFloat(jQuery(item).attr('data-index-number'));
              var next = parseFloat(jQuery(liList[index+1]).attr('data-index-number'));
              var current = _this.tplData.index;
              if (current <= prev && (next > current || isNaN(next)) ) {
                _this.element = jQuery(_this.template(_this.tplData)).insertBefore(jQuery(item)).hide().fadeIn('slow');
                return false;
              } else if (current > prev && (current < next || isNaN(next))) {
                _this.element = jQuery(_this.template(_this.tplData)).insertAfter(jQuery(item)).hide().fadeIn('slow');
                return false;
              }
          });
        }
      } else {
        this.element = jQuery(this.template(this.tplData)).prependTo(this.appendTo).hide().fadeIn('slow');
      }

      this.bindEvents();
      this.listenForActions();
    },

    fetchTplData: function() {
      var _this = this,
      location = _this.manifest.location,
      manifest = _this.manifest.jsonLd;

      this.tplData = {
        label: $.JsonLd.getTextValue(manifest.label),
        repository: location,
        canvasCount: manifest.sequences[0].canvases.length,
        images: [],
        index: _this.state.getManifestIndex(manifest['@id'])
      };

      this.tplData.repoImage = (function() {
        var repo = _this.tplData.repository;
        if (manifest.logo) {
          if (typeof manifest.logo === "string")
            return manifest.logo;
          if (typeof manifest.logo['@id'] !== 'undefined')
            return manifest.logo['@id'];
        }
        return '';
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
          // outsized image will inherited
          if (value.width > _this.maxPreviewImagesWidth) {
            _this.tplData.images.push(value);
          }
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

    fetchRefTpl: function() {
      var _this = this;
      var location = this.manifestRef.location;
      var ref = this.manifestRef;

      this.tplData = {
        label: $.JsonLd.getTextValue(ref.label),
        repository: location,
        metadata: this.manifestRef.metadata,
        canvasCount: undefined,
        images: [],
        index: _this.state.getManifestIndex(ref["@id"])
      };

      this.tplData.repoImage = (function() {
        var repo = _this.tplData.repository;
        if (ref.logo) {
          if (typeof ref.logo === "string")
            return ref.logo;
          if (typeof ref.logo['@id'] !== 'undefined')
            return ref.logo['@id'];
        }
        return '';
      })();

      if (ref.thumbnail) {
        var thumbs = ref.thumbnail;
        if (!Array.isArray(ref.thumbnail)) {
          thumbs = [ref.thumbnail];
        }
        thumbs.forEach(function(thumb, index) {
          var toAdd = {
            height: _this.thumbHeight,
            id: thumb.depicts,
            index: index
          };

          if (typeof thumb === "string") {
            toAdd.url = thumb;
          } else if (thumb.service && $.Iiif.getComplianceLevelFromProfile(thumb.service.profile) !== -1) {
            // If there is a IIIF service available

            var width;
            if (ref.width) {
              // Always prefer defined thumbnail width
              width = ref.width;
            } else if (thumb.service.width && thumb.service.height) {
              // Service has actual dimensions of images, we can determine width from aspect ratio and our desired height
              var aspectRatio = thumb.service.width / thumb.service.height;
              width = Math.round(aspectRatio * _this.thumbHeight);    // Round to nearest int
            } else {
              // Some default
              width = 60;
            }

            toAdd.width = width;
            toAdd.url = $.Iiif.makeUriWithWidth(thumb.service["@id"], width, $.Iiif.getComplianceLevelFromProfile(thumb.service.profile));
          }
          _this.tplData.images.push(toAdd);
        });
      }
    },

    render: function() {

    },

    listenForActions: function() {
      var _this = this;

      _this.eventEmitter.subscribe('manifestPanelWidthChanged', function(event, newWidth){
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
        var viewType = "ThumbnailsView";

        if (_this.manifest) {
          _this.addWindow(_this.manifest, viewType);
        } else if (_this.manifestRef) {
          // For references, we must first load the manifest before adding a new window.
          var manifestId = _this.manifestRef["@id"];
          var location = _this.manifestRef.location;

          var manifest = new $.Manifest(manifestId, location);
          manifest.request.done(function() {
            _this.addWindow(manifest, viewType);
          });
        }
      });

      this.element.find('.preview-image').on('click', function(e) {
        e.stopPropagation();
        var canvasID = jQuery(this).attr('data-image-id');
        if (canvasID) {
          _this.addWindow(_this.manifest, canvasID, _this.state.getStateProperty('windowSettings').viewType);
        } else {
          _this.element.click();
        }
      });
    },

    addWindow: function(manifest, viewType, canvasID) {
      var windowConfig = {
        "manifest": manifest,
        "canvasID": canvasID,
        "viewType": viewType
      };
      this.eventEmitter.publish('ADD_WINDOW', windowConfig);
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

            if (image) {
              _this.imagesTotalWidth -= (image.width + _this.margin);

              //remove image from dom
              _this.element.find('img[data-image-id="'+image.id+'"]').remove();
            } else {
              break;
            }
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
        _this.eventEmitter.publish('manifestListItemRendered');
    },

    hide: function() {
      var _this = this;
    },

    show: function() {
      var _this = this;
    },

    template: $.Handlebars.compile([
      '<li data-index-number={{index}}>',
      '<div class="repo-image">',
        '{{#if repoImage}}',
        '<img src="{{repoImage}}" alt="repoImg">',
        '{{else}}',
        '<span class="default-logo"></span>',
        '{{/if}}',
      '</div>',
      '<div class="select-metadata">',
        '<div class="manifest-title">',
          '<h3 title="{{{label}}}">{{{label}}}</h3>',
        '</div>',
        '<div class="item-info">',
        '{{#each metadata}}',
          '<div class="item-info-row"><span class="metadata-label">{{label}}</span>: <span class="metadata-value">{{value}}</span></div>',
        '{{/each}}',
          '<div class="item-info-row">',
            '{{#if repository}}',
              '<div class="repo-label">{{repository}}</div>',
            '{{/if}}',
            '{{#if canvasCount}}',
              '<div class="canvas-count">{{canvasCount}} {{pluralize canvasCount (t "item") (t "items")}}</div>',
            '{{/if}}',
          '</div>',
        '</div>',
      '</div>',
      '<div class="preview-thumb">',
        '<div class="preview-images">',
        '{{#each images}}',
          '<img src="{{url}}" width="{{width}}" height="{{height}}" class="preview-image flash" data-image-id="{{id}}">',
        '{{/each}}',
        '</div>',
        '{{#if remaining}}',
          '<i class="fa fa fa-ellipsis-h remaining"></i>',
        '{{/if}}',
      '</div>',
      '</li>'
    ].join(''))
  };

}(Mirador));
