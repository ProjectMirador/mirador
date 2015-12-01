(function($) {

  $.ImageView = function(options) {

    jQuery.extend(this, {
      currentImg:       null,
      windowId:         null,
      currentImgIndex:  0,
      canvasID:          null,
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
      annoCls:          'annotation-canvas',
      annotationLayerAvailable: null,
      annotationsLayer: null 
    }, options);

    this.init();
  };

  $.ImageView.prototype = {

    init: function() {    
      // check (for thumbnail view) if the canvasID is set. 
      // If not, make it page/item 1.
      if (this.canvasID !== null) {
        this.currentImgIndex = $.getImageIndexById(this.imagesList, this.canvasID);
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
      this.parent.updateFocusImages([this.canvasID]); 
      // The hud controls are consistent 
      // throughout any updates to the osd canvas.
      this.hud = new $.Hud({
        parent: this,
        element: this.element,
        bottomPanelAvailable: this.bottomPanelAvailable,
        windowId: this.windowId,
        annotationLayerAvailable: this.annotationLayerAvailable,
        annotationCreationAvailable: this.annotationCreationAvailable,
        annoEndpointAvailable: this.annoEndpointAvailable,
        fullScreenAvailable : this.fullScreenAvailable
      });

      this.bindEvents();
    },

    template: Handlebars.compile([
                                 '<div class="image-view">',
                                 '</div>'
    ].join('')),

    bindEvents: function() {
      var _this = this;
      jQuery.subscribe('fitBounds.' + _this.parent.id, function(event, bounds) {
        var rect = _this.osd.viewport.imageToViewportRectangle(Number(bounds.x), Number(bounds.y), Number(bounds.width), Number(bounds.height));
        _this.osd.viewport.fitBoundsWithConstraints(rect, false);
      });

    },

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
      var rectangle = _this.osdViewer.viewport.viewportToImageRectangle(this.osdOptions.osdBounds);
      jQuery.publish("imageRectangleUpdated", {
        id: _this.parent.id,
        osdBounds: {
          x: Math.round(rectangle.x),
          y: Math.round(rectangle.y),
          width: Math.round(rectangle.width),
          height: Math.round(rectangle.height)
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
      jQuery(this.element).hide({effect: "fade", duration: 300, easing: "easeOutCubic"});
    },

    show: function() {
      jQuery(this.element).show({effect: "fade", duration: 300, easing: "easeInCubic"});
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
      var infoJsonUrl = imageUrl + '/info.json',
      uniqueID = $.genUUID(),
      osdID = 'mirador-osd-' + uniqueID,
      infoJson,
      _this = this;

      this.element.find('.' + this.osdCls).remove();

      jQuery.getJSON(infoJsonUrl).done(function (infoJson, status, jqXHR) {
        _this.elemOsd =
          jQuery('<div/>')
        .addClass(_this.osdCls)
        .attr('id', osdID)
        .appendTo(_this.element);

        _this.osd = $.OpenSeadragon({
          'id':           osdID,
          'tileSources':  infoJson,
          'uniqueID' : uniqueID
        });

        _this.osd.addHandler('open', function(){
          jQuery.publish('osdOpen.'+_this.windowId);
          if (_this.osdOptions.osdBounds) {
            var rect = new OpenSeadragon.Rect(_this.osdOptions.osdBounds.x, _this.osdOptions.osdBounds.y, _this.osdOptions.osdBounds.width, _this.osdOptions.osdBounds.height);
            _this.osd.viewport.fitBounds(rect, true);
          } else {
            //else reset bounds for this image
            _this.setBounds();
          }

          _this.addAnnotationsLayer(_this.elemAnno);
            
          // if current annoState is 'none' that means it has been initialized but not used
          // use annotationState to choose event
          if (_this.hud.annoState.current === 'none') {
              _this.hud.annoState.startup(null);
            if (_this.annotationState === 'annoOnCreateOff') {
              _this.hud.annoState.displayOn(null);
            } else if (_this.annotationState === 'annoOnCreateOn') {
              _this.hud.annoState.createOn(null);
            }
          } else {
            // if the current state is not 'none' then we need to update the annotations layer,
            // with the current state, for the new canvas
            if (_this.hud.annoState.current === 'annoOnCreateOff') {
              _this.hud.annoState.refreshCreateOff(null);
            } else if (_this.hud.annoState.current === 'annoOnCreateOn') {
              _this.hud.annoState.refreshCreateOn(null);
            }
          }

          // A hack. Pop the osd overlays layer after the canvas so 
          // that annotations appear.
          jQuery(_this.osd.canvas).children().first().remove().appendTo(_this.osd.canvas);

          _this.osd.addHandler('zoom', $.debounce(function() {
            _this.setBounds();
          }, 500));

          _this.osd.addHandler('pan', $.debounce(function(){
            _this.setBounds();
          }, 500));
        });
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

    updateImage: function(canvasID) {
      if (this.canvasID !== canvasID) {
        this.canvasID = canvasID;
        this.currentImgIndex = $.getImageIndexById(this.imagesList, canvasID);
        this.currentImg = this.imagesList[this.currentImgIndex];
        this.osdOptions = {
          osdBounds:        null,
          zoomLevel:        null
        };
        this.osd.close();
        this.createOpenSeadragonInstance($.Iiif.getImageUrl(this.currentImg));
        this.parent.updateFocusImages([canvasID]);
      } else {
        this.parent.updateFocusImages([canvasID]);
      }
    },

    next: function() {
      var next = this.currentImgIndex + 1;

      if (next < this.imagesList.length) {
        this.parent.setCurrentCanvasID(this.imagesList[next]['@id']);
      }
    },

    previous: function() {
      var prev = this.currentImgIndex - 1;

      if (prev >= 0) {
        this.parent.setCurrentCanvasID(this.imagesList[prev]['@id']);
      }
    }
  };

}(Mirador));
