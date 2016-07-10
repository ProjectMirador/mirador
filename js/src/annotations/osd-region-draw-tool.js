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

    this.init();
    this.bindEvents();
  };

  $.OsdRegionDrawTool.prototype = {

    init: function() {
      this.svgOverlay = this.osdViewer.svgOverlay(this.osdViewer.id, this.windowId, this.state, this.eventEmitter);
      this.svgOverlay.show();
      this.svgOverlay.disable();
    },

    enterEditMode: function() {
      this.osdViewer.setMouseNavEnabled(false);
      this.svgOverlay.show();
      this.svgOverlay.enable();
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

    deleteShape: function() {
      var _this = this;
      if (_this.svgOverlay.hoveredPath) {
        var oaAnno = null;
        for (var key in _this.annotationsToShapesMap) {
          if (_this.annotationsToShapesMap.hasOwnProperty(key)) {
            var shapeArray = _this.annotationsToShapesMap[key];
            for (var idx = 0; idx < shapeArray.length; idx++) {
              if (shapeArray[idx].name == _this.svgOverlay.hoveredPath.name) {
                oaAnno = shapeArray[idx].data.annotation;
                if (shapeArray.length == 1) {
                  if (!window.confirm("Do you want to delete this shape and annotation?")) {
                    return false;
                  }
                  _this.eventEmitter.publish('annotationDeleted.' + _this.windowId, [oaAnno['@id']]);
                  this.svgOverlay.removeFocus();
                  return true;
                } else {
                  if (!window.confirm("Do you want to delete this shape?")) {
                    return false;
                  }
                  shapeArray.splice(idx, 1);
                  // backward compatibility
                  if (typeof oaAnno.on !== 'object') {
                    oaAnno.on = {
                      'selector': {
                        'value': ''
                      }
                    };
                  }
                  oaAnno.on.selector.value = _this.svgOverlay.getSVGString(shapeArray);
                  _this.eventEmitter.publish('annotationUpdated.' + _this.windowId, [oaAnno]);
                  this.svgOverlay.removeFocus();
                  return true;
                }
              }
            }
          }
        }
      }
    },

    saveEditedShape: function() {
      var _this = this;
      var oaAnnos = [];
      for (var key in _this.annotationsToShapesMap) {
        if (_this.annotationsToShapesMap.hasOwnProperty(key)) {
          var shapeArray = _this.annotationsToShapesMap[key];
          var annotationShapesAreEdited = false;
          for (var i = 0; i < _this.svgOverlay.editedPaths.length; i++) {
            for (var idx = 0; idx < shapeArray.length; idx++) {
              if (shapeArray[idx].name == _this.svgOverlay.editedPaths[i].name) {
                oaAnnos.push(shapeArray[idx].data.annotation);
                // backward compatibility
                if (typeof oaAnnos[oaAnnos.length - 1].on !== 'object') {
                  oaAnnos[oaAnnos.length - 1].on = {
                    'selector': {
                      'value': ''
                    }
                  };
                }
                oaAnnos[oaAnnos.length - 1].on.selector.value = _this.svgOverlay.getSVGString(shapeArray);
                annotationShapesAreEdited = true;
                break;
              }
            }
            if (annotationShapesAreEdited) {
              break;
            }
          }
        }
      }
      for (var j = 0; j < oaAnnos.length; j++) {
        _this.eventEmitter.publish('annotationUpdated.' + _this.windowId, [oaAnnos[j]]);
      }
      this.svgOverlay.restoreEditedShapes();
    },

    render: function() {
      this.svgOverlay.restoreEditedShapes();
      this.svgOverlay.paperScope.activate();
      this.svgOverlay.paperScope.project.clear();
      var _this = this;
      _this.annotationsToShapesMap = {};
      var deferreds = jQuery.map(this.list, function(annotation) {
        var deferred = jQuery.Deferred();
        var shapeArray;
        if (typeof annotation.on === 'object') {
          if (annotation.on.selector.value.indexOf('<svg') != -1) {
            shapeArray = _this.svgOverlay.parseSVG(annotation.on.selector.value, annotation);
          } else {
            var shape = annotation.on.selector.value.split('=')[1].split(',');
            shape = _this.svgOverlay.viewer.viewport.imageToViewportRectangle(shape[0], shape[1], shape[2], shape[3]);
            shapeArray = _this.svgOverlay.createRectangle(shape, annotation);
          }
        } else {
          var shapeObj = annotation.on.split('#')[1].split('=')[1].split(',');
          shapeObj = _this.svgOverlay.viewer.viewport.imageToViewportRectangle(shapeObj[0], shapeObj[1], shapeObj[2], shapeObj[3]);
          shapeArray = _this.svgOverlay.createRectangle(shapeObj, annotation);
        }
        _this.svgOverlay.restoreLastView(shapeArray);
        _this.annotationsToShapesMap[$.genUUID()] = shapeArray;
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
        windowId: _this.parent.windowId
      });
      this.annoTooltip.initializeViewerUpgradableToEditor({
        container: windowElement,
        viewport: windowElement,
        getAnnoFromRegion: _this.getAnnoFromRegion.bind(this),
        onAnnotationSaved: function(oaAnno) {
          //save to endpoint
          _this.eventEmitter.publish('annotationUpdated.' + _this.windowId, [oaAnno]);
        }
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
      if (_this.svgOverlay.availableExternalCommentsPanel) {
        _this.eventEmitter.publish('annotationMousePosition.' + _this.parent.windowId, [annotations]);
        return;
      }
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

    bindEvents: function() {
      var _this = this;

      _this.eventEmitter.subscribe('refreshOverlay.' + _this.windowId, function(event) {
        _this.svgOverlay.restoreEditedShapes();
        _this.svgOverlay.deselectAll();
        _this.svgOverlay.mode = '';
        _this.render();
      });
      _this.eventEmitter.subscribe('deleteShape.' + _this.windowId, function(event) {
        _this.deleteShape();
      });
      _this.eventEmitter.subscribe('updateEditedShape.' + _this.windowId, function(event) {
        _this.saveEditedShape();
      });

      _this.eventEmitter.subscribe('updateTooltips.' + _this.windowId, function(event, location, absoluteLocation) {
        if (_this.annoTooltip && !_this.annoTooltip.inEditOrCreateMode) {
          _this.showTooltipsFromMousePosition(event, location, absoluteLocation);
        }
      });

      _this.eventEmitter.subscribe('removeTooltips.' + _this.windowId, function() {
        jQuery(_this.osdViewer.element).qtip('destroy', true);
      });

      _this.eventEmitter.subscribe('disableTooltips.' + _this.windowId, function() {
        if (_this.annoTooltip) {
          _this.annoTooltip.inEditOrCreateMode = true;
        }
      });

      _this.eventEmitter.subscribe('enableTooltips.' + _this.windowId, function() {
        if (_this.annoTooltip) {
          _this.annoTooltip.inEditOrCreateMode = false;
        }
        _this.svgOverlay.restoreDraftShapes();
      });
    },

    getAnnoFromRegion: function(regionId) {
      return this.list.filter(function(annotation) {
        return annotation['@id'] === regionId;
      });
    }
  };
}(Mirador));
