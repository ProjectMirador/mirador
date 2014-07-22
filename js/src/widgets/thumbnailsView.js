(function($) {

  $.ThumbnailsView = function(options) {

    jQuery.extend(this, {
      currentImgIndex:      0,
      imageID:              null,
      focusImages:          [],
      manifest:             null,
      element:              null,
      imagesList:           [],
      appendTo:             null,
      thumbInfo:            {thumbsHeight: 150, listingCssCls: 'listing-thumbs', thumbnailCls: 'thumbnail-view'},
      parent:               null,
      panel:                false,
      lazyLoadingFactor:    1.5  //should be >= 1
    }, options);
    
    this.init();
  };


  $.ThumbnailsView.prototype = {

    init: function() {
        if (this.imageID !== null) {
            this.currentImgIndex = $.getImageIndexById(this.imagesList, this.imageID);
        }

        this.loadContent();
        this.bindEvents();
        },

    loadContent: function() {
      var _this = this,
      tplData = {
        defaultHeight:  this.thumbInfo.thumbsHeight,
        listingCssCls:  this.thumbInfo.listingCssCls,
        thumbnailCls:   this.thumbInfo.thumbnailCls
      };

      tplData.thumbs = jQuery.map(this.imagesList, function(image, index) {
        var aspectRatio = image.height/image.width,
        width = (_this.thumbInfo.thumbsHeight/aspectRatio);

        return {
          thumbUrl: $.Iiif.getUriWithHeight($.getImageUrlForCanvas(image), _this.thumbInfo.thumbsHeight),
          title:    image.label,
          id:       image['@id'],
          width:    width,
          highlight: _this.currentImgIndex === index ? 'highlight' : ''
        };
      });
      
      this.element = jQuery(_this.template(tplData)).appendTo(this.appendTo);
    },
    
    updateImage: function(imageID) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, imageID);
        this.element.find('.highlight').removeClass('highlight');
        this.element.find("img[data-image-id='"+imageID+"']").addClass('highlight');
        this.element.find("img[data-image-id='"+imageID+"']").parent().addClass('highlight');
    },
    
    updateFocusImages: function(focusList) {
        var _this = this;
        this.element.find('.highlight').removeClass('highlight');
        jQuery.each(focusList, function(index, imageID) {
           _this.element.find("img[data-image-id='"+imageID+"']").addClass('highlight');
           _this.element.find("img[data-image-id='"+imageID+"']").parent().addClass('highlight');
        });
    },

    currentImageChanged: function() {
      var _this = this,
      target = _this.element.find('.highlight'),
      scrollPosition = _this.element.scrollLeft() + (target.position().left + target.width()/2) - _this.element.width()/2;
      _this.element.scrollTo(scrollPosition, 900);
    },
    
    bindEvents: function() {
        var _this = this;
        _this.element.find('img').on('load', function() {
           jQuery(this).hide().fadeIn(750);
        });
                
        jQuery(_this.element).scroll(function() {
          jQuery.each(_this.element.find("img"), function(key, value) {
                if ($.isOnScreen(value, _this.lazyLoadingFactor) && !jQuery(value).attr("src")) {
                    var url = jQuery(value).attr("data");
                    _this.loadImage(value, url);
                }
            });
        });
        
        //add any other events that would trigger thumbnail display (resize, etc)
                
        _this.element.find('.thumbnail-image').on('click', function() {
          var canvasID = jQuery(this).attr('data-image-id');
          _this.parent.setCurrentImageID(canvasID);
        });

        jQuery.subscribe('CurrentImageIDUpdated', function(imageID) {
          _this.currentImageChanged();
        });
    },
    
    toggle: function(stateValue) {
        if (stateValue) { 
            this.show(); 
        } else {
            this.hide();
        }
    },
    
    loadImage: function(imageElement, url) {
        var _this = this,
        imagepromise = new $.ImagePromise(url);

        imagepromise.done(function(image) {
            jQuery(imageElement).attr('src', image);
        });
    },
    
    reloadImages: function(newThumbHeight, triggerShow) {
       var _this = this;
       this.thumbInfo.thumbsHeight = newThumbHeight;
       
       jQuery.each(this.imagesList, function(index, image) {
          var aspectRatio = image.height/image.width,
          width = (_this.thumbInfo.thumbsHeight/aspectRatio),
          newThumbURL = $.Iiif.getUriWithHeight($.getImageUrlForCanvas(image), _this.thumbInfo.thumbsHeight),
          id = image['@id'];
          var imageElement = _this.element.find('img[data-image-id="'+id+'"]');
          imageElement.attr('data', newThumbURL).attr('height', _this.thumbInfo.thumbsHeight).attr('width', width).attr('src', '');
       });
       if (triggerShow) {
          this.show();
       }
    },
    
    template: Handlebars.compile([
      '<div class="{{thumbnailCls}}">',
        '<ul class="{{listingCssCls}}">',
          '{{#thumbs}}',
            '<li class="{{highlight}}">',
                '<img class="thumbnail-image {{highlight}}" title="{{title}}" data-image-id="{{id}}" src="" data="{{thumbUrl}}" height="{{../defaultHeight}}" width="{{width}}">',
                '<div class="thumb-label">{{title}}</div>',
            '</li>',
          '{{/thumbs}}',
        '</ul>',
       '</div>'
    ].join('')),
      
    hide: function() {
        var element = jQuery(this.element);
        if (this.panel) {
            element = element.parent();
        }
        element.hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
        var element = jQuery(this.element);
        if (this.panel) {
            element = element.parent();
        }
        var _this = this;
        element.show({
        effect: "fade", 
        duration: 1000, 
        easing: "easeInCubic", 
        complete: function() {
            jQuery.each(_this.element.find("img"), function(key, value) {
                   if ($.isOnScreen(value, _this.lazyLoadingFactor) && !jQuery(value).attr("src")) {
                      var url = jQuery(value).attr("data");
                      _this.loadImage(value, url);
                   }
                });
        }
        
        });
    }

  };

}(Mirador));
