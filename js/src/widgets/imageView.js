(function($) {

  $.ImageView = function(options) {

    jQuery.extend(this, {
      currentImg:       null,
      windowId:         null,
      currentImgIndex:  0,
      imageID:          null,
      imagesList:       [],
      element:          null,
      elemOsd:          null,
      parent:           null,
      manifest:         null,
      osd:              null,
      fullscreen:       null,
      osdOptions: {
        osdBounds:        null,
        zoomLevel:        null
      },
      osdCls: 'mirador-osd',
      elemAnno:         null,
      annoCls:          'annotation-canvas'
    }, options);

    this.init();
  };


  $.ImageView.prototype = {

    init: function() {    
      // check (for thumbnail view) if the imageID is set. 
      // If not, make it page/item 1.
      if (this.imageID !== null) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, this.imageID);
      }
      
      if (!this.osdOptions) {
        this.osdOptions = {
          osdBounds:        null,
          zoomLevel:        null
        };
      }
      this.currentImg = this.imagesList[this.currentImgIndex];
      this.element = jQuery(this.template()).appendTo(this.appendTo);
      this.elemAnno = jQuery('<div/>')
      .addClass(this.annoCls)
      .appendTo(this.element);
      this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
      this.parent.updateFocusImages([this.imageID]); // DRY/Events refactor.
      // The hud controls are consistent 
      // throughout any updates to the osd canvas.
      this.hud = new $.Hud({
        parent: this,
        element: this.element,
        bottomPanelAvailable: this.bottomPanelAvailable,
        windowId: this.windowId
      });
    },

    template: Handlebars.compile([
                                 '<div class="image-view">',
                                 '</div>'
    ].join('')),

    setBounds: function() {
      var _this = this;
      this.osdOptions.osdBounds = this.osd.viewport.getBounds(true);
      jQuery.publish("imageBoundsUpdated", {
        id: _this.parent.id, 
        osdBounds: {
          x: _this.osdOptions.osdBounds.x, 
          y: _this.osdOptions.osdBounds.y, 
          width: _this.osdOptions.osdBounds.width, 
          height: _this.osdOptions.osdBounds.height
        }
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
      if (hasClass) {
        this.parent.element.find('.view-container').removeClass(className);
      } else {
        this.parent.element.find('.view-container').addClass(className);
      }
    },

    adjustHeight: function(className, hasClass) {
      if (hasClass) {
        this.element.removeClass(className);
      } else {
        this.element.addClass(className);
      }
    },

    createOpenSeadragonInstance: function(imageUrl) {
      var infoJsonUrl = $.Iiif.getUri(imageUrl) + '/info.json',
      uniqueID = $.genUUID(),
      osdID = 'mirador-osd-' + uniqueID,
      infoJson,
      _this = this;

      this.element.find('.' + this.osdCls).remove();

      infoJson = $.getJsonFromUrl(infoJsonUrl, false);

      this.elemOsd =
        jQuery('<div/>')
      .addClass(this.osdCls)
      .attr('id', osdID)
      .appendTo(this.element);

      this.osd = $.OpenSeadragon({
        'id':           osdID,
        'tileSources':  infoJson,
        'uniqueID' : uniqueID
      });


      this.osd.addHandler('open', function(){
        if (_this.osdOptions.osdBounds) {
            var rect = new OpenSeadragon.Rect(_this.osdOptions.osdBounds.x, _this.osdOptions.osdBounds.y, _this.osdOptions.osdBounds.width, _this.osdOptions.osdBounds.height);
            _this.osd.viewport.fitBounds(rect, true);
        }
        
        _this.addAnnotationsLayer(_this.elemAnno);

        // The worst hack imaginable. Pop the osd overlays layer after the canvas so 
        // that annotations appear.
        jQuery(_this.osd.canvas).children().first().remove().appendTo(_this.osd.canvas);
        
        _this.osd.addHandler('zoom', $.debounce(function(){
          _this.setBounds();
        }, 300));

        _this.osd.addHandler('pan', $.debounce(function(){
          _this.setBounds();
        }, 300));

      });
    },

    addAnnotationsLayer: function(element) {
      var _this = this;
      _this.annotationsLayer = new $.AnnotationsLayer({
        parent: _this,
        annotationsList: _this.parent.annotationsList || [],
        viewer: _this.osd,
        windowId: _this.windowId,
        element: element
      });

    },

    updateImage: function(imageID) {
      if (this.imageID !== imageID) {
        this.imageID = imageID;
        this.currentImgIndex = $.getImageIndexById(this.imagesList, imageID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.osdOptions = {
          osdBounds:        null,
          zoomLevel:        null
        };
        this.osd.close();
        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
        this.parent.updateFocusImages([imageID]);
      }
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
