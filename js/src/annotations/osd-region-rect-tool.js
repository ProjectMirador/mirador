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
      rectangleDrawn: false,
      disableRectTool: false,
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

      jQuery.subscribe('disableRectTool.' + _this.parent.windowId, function() {
        _this.disableRectTool = true;
      });

      jQuery.subscribe('enableRectTool.' + _this.parent.windowId, function() {
        _this.disableRectTool = false;
      });
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
      this.osdViewer.addHandler("canvas-drag-end", _this.finishRectangle, {recttool: _this});
      this.onModeEnter();
    },

    exitEditMode: function(event) {
      var _this = this;
      this.setOsdFrozen(false);
      this.osdViewer.removeHandler('canvas-drag', _this.startRectangle);
      this.osdViewer.removeHandler('canvas-drag-end', _this.finishRectangle);
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

    /*
     * Here is a different way of checking if the mouse is inside the image.  The response to the user feels slower
     * so it doesn't feel as great.
    startRectangle: function(event) {
      var _this = this.userData.recttool; //osd userData
      if (!_this.dragging) {
        _this.dragging = true; 
        var currentMouse = _this.osdViewer.viewport.pointFromPixel(event.position);
        if (_this.isMouseInImage(currentMouse)) {
          _this.mouseStart = currentMouse;
          _this.createRectangle(_this.mouseStart);
          _this.onDrawStart();
        }
      } else { 
        var mouseNow = _this.osdViewer.viewport.pointFromPixel(event.position);
        if (_this.isMouseInImage(mouseNow)) {
          if (_this.mouseStart) {
            _this.updateRectangle(_this.mouseStart, mouseNow);
            _this.onDraw();
          } else {
            _this.mouseStart = mouseNow;
            _this.createRectangle(_this.mouseStart);
            _this.onDrawStart();
          }
        }
      }
    },*/

    startRectangle: function(event) {
      var _this = this.userData.recttool; //osd userData
      if (!_this.rectangleDrawn && !_this.disableRectTool) {
        if (!_this.dragging) {
          _this.dragging = true; 
          _this.mouseStart = _this.getMousePositionInImage(_this.osdViewer.viewport.pointFromPixel(event.position));
          _this.createRectangle(_this.mouseStart);
          _this.onDrawStart();
        } else { 
          var mouseNow = _this.getMousePositionInImage(_this.osdViewer.viewport.pointFromPixel(event.position));
          _this.updateRectangle(_this.mouseStart, mouseNow);
          _this.onDraw();
        }
      }
    },

    createRectangle: function(mouseStart) {
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

    finishRectangle: function(event) {
      var _this = this.userData.recttool; //osd userData
      if (_this.rectangle) {
        _this.dragging = false;
        var osdImageRect = _this.osdViewer.viewport.viewportToImageRectangle(_this.rectangle);
        var canvasRect = {
          x: parseInt(osdImageRect.x, 10),
          y: parseInt(osdImageRect.y, 10),
          width: Math.max(parseInt(osdImageRect.width, 10), 1),  //don't allow 0 pixel width or height
          height: Math.max(parseInt(osdImageRect.height, 10), 1) //don't allow 0 pixel width or height
        };
        _this.rectangleDrawn = true;
        var tooltip = _this.onDrawFinish(canvasRect);
        //show after creation so we don't have to wait for user to make sure mouse is inside overlay
        tooltip.qtip('show');
        _this.rectangle = null;
        _this.mouseStart = null;
      }
    },

    getMousePositionInImage: function(mousePosition) {
      if (mousePosition.x < 0) {
        mousePosition.x = 0;
      }
      if (mousePosition.x > 1) {
        mousePosition.x = 1;
      }
      if (mousePosition.y < 0) {
        mousePosition.y = 0;
      }
      if (mousePosition.y > (1/this.osdViewer.source.aspectRatio)) {
        mousePosition.y = (1/this.osdViewer.source.aspectRatio);
      }
      return mousePosition;
    },

    isMouseInImage: function(mousePosition) {
      if (mousePosition.x < 0) {
        return false;
      }
      if (mousePosition.x > 1) {
        return false;
      }
      if (mousePosition.y < 0) {
        return false;
      }
      if (mousePosition.y > (1/this.osdViewer.source.aspectRatio)) {
        return false;
      }
      return true;
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
              my: 'bottom left',
              at: 'top right',
              adjust : {
                method: 'flipinvert'
              },
              //when the side panel is active and visible, it messes up the offset for the qtip
              //which means that qtips will disappear for annotations that are on the far right side of the canvas
              //so we need the container and viewport to be the element that encompasses everything,
              //which can be the window or slot.  we need a better way of getting this element
              //because this is brittle
              container: _this.parent.parent.parent.element, //window's element
              viewport: _this.parent.parent.parent.element //window's element
            },
            style : {
              classes : 'qtip-bootstrap'
            },
            show: {
              event: false
            },
            hide: {
              fixed: true,
              delay: 300,
              event: false
            },
            events: {
              render: function(event, api) {
              
                jQuery.publish('annotationEditorAvailable.'+parent.windowId);
                //jQuery('form.annotation-tooltip input.tags-editor').tokenInput(_this.tags);

                //disable all tooltips for overlays
                jQuery.publish('disableTooltips.'+parent.windowId);
                //disable zooming
                _this.osdViewer.zoomPerClick = 1;
                _this.osdViewer.zoomPerScroll = 1;

                tinymce.init({
                  selector : 'form.annotation-tooltip textarea',
                  plugins: "image link media",
                  menubar: false,
                  statusbar: false,
                  toolbar_items_size: 'small',
                  toolbar: "bold italic | bullist numlist | link image media | removeformat",
                  setup : function(editor) {
                    editor.on('init', function(args) {
                      tinymce.execCommand('mceFocus', false, args.target.id); //make sure tinymce focuses on the editor after initialization                    
                    });
                  }
                });

                jQuery('.annotation-tooltip').on("submit", function(event) {
                  event.preventDefault();
                  jQuery('.annotation-tooltip a.save').click();
                });
              
                jQuery('.annotation-tooltip a.cancel').on("click", function(event) {
                  event.preventDefault();
                  //add check so that dialog box only pops up if there is stuff in the editor
                  var content = tinymce.activeEditor.getContent();
                  if (content) {
                    if (!window.confirm("Do you want to cancel this annotation?")) { 
                      return false;
                    }
                  }
                  api.destroy();
                  _this.rectangleDrawn = false;
                  _this.osdViewer.removeOverlay(_this.osdOverlay);
                  //reenable viewer tooltips
                  jQuery.publish('enableTooltips.'+parent.windowId);
                  _this.osdViewer.zoomPerClick = 2;
                  _this.osdViewer.zoomPerScroll = 1.2;                  
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
                _this.rectangleDrawn = false;
                //reenable viewer tooltips
                jQuery.publish('enableTooltips.'+parent.windowId);
                _this.osdViewer.zoomPerClick = 2;
                _this.osdViewer.zoomPerScroll = 1.2;                  
                });
              }
            }
         });
      return tooltip;
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
