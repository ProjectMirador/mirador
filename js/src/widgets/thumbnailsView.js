(function($) {

  $.ThumbnailsView = function(options) {

    jQuery.extend(this, {
      currentImgIndex:      null,
      manifest:             null,
      element:              null,
      imagesList:           [],
      appendTo:             null,
      thumbsListingCls:     '',
      thumbsHeight:         150,
      parent:               null,
      panel:                false
    }, options);
    
    this.init();
  };


  $.ThumbnailsView.prototype = {

    init: function() {
        this.imagesList = $.getImagesListByManifest(this.manifest);
        this.currentImgIndex = 0;
        
        if (this.panel) {
            this.thumbsHeight = 80;
        }

        this.thumbsListingCls = 'listing-thumbs';
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
    
    updateCurrentImg: function() {
    
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
        
        _this.element.find('.thumbnail-image').on('click', function() {
           _this.parent.toggleImageView(jQuery(this).attr('data-image-id'));
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
            '<li>',
                '<img class="thumbnail-image {{highlight}}" title="{{title}}" data-image-id="{{id}}" src="" data="{{thumbUrl}}" height="{{../defaultHeight}}" width="{{width}}">',
                '<div class="thumb-label">{{title}}</div>',
            '</li>',
          '{{/thumbs}}',
        '</ul>',
       '</div>'
    ].join('')),
      
    hide: function() {
        var _this = this;
            
        _this.element.removeClass('visuallyactive');  
        _this.element.one('transitionend', function(e) {
            _this.element.removeClass('active');
        });
    },

    show: function() {
        var _this = this;

        _this.element.addClass('active');
        setTimeout(function() {  
            _this.element.addClass('visuallyactive active'); 
            jQuery.each(_this.element.find("img"), function(key, value) {
                   if ($.isOnScreen(value)) {
                      var url = jQuery(value).attr("data");
                      _this.loadImage(value, url);
                   }
                });
        }, 20);
    }

  };

}(Mirador));
