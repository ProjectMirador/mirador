(function($) {

  $.ThumbnailsView = function(options) {

    jQuery.extend(this, {
      currentImgIndex:      0,
      imageID:              null,
      manifest:             null,
      element:              null,
      imagesList:           [],
      appendTo:             null,
      thumbsHeight:         150,
      parent:               null,
      panel:                false
    }, options);
    
    this.init();
  };


  $.ThumbnailsView.prototype = {

    init: function() {
        if (this.imageID !== null) {
            this.currentImgIndex = $.getImageIndexById(this.imagesList, this.imageID);
        }
        
        if (this.panel) {
            this.thumbsHeight = 80;
        }

        this.loadContent();
        this.bindEvents();
        },

    loadContent: function() {
      var _this = this,
      tplData = {
        defaultHeight:  this.thumbsHeight,
        listingCssCls:  this.panel ? 'panel-listing-thumbs' : 'listing-thumbs',
        thumbnailCls:   this.panel ? 'panel-thumbnail-view' : 'thumbnail-view'
      };

      tplData.thumbs = jQuery.map(this.imagesList, function(image, index) {
        var aspectRatio = image.height/image.width,
        width = (_this.thumbsHeight/aspectRatio);

        return {
          thumbUrl: $.Iiif.getUriWithHeight($.getImageUrlForCanvas(image), _this.thumbsHeight),
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
    
    bindEvents: function() {
        var _this = this;
        _this.element.find('img').on('load', function() {
           jQuery(this).hide().fadeIn(750);
        });
                
        jQuery(_this.element).scroll(function() {
          jQuery.each(_this.element.find("img"), function(key, value) {
                if ($.isOnScreen(value) && !jQuery(value).attr("src")) {
                    var url = jQuery(value).attr("data");
                    _this.loadImage(value, url);
                }
            });
        });
        
        //add any other events that would trigger thumbnail display (resize, etc)
                
        _this.element.find('.thumbnail-image').on('click', function() {
           _this.parent.loadImageModeFromPanel(jQuery(this).attr('data-image-id'));
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
                   if ($.isOnScreen(value)) {
                      var url = jQuery(value).attr("data");
                      _this.loadImage(value, url);
                   }
                });
        }
        
        });
    }

  };

}(Mirador));
