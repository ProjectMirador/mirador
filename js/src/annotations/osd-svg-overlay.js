(function($) {
  $.getTools = function(options) {
    if (this.svgOverlayTools) {
      return this.svgOverlayTools;
    }
    options.partOfPrefix = '_partOf';
    this.svgOverlayTools = [new $.Rectangle(options), new $.Freehand(options), new $.Polygon(options), new $.Ellipse(options), new $.Pin(options)];
    return this.svgOverlayTools;
  };

  OpenSeadragon.Viewer.prototype.svgOverlay = function(osdViewerId, windowId, state, eventEmitter) {
    return new $.Overlay(this, osdViewerId, windowId, state, eventEmitter);
  };

  // Wat? TODO:...
  var FILL_COLOR_ALPHA_WORKAROUND = 0.00001;

  $.Overlay = function(viewer, osdViewerId, windowId, state, eventEmitter) {
    var drawingToolsSettings = state.getStateProperty('drawingToolsSettings');
    this.drawingToolsSettings = drawingToolsSettings;
    var availableAnnotationDrawingTools = state.getStateProperty('availableAnnotationDrawingTools');
    var availableExternalCommentsPanel = state.getStateProperty('availableExternalCommentsPanel');
    jQuery.extend(this, {
      disabled: true,
      inEditOrCreateMode: false,
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
      strokeWidth: 1,
      fixedShapeSize: drawingToolsSettings.fixedShapeSize,
      selectedColor: drawingToolsSettings.selectedColor || '#004c66',
      shapeHandleSize:drawingToolsSettings.shapeHandleSize,
      partOfPrefix:'_partOf',
      hitOptions: {
        handles: true,
        stroke: true,
        segments: true,
        tolerance: 5
      }
    });

    this.tools = $.getTools(drawingToolsSettings);
    this.currentTool = null;
    // Default colors.
    this.dashArray = [];
    this.strokeWidth = 1;
    this.strokeColor = drawingToolsSettings.strokeColor;
    this.fillColor = drawingToolsSettings.fillColor;
    this.fillColorAlpha = drawingToolsSettings.fillColorAlpha;
    this.viewer = viewer;
    this.canvas = document.createElement('canvas');
    // workaround to remove focus from editor
    jQuery(this.canvas).attr('tabindex', '0').mousedown(function(){ jQuery(this).focus();});
    this.canvas.id = 'draw_canvas_' + this.windowId;
    // Drawing of overlay border during development.
    // this.canvas.style.border = '1px solid yellow';
    this.viewer.canvas.appendChild(this.canvas);

    var _this = this;
    this.slotWindowElement = state.getWindowElement(this.windowId);
    this.state = state;
    this.eventEmitter = eventEmitter;
    this.eventsSubscriptions = [];

    this.horizontallyFlipped = false;

    this.resize();
    this.show();
    this.init();
  };

  $.Overlay.prototype = {
    init: function() {
      // Initialization of Paper.js overlay.
      var _this = this;
      this.lastAngle = 0;
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
              strokeColor: _this.path.strokeColor,
              strokeWidth: _this.path.strokeWidth
            });
          }
        }
      };

      // Key for saving mouse tool as data attribute
      // TODO: It seems its main use is for destroy the old paperjs mouse tool
      // when a new Overlay is instantiated. Maybe a better scheme can be
      // devised in the future?
      this.mouseToolKey = 'draw_canvas_' + _this.windowId;

      this.setMouseTool();
      this.listenForActions();
    },

    /**
     * Adds a Tool that handles mouse events for the paperjs scope.
     */
    setMouseTool: function() {
      this.removeMouseTool();
      this.paperScope.activate();

      this.mouseTool = new this.paperScope.Tool();
      this.mouseTool.overlay = this;
      this.mouseTool.onMouseUp = this.onMouseUp;
      this.mouseTool.onMouseDrag = this.onMouseDrag;
      this.mouseTool.onMouseMove = this.onMouseMove;
      this.mouseTool.onMouseDown = this.onMouseDown;
      this.mouseTool.onDoubleClick = this.onDoubleClick;
      this.mouseTool.onKeyDown = function(event){};
    },

    /**
     * Removes the mouse Tool from the paperjs scope.
     */
    removeMouseTool: function() {
      if (this.mouseTool) {
        this.mouseTool.remove();
      }
    },

    handleDeleteShapeEvent: function (event, shape) {
      var _this = this;
      new $.DialogBuilder(this.slotWindowElement).dialog({
        message: i18next.t('deleteShape'),
        closeButton: false,
        className: 'mirador-dialog',
        buttons: {
          'no': {
            label: i18next.t('no'),
            className: 'btn-default',
            callback: function() {
              return;
            }
          },
          'yes': {
            label: i18next.t('yes'),
            className: 'btn-primary',
            callback: function() {
              _this.deleteShape(shape);
            }
          }
        }
      });
    },

    listenForActions: function() {
      var _this = this;

      this._thisResize = function(){
        _this.resize();
      };
      this._thisRotate = function(event) {
        _this.rotate(event);
        _this.resize();
      };
      this.viewer.addHandler('animation', this._thisResize);
      this.viewer.addHandler('open', this._thisResize);
      this.viewer.addHandler('animation-finish', this._thisResize);
      this.viewer.addHandler('update-viewport', this._thisResize);
      this.viewer.addHandler('resize',this._thisResize);
      this.viewer.addHandler('rotate', this._thisRotate);
      this.viewer.addHandler('constrain',this._thisResize);

      this._thisDestroy = function(){
        _this.destroy();
      };

      this.viewer.addHandler('close',this._thisDestroy);

      this.eventsSubscriptions.push(this.eventEmitter.subscribe('DESTROY_EVENTS.'+this.windowId, function(event) {
        _this.destroy();
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('toggleDrawingTool.' + _this.windowId, function(event, tool) {
        //qtip code should NOT be here
        if (_this.disabled) {
        //   jQuery('.qtip' + _this.windowId).qtip('hide');
          return;
        }
        // jQuery('#' + _this.osdViewerId).parents('.window').find('.qtip-viewer').hide();
        _this.currentTool = null;
        _this.mode = '';
        for (var i = 0; i < _this.tools.length; i++) {
          if (_this.tools[i].logoClass === tool) {
            _this.currentTool = _this.tools[i];
          }
        }
      }));

      var _thisHandleDeleteShapeEvent = function(event,shape){
        _this.handleDeleteShapeEvent(event,shape);
      };
      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('deleteShape.' + _this.windowId, _thisHandleDeleteShapeEvent));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('changeBorderColor.' + _this.windowId, function(event, color) {
        _this.strokeColor = color;
        if (_this.hoveredPath) {
          _this.hoveredPath.strokeColor = color;
          _this.paperScope.view.draw();
        }
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('changeFillColor.' + _this.windowId, function(event, color, alpha) {
        _this.fillColor = color;
        if(alpha === 0){
          alpha = FILL_COLOR_ALPHA_WORKAROUND;
        }
        _this.fillColorAlpha = alpha;
        if (_this.hoveredPath && _this.hoveredPath.closed) {
          _this.hoveredPath.fillColor = color;
          _this.hoveredPath.fillColor.alpha = alpha;
          _this.paperScope.view.draw();
        }
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('toggleBorderType.' + _this.windowId, function (event, type) {
        if (type == 'solid') {
          _this.dashArray = [];
          _this.strokeWidth = 1;
        } else if (type == 'thick') {
          _this.dashArray = [];
          _this.strokeWidth = 3;
        } else if (type == 'thickest') {
          _this.dashArray = [];
          _this.strokeWidth = 6;
        } else if (type == 'dashed') {
          _this.dashArray = [5, 5];
          _this.strokeWidth = 1;
        } else if (type == 'dotdashed') {
          _this.dashArray = [2, 5, 7, 5];
          _this.strokeWidth = 1;
        }
        if (_this.hoveredPath) {
          _this.hoveredPath.dashArray = _this.dashArray;
          _this.hoveredPath.strokeWidth = _this.strokeWidth;
          _this.paperScope.view.draw();
        }
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('annotationEditSave.'+_this.windowId,function(event,oaAnno){
        var onAnnotationSaved = jQuery.Deferred();
        if (!_this.draftPaths.length) {
            new $.DialogBuilder(_this.slotWindowElement).dialog({
              message: i18next.t('editModalSaveAnnotationWithNoShapesMsg'),
              closeButton: false,
              className: 'mirador-dialog',
              buttons: {
                success: {
                  label: i18next.t('editModalBtnSaveWithoutShapes'),
                  className: 'btn-success',
                  callback: function () {
                    oaAnno.on = {
                      "@type": "oa:SpecificResource",
                      "full": _this.state.getWindowObjectById(_this.windowId).canvasID
                    };
                    //save to endpoint
                    _this.eventEmitter.publish('annotationUpdated.' + _this.windowId, [oaAnno]);
                    onAnnotationSaved.resolve();
                  }
                },
                danger: {
                  label: i18next.t('editModalBtnDeleteAnnotation'),
                  className: 'btn-danger',
                  callback: function () {
                    _this.eventEmitter.publish('annotationDeleted.' + _this.windowId, [oaAnno['@id']]);
                    onAnnotationSaved.resolve();
                  }
                },
                main: {
                  label: i18next.t('cancel'),
                  className: 'btn-default',
                  callback: function () {
                    onAnnotationSaved.reject();
                  }
                }
              }
            });
        } else {
          var writeStrategy = new $.MiradorDualStrategy();
          writeStrategy.buildAnnotation({
            annotation: oaAnno,
            window: _this.state.getWindowObjectById(_this.windowId),
            overlay: _this
          });
          //save to endpoint
          _this.eventEmitter.publish('annotationUpdated.' + _this.windowId, [oaAnno]);
          onAnnotationSaved.resolve();
        }

        jQuery.when(onAnnotationSaved.promise()).then(function(){
          _this.eventEmitter.publish('annotationEditSaveSuccessful.'+_this.windowId);
          _this.eventEmitter.publish('SET_ANNOTATION_EDITING.' + _this.windowId, {
            "annotationId" : oaAnno['@id'],
            "isEditable" : false,
            "tooltip" : _this
          });
          // return to pointer mode
          _this.inEditOrCreateMode = false;
          _this.eventEmitter.publish('SET_STATE_MACHINE_POINTER.' + _this.windowId);

        },function(){
          // confirmation rejected don't do anything
        });


      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('annotationEditCancel.'+_this.windowId,function(event,id){

        _this.eventEmitter.publish('SET_ANNOTATION_EDITING.' + _this.windowId, {
          "annotationId" : id,
          "isEditable" : false,
          "tooltip" : _this.annoTooltip // whats the point of this? maybe when we add confirm for cancel?
        });
        _this.inEditOrCreateMode = false;
        // return to pointer mode
        _this.eventEmitter.publish('SET_STATE_MACHINE_POINTER.' +_this.windowId);

      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('clearDraftPaths.'+_this.windowId,function(){
        _this.clearDraftData();
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('onAnnotationCreated.'+_this.windowId,function(event,oaAnno){
        //should remove the styles added for newly created annotation
        for(var i=0;i<_this.draftPaths.length;i++){
          if(_this.draftPaths[i].data && _this.draftPaths[i].data.newlyCreated){
            _this.draftPaths[i].strokeWidth = _this.draftPaths[i].data.strokeWidth; // TODO: removed newlyCreatedStrokeFactor stuff here
            delete _this.draftPaths[i].data.newlyCreated;
            delete _this.draftPaths[i].data.newlyCreatedStrokeFactor;
          }
        }

        var writeStrategy = new $.MiradorDualStrategy();
        writeStrategy.buildAnnotation({
          annotation: oaAnno,
          window: _this.state.getWindowObjectById(_this.windowId),
          overlay: _this
        });
        //save to endpoint
        _this.eventEmitter.publish('annotationCreated.' + _this.windowId, [oaAnno, function() {
          // stuff that needs to be called after the annotation has been created on the backend
          // return to pointer mode
          _this.inEditOrCreateMode = false;
          _this.eventEmitter.publish('SET_STATE_MACHINE_POINTER.' + _this.windowId);

          //reenable viewer tooltips
          _this.eventEmitter.publish('enableTooltips.' + _this.windowId);

          _this.clearDraftData();
          _this.annoTooltip = null;
          _this.annoEditorVisible = false;
        }]);
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('onAnnotationCreatedCanceled.'+_this.windowId,function(event,cancelCallback,immediate){
        var cancel = function(){
          _this.inEditOrCreateMode = false;
          _this.eventEmitter.publish('SET_STATE_MACHINE_POINTER.' + _this.windowId);

          _this.clearDraftData();
          _this.annoTooltip = null;
          _this.annoEditorVisible = false;
        };
        if (!immediate) {
          new $.DialogBuilder(_this.slotWindowElement).dialog({
            message: i18next.t('cancelAnnotation'),
            closeButton: false,
            className: 'mirador-dialog',
            buttons: {
              'no': {
                label: i18next.t('no'),
                className: 'btn-default',
                callback: function() {
                  return;
                }
              },
              'yes': {
                label: i18next.t('yes'),
                className: 'btn-primary',
                callback: function() {
                  cancel();
                  if (cancelCallback) {
                    cancelCallback();
                  }
                }
              }
            }
          });
        } else {
          cancel();
        }
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('onAnnotationDeleted.' + _this.windowId, function(event, id, callback) {
        _this.inEditOrCreateMode = false;
        _this.eventEmitter.publish('annotationDeleted.' + _this.windowId, [id]);
        _this.eventEmitter.publish('SET_STATE_MACHINE_POINTER.' + _this.windowId);
        if (callback) {
          callback();
        }
      }));

      this.eventsSubscriptions.push(this.eventEmitter.subscribe('SET_OVERLAY_TOOLTIP.' + this.windowId, function(event, options) {
        _this.annoTooltip = options.tooltip;
        _this.annoEditorVisible = options.visible;
        _this.draftPaths = options.paths;
      }));

      this.eventsSubscriptions.push(this.eventEmitter.subscribe('CANCEL_ACTIVE_ANNOTATIONS.' + this.windowId, function(event) {
        //for now, don't worry about getting user confirmation, just cancel everything
        _this.clearDraftData();
        _this.annoTooltip = null;
        _this.annoEditorVisible = false;
      }));

      this.eventsSubscriptions.push(this.eventEmitter.subscribe("ANNOTATIONS_LIST_UPDATED",function(event,options){
        if(options.windowId) {
          _this.eventEmitter.publish("refreshOverlay." + _this.windowId);
        }
      }));

      this.eventsSubscriptions.push(this.eventEmitter.subscribe("enableManipulation",function(event, tool){
        if(tool === 'mirror') {
          _this.horizontallyFlipped = true;
        }
      }));

      this.eventsSubscriptions.push(this.eventEmitter.subscribe("disableManipulation",function(event, tool){
        if(tool === 'mirror') {
          _this.horizontallyFlipped = false;
        }
      }));
    },

    deleteShape:function(shape){

      for(var i=0;i<this.draftPaths.length;i++){
        if(this.draftPaths[i]._name.toString() === shape._name.toString()){
          this.draftPaths.splice(i,1);
          break;
        }
      }
      this.removeFocus();
      shape.remove();
    },

    getMousePositionInImage: function(mousePosition) {
      var _this = this;
      var originWindow = this.state.getWindowObjectById(this.windowId);
      var currentCanvasModel = originWindow.canvases[originWindow.canvasID];

      if (mousePosition.x < 0) {
        mousePosition.x = 0;
      }
      if (mousePosition.x > currentCanvasModel.getBounds().width) {
        mousePosition.x = currentCanvasModel.getBounds().width;
      }
      if (mousePosition.y < 0) {
        mousePosition.y = 0;
      }
      if (mousePosition.y > currentCanvasModel.getBounds().height) {
        mousePosition.y = currentCanvasModel.getBounds().height;
      }
      if (this.horizontallyFlipped) {
        mousePosition.x = currentCanvasModel.getBounds().width - mousePosition.x;
      }
      return mousePosition;
    },

    adjustDeltaForShape: function(lastPoint, currentPoint, delta, bounds) {
      var originWindow = this.state.getWindowObjectById(this.windowId);
      var currentCanvasModel = originWindow.canvases[originWindow.canvasID];

      //first check along x axis
      if (lastPoint.x < currentPoint.x) {
        //moving to the right, delta should be based on the right most edge
        if (bounds.x + bounds.width > currentCanvasModel.getBounds().width) {
          delta.x = currentCanvasModel.getBounds().width - (bounds.x + bounds.width);
        }
      } else {
        //moving to the left, prevent it from going past the left edge.  if it does, use the shapes x value as the delta
        if (bounds.x < 0) {
          delta.x = Math.abs(bounds.x);
        }
      }
      if (this.horizontallyFlipped) {
        delta.x = -delta.x;
      }

      //check along y axis
      if (lastPoint.y < currentPoint.y) {
        // moving to the bottom
        if (bounds.y + bounds.height > currentCanvasModel.getBounds().height) {
          delta.y = currentCanvasModel.getBounds().height - (bounds.y + bounds.height);
        }
      } else {
        //moving to the top
        if (bounds.y < 0) {
          delta.y = Math.abs(bounds.y);
        }
      }

      return delta;
    },

    onMouseUp: function(event) {
      if (!this.overlay.disabled) {
        event.stopPropagation();
        //jQuery(this.overlay.viewer.canvas).css('cursor','default');
        // if (this.overlay.mode === 'deform' || this.overlay.mode === 'edit') {
        //   this.overlay.segment = null;
        //   this.overlay.()) = null;
        // }
        // if (this.overlay.mode != 'create') {
        //   this.overlay.mode = '';
        // }
        if (this.overlay.currentTool) {
          //we may not currently have a tool if the user is in edit mode and didn't click on an editable shape
          this.overlay.currentTool.onMouseUp(event, this.overlay);
        }
      }
    },

    onMouseDrag: function(event) {
      if (!this.overlay.disabled) {
        event.stopPropagation();
        if (this.overlay.currentTool) {
          if (this.overlay.currentTool.name === 'Freehand' && this.overlay.mode === 'create') {
            //freehand create needs to use mouse position because bounds are not accurate until shape is finished
            event.point = this.overlay.getMousePositionInImage(event.point);
            event.delta = event.point - event.lastPoint;
          } else {
            if(this.overlay.path){
              var bounds = this.overlay.path.bounds;
              // we already have a shape, and we are moving it, need to account for that, rather than mouse position
              event.delta = this.overlay.adjustDeltaForShape(event.lastPoint, event.point, event.delta, bounds);
            }
          }
          //we may not currently have a tool if the user is in edit mode and didn't click on an editable shape
          this.overlay.currentTool.onMouseDrag(event, this.overlay);
        }
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
      if (!this.overlay.disabled) {
        //We are in drawing mode
        if (this.overlay.paperScope.project.hitTest(event.point, this.overlay.hitOptions)) {
          this.overlay.eventEmitter.publish('POINTER_CURSOR.' + this.overlay.windowId);
        } else if (this.overlay.currentTool && !this.overlay.path) {
          this.overlay.eventEmitter.publish('CROSSHAIR_CURSOR.' + this.overlay.windowId);
        } else {
          this.overlay.eventEmitter.publish('DEFAULT_CURSOR.' + this.overlay.windowId);
        }
        event.stopPropagation();
        if (this.overlay.currentTool) {
          this.overlay.currentTool.onMouseMove(event, this.overlay);
        }
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
      if (this.overlay.disabled) {
        return;
      }
      event.stopPropagation();
      var date = new Date();
      var time = date.getTime();
      if (time - this.overlay.latestMouseDownTime < this.overlay.doubleClickReactionTime) {
        this.overlay.latestMouseDownTime = time;
        this.onDoubleClick(event);
      } else {
        this.overlay.latestMouseDownTime = time;
        var hitResult = this.overlay.paperScope.project.hitTest(event.point, this.overlay.hitOptions);

        if (this.overlay.mode !== 'create' && this.overlay.mode !=='') {
          this.overlay.mode = '';
          this.overlay.currentTool = null;
        }

        if (hitResult && this.overlay.mode !== 'create') {

          var overlayEditable = false;
          if (typeof hitResult.item.data.editable !== 'undefined') {
            overlayEditable = hitResult.item.data.editable; // TODO should remove this editable variable when persisting the svg (will reduce length of string/memory)
          }
          // if item is part of shape it is editable
          // part of shape items only appear when the shape is selected
          if (hitResult.item._name.toString().indexOf(this.overlay.partOfPrefix) !== -1) {
            overlayEditable = true;
          }
          if (!overlayEditable) {
            return;
          }

        }

        if (hitResult && (!this.overlay.currentTool || (hitResult.item._name.toString().indexOf(this.overlay.currentTool.idPrefix) === -1 && this.overlay.mode === ''))) {
          var prefix = hitResult.item._name.toString();
          prefix = prefix.substring(0, prefix.indexOf('_') + 1);

          // nasty workaround some names contain `_` inside their name
          var longPrefix = hitResult.item._name.toString().split('_');

          longPrefix = longPrefix[0] + '_' + longPrefix[1] + '_';

          for (var j = 0; j < this.overlay.tools.length; j++) {

            if (this.overlay.tools[j].idPrefix === prefix || this.overlay.tools[j].idPrefix === longPrefix) {
              this.overlay.eventEmitter.publish('toggleDrawingTool.' + this.overlay.windowId, this.overlay.tools[j].logoClass);
              break;
            }
          }
        }

        if (this.overlay.currentTool) {
          this.overlay.eventEmitter.publish('HUD_REMOVE_CLASS.'+this.overlay.windowId, ['.hud-dropdown', 'hud-disabled']);
          event.point = this.overlay.getMousePositionInImage(event.point);
          this.overlay.currentTool.onMouseDown(event, this.overlay);
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
          item.selectedColor = this.selectedColor;
          shapeTool.updateSelection(selected, item, this);
        }
      }
    },

    rotate: function (event) {
      if (this.paperScope && this.paperScope.view) {
        this.paperScope.view._matrix.rotate(event.degrees-this.lastAngle, this.paperScope.view.center);
        this.lastAngle = event.degrees;
      }
    },

    resize: function() {
      var _this = this;
      var viewportBounds = this.viewer.viewport.getBounds(true);
      // var originWindow = this.state.getWindowObjectById(this.windowId);
      // if ( !originWindow.canvases ) { return; } // no-op if canvases are not initialised.
      // var currentCanvasModel = originWindow.canvases[originWindow.canvasID];

      /* in viewport coordinates */
      this.canvas.width = this.viewer.viewport.containerSize.x;
      this.canvas.height = this.viewer.viewport.containerSize.y;
      var transform = 'translate(0px,0px)';
      this.canvas.style.WebkitTransform = transform;
      this.canvas.style.msTransform = transform;
      this.canvas.style.transform = transform;
      this.canvas.style.marginLeft = '0px';
      this.canvas.style.marginTop = '0px';
      if (this.paperScope && this.paperScope.view) {
        this.paperScope.view.viewSize = new this.paperScope.Size(this.canvas.width, this.canvas.height);
        this.paperScope.view.zoom = _this.canvas.width * this.viewer.viewport.getZoom(true);
        this.paperScope.view.center = new this.paperScope.Size(
          this.viewer.viewport.getCenter(true).x,
          this.viewer.viewport.getCenter(true).y
        );

        this.paperScope.view.update(true);
        var allItems = this.paperScope.project.getItems({
          name: /_/
        });
        for (var j = 0; j < allItems.length; j++) {
          if (allItems[j].data.fixedSize) {
            this.fitFixedSizeShapes(allItems[j]);
          }
          if(this.getTool(allItems[j]).onResize){
            this.getTool(allItems[j]).onResize(allItems[j],this);
          }
          allItems[j].strokeWidth = allItems[j].data.strokeWidth / this.paperScope.view.zoom;
          if (allItems[j].style) {
            allItems[j].style.strokeWidth = allItems[j].data.strokeWidth / this.paperScope.view.zoom;
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

      cloned.data.strokeWidth = shape.data.strokeWidth || 1;
      cloned.strokeWidth = cloned.data.strokeWidth / this.paperScope.view.zoom;
      cloned.strokeColor = shape.strokeColor;
      cloned.dashArray = shape.dashArray;
      if (shape.fillColor) {
        cloned.fillColor = shape.fillColor;

        // workaround for paper js fill hit test
        if(shape.fillColor.alpha === 0){
          shape.fillColor.alpha = FILL_COLOR_ALPHA_WORKAROUND;
        }
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
      var initialPoint = {
        'x': shape.x,
        'y': shape.y
      };
      var currentMode = this.mode;
      var currentPath = this.path;
      var strokeWidth = this.strokeWidth;
      var strokeColor = this.strokeColor;
      var fillColor = this.fillColor;
      var fillColorAlpha = this.fillColorAlpha || FILL_COLOR_ALPHA_WORKAROUND;
      this.strokeColor = this.state.getStateProperty('drawingToolsSettings').strokeColor;
      this.fillColor = this.state.getStateProperty('drawingToolsSettings').fillColor;
      this.fillColorAlpha = this.state.getStateProperty('drawingToolsSettings').fillColorAlpha || FILL_COLOR_ALPHA_WORKAROUND;
      this.mode = 'create';
      this.path = rect.createShape(initialPoint, this);
      var eventData = {
        'delta': {
          'x': shape.width,
          'y': shape.height
        }
      };
      rect.onMouseDrag(eventData, this);
      paperItems.push(this.path);
      paperItems[0].data.annotation = annotation;
      this.updateSelection(false, paperItems[0]);
      this.strokeColor = strokeColor;
      this.strokeWidth = strokeWidth;
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
      if (svgDOM.documentElement.nodeName == 'parsererror') {
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
            shapeArray[idx].strokeWidth = this.editedPaths[i].strokeWidth; // TODO: removed --> / this.paperScope.view.zoom;
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
              shapeArray[idx].style.strokeWidth = shapeArray[idx].data.strokeWidth / this.paperScope.view.zoom;
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

    checkToRemoveFocus: function() {
      this.currentTool = '';
      //if we are switching between editing and drawing, remove an old path
      if (this.inEditOrCreateMode && this.path) {
        this.removeFocus();
      }
    },

    disable: function() {
      this.disabled = true;
      this.inEditOrCreateMode = false;
      this.eventEmitter.publish('enableTooltips.' + this.windowId);
      this.deselectAll();
    },

    enableEdit: function() {
      this.disabled = false;
      this.inEditOrCreateMode = true;
      this.eventEmitter.publish('disableTooltips.' + this.windowId);
    },

    enable: function() {
      this.disabled = false;
      //this.inEditOrCreateMode = false;
      this.eventEmitter.publish('disableTooltips.' + this.windowId);
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
      this.inEditOrCreateMode = true;
      if (this.hoveredPath) {
        this.updateSelection(false, this.hoveredPath);
      }

      // Set special style for newly created shapes
      var newlyCreatedStrokeFactor = this.drawingToolsSettings.newlyCreatedShapeStrokeWidthFactor || 5;
      shape.data.newlyCreatedStrokeFactor = newlyCreatedStrokeFactor;
      shape.data.newlyCreated = true;
      shape.strokeWidth = shape.data.strokeWidth * newlyCreatedStrokeFactor;

      this.hoveredPath = shape;
      this.segment = null;
      this.path = null;
      this.mode = '';
      this.draftPaths.push(shape);

      shape.data.editable = true;

      this.updateSelection(true, this.hoveredPath);
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
          onSaveClickCheck: function () {
            return _this.draftPaths.length;
          },
          onAnnotationCreated: function(oaAnno) {
            _this.eventEmitter.publish('onAnnotationCreated.'+_this.windowId,[oaAnno]);
          }
        });
        _this.annoEditorVisible = true;
      }
    },

    onEditFinish: function() {
      var _this = this;
      jQuery.each(this.draftPaths, function(index, value) {
        if (_this.path.name === value.name) {
          _this.draftPaths[index] = _this.path;
        }
      });
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
    },

    // Should unsubscribe from all events
    // Should have no references in order to be garbage collected
    destroy:function(){
      var _this = this;

      this.eventsSubscriptions.forEach(function(event){
        _this.eventEmitter.unsubscribe(event.name,event.handler);
      });

      this.viewer.removeHandler('animation',this._thisResize);
      this.viewer.removeHandler('open',this._thisResize);
      this.viewer.removeHandler('animation-finish',this._thisResize);
      this.viewer.removeHandler('update-viewport',this._thisResize);
      this.viewer.removeHandler('resize',this._thisResize);
      this.viewer.removeHandler('rotate',this._thisResize);
      this.viewer.removeHandler('constrain',this._thisResize);
      this.viewer.removeHandler('close',this._thisDestroy);
    }
  };
}(Mirador));
