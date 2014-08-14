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
      osdCls: 'mirador-osd'
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
        this.addAnnotationsLayer();
        this.parent.updateFocusImages([this.imageID]);
    },
    
    template: Handlebars.compile([
      '<div class="image-view">',
       '</div>'
    ].join('')),
    
    toolbarTemplate: Handlebars.compile([
      '<div id="osd-toolbar" class="toolbar">',
      '<a class="mirador-btn mirador-icon-previous"></a>',
      '<a id="zoom-in" class="mirador-btn mirador-icon-zoom-in"></a>', 
      '<a id="zoom-out" class="mirador-btn mirador-icon-zoom-out"></a>',
      '<a id="home" class="mirador-btn mirador-icon-home"></a>',
      '<a id="full-page" class="mirador-btn mirador-icon-full-page"></a>',
      '<a class="mirador-btn mirador-icon-next"></a>',
      '</div>'
    ].join('')),
    
    bindOSDEvents: function() {
       var _this = this;
       
       this.element.find('.mirador-icon-next').on('click', function() {
          _this.next();
       });
       
       this.element.find('.mirador-icon-previous').on('click', function() {
          _this.previous();
       });
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
    
    adjustWidth: function(className, hasClass) {
       
    },
    
    adjustHeight: function(className, hasClass) {
        if (hasClass) {
           this.element.removeClass(className);
        } else {
           this.element.addClass(className);
        }
    },

    createOpenSeadragonInstance: function(imageUrl, osdBounds) {
      var infoJsonUrl = $.Iiif.getUri(imageUrl) + '/info.json',
      osdID = 'mirador-osd-' + $.genUUID(),
      infoJson,
      elemOsd,
      _this = this;
      
      this.element.find('.' + this.osdCls).remove();

      infoJson = $.getJsonFromUrl(infoJsonUrl, false);

      elemOsd =
        jQuery('<div/>')
      .addClass(this.osdCls)
      .attr('id', osdID)
      .appendTo(this.element);
      jQuery(this.toolbarTemplate()).appendTo(this.element);

      this.osd = $.OpenSeadragon({
        'id':           osdID,
        'tileSources':  $.Iiif.prepJsonForOsd(infoJson)
      });
            
      this.bindOSDEvents();
            
      this.osd.addHandler('open', function(){
        _this.zoomLevel = _this.osd.viewport.getZoom();

        if (typeof osdBounds != 'undefined') {
          _this.osd.viewport.fitBounds(osdBounds, true);
        }
      });
    },

    addAnnotationsLayer: function() {
      console.log(this.currentImg);
      this.annotationsLayer = new $.AnnotationsLayer({
        parent: this,
        annotationUrls: this.currentImg.annotations
      });
    },
    
    updateImage: function(imageID) {
        this.imageID = imageID;
        this.currentImgIndex = $.getImageIndexById(this.imagesList, imageID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
        this.parent.updateFocusImages([imageID]);
    },
    
    next: function() {
      var next = this.currentImgIndex + 1;

      if (next < this.imagesList.length) {
        this.parent.setCurrentImageID(this.imagesList[next]['@id']);
      }
    },

    previous: function() {
      var prev = this.currentImgIndex - 1;

      if (prev >= 0) {
        this.parent.setCurrentImageID(this.imagesList[prev]['@id']);
      }
    }

  };

}(Mirador));
