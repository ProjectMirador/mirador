(function($) {
  $.OsdRegionDrawTool = function(options) {
    jQuery.extend(this, {
      osdViewer: null,
      parent: null,
      osd: null,
      list: null,
      annotationsToShapesMap: {},
      inEditOrCreateMode: false
    }, options);

    this.init();
    this.bindEvents();
  };

  $.OsdRegionDrawTool.prototype = {

    init: function() {
      this.svgOverlay = this.osdViewer.svgOverlay(this.parent, this.state);
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
                  jQuery.publish('annotationDeleted.' + _this.parent.windowId, [oaAnno['@id']]);
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
                  jQuery.publish('annotationUpdated.' + _this.parent.windowId, [oaAnno]);
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
        jQuery.publish('annotationUpdated.' + _this.parent.windowId, [oaAnnos[j]]);
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
        jQuery.publish('overlaysRendered.' + _this.parent.windowId);
      });

      var windowElement = _this.state.getWindowElement(_this.windowId);

      this.tooltips = jQuery(this.osdViewer.element).qtip({
        overwrite: false,
        content: {
          text: ''
        },
        position: {
          target: 'mouse',
          my: 'bottom left',
          at: 'top right',
          adjust: {
            mouse: false,
            method: 'shift'
          },
          container: windowElement,
          viewport: windowElement
        },
        style: {
          classes: 'qtip-bootstrap qtip-viewer',
          tip: false
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
          visible: function(event, api) {
            _this.removeAnnotationEvents(event, api);
            _this.annotationEvents(event, api);
          },
          move: function(event, api) {
            _this.removeAnnotationEvents(event, api);
            _this.annotationEvents(event, api);
            _this.annotationSaveEvent(event, api);
          }
        }
      });
      var api = jQuery(this.osdViewer.element).qtip('api');
      api.cache.annotations = [];
      api.cache.hidden = true;
      this.svgOverlay.paperScope.view.draw();
    },

    setTooltipContent: function(api, annotations) {
      var _this = this;
      var annoTooltip = new $.AnnotationTooltip({"windowId": _this.parent.windowId});
      api.set({'content.text': annoTooltip.getViewer(annotations)});
      jQuery.publish('tooltipViewerSet.' + _this.parent.windowId);
    },

    showTooltipsFromMousePosition: function(event, location, absoluteLocation) {
      var _this = this;
      var hitOptions = {
        fill: true,
        stroke: true,
        segments: true
      };
      var annotations = [];
      for (var key in _this.annotationsToShapesMap) {
        if (_this.annotationsToShapesMap.hasOwnProperty(key)) {
          var shapeArray = _this.annotationsToShapesMap[key];
          for (var idx = 0; idx < shapeArray.length; idx++) {
            if (shapeArray[idx].hitTest(location, hitOptions)) {
              annotations.push(shapeArray[idx].data.annotation);
              break;
            }
          }
        }
      }
      var api = jQuery(this.osdViewer.element).qtip('api');
      if (api) {
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
          if (cursorWithinTooltip) {
            return;
          }
        }
        if (annotations.length === 0) {
          if (!api.cache.hidden) {
            api.disable(false);
            api.hide(event);
            api.cache.annotations = [];
            api.cache.hidden = true;
            api.disable(true);
          }
        } else {
          var oldAnnotations = api.cache.annotations;
          var isTheSame = oldAnnotations.length == annotations.length;
          if (isTheSame) {
            for (var i = 0; i < annotations.length; i++) {
              if (oldAnnotations[i] != annotations[i]) {
                isTheSame = false;
                break;
              }
            }
          }
          if (api.cache.hidden || !isTheSame) {
            api.disable(false);
            this.setTooltipContent(api, annotations);
            api.cache.origin = event;
            api.reposition(event, true);
            api.show(event);
            api.cache.annotations = annotations;
            api.cache.hidden = false;
            api.disable(true);
          }
        }
      }
    },

    bindEvents: function() {
      var _this = this;

      jQuery.subscribe('refreshOverlay.' + _this.parent.windowId, function(event) {
        _this.svgOverlay.restoreEditedShapes();
        _this.svgOverlay.deselectAll();
        _this.svgOverlay.mode = '';
        _this.render();
      });
      jQuery.subscribe('deleteShape.' + _this.parent.windowId, function(event) {
        _this.deleteShape();
      });
      jQuery.subscribe('updateEditedShape.' + _this.parent.windowId, function(event) {
        _this.saveEditedShape();
      });

      jQuery.subscribe('updateTooltips.' + _this.parent.windowId, function(event, location, absoluteLocation) {
        if (!_this.inEditOrCreateMode) {
          _this.showTooltipsFromMousePosition(event, location, absoluteLocation);
        }
      });

      jQuery.subscribe('removeTooltips.' + _this.parent.windowId, function() {
        jQuery(_this.osdViewer.element).qtip('destroy', true);
      });

      jQuery.subscribe('disableTooltips.' + _this.parent.windowId, function() {
        _this.inEditOrCreateMode = true;
      });

      jQuery.subscribe('enableTooltips.' + _this.parent.windowId, function() {
        _this.inEditOrCreateMode = false;
        _this.svgOverlay.restoreDraftShapes();
      });
    },

    getAnnoFromRegion: function(regionId) {
      return this.list.filter(function(annotation) {
        return annotation['@id'] === regionId;
      });
    },

    freezeQtip: function(api, oaAnno, annoTooltip) {
      this.inEditOrCreateMode = true;
      api.set({
        'content.text': annoTooltip.getEditor(oaAnno),
        'hide.event': false
      });
      jQuery.publish('annotationEditorAvailable.' + this.parent.windowId);
      //add rich text editor
      tinymce.init({
        selector: 'form.annotation-tooltip textarea',
        plugins: "image link media",
        menubar: false,
        statusbar: false,
        toolbar_items_size: 'small',
        toolbar: "bold italic | bullist numlist | link image media | removeformat",
        setup: function(editor) {
          editor.on('init', function(args) {
            tinymce.execCommand('mceFocus', false, args.target.id);
          });
        }
      });
      jQuery(api.elements.tooltip).removeClass("qtip-viewer");
    },

    unFreezeQtip: function(api, oaAnno, annoTooltip) {
      this.inEditOrCreateMode = false;
      api.set({
        'content.text': annoTooltip.getViewer([oaAnno]),
        'hide.event': 'mouseleave'
      }).hide();
      jQuery(api.elements.tooltip).addClass("qtip-viewer");
    },

    removeAnnotationEvents: function(tooltipevent, api) {
      var _this = this;
      var editorSelector = '#annotation-editor-' + _this.parent.windowId;
      var viewerSelector = '#annotation-viewer-' + _this.parent.windowId;
      jQuery(viewerSelector + ' a.delete').off("click");
      jQuery(viewerSelector + ' a.edit').off("click");
      jQuery(editorSelector + ' a.save').off("click");
      jQuery(editorSelector + ' a.cancel').off("click");
    },

    annotationEvents: function(tooltipevent, api) {
      var _this = this;
      var annoTooltip = new $.AnnotationTooltip({"windowId": _this.parent.windowId});
      var selector = '#annotation-viewer-' + _this.parent.windowId;
      jQuery(selector + ' a.delete').on("click", function(event) {
        event.preventDefault();
        if (!window.confirm("Do you want to delete this annotation?")) {
          return false;
        }
        var display = jQuery(this).parents('.annotation-display');
        var id = display.attr('data-anno-id');
        jQuery.publish('annotationDeleted.' + _this.parent.windowId, [id]);
        api.hide();
        display.remove();
      });

      jQuery(selector + ' a.edit').on("click", function(event) {
        event.preventDefault();
        var display = jQuery(this).parents('.annotation-display');
        var id = display.attr('data-anno-id');
        var oaAnno = _this.getAnnoFromRegion(id)[0];
        _this.freezeQtip(api, oaAnno, annoTooltip);
        _this.annotationSaveEvent(event, api);
      });
    },

    annotationSaveEvent: function(event, api) {
      var _this = this;
      var annoTooltip = new $.AnnotationTooltip({"windowId": _this.parent.windowId});
      var selector = '#annotation-editor-' + _this.parent.windowId;

      jQuery(selector).on("submit", function(event) {
        event.preventDefault();
        jQuery(selector + ' a.save').click();
      });

      jQuery(selector + ' a.save').on("click", function(event) {
        event.preventDefault();
        var display = jQuery(this).parents('.annotation-editor');
        var id = display.attr('data-anno-id');
        var oaAnno = _this.getAnnoFromRegion(id)[0];

        var tagText = jQuery(this).parents('.annotation-editor').find('.tags-editor').val(),
          resourceText = tinymce.activeEditor.getContent(),
          tags = [];
        tagText = $.trimString(tagText);
        if (tagText) {
          tags = tagText.split(/\s+/);
        }

        var bounds = _this.svgOverlay.viewer.viewport.getBounds(true);
        // var scope = _this.svgOverlay.viewer.viewport.viewportToImageRectangle(bounds);

        // if (!oaAnno.on.scope) {
        //   oaAnno.on.scope = {
        //     "@context": "http://www.harvard.edu/catch/oa.json",
        //     "@type": "catch:Viewport"
        //   };
        // }
        // oaAnno.on.scope.value = "xywh=" + Math.round(scope.x) + "," + Math.round(scope.y) + "," + Math.round(scope.width) + "," + Math.round(scope.height); //osd bounds
        // oaAnno.on.selector.value remains the same

        var motivation = [],
          resource = [];

        //remove all tag-related content in annotation
        oaAnno.motivation = jQuery.grep(oaAnno.motivation, function(value) {
          return value !== "oa:tagging";
        });
        oaAnno.resource = jQuery.grep(oaAnno.resource, function(value) {
          return value["@type"] !== "oa:Tag";
        });
        //re-add tagging if we have them
        if (tags.length > 0) {
          oaAnno.motivation.push("oa:tagging");
          jQuery.each(tags, function(index, value) {
            oaAnno.resource.push({
              "@type": "oa:Tag",
              "chars": value
            });
          });
        }
        jQuery.each(oaAnno.resource, function(index, value) {
          if (value["@type"] === "dctypes:Text") {
            value.chars = resourceText;
          }
        });
        //save to endpoint
        jQuery.publish('annotationUpdated.' + _this.parent.windowId, [oaAnno]);
      });

      jQuery(selector + ' a.cancel').on("click", function(event) {
        event.preventDefault();
        var display = jQuery(this).parents('.annotation-editor');
        var id = display.attr('data-anno-id');
        var oaAnno = _this.getAnnoFromRegion(id)[0];
        _this.unFreezeQtip(api, oaAnno, annoTooltip);
      });
    }
  };
}(Mirador));