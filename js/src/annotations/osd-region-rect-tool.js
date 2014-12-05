(function($) {
  // Takes an openSeadragon canvas and calls
  // provided callbacks at different stages
  // of a rectangle creation event.

  $.OsdRegionRectTool = function(options) {
    jQuery.extend(this, {
      osdRectTool: null,
      osd:         null,
      osdViewer:   null,
      mouseStart:  null,
      rectangle:   null,
      rectClass:   null,
      osdOverlay:  null,
      dragging:    false,
      parent:      null
      }, options);
  };

  $.OsdRegionRectTool.prototype = {
    reset: function(osdViewer) {
      this.dragging = false;
      this.osdOverlay = null;
      this.rectangle = null;
      this.mouseStart = null;
      this.osdViewer = osdViewer;
    },
    
    enterEditMode: function() {
      var _this = this;
      this.setOsdFrozen(true);
      this.osdViewer.addHandler("canvas-drag", _this.startRectangle, {recttool: _this});
      this.osdViewer.addHandler("canvas-release", _this.finishRectangle, {recttool: _this});
      this.onModeEnter();
    },

    startRectangle: function(event) {
      var _this = this.userData.recttool; //osd userData
      if (!_this.dragging) {
        _this.dragging = true; 
        _this.mouseStart = _this.osdViewer.viewport.pointFromPixel(event.position);
        _this.createNewRect(_this.mouseStart);
        _this.onDrawStart();
      } else { 
        var mouseNow = _this.osdViewer.viewport.pointFromPixel(event.position);
        _this.updateRectangle(_this.mouseStart, mouseNow);
        _this.onDraw();
      }
    },

    finishRectangle: function(event) {
      var _this = this.userData.recttool; //osd userData
      _this.dragging = false;
      var osdImageRect = _this.osdViewer.viewport.viewportToImageRectangle(_this.rectangle);
      var canvasRect = {
        x: parseInt(osdImageRect.x, 10),
        y: parseInt(osdImageRect.y, 10),
        width: parseInt(osdImageRect.width, 10),
        height: parseInt(osdImageRect.height, 10)
      };

      _this.onDrawFinish(canvasRect);
    },

    exitEditMode: function(event) {
      var _this = this;
      this.setOsdFrozen(false);
      this.osdViewer.removeHandler('canvas-drag', _this.startRectangle);
      this.osdViewer.removeHandler('canvas-release', _this.finishRectangle);
      this.onModeExit();
    },

    setOsdFrozen: function(freeze) {
      if (freeze) {
        // Control the openSeadragon canvas behaviour
        // so that it doesn't move around while we're
        // trying to edit our rectangle.
        this.osdViewer.panHorizontal = false;
        this.osdViewer.panVertical = false;
      } else {
        this.osdViewer.panHorizontal = true;
        this.osdViewer.panVertical = true;
      }
    },

    createNewRect: function(mouseStart) {
      var x = mouseStart.x,
      y = mouseStart.y,
      width = 0,
      height = 0;
      this.rectangle = new OpenSeadragon.Rect(x, y, width, height);
      this.osdOverlay = document.createElement('div');
      this.osdOverlay.className = 'osd-select-rectangle';
      this.osdViewer.addOverlay({
        element: this.osdOverlay,
        location: this.rectangle
      });
    },

    updateRectangle: function(mouseStart, mouseNow) {
      var topLeft = {
        x:Math.min(mouseStart.x, mouseNow.x),
        y:Math.min(mouseStart.y, mouseNow.y)
      },
      bottomRight = {
        x:Math.max(mouseStart.x, mouseNow.x),
        y:Math.max(mouseStart.y, mouseNow.y)
      };

      this.rectangle.x = topLeft.x;
      this.rectangle.y = topLeft.y;
      this.rectangle.width  = bottomRight.x - topLeft.x;
      this.rectangle.height = bottomRight.y - topLeft.y;

      this.osdViewer.updateOverlay(this.osdOverlay, this.rectangle);
    },
    
    //Currently the rect is
    // kept in openSeaDragon format until it is returned on "onDrawFinish".
    // The intent here is to update the annotation continuously rather than
    // only on the end of the draw event so rendering is always handled by
    // renderer instead of only at the end of the process, since different 
    // rendering methods may be used.
        
    //in theory this is a good idea, but that will require a better understanding
    //of how annotator creates the annotation in order to be able to intercept it 
    //at various stages.  for now, just wait until user submits
    onDrawFinish: function(canvasRect) {
      //console.log(this.rectangle);
      //console.log(this);
      var annotator = this.parent.annotator,
      parent = this.parent,
      _this = this;
      annotator.adder.show();
      //console.log(_this.annotator.adder.position()); 
      //var topLeftImagePoint = new OpenSeadragon.Point(canvasRect.x, canvasRect.y);
      var topLeftImagePoint = new OpenSeadragon.Point(this.rectangle.x, this.rectangle.y);
      //console.log(topLeftImagePoint);
      /*var annotatorPosition = {
        top: this.osdViewer.viewport.imageToWindowCoordinates(topLeftImagePoint).y,
        left: this.osdViewer.viewport.imageToWindowCoordinates(topLeftImagePoint).x
      };*/
      var annotatorPosition = {
        top: this.osdViewer.viewport.viewportToWindowCoordinates(topLeftImagePoint).y,
        left: this.osdViewer.viewport.viewportToWindowCoordinates(topLeftImagePoint).x
      };
      //console.log(annotatorPosition);
      //console.log(annotator);
      annotator.adder.offset(annotatorPosition);
      //console.log(_this.annotator.adder.position()); 
      annotator.onAdderClick();
      
      // Remove rectangle if user cancels the creation of an annotation
      annotator.subscribe("annotationEditorHidden", function() {
        _this.osdViewer.removeOverlay(_this.osdOverlay);
      });
      
      annotator.subscribe("annotationCreated", function (annotation){
        //console.log("in annotator annotationCreated");
        var bounds = _this.osdViewer.viewport.getBounds(true);
        var scope = _this.osdViewer.viewport.viewportToImageRectangle(bounds);
        //bounds is giving negative values?
        //console.log(annotation);
        var oaAnno = parent.annotatorToOA(annotation, parent.parent.imageID, canvasRect, scope);
        //console.log(oaAnno);
        //this seems to be necessary so annotator doesn't publish event multiple times
        annotator.unsubscribe("annotationCreated");
        //save to endpoint
        jQuery.publish('annotationCreated.'+parent.windowId, [oaAnno, _this.osdOverlay]);
      });
      
      // update region fragment of annotation to 
      // invoke annotator editor with proper callbacks to 
      // update the rest of the annotation, passing it along.
      // Once text is added there, save annotation to save endpoint.
    },
    
    onDrawStart: function() { // use new $.oaAnnotation() to create new 
        // annotation and pass it around for updating
    },
    
    onModeEnter: function() { // do reasonable things to the renderer to make
        // things intelligible
    },
    
    onModeExit: function() {
        // do reasonable things to renderer to return to "normal".
    },
    
    onDraw: function() { 
        // update annotation 
    }

    // MIGHT BE NICE IF...:
    // 
    // If the user is mid-drag and hits the side of the 
    // canvas, the canvas auto-pans and auto-zooms out 
    // to accomodate the rectangle.
    // 
    // The size of the rectangle just before colliding with
    // the canvas is auto-saved, so that the canvas can shrink 
    // back down again if the user starts shrinking it in 
    // mid-drag, allowing the auto-shrinking to stop when 
    // the original size of the rectangle is reached again.
    //
    // The existing rectangles should also be moveable by
    // shift-clicking and dragging them, showing the 
    // cross-hair cursor type.

//     osdRegionRectTool = {
//       enterEditMode: enterEditMode,
//       exitEditMode: exitEditMode
//     };
// 
//     return osdRegionRectTool;

  };
}(Mirador));
