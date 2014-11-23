(function($) {
  // Takes an openSeadragon canvas and calls
  // provided callbacks at different stages
  // of a rectangle creation event.

  $.OsdRegionRectTool = function(options) {
    var osdRectTool,
    osd = options.osd,
    osdViewer = options.viewer,
    mouseStart,
    rectangle,
    rectClass,
    osdOverlay,
    dragging = false;

    //console.log(osdViewer.viewport);

    function enterEditMode() {
      setOsdFrozen(true);
      osdViewer.addHandler("canvas-drag", startRectangle);
      osdViewer.addHandler("canvas-release", finishRectangle);
      if ( options.onModeEnter ) options.onModeEnter();
    }

    function startRectangle(event) {
      if (!dragging) {
        dragging = true; 
        mouseStart = osdViewer.viewport.pointFromPixel(event.position);
        createNewRect(mouseStart);
        if ( options.onDrawStart ) options.onDrawStart();
      } else { 
        var mouseNow = osdViewer.viewport.pointFromPixel(event.position);
        updateRectangle(mouseStart, mouseNow);
        if ( options.onDraw ) options.onDraw();
      }
    }

    function finishRectangle(event) {
      dragging = false,
      osdImageRect = osdViewer.viewport.viewportToImageRectangle(rectangle);
      canvasRect = {
        x: parseInt(osdImageRect.x, 10),
        y: parseInt(osdImageRect.y, 10),
        width: parseInt(osdImageRect.width, 10),
        height: parseInt(osdImageRect.height, 10)
      };

      if ( options.onDrawFinish ) options.onDrawFinish(canvasRect);
    }

    function exitEditMode(event) {
      setOsdFrozen(false),
      osdViewer.removeHandler('canvas-drag', startRectangle);
      osdViewer.removeHandler('canvas-release', finishRectangle);
      if ( options.onModeExit ) options.onModeExit();
    }

    function setOsdFrozen(freeze) {
      if (freeze) {
        // Control the openSeadragon canvas behaviour
        // so that it doesn't move around while we're
        // trying to edit our rectangle.
        osdViewer.panHorizontal = false;
        osdViewer.panVertical = false;
      } else {
        osdViewer.panHorizontal = true;
        osdViewer.panVertical = true;
      }
    }

    function createNewRect(mouseStart) {
      var x = mouseStart.x,
      y = mouseStart.y,
      width = 0,
      height = 0;
      rectangle = new OpenSeadragon.Rect(x, y, width, height);

      osdOverlay = document.createElement('div');
      osdOverlay.className = 'osd-select-rectangle';
      osdViewer.addOverlay({
        element: osdOverlay,
        location:  rectangle
      });
    }

    function updateRectangle(mouseStart, mouseNow) {
      var topLeft = {
        x:Math.min(mouseStart.x, mouseNow.x),
        y:Math.min(mouseStart.y, mouseNow.y)
      },
      bottomRight = {
        x:Math.max(mouseStart.x, mouseNow.x),
        y:Math.max(mouseStart.y, mouseNow.y)
      };

      rectangle.x = topLeft.x;
      rectangle.y = topLeft.y;
      rectangle.width  = bottomRight.x - topLeft.x;
      rectangle.height = bottomRight.y - topLeft.y;

      osdViewer.updateOverlay(osdOverlay, rectangle);
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

    osdRegionRectTool = {
      enterEditMode: enterEditMode,
      exitEditMode: exitEditMode
    };

    return osdRegionRectTool;

  };
}(Mirador));
