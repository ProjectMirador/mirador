(function($) {

  $.ImageView = function(options) {

    jQuery.extend(this, {
      currentImg:       null,
      currentImgIndex:  0,
      imageID:          null,
      imagesList:       [],
      element:          null,
      parent:           null,
      manifest:         null,
      zoomLevel:        null,
      osd:              null,
      osdBounds:        null,
      osdCls:           'mirador-osd'
    }, options);
    
    this.init();
  };


  $.ImageView.prototype = {
  
    init: function() {    
        if (this.imageID !== null) {
            this.currentImgIndex = $.getImageIndexById(this.imagesList, this.imageID);
        }

        this.currentImg = this.imagesList[this.currentImgIndex];
        
        this.element = jQuery(this.template()).appendTo(this.appendTo);

        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
        
        this.bindEvents();
    },
    
    template: Handlebars.compile([
      '<div class="image-view">',
       '</div>'
    ].join('')),
    
    bindEvents: function() {
       var _this = this;

    },
    
    toggle: function(stateValue) {
        if (stateValue) { 
            this.show(); 
        } else {
            this.hide();
        }
    },
    
    hide: function() {
        jQuery(this.element).hide({effect: "fade", duration: 1000, easing: "easeOutCubic"});
    },

    show: function() {
        jQuery(this.element).show({effect: "fade", duration: 1000, easing: "easeInCubic"});
    },

    createOpenSeadragonInstance: function(imageUrl, osdBounds) {
      var infoJsonUrl = $.Iiif.getUri(imageUrl) + '/info.json',
      osdId = 'mirador-osd-' + $.genUUID(),
      osdToolBarId = osdId + '-toolbar',
      infoJson,
      elemOsd,
      _this = this;
      
      this.element.find('.' + this.osdCls).remove();

      infoJson = $.getJsonFromUrl(infoJsonUrl, false);

      elemOsd =
        jQuery('<div/>')
      .addClass(this.osdCls)
      .attr('id', osdId)
      .appendTo(this.element);

      this.osd = $.OpenSeadragon({
        'id':           elemOsd.attr('id'),
        'tileSources':  $.Iiif.prepJsonForOsd(infoJson)
      });

      this.osd.addHandler('open', function(){
        _this.zoomLevel = _this.osd.viewport.getZoom();

        if (typeof osdBounds != 'undefined') {
          _this.osd.viewport.fitBounds(osdBounds, true);
        }
      });
    },
    
    updateImage: function(imageID) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, imageID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
    }

  };

}(Mirador));
