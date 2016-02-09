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

      if (this.annotationOn && this.hud.annoState.current === 'annoOff') {
        this.hud.annoState.displayOn(null);
      }

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
      var rectangle = this.osd.viewport.viewportToImageRectangle(this.osdOptions.osdBounds);
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
     // console.log("On OSD creation with url: "+imageUrl);
      var infoJsonUrl = imageUrl + '/info.json',
      uniqueID = $.genUUID(),
      osdID = 'mirador-osd-' + uniqueID,
      infoJson,
      _this = this;

     // console.log("create osd.  what is _this?");
      //console.log(_this);

      this.element.find('.' + this.osdCls).remove();

      //needs tweaking so that it can handle a no .json file present.  it still needs to work.  
      jQuery.getJSON(infoJsonUrl).done(function (infoJson, status, jqXHR) {
        console.log("Got JSON info");
        console.log(infoJson);
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
          // console.log("Looking for options and bounds");
          // console.log(_this.osdOptions);
          // console.log(_this.osdOptions.osdBounds);

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

          jQuery(_this.osd.canvas).on('mousemove', $.throttle(function(event) {
            if (_this.hud.annoState.current === 'annoOnEditOn') {
              var insideCanvas = (function() {
                var elementCoordinates = OpenSeadragon.getMousePosition(event);
                //console.log(elementCoordinates);
                //var tiledImage = _this.osd.world.getItemAt(0);
                //var imageCoordinates = tiledImage.viewerElementToImageCoordinates(elementCoordinates);
                //var viewportCoordinates = tiledImage.imageToViewportCoordinates(imageCoordinates);
                //console.log(imageCoordinates);
                //console.log(viewportCoordinates);
                //console.log(_this.osd.viewport.pointFromPixel(event.position));
                /*if (viewportCoordinates.x >= 0 && viewportCoordinates.y >= 0) {
                  jQuery(_this.osd.canvas).css('cursor', 'crosshair');
                }*/

              })();
            }
          }, 100, true));

          _this.osd.addHandler('zoom', $.debounce(function() {
            _this.setBounds();
          }, 500));

          _this.osd.addHandler('pan', $.debounce(function(){
            _this.setBounds();
          }, 500));
        });
      })
      .fail(function(){
        //BH edit:  On fail, then it is not an image with a IIIF service.  We can only build certain parts of OSD
        //but we can still get the image out
        console.log("No info.json file.  Please handle accordingly.  I am going to make the OSD container.");
        _this.elemOsd =
          jQuery('<div/>')
        .addClass(_this.osdCls)
        .attr('id', osdID)
        .appendTo(_this.element);

        //I may not know the height or width of this image or canvas.  Our application does not allow for drawing annotations, so we are not concerned with height/width
        //when we make the canvases.  They are just filled with arbitrary values.  

        var currentCanvasIndex = _this.currentImgIndex;
        var currentCanvasHeight = _this.imagesList[currentCanvasIndex].height;
        var currentCanvasWidth = _this.imagesList[currentCanvasIndex].width;
        
        _this.osd = $.OpenSeadragon({
          'id':           osdID,
          'tileSources':  [
              { 
              'type': 'legacy-image-pyramid',
              'levels':[{ 
                'url': imageUrl,
                'height': currentCanvasHeight,
                'width': currentCanvasWidth
              }
              ]
            }], //This is the consequence of not getting the JSON.  It creates the viewport on which the OSD functions are called.  Without it, OSD does not work.
          'uniqueID' : uniqueID
        });

         

        _this.osd.addHandler('open', function(){
           console.log("Looking for options and bounds");
           console.log(_this.osdOptions);
          // console.log(_this.osdOptions.osdBounds);
          if (_this.osdOptions.osdBounds) {
            //var rect = new OpenSeadragon.Rect(0, 0, 1000, 1500);
            var rect = new OpenSeadragon.Rect(0, 0, parseInt(currentCanvasWidth), parseInt(currentCanvasHeight));
            _this.osd.viewport.fitBounds(rect, true);
            //_this.osd.container.fitBounds(rect, true);
          }

          _this.addAnnotationsLayer(_this.elemAnno);
          //re-add correct annotationsLayer mode based on annoState
          if (_this.hud.annoState.current !== "annoOff") {
            jQuery.publish('modeChange.' + _this.windowId, 'displayAnnotations');          
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

        jQuery(_this.osd.canvas).on('mousemove', $.throttle(function(event) {
            if (_this.hud.annoState.current === 'annoOnEditOn') {
              var insideCanvas = (function() {
                var elementCoordinates = OpenSeadragon.getMousePosition(event);
                //console.log(elementCoordinates);
                //var tiledImage = _this.osd.world.getItemAt(0);
                //var imageCoordinates = tiledImage.viewerElementToImageCoordinates(elementCoordinates);
                //var viewportCoordinates = tiledImage.imageToViewportCoordinates(imageCoordinates);
                //console.log(imageCoordinates);
                //console.log(viewportCoordinates);
                //console.log(_this.osd.viewport.pointFromPixel(event.position));
                /*if (viewportCoordinates.x >= 0 && viewportCoordinates.y >= 0) {
                  jQuery(_this.osd.canvas).css('cursor', 'crosshair');
                }*/

              })();
            }
          }, 100, true));
        //BH edit: wrapping the image element in a canvas causes the image not to load.  OSD will not build a viewport
        //  
        // var fakeCanvas = jQuery("<img class='fix' src='"+imageUrl+"'/>");
        //   jQuery(_this.osd.canvas).append(fakeCanvas);       
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
      //console.log("Load new full image.  Need to empty and hide bbAnnos.  Can i find it in this 3 ?");
      //console.log(this);
      this.element.find(jQuery(".bbAnnosContainer")).empty().hide();
      //bh edit: hide the anno containers.  We can make it specific to the canvas. 
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

        //by default, don't allow a user to be in edit annotation mode when changing pages
        if (this.hud.annoState.current === "annoOnEditOn") {
          this.hud.annoState.editOff();
        }
      } 
      else {
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
