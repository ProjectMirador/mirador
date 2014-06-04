(function($) {

  $.ThumbnailsView = function(options) {

    jQuery.extend(this, {
      currentImg:           null,
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
        this.currentImg = this.imagesList[0];

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
          width:    width
        };
      });
      
      this.element = jQuery(_this.template(tplData)).appendTo(this.appendTo);
      /*jQuery.each(this.element.find("img"), function(key, value) {
          var url = jQuery(value).attr("data");
          _this.loadImage(value, url);
      });*/
    },
    
    bindEvents: function() {
        this.element.find('img').on('load', function() {
           jQuery(this).hide().fadeIn(750);
        });
        console.log(this.element.find('img'));
        this.element.find('.window-thumb').on('click', function() {
           console.log(this);
           console.log("clicked thumbnail image in thumbnailview");
           //_this.parent.toggleImageView();
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
        '<ul class="{{listingCssCls}} listing-thumbs">',
          '{{#thumbs}}',
            '<li>',
                '<img class="thumbnail-image flash window-thumb" title="{{title}}" data-image-id="{{id}}" src="{{thumbUrl}}" height="{{../defaultHeight}}" width="{{width}}">',
                '<div class="thumb-label">{{title}}</div>',
            '</li>',
          '{{/thumbs}}',
        '</ul>'
      ].join('')),
    
    //Legacy methods - will need to be modified and integrated into new code
    render: function() {
      this.attachEvents();
    },

    attachEvents: function() {
      this.attachNavEvents();
    },

    attachNavEvents: function() {
      var selectorImagesListing = '.' + this.thumbsListingCls + ' li img',
          selectorImageLinks    = '.' + this.thumbsListingCls + ' li a',
          _this = this;

      jQuery(selectorSlider).on('slide', function(event, ui) {
        jQuery(selectorImagesListing).attr('height', ui.value);
      });

      jQuery(selectorImageLinks).on('click', function(event) {
        var elemTarget  = jQuery(event.target),
            imageId;

        imageId = elemTarget.data('image-id');
        $.viewer.loadView("imageView", _this.manifestId, imageId);
      });

    }

  };

}(Mirador));
