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
      
      this.init();
  };

  $.OsdRegionRectTool.prototype = {
  
    init: function() {
      this.bindEvents();
    },
    
    bindEvents: function() {
      var _this = this;
    },
    
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
        
    onDrawFinishOld: function(canvasRect) {
      var parent = this.parent,
      _this = this;
      
      var topLeftImagePoint = new OpenSeadragon.Point(canvasRect.x, canvasRect.y);

    },
    
    onDrawFinish: function(canvasRect) {
      var _this = this,
      parent = this.parent,
      annoTooltip = new $.AnnotationTooltip(); //pass permissions
      var tooltip = jQuery(this.osdOverlay).qtip({
           content: {
            text : annoTooltip.editorTemplate()
            },
            position : {
              at: 'center',
              viewport: jQuery(window),
              container: jQuery(_this.osdViewer.element)
            },
            style : {
              classes : 'qtip-bootstrap'
            },
            show: {
              ready: true
            },
            hide: {
              fixed: true,
              delay: 300,
              event: false
            },
            events: {
              render: function(event, api) {
              
                //disable all tooltips for overlays
                jQuery.publish('disableTooltips.'+parent.windowId);
                
                tinymce.init({
                  selector : 'form.annotation-tooltip textarea',
                  plugins: "image link media",
                  menubar: false,
                  statusbar: false,
                  toolbar_items_size: 'small',
                  toolbar: "bold italic | bullist numlist | link image media"
                });
                      
                jQuery('.annotation-tooltip').on("submit", function(event) {
                  event.preventDefault();
                  jQuery('.annotation-tooltip a.save').click();
                });
              
                jQuery('.annotation-tooltip a.cancel').on("click", function(event) {
                  event.preventDefault();
                  api.destroy();
                  _this.osdViewer.removeOverlay(_this.osdOverlay);
                //reenable viewer tooltips
                jQuery.publish('enableTooltips.'+parent.windowId);
                });
                
                jQuery('.annotation-tooltip a.save').on("click", function(event) {
                  event.preventDefault();
                  var tagText = jQuery(this).parents('.annotation-editor').find('.tags-editor').val(),
                  resourceText = tinymce.activeEditor.getContent(),
                  tags = [];
                  tagText = $.trimString(tagText);
                  if (tagText) {
                    tags = tagText.split(/\s+/);
                  } 

                  var bounds = _this.osdViewer.viewport.getBounds(true);
                  var scope = _this.osdViewer.viewport.viewportToImageRectangle(bounds);
                  //bounds is giving negative values?
                  
                  var motivation = [],
                  resource = [],
                  on;

                  if (tags && tags.length > 0) {
                   motivation.push("oa:tagging");
                   jQuery.each(tags, function(index, value) {
                    resource.push({      
                     "@type":"oa:Tag",
                     "chars":value
                    });
                   });
                  }
                  motivation.push("oa:commenting");
                  on = { "@type" : "oa:SpecificResource",
                  "source" : parent.parent.canvasID, 
                  "selector" : {
                    "@type" : "oa:FragmentSelector",
                    "value" : "xywh="+canvasRect.x+","+canvasRect.y+","+canvasRect.width+","+canvasRect.height
                  },
                  "scope": {
                    "@context" : "http://www.harvard.edu/catch/oa.json",
                    "@type" : "catch:Viewport",
                    "value" : "xywh="+Math.round(scope.x)+","+Math.round(scope.y)+","+Math.round(scope.width)+","+Math.round(scope.height) //osd bounds
                  }
                };
                resource.push( {
                  "@type" : "dctypes:Text",
                  "format" : "text/html",
                  "chars" : resourceText
                });
                var oaAnno = {
                 "@context" : "http://iiif.io/api/presentation/2/context.json",
                 "@type" : "oa:Annotation",
                 "motivation" : motivation,
                 "resource" : resource,
                 "on" : on
                };
                  //save to endpoint
                jQuery.publish('annotationCreated.'+parent.windowId, [oaAnno, _this.osdOverlay]);

                //update content of this qtip to make it a viewer, not editor
                api.destroy();
                //reenable viewer tooltips
                jQuery.publish('enableTooltips.'+parent.windowId);
                });
              }
            }
         });
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
