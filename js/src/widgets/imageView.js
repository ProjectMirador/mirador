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
        this.imagesList = $.getImagesListByManifest(this.manifest);
    
        if (this.imageID !== null) {
            this.currentImgIndex = this.getImageIndexById(this.imageID);
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
       
       jQuery.subscribe('ImageView.set', function(_, stateValue) {
            if (stateValue) { _this.show(); return; }
            _this.hide();
        });
    },
    
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
        this.currentImgIndex = this.getImageIndexById(imageID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
    },

    getImageIndexById: function(id) {
      var _this = this,
          imgIndex = 0;

      jQuery.each(this.imagesList, function(index, img) {
        if ($.trimString(img['@id']) === $.trimString(id)) {
          imgIndex = index;
        }
      });

      return imgIndex;
    }

  };

}(Mirador));
