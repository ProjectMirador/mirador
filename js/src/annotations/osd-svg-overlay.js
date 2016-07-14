(function($) {
  $.getTools = function(options) {
    if (this.svgOverlayTools) {
      return this.svgOverlayTools;
    }
    this.svgOverlayTools = [new $.Rectangle(options), new $.Freehand(options), new $.Polygon(options), new $.Ellipse(options), new $.Pin(options)];
    return this.svgOverlayTools;
  };

  OpenSeadragon.Viewer.prototype.svgOverlay = function(osdViewerId, windowId, state, eventEmitter) {
    return new $.Overlay(this, osdViewerId, windowId, state, eventEmitter);
  };

  $.Overlay = function(viewer, osdViewerId, windowId, state, eventEmitter) {
    console.log('calling new overlay');
    var drawingToolsSettings = state.getStateProperty('drawingToolsSettings');
    var availableAnnotationDrawingTools = state.getStateProperty('availableAnnotationDrawingTools');
    var availableExternalCommentsPanel = state.getStateProperty('availableExternalCommentsPanel');
    jQuery.extend(this, {
      disabled: true,
      osdViewerId: osdViewerId,
      windowId: windowId,
      commentPanel: null,
      mode: '', // Possible modes: 'create', 'translate', 'deform','rotate', 'edit' and '' as default.
      draftPaths: [],
      editedPaths: [],
      hoveredPath: null,
      path: null,
      segment: null,
      latestMouseDownTime: -1,
      doubleClickReactionTime: drawingToolsSettings.doubleClickReactionTime,
      availableAnnotationDrawingTools: availableAnnotationDrawingTools,
      availableExternalCommentsPanel: availableExternalCommentsPanel,
      dashArray: [],
      fixedShapeSize: drawingToolsSettings.fixedShapeSize,
      shapeHandleSize:drawingToolsSettings.shapeHandleSize,
      hitOptions: {
        handles: true,
        stroke: true,
        segments: true,
        tolerance: 5
      }
    });

    // Initialization of overlay object.
    this.tools = $.getTools(drawingToolsSettings);
    this.currentTool = null;
    // Default colors.
    this.dashArray = [];
    this.strokeColor = drawingToolsSettings.strokeColor;
    this.fillColor = drawingToolsSettings.fillColor;
    this.fillColorAlpha = drawingToolsSettings.fillColorAlpha;
    this.viewer = viewer;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'draw_canvas_' + this.windowId;
    // Drawing of overlay border during development.
    // this.canvas.style.border = '1px solid yellow';
    this.viewer.canvas.appendChild(this.canvas);

    var _this = this;
    this.state = state;
    this.eventEmitter = eventEmitter;
    var _thisResize = function() {
      _this.resize();
    };
    this.viewer.addHandler('animation', _thisResize);
    this.viewer.addHandler('open', _thisResize);
    this.viewer.addHandler('animation-finish', _thisResize);
    this.viewer.addHandler('update-viewport', _thisResize);
    this.viewer.addHandler('resize', _thisResize);
    this.viewer.addHandler('rotate', _thisResize);
    this.viewer.addHandler('constrain', _thisResize);


    _this.eventEmitter.subscribe('toggleDrawingTool.' + _this.windowId, function(event, tool) {
      if (_this.disabled) {
        jQuery('.qtip' + _this.windowId).qtip('hide');
        return;
      }
      jQuery('#' + osdViewerId).parents(".window").find(".qtip-viewer").hide();
      _this.currentTool = null;
      for (var i = 0; i < _this.tools.length; i++) {
        if (_this.tools[i].logoClass === tool) {
          _this.currentTool = _this.tools[i];
        }
      }
    });

    _this.eventEmitter.subscribe('toggleDefaultDrawingTool.' + _this.windowId, function(event) {
      if (_this.disabled) {
        jQuery('.qtip' + _this.windowId).qtip('hide');
        return;
      }
      jQuery('#' + osdViewerId).parents(".window").find(".qtip-viewer").hide();
      _this.currentTool = null;
      for (var i = 0; i < _this.availableAnnotationDrawingTools.length; i++) {
        for (var j = 0; j < _this.tools.length; j++) {
          if (_this.availableAnnotationDrawingTools[i] == _this.tools[j].name) {
            _this.currentTool = _this.tools[j];
            break;
          }
        }
        if (_this.currentTool) {
          break;
        }
      }
    });

    _this.eventEmitter.subscribe('changeBorderColor.' + _this.windowId, function(event, color) {
      _this.strokeColor = color;
      if (_this.hoveredPath) {
        _this.hoveredPath.strokeColor = color;
        _this.paperScope.view.draw();
      }
    });

    _this.eventEmitter.subscribe('changeFillColor.' + _this.windowId, function(event, color, alpha) {
      _this.fillColor = color;
      _this.fillColorAlpha = alpha;
      if (_this.hoveredPath && _this.hoveredPath.closed) {
        _this.hoveredPath.fillColor = color;
        _this.hoveredPath.fillColor.alpha = alpha;
        _this.paperScope.view.draw();
      }
    });

    _this.eventEmitter.subscribe('toggleBorderType.' + _this.windowId, function (event, type) {
      if (type == 'solid') {
        _this.dashArray = [];
      } else if (type == 'dashed') {
        _this.dashArray = [5, 5];
      } else if (type == 'dotdashed') {
        _this.dashArray = [2, 5, 7, 5];
      }
      if (_this.hoveredPath) {
        _this.hoveredPath.dashArray = _this.dashArray;
        _this.paperScope.view.draw();
      }
    });

    this.resize();
    this.show();
    this.init();
  };

  $.Overlay.prototype = {
    init: function() {
      // Initialization of Paper.js overlay.
      var _this = this;
      this.paperScope = new paper.PaperScope();
      this.paperScope.setup('draw_canvas_' + _this.windowId);
      this.paperScope.activate();
      this.paperScope.project.options.handleSize = _this.state.getStateProperty('shapeHandleSize');
      jQuery(_this.canvas).attr('keepalive', 'true');
      this.annotationUtils = new $.AnnotationUtils();
      this.paperScope.view.onFrame = function(event) {
        if (_this.paperScope.snapPoint) {
          _this.paperScope.snapPoint.remove();
          _this.paperScope.snapPoint = null;
        }
        if (_this.path && !_this.path.closed && _this.cursorLocation && _this.currentTool && _this.currentTool.idPrefix.indexOf('rough_path_') != -1) {
          var distanceToFirst = _this.path.segments[0].point.getDistance(_this.cursorLocation);
          if (_this.path.segments.length > 1 && distanceToFirst < _this.hitOptions.tolerance) {
            _this.paperScope.snapPoint = new _this.paperScope.Path.Circle({
              name: 'snapPoint',
              center: _this.path.segments[0].point,
              radius: _this.hitOptions.tolerance / _this.paperScope.view.zoom,
              fillColor: _this.path.strokeColor,
              strokeColor: _this.path.strokeColor
            });
          }
        }
      };
      var mouseTool = jQuery.data(document.body, 'draw_canvas_' + _this.windowId);
      if (mouseTool) {
        mouseTool.remove();
      }
      mouseTool = new this.paperScope.Tool();
      mouseTool.overlay = this;
      mouseTool.onMouseUp = _this.onMouseUp;
      mouseTool.onMouseDrag = _this.onMouseDrag;
      mouseTool.onMouseMove = _this.onMouseMove;
      mouseTool.onMouseDown = _this.onMouseDown;
      mouseTool.onDoubleClick = _this.onDoubleClick;
      jQuery.data(document.body, 'draw_canvas_' + _this.windowId, mouseTool);

      this.listenForActions();
    },

    listenForActions: function() {
      var _this = this;

      this.eventEmitter.subscribe('SET_OVERLAY_EDITING.' + this.windowId, function(event, options) {
        //disable shapes not associated with this annotation
        //shapes associated with this annotation should have their handles enabled
        console.log(_this);
        console.log(options.shape);
        if (options.shape && options.shape._name) {
          options.shape.data.editable = options.isEditable;
          var tool = _this.getTool(options.shape);
          //tool.setEditable(options.isEditable);
          //call a function that all tools have
        }
      });
    },

    onMouseUp: function(event) {
      if (!this.overlay.disabled) {
        event.stopPropagation();
        jQuery(this.overlay.viewer.canvas).css('cursor','default');
        if (this.overlay.mode === 'deform' || this.overlay.mode === 'edit') {
          this.overlay.segment = null;
          this.overlay.path = null;
        }
        if (this.overlay.mode != 'create') {
          this.overlay.mode = '';
        }
        this.overlay.currentTool.onMouseUp(event, this.overlay);
      }
    },

    onMouseDrag: function(event) {
      if (!this.overlay.disabled) {
        event.stopPropagation();
        this.overlay.currentTool.onMouseDrag(event, this.overlay);
      } else {
        var absolutePoint = {
          'x': event.event.clientX,
          'y': event.event.clientY
        };
        this.overlay.eventEmitter.publish('updateTooltips.' + this.overlay.windowId, [event.point, absolutePoint]);
      }
      this.overlay.paperScope.view.draw();
    },

    onMouseMove: function(event) {
      this.overlay.cursorLocation = event.point;
      if (!this.overlay.disabled) {
        // We are in drawing mode
        if (this.overlay.paperScope.project.hitTest(event.point, this.overlay.hitOptions)) {
          document.body.style.cursor = "pointer";
        } else {
          document.body.style.cursor = "default";
        }
        event.stopPropagation();
        this.overlay.currentTool.onMouseMove(event, this.overlay);
      } else {
        var absolutePoint = {
          'x': event.event.clientX,
          'y': event.event.clientY
        };
        this.overlay.eventEmitter.publish('updateTooltips.' + this.overlay.windowId, [event.point, absolutePoint]);
      }
      this.overlay.paperScope.view.draw();
    },

    onMouseDown: function(event) {
      console.log(this.overlay);
      if (this.overlay.disabled) {
        console.log("overlay is disabled, no mouse down");
        return;
      }
      event.stopPropagation();
      var date = new Date();
      var time = date.getTime();
      var overlayEditable = true;
      if (this.overlay.path) {
        if (typeof this.overlay.path.data.editable !== 'undefined') {
          overlayEditable = this.overlay.path.data.editable;
        }
      }
      console.log(overlayEditable);
      console.log(this.overlay.path);
      if (time - this.overlay.latestMouseDownTime < this.overlay.doubleClickReactionTime) {
        this.overlay.latestMouseDownTime = time;
        this.onDoubleClick(event);
      } else {
        this.overlay.latestMouseDownTime = time;
        var hitResult = this.overlay.paperScope.project.hitTest(event.point, this.overlay.hitOptions);

        if (hitResult && (!this.overlay.currentTool || (hitResult.item._name.toString().indexOf(this.overlay.currentTool.idPrefix) === -1 && this.overlay.mode === ''))) {
          var prefix = hitResult.item._name.toString();
          prefix = prefix.substring(0, prefix.lastIndexOf('_') + 1);
          for (var j = 0; j < this.overlay.tools.length; j++) {
            if (this.overlay.tools[j].idPrefix == prefix) {
              this.overlay.eventEmitter.publish('toggleDrawingTool.' + this.overlay.windowId, this.overlay.tools[j].logoClass);
              break;
            }
          }
        }
        if (this.overlay.currentTool && overlayEditable) {
          this.overlay.currentTool.onMouseDown(event, this.overlay);
          if (this.overlay.mode == 'translate' || this.overlay.mode == 'deform' || this.overlay.mode == 'edit') {
            if (this.overlay.path && this.overlay.path.data.annotation) {
              var inArray = false;
              for (var i = 0; i < this.overlay.editedPaths.length; i++) {
                if (this.overlay.editedPaths[i].name == this.overlay.path.name) {
                  inArray = true;
                  break;
                }
              }
              if (!inArray) {
                this.overlay.editedPaths.push(this.overlay.path);
              }
            }
          }
        }
      }
      this.overlay.hover();
      this.overlay.paperScope.view.draw();
    },

    onDoubleClick: function(event) {
      event.stopPropagation();
      if (this.overlay.currentTool) {
        this.overlay.currentTool.onDoubleClick(event, this.overlay);
      }
    },

    fitFixedSizeShapes: function(shape) {
      shape.data.fixedSize = true;
      if(this.getTool(shape).onResize){
        this.getTool(shape).onResize(shape,this);
      }

      if (shape.name.toString().indexOf('pin_') != -1) {
        var scale = 1 / shape.bounds.width;
        scale *= this.fixedShapeSize / this.paperScope.view.zoom;
        shape.scale(scale, shape.segments[0].point);
      }
    },

    updateSelection: function(selected, item) {

      if(item && item._name){
        var shapeTool = this.getTool(item);
        if(shapeTool){
          shapeTool.updateSelection(selected, item, this);
        }
      }
    },

    resize: function() {
      var viewportBounds = this.viewer.viewport.getBounds(true);
      /* in viewport coordinates */
      this.canvas.width = this.viewer.viewport.containerSize.x;
      this.canvas.height = this.viewer.viewport.containerSize.y;
      var transform = 'translate(0px,0px)';
      this.canvas.style.WebkitTransform = transform;
      this.canvas.style.msTransform = transform;
      this.canvas.style.transform = transform;
      this.canvas.style.marginLeft = "0px";
      this.canvas.style.marginTop = "0px";
      if (this.paperScope && this.paperScope.view) {
        this.paperScope.view.viewSize = new this.paperScope.Size(this.canvas.width, this.canvas.height);
        this.paperScope.view.zoom = this.viewer.viewport.viewportToImageZoom(this.viewer.viewport.getZoom(true));
        this.paperScope.view.center = new this.paperScope.Size(
          this.viewer.viewport.contentSize.x * viewportBounds.x + this.paperScope.view.bounds.width / 2,
          this.viewer.viewport.contentSize.x * viewportBounds.y + this.paperScope.view.bounds.height / 2);
        this.paperScope.view.update(true);
        var allItems = this.paperScope.project.getItems({
          name: /_/
        });
        for (var j = 0; j < allItems.length; j++) {
          if (allItems[j].data.fixedSize) {
            this.fitFixedSizeShapes(allItems[j]);
          }
          allItems[j].strokeWidth = 1 / this.paperScope.view.zoom;
          if (allItems[j].style) {
            allItems[j].style.strokeWidth = 1 / this.paperScope.view.zoom;
          }
        }
      }
    },

    hover: function() {

      if(!this.currentTool){
        return;
      }

      if (!this.currentTool && this.hoveredPath) {
        this.updateSelection(false, this.hoveredPath);
        this.hoveredPath = null;
      }

      if (this.hoveredPath) {

        if (this.hoveredPath._name.toString().indexOf(this.currentTool.idPrefix) === -1) {
          this.updateSelection(false, this.hoveredPath);
          this.hoveredPath = null;
        }
        if (this.path && this.path._name.toString().indexOf(this.currentTool.idPrefix) !== -1 ) {

          //should make exception for the dynamically attached paths to shapes
          if(this.currentTool.partOfPrefix && this.path._name.toString().indexOf(this.currentTool.partOfPrefix) !== -1){
            return;
          }

          if (this.hoveredPath) {
            if(this.hoveredPath._name.toString() === this.path._name.toString() ){
              return;
            }else{
              this.updateSelection(false, this.hoveredPath);
            }

          }
          this.hoveredPath = this.path;
          this.updateSelection(true, this.hoveredPath);
        }
        return;

      }

      if (this.path && this.path._name.toString().indexOf(this.currentTool.idPrefix) != -1) {
        this.hoveredPath = this.path;
        this.updateSelection(true, this.hoveredPath);
      }
    },

    removeFocus: function() {
      if (this.hoveredPath) {
        this.updateSelection(false, this.hoveredPath);
        this.hoveredPath = null;
      }
      if (this.path) {
        this.updateSelection(false, this.path);
        this.path = null;
      }
    },

    restoreEditedShapes: function() {
      this.editedPaths = [];
      this.removeFocus();
    },

    restoreDraftShapes: function() {
      this.clearDraftData();
      this.removeFocus();
    },

    // get the tool which controls given shape
    getTool:function(shape){
      for(var i=0;i<this.tools.length;i++){
        if(shape.name.toString().indexOf(this.tools[i].idPrefix) !== -1){
          return this.tools[i];
        }
      }
    },

    // replaces paper.js objects with the required properties only.
    // 'shapes' coordinates are image coordiantes
    replaceShape: function(shape, annotation) {

      //backward compatibility when changing shapes points
      var shapeTool = this.getTool(shape);
      if(shapeTool && shapeTool.SEGMENT_POINTS_COUNT && shapeTool.SEGMENT_POINTS_COUNT !== shape.segments.length){
        shapeTool.adaptSegments(shape,this);
      }

      var cloned = new this.paperScope.Path({
        segments: shape.segments,
        name: shape.name
      });

      cloned.strokeWidth = 1 / this.paperScope.view.zoom;
      cloned.strokeColor = shape.strokeColor;
      cloned.dashArray = shape.dashArray;
      if (shape.fillColor) {
        cloned.fillColor = shape.fillColor;
        if (shape.fillColor.alpha) {
          cloned.fillColor.alpha = shape.fillColor.alpha;
        }
      }
      cloned.closed = shape.closed;
      cloned.data.rotation = shape.data.rotation;
      cloned.data.fixedSize = shape.data.fixedSize;
      cloned.data.annotation = annotation;
      if (cloned.data.fixedSize) {
        this.fitFixedSizeShapes(cloned);
      }
      shape.remove();
      return cloned;
    },

    // creating shapes used for backward compatibility.
    // shape coordinates are viewport coordinates.
    createRectangle: function(shape, annotation) {
      var paperItems = [];
      var rect = new $.Rectangle();
      var newShape = this.viewer.viewport.viewportToImageRectangle(shape);
      var initialPoint = {
        'x': newShape.x,
        'y': newShape.y
      };
      var currentMode = this.mode;
      var currentPath = this.path;
      var strokeColor = this.strokeColor;
      var fillColor = this.fillColor;
      var fillColorAlpha = this.fillColorAlpha;
      this.strokeColor = this.state.getStateProperty('drawingToolsSettings').strokeColor;
      this.fillColor = this.state.getStateProperty('drawingToolsSettings').fillColor;
      this.fillColorAlpha = this.state.getStateProperty('drawingToolsSettings').fillColorAlpha;
      this.mode = 'create';
      this.path = rect.createShape(initialPoint, this);
      var eventData = {
        'delta': {
          'x': newShape.width,
          'y': newShape.height
        }
      };
      rect.onMouseDrag(eventData, this);
      paperItems.push(this.path);
      paperItems[0].data.annotation = annotation;
      this.updateSelection(false, paperItems[0]);
      this.strokeColor = strokeColor;
      this.fillColor = fillColor;
      this.fillColorAlpha = fillColorAlpha;
      this.path = currentPath;
      this.mode = currentMode;
      return paperItems;
    },

    parseSVG: function(svg, annotation) {
      var paperItems = [];
      var svgParser = new DOMParser();
      var svgDOM = svgParser.parseFromString(svg, "text/xml");
      if (svgDOM.documentElement.nodeName == "parsererror") {
        return; // if svg is not valid XML structure - backward compatibility.
      }
      var svgTag = this.paperScope.project.importSVG(svg);
      // removes SVG tag which is the root object of comment SVG segment.
      var body = svgTag.removeChildren()[0];
      svgTag.remove();
      if (body.className == 'Group') {
        // removes group tag which wraps the set of objects of comment SVG segment.
        var items = body.removeChildren();
        for (var itemIdx = 0; itemIdx < items.length; itemIdx++) {
          paperItems.push(this.replaceShape(items[itemIdx], annotation));
        }
        body.remove();
      } else {
        paperItems.push(this.replaceShape(body, annotation));
      }
      this.paperScope.view.update(true);
      return paperItems;
    },

    // Restore latest view before rendering.
    restoreLastView: function(shapeArray) {
      for (var i = 0; i < this.editedPaths.length; i++) {
        for (var idx = 0; idx < shapeArray.length; idx++) {
          if (shapeArray[idx].name == this.editedPaths[i].name) {
            shapeArray[idx].segments = this.editedPaths[i].segments;
            shapeArray[idx].name = this.editedPaths[i].name;
            shapeArray[idx].strokeWidth = 1 / this.paperScope.view.zoom;
            shapeArray[idx].strokeColor = this.editedPaths[i].strokeColor;
            shapeArray[idx].dashArray = this.editedPaths[i].dashArray;
            if (this.editedPaths[i].fillColor) {
              shapeArray[idx].fillColor = this.editedPaths[i].fillColor;
              if (this.editedPaths[i].fillColor.alpha) {
                shapeArray[idx].fillColor.alpha = this.editedPaths[i].fillColor.alpha;
              }
            }
            if (this.editedPaths[i].style) {
              shapeArray[idx].style = this.editedPaths[i].style;
              shapeArray[idx].style.strokeWidth = 1 / this.paperScope.view.zoom;
            }
            shapeArray[idx].closed = this.editedPaths[i].closed;
            shapeArray[idx].data.rotation = this.editedPaths[i].data.rotation;
            shapeArray[idx].data.fixedSize = this.editedPaths[i].data.fixedSize;
            shapeArray[idx].data.annotation = this.editedPaths[i].data.annotation;
            if (shapeArray[idx].data.fixedSize) {
              this.fitFixedSizeShapes(shapeArray[idx]);
            }
          }
        }
      }
    },

    deselectAll: function() {
      if (this.paperScope && this.paperScope.view && this.paperScope.project) {
        this.paperScope.project.deselectAll();
        this.paperScope.view.update(true);
        this.destroyCommentPanel();
      }
    },

    hide: function() {
      this.canvas.style.display = 'none';
      this.deselectAll();
    },

    show: function() {
      this.canvas.style.display = 'block';
    },

    disable: function() {
      this.disabled = true;
      // this.eventEmitter.publish('hideDrawTools.' + this.windowId);
      // this.eventEmitter.publish('disableBorderColorPicker.' + this.windowId, this.disabled);
      // this.eventEmitter.publish('disableFillColorPicker.' + this.windowId, this.disabled);
      this.eventEmitter.publish('enableTooltips.' + this.windowId);
      this.deselectAll();
    },

    enable: function() {
      var setDefaultTool = this.disabled;
      this.disabled = false;
      // this.eventEmitter.publish('showDrawTools.' + this.windowId);
      // this.eventEmitter.publish('disableBorderColorPicker.' + this.windowId, this.disabled);
      // this.eventEmitter.publish('disableFillColorPicker.' + this.windowId, this.disabled);
      this.eventEmitter.publish('disableTooltips.' + this.windowId);
      if (setDefaultTool) {
        this.eventEmitter.publish('toggleDefaultDrawingTool.' + this.windowId);
      }
    },

    refresh: function() {
      this.paperScope.view.update(true);
    },

    destroyCommentPanel: function() {
      this.eventEmitter.publish('removeTooltips.' + this.windowId);
      jQuery(this.canvas).parents('.mirador-osd').qtip('destroy', true);
      this.commentPanel = null;
    },

    getName: function(tool) {
      return tool.idPrefix + $.genUUID();
    },

    getSVGString: function(shapes) {
      var svg = "<svg xmlns='http://www.w3.org/2000/svg'>";
      if (shapes.length > 1) {
        svg += "<g>";
        for (var i = 0; i < shapes.length; i++) {
          this.updateSelection(false,shapes[i]);
          if (shapes[i].data.fixedSize) {
            this.fitFixedSizeShapes(shapes[i]);
          }
          var anno = shapes[i].data.annotation;
          shapes[i].data.annotation = null;
          svg += shapes[i].exportSVG({
            "asString": true
          });
          shapes[i].data.annotation = anno;
        }
        svg += "</g>";
      } else {
        this.updateSelection(false,shapes[0]);
        if (shapes[0].data.fixedSize) {
          this.fitFixedSizeShapes(shapes[0]);
        }
        var annoSingle = shapes[0].data.annotation;
        shapes[0].data.annotation = null;
        svg += shapes[0].exportSVG({
          "asString": true
        });
        shapes[0].data.annotation = annoSingle;
      }
      svg += "</svg>";
      return svg;
    },

    onDrawFinish: function() {
      var shape = this.path;
      if (!shape) {
        return;
      }
      if (this.hoveredPath) {
        this.updateSelection(false, this.hoveredPath);
      }
      this.hoveredPath = shape;
      this.updateSelection(true, this.hoveredPath);
      this.segment = null;
      this.path = null;
      this.mode = '';
      this.draftPaths.push(shape);
      if (typeof this.annoTooltip === 'undefined' || !this.annoTooltip) {
        this.annoTooltip = new $.AnnotationTooltip({
          targetElement: jQuery(this.canvas).parents('.mirador-osd'),
          state: this.state,
          eventEmitter: this.eventEmitter,
          windowId: this.windowId
        });
      }

      if (this.availableExternalCommentsPanel) {
        this.eventEmitter.publish('annotationShapeCreated.' + this.windowId, [this, shape]);
        return;
      }
      var _this = this;
      if (typeof this.annoEditorVisible === 'undefined' || !this.annoEditorVisible)  {
        this.annoTooltip.showEditor({
          annotation: {},
          onAnnotationCreated: function(oaAnno) {
            var svg = _this.getSVGString(_this.draftPaths);
            oaAnno.on = {
              "@type": "oa:SpecificResource",
              "full": _this.state.getWindowObjectById(_this.windowId).canvasID,
              "selector": {
                "@type": "oa:SvgSelector",
                "value": svg
              }
            };
            //save to endpoint
            _this.eventEmitter.publish('annotationCreated.' + _this.windowId, [oaAnno, shape]);
          },
          onCancel: function() {
            _this.clearDraftData();
            _this.annoTooltip = null;
            _this.annoEditorVisible = false;
          },
          onCompleted: function() {
            _this.clearDraftData();
            _this.annoTooltip = null;
            _this.annoEditorVisible = false;
          }
        });
        _this.annoEditorVisible = true;
      }
    },

    clearDraftData: function() {
      var _this = this;
      for (var idx = 0; idx < _this.draftPaths.length; idx++) {
        _this.updateSelection(false, this.draftPaths[idx]);
        _this.draftPaths[idx].remove();
      }
      _this.draftPaths = [];
      if (_this.path) {
        _this.path.remove();
      }
      _this.paperScope.view.update(true);
      _this.hoveredPath = null;
      _this.segment = null;
      _this.path = null;
      _this.mode = '';
    }
  };
}(Mirador));
