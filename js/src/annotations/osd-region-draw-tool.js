(function($) {
  $.OsdRegionDrawTool = function(options) {
    jQuery.extend(this, {
      osdViewer: null,
      parent: null,
      osd: null,
      list: null,
      annotationsToShapesMap: {},
      eventEmitter: null
    }, options);

    this.eventsSubscriptions = [];

    this.init();
    this.listenForActions();
  };

  $.OsdRegionDrawTool.prototype = {

    init: function() {
      this.svgOverlay = this.osdViewer.svgOverlay(this.osdViewer.id, this.windowId, this.state, this.eventEmitter);
      this.svgOverlay.show();
      this.svgOverlay.disable();
    },

    enterCreateMode: function() {
      this.osdViewer.setMouseNavEnabled(false);
      this.svgOverlay.show();
      this.svgOverlay.enable();
    },

    enterCreateShapeMode: function() {
      if(!this.svgOverlay.inEditMode){
        this.osdViewer.setMouseNavEnabled(false);
        this.svgOverlay.show();
        this.svgOverlay.enable();
      }
    },

    enterEditMode: function() {
      this.osdViewer.setMouseNavEnabled(false);
      this.svgOverlay.show();
      this.svgOverlay.enableEdit();
    },

    exitEditMode: function(showAnnotations) {
      this.osdViewer.setMouseNavEnabled(true);
      this.svgOverlay.disable();
      if (showAnnotations) {
        this.svgOverlay.show();
      } else {
        this.svgOverlay.hide();
      }
    },

    render: function() {

      this.svgOverlay.restoreEditedShapes();
      this.svgOverlay.paperScope.activate();
      this.svgOverlay.paperScope.project.clear();
      var _this = this;
      _this.annotationsToShapesMap = {};
      var deferreds = jQuery.map(this.list, function(annotation) {
        var deferred = jQuery.Deferred();
        if (annotation.on && typeof annotation.on === 'object') {
          if (!annotation.on.selector) {
            return deferred;
          } else if (annotation.on.selector.value.indexOf('<svg') !== -1) {
            shapeArray = _this.svgOverlay.parseSVG(annotation.on.selector.value, annotation);
          } else {
            var shape = annotation.on.selector.value.split('=')[1].split(',');
            shape = _this.svgOverlay.viewer.viewport.imageToViewportRectangle(shape[0], shape[1], shape[2], shape[3]);
            shapeArray = _this.svgOverlay.createRectangle(shape, annotation);
          }
        } else if (annotation.on && typeof annotation.on === 'string') {
          var shapeObj = annotation.on.split('#')[1].split('=')[1].split(',');
          shapeObj = _this.svgOverlay.viewer.viewport.imageToViewportRectangle(shapeObj[0], shapeObj[1], shapeObj[2], shapeObj[3]);
          shapeArray = _this.svgOverlay.createRectangle(shapeObj, annotation);
        } else {
          return deferred;
        }
        _this.svgOverlay.restoreLastView(shapeArray);
        _this.annotationsToShapesMap[annotation['@id']] = shapeArray;
        return deferred;
      });
      jQuery.when.apply(jQuery, deferreds).done(function() {
        _this.eventEmitter.publish('overlaysRendered.' + _this.windowId);
      });

      var windowElement = _this.state.getWindowElement(_this.windowId);
      this.annoTooltip = new $.AnnotationTooltip({
        targetElement: jQuery(this.osdViewer.element),
        state: _this.state,
        eventEmitter: _this.eventEmitter,
        windowId: _this.windowId
      });
      this.annoTooltip.initializeViewerUpgradableToEditor({
        container: windowElement,
        viewport: windowElement,
        getAnnoFromRegion: _this.getAnnoFromRegion.bind(this)
      });
      this.svgOverlay.paperScope.view.draw();
    },

    showTooltipsFromMousePosition: function(event, location, absoluteLocation) {
      var _this = this;
      var hitOptions = {
        fill: true,
        stroke: true,
        segments: true
      };
      var hoverColor = this.state.getStateProperty('drawingToolsSettings').hoverColor;
      var annotations = [];
      for (var key in _this.annotationsToShapesMap) {
        if (_this.annotationsToShapesMap.hasOwnProperty(key)) {
          var shapeArray = _this.annotationsToShapesMap[key];
          for (var idx = 0; idx < shapeArray.length; idx++) {
            var shapeTool = this.svgOverlay.getTool(shapeArray[idx]);
            if (shapeArray[idx].hitTest(location, hitOptions)) {
              annotations.push(shapeArray[idx].data.annotation);
              if(shapeTool.onHover){
                for(var k=0;k<shapeArray.length;k++){
                  shapeTool.onHover(true,shapeArray[k],hoverColor);
                }
              }
              break;
            }else{
              if(shapeTool.onHover){
                shapeTool.onHover(false,shapeArray[idx]);
              }
            }
          }
        }
      }
      this.svgOverlay.paperScope.view.draw();
      //if (_this.svgOverlay.availableExternalCommentsPanel) {
     //   _this.eventEmitter.publish('annotationMousePosition.' + _this.windowId, [annotations]);
      //  return;
      //}
      _this.annoTooltip.showViewer({
        annotations: annotations,
        triggerEvent: event,
        shouldDisplayTooltip: function(api) {
          //track whether the cursor is within the tooltip (with the specified tolerance) and disables show/hide/update functionality.
          if (api.elements.tooltip) {
            var cursorWithinTooltip = true;
            var leftSide = api.elements.tooltip.offset().left - _this.svgOverlay.hitOptions.tolerance;
            var rightSide = api.elements.tooltip.offset().left + api.elements.tooltip.width() + _this.svgOverlay.hitOptions.tolerance;
            if (absoluteLocation.x < leftSide || rightSide < absoluteLocation.x) {
              cursorWithinTooltip = false;
            }
            var topSide = api.elements.tooltip.offset().top - _this.svgOverlay.hitOptions.tolerance;
            var bottomSide = api.elements.tooltip.offset().top + api.elements.tooltip.height() + _this.svgOverlay.hitOptions.tolerance;
            if (absoluteLocation.y < topSide || bottomSide < absoluteLocation.y) {
              cursorWithinTooltip = false;
            }
            return !cursorWithinTooltip;
          }
          return true;
        }
      });
    },

    listenForActions: function() {
      var _this = this;

      this._thisDestroy = function(){
        _this.destroy();
      };

      _this.osdViewer.addHandler('close', this._thisDestroy);

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('refreshOverlay.' + _this.windowId, function(event) {
        _this.eventEmitter.publish('modeChange.' + _this.windowId, 'displayAnnotations');
        // return to pointer mode
        _this.eventEmitter.publish('SET_STATE_MACHINE_POINTER.' + _this.windowId);
        _this.svgOverlay.restoreEditedShapes();
        _this.svgOverlay.deselectAll();
        _this.svgOverlay.mode = '';
        _this.render();
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('updateTooltips.' + _this.windowId, function(event, location, absoluteLocation) {
        if (_this.annoTooltip && !_this.annoTooltip.inEditOrCreateMode) {
          _this.showTooltipsFromMousePosition(event, location, absoluteLocation);
        }
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('removeTooltips.' + _this.windowId, function() {
        jQuery(_this.osdViewer.element).qtip('destroy', true);
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('disableTooltips.' + _this.windowId, function() {
        if (_this.annoTooltip) {
          _this.annoTooltip.inEditOrCreateMode = true;
        }
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('enableTooltips.' + _this.windowId, function() {
        if (_this.annoTooltip) {
          _this.annoTooltip.inEditOrCreateMode = false;
        }
        _this.svgOverlay.restoreDraftShapes();
      }));

      this.eventsSubscriptions.push(_this.eventEmitter.subscribe('SET_ANNOTATION_EDITING.' + _this.windowId, function(event, options) {
        jQuery.each(_this.annotationsToShapesMap, function(key, paths) {
          // if we have a matching annotationId, pass the boolean value on for each path, otherwise, always pass false
          if (key === options.annotationId) {
            if (options.isEditable) {
              _this.eventEmitter.publish('SET_OVERLAY_TOOLTIP.' + _this.windowId, {"tooltip" : options.tooltip, "visible" : true, "paths" : paths});
            } else {
              _this.eventEmitter.publish('SET_OVERLAY_TOOLTIP.' + _this.windowId, {"tooltip" : null, "visible" : false, "paths" : []});
            }
            jQuery.each(paths, function(index, path) {
              //just in case, force the shape to be non hovered
              var tool = _this.svgOverlay.getTool(path);
              tool.onHover(false, path);

              path.data.editable = options.isEditable;
              if (options.isEditable) {
                path.data.currentStrokeValue = path.data.editStrokeValue;
                path.strokeWidth = path.data.currentStrokeValue / _this.svgOverlay.paperScope.view.zoom;
              } else {
                path.data.currentStrokeValue = path.data.defaultStrokeValue;
                path.strokeWidth = path.data.currentStrokeValue / _this.svgOverlay.paperScope.view.zoom;
              }
            });
          } else {
            jQuery.each(paths, function(index, path) {
              path.data.editable = false;
            });
          }
        });
        _this.svgOverlay.paperScope.view.draw();
      }));
    },

    getAnnoFromRegion: function(regionId) {
      return this.list.filter(function(annotation) {
        return annotation['@id'] === regionId;
      });
    },

    destroy: function () {
      var _this = this;
      this.eventsSubscriptions.forEach(function(event){
        _this.eventEmitter.unsubscribe(event.name,event.handler);
      });
      this.osdViewer.removeHandler('close', this._thisDestroy);
    }

  };
}(Mirador));
