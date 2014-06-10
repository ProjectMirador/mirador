(function($) {

  $.ThumbnailsView = function(options) {

    jQuery.extend(this, {
      currentImgIndex:      null,
      manifest:             null,
      element:              null,
      imagesList:           [],
      appendTo:             null,
      thumbsListingCls:     '',
      thumbsMaxHeight:      $.DEFAULT_SETTINGS.thumbnailsView.thumbsMaxHeight,
      thumbsMinHeight:      $.DEFAULT_SETTINGS.thumbnailsView.thumbsMinHeight,
      thumbsDefaultZoom:    $.DEFAULT_SETTINGS.thumbnailsView.thumbsDefaultZoom,
      thumbsDefaultHeight:  this.thumbsMinHeight,
      parent:               null
    }, options);
    
    this.init();
  };


  $.ThumbnailsView.prototype = {

    init: function() {
        this.imagesList = $.getImagesListByManifest(this.manifest);
        this.currentImgIndex = 0;

        this.thumbsListingCls = 'thumbs-listing';
        this.thumbsDefaultHeight = this.thumbsMinHeight + ((this.thumbsMaxHeight - this.thumbsMinHeight) * this.thumbsDefaultZoom);    
        this.loadContent();
        this.bindEvents();
        },

    loadContent: function() {
      var _this = this,
      tplData = {
        defaultHeight:  this.thumbsDefaultHeight,
        listingCssCls:  this.thumbsListingCls
      };

      tplData.thumbs = jQuery.map(this.imagesList, function(image, index) {
        var aspectRatio = image.height/image.width,
        width = (_this.thumbsDefaultHeight/aspectRatio);
        return {
          thumbUrl: $.Iiif.getUriWithHeight($.getImageUrlForCanvas(image), _this.thumbsMaxHeight),
          title:    image.label,
          id:       image['@id'],
          width:    width,
          highlight: _this.currentImgIndex === index ? 'highlight' : ''
        };
      });
      
      this.element = jQuery(_this.template(tplData)).appendTo(this.appendTo);
      /*jQuery.each(this.element.find("img"), function(key, value) {
          var url = jQuery(value).attr("data");
          _this.loadImage(value, url);
      });*/
    },
    
    updateCurrentImg: function() {
    
    },
    
    bindEvents: function() {
        var _this = this;
        this.element.find('img').on('load', function() {
           jQuery(this).hide().fadeIn(750);
        });

        this.element.find('.thumbnail-image').on('click', function() {
           _this.parent.toggleImageView(jQuery(this).attr('data-image-id'));
        });
        
        jQuery.subscribe('ThumbnailsView.set', function(_, stateValue) {
            if (stateValue) { _this.show(); return; }
            _this.hide();
        });
    },
    
    /*loadImage: function(imageElement, url) {
        var _this = this,
        imagepromise = new $.ImagePromise(url);

        imagepromise.done(function(image) {
            jQuery(imageElement).attr('src', image);
        });
    },*/
    
    template: Handlebars.compile([
      '<div class="thumbnail-view">',
        '<ul class="{{listingCssCls}} listing-thumbs">',
          '{{#thumbs}}',
            '<li>',
                '<img class="thumbnail-image flash {{highlight}}" title="{{title}}" data-image-id="{{id}}" src="{{thumbUrl}}" height="{{../defaultHeight}}" width="{{width}}">',
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
        }, 20);
    }

  };

}(Mirador));
