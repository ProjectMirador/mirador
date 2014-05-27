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

        },

    render: function() {
      this.attachEvents();
    },


    loadContent: function() {
      var _this = this,
      tplData = {
        defaultHeight:  this.thumbsDefaultHeight,
        listingCssCls:  this.thumbsListingCls
      };

      tplData.thumbs = jQuery.map(this.imagesList, function(image, index) {
        return {
          thumbUrl: $.Iiif.getUriWithHeight($.getImageUrlForCanvas(image), _this.thumbsMaxHeight),
          title:    image.label,
          id:       image['@id']
        };
      });
      
      this.element = jQuery(_this.template(tplData)).appendTo(this.appendTo);
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

    },
    
    template: Handlebars.compile([
        '<ul class="{{listingCssCls}} listing-thumbs">',
          '{{#thumbs}}',
            '<li>',
              '<a href="javascript:;">',
                '<img title="{{title}}" data-image-id="{{id}}" src="{{thumbUrl}}" height="{{../defaultHeight}}">',
                '<div class="thumb-label">{{title}}</div>',
              '</a>',
            '</li>',
          '{{/thumbs}}',
        '</ul>'
      ].join(''))

  };


}(Mirador));
