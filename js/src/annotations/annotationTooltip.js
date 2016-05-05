(function($) {

  $.AnnotationTooltip = function(options) {

    jQuery.extend(this, {
      targetElement: null,
      annotations: [],
      windowId: "",
    }, options);

    this.init();
  };

  $.AnnotationTooltip.prototype = {

    init: function() {
      this.editor = $[this.state.currentConfig.annotationBodyEditor.module];
      this.editorOptions = this.state.currentConfig.annotationBodyEditor.options;

      this.activeEditor = null;
      this.activeEditorTip = null;
      this.inEditOrCreateMode = false;
    },

    /**
     * @param params: {
     *   annotation: any -- annotation JSON
     *   onAnnotationCreated: (annotation) => void
     *   onCompleted: () => void
     *   onCancel: () => void
     * }
     */
    showEditor: function(params) {
      var _this = this;
      if (_this.activeEditor) { return; }

      var editorContainer = _this.editorTemplate({
        id : jQuery.isEmptyObject(params.annotation) ? "" : params.annotation['@id'],
        windowId : _this.windowId
      });
      var selector = '#annotation-editor-' + _this.windowId;

      _this.activeEditor = new _this.editor(
        jQuery.extend({}, _this.editorOptions, {
          annotation: params.annotation,
          windowId: _this.windowId
        }));
      _this.activeEditorTip = _this.targetElement.qtip({
        content: {
          text: editorContainer
        },
        position: {
          my: 'center',
          at: 'center',
          container: _this.targetElement,
          viewport: _this.targetElement
        },
        style: {
          classes: 'qtip-bootstrap qtip' + _this.windowId
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
            jQuery.publish('annotationEditorAvailable.' + _this.windowId);
            jQuery.publish('disableTooltips.' + _this.windowId);

            jQuery(selector).parent().parent().draggable();

            jQuery(selector).on("submit", function(event) {
              event.preventDefault();
              jQuery(selector + ' a.save').click();
            });

            jQuery(selector + ' a.cancel').on("click", function(event) {
              event.preventDefault();
              if (_this.activeEditor.isDirty()) {
                if (!window.confirm("Do you want to cancel this annotation?")) {
                  return false;
                }
              }
              api.destroy();
              if (params.onCancel) { params.onCancel(); }
            });

            jQuery(selector + ' a.save').on("click", function(event) {
              event.preventDefault();

              var annotation = _this.activeEditor.createAnnotation();
              if (params.onAnnotationCreated) { params.onAnnotationCreated(annotation); }

              api.destroy();
              //reenable viewer tooltips
              jQuery.publish('enableTooltips.' + _this.windowId);
              _this.activeEditor = null;
              _this.activeEditorTip = null;

              if (params.onCompleted) { params.onCompleted(); }
            });

            _this.activeEditor.show(selector);
          }
        }
      });
      _this.activeEditorTip.qtip('show');
    },

    /**
     * @param params: {
     *   container: HTMLElement
     *   viewport: HTMLElement
     *   getAnnoFromRegion: (regionId: string) => any[]
     *   onTooltipShown: (event: QTipShowEvent, api: QTipAPI) => void
     *   onTooltipHidden: (event: QTipShowEvent, api: QTipAPI) => void
     *   onEnterEditMode: (api: QTipAPI, oaAnno: any) => void
     *   onExitEditMode: (api: QTipAPI, oaAnno: any) => void
     *   onAnnotationSaved: (annotation) => void
     * }
     */
    initializeViewerUpgradableToEditor: function(params) {
      var _this = this;
      _this.activeEditorTip = jQuery(_this.targetElement).qtip({
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
          container: params.container,
          viewport: params.viewport
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
          show: function(event, api) {
            if (params.onTooltipShown) { params.onTooltipShown(event, api); }
          },
          hidden: function(event, api) {
            if (params.onTooltipHidden) { params.onTooltipHidden(event, api); }
          },
          visible: function(event, api) {
            _this.removeAllEvents(api, params);
            _this.addViewerEvents(api, params);
          },
          move: function(event, api) {
            _this.removeAllEvents(api, params);
            _this.addViewerEvents(api, params);
            _this.addEditorEvents(api, params);
          }
        }
      });
      var api = jQuery(_this.targetElement).qtip('api');
      api.cache.annotations = [];
      api.cache.hidden = true;
    },

    removeAllEvents: function(api, viewerParams) {
      var _this = this;
      var editorSelector = '#annotation-editor-' + _this.windowId;
      var viewerSelector = '#annotation-viewer-' + _this.windowId;
      jQuery(viewerSelector + ' a.delete').off("click");
      jQuery(viewerSelector + ' a.edit').off("click");
      jQuery(editorSelector + ' a.save').off("click");
      jQuery(editorSelector + ' a.cancel').off("click");
    },

    addViewerEvents: function(api, viewerParams) {
      var _this = this;
      var selector = '#annotation-viewer-' + _this.windowId;

      jQuery(selector + ' a.delete').on("click", function(event) {
        event.preventDefault();
        if (!window.confirm("Do you want to delete this annotation?")) {
          return false;
        }
        var display = jQuery(this).parents('.annotation-display');
        var id = display.attr('data-anno-id');
        jQuery.publish('annotationDeleted.' + _this.windowId, [id]);
        api.hide();
        display.remove();
      });

      jQuery(selector + ' a.edit').on("click", function(event) {
        event.preventDefault();
        var display = jQuery(this).parents('.annotation-display');
        var id = display.attr('data-anno-id');
        var oaAnno = viewerParams.getAnnoFromRegion(id)[0];
        _this.freezeQtip(api, oaAnno, viewerParams);
        _this.removeAllEvents(api, viewerParams);
        _this.addEditorEvents(api, viewerParams);
      });
    },

    addEditorEvents: function(api, viewerParams) {
      var _this = this;
      var selector = '#annotation-editor-' + _this.windowId;

      jQuery(selector).on("submit", function(event) {
        event.preventDefault();
        jQuery(selector + ' a.save').click();
      });

      jQuery(selector + ' a.save').on("click", function(event) {
        event.preventDefault();
        var display = jQuery(this).parents('.annotation-editor');
        var id = display.attr('data-anno-id');
        var oaAnno = viewerParams.getAnnoFromRegion(id)[0];
        _this.activeEditor.updateAnnotation(oaAnno);
        viewerParams.onAnnotationSaved(oaAnno);
        _this.unFreezeQtip(api, oaAnno, viewerParams);
      });

      jQuery(selector + ' a.cancel').on("click", function(event) {
        event.preventDefault();
        var display = jQuery(this).parents('.annotation-editor');
        var id = display.attr('data-anno-id');
        var oaAnno = viewerParams.getAnnoFromRegion(id)[0];
        _this.unFreezeQtip(api, oaAnno, viewerParams);
      });
    },

    /**
     * Shows annotation tooltip initialized with
     * <code>initializeViewerUpgradableToEditor()</code>
     *
     * @param params: {
     *   annotations: any[]
     *   triggerEvent: MouseEvent
     *   shouldDisplayTooltip: (api: QTipAPI) => boolean
     * }
     */
    showViewer: function(params) {
      var _this = this;
      var api = jQuery(_this.targetElement).qtip('api');
      if (!api) { return; }
      if (params.shouldDisplayTooltip && !params.shouldDisplayTooltip(api)) {
        return;
      }
      if (params.annotations.length === 0) {
        if (!api.cache.hidden) {
          api.disable(false);
          api.hide(params.triggerEvent);
          api.cache.annotations = [];
          api.cache.hidden = true;
          api.disable(true);
        }
      } else {
        var oldAnnotations = api.cache.annotations;
        var isTheSame = oldAnnotations.length == params.annotations.length;
        if (isTheSame) {
          for (var i = 0; i < params.annotations.length; i++) {
            if (oldAnnotations[i] != params.annotations[i]) {
              isTheSame = false;
              break;
            }
          }
        }
        if (api.cache.hidden || !isTheSame) {
          api.disable(false);
          _this.setTooltipContent(params.annotations);
          api.cache.origin = params.triggerEvent;
          api.reposition(params.triggerEvent, true);
          api.show(params.triggerEvent);
          api.cache.annotations = params.annotations;
          api.cache.hidden = false;
          api.disable(true);
        }
      }
    },

    setTooltipContent: function(annotations) {
      var api = jQuery(this.targetElement).qtip('api');
      if (api) {
        api.set({'content.text': this.getViewerContent(annotations)});
        jQuery.publish('tooltipViewerSet.' + this.windowId);
      }
    },

    getViewerContent: function(annotations) {
      var annoText,
        tags = [],
        htmlAnnotations = [],
        id;

      jQuery.each(annotations, function(index, annotation) {
        tags = [];
        if (jQuery.isArray(annotation.resource)) {
          jQuery.each(annotation.resource, function(index, value) {
            if (value['@type'] === "oa:Tag") {
              tags.push(value.chars);
            } else {
              annoText = value.chars;
            }
          });
        } else {
          annoText = annotation.resource.chars;
        }
        var username = "";
        if (annotation.annotatedBy && annotation.annotatedBy.name) {
          username = annotation.annotatedBy.name;
        }
        //if it is a manifest annotation, don't allow editing or deletion
        //otherwise, check annotation in endpoint
        var showUpdate = false;
        if (annotation.endpoint !== 'manifest') {
          showUpdate = annotation.endpoint.userAuthorize('update', annotation);
        }
        var showDelete = false;
        if (annotation.endpoint !== 'manifest') {
          showDelete = annotation.endpoint.userAuthorize('delete', annotation);
        }
        htmlAnnotations.push({
          annoText : annoText,
          tags : tags,
          id : annotation['@id'],
          username : username,
          showUpdate : showUpdate,
          showDelete : showDelete
        });
      });

      var template = this.viewerTemplate({
        annotations : htmlAnnotations,
        windowId : this.windowId
      });
      return template;
      //return combination of all of them
    },

    freezeQtip: function(api, oaAnno, viewerParams) {
      if (this.inEditOrCreateMode) { throw 'AnnotationTooltip already in edit mode'; }
      this.inEditOrCreateMode = true;
      jQuery.publish('disableRectTool.' + this.windowId);
      var editorContainer = this.editorTemplate({
        id: jQuery.isEmptyObject(oaAnno) ? "" : oaAnno['@id'],
        windowId: this.windowId
      });
      api.set({
        'content.text': editorContainer,
        'hide.event': false
      });
      jQuery.publish('annotationEditorAvailable.' + this.windowId);
      //add rich text editor
      this.activeEditor = new this.editor(
        jQuery.extend({}, this.editorOptions, {
          annotation: oaAnno,
          windowId: this.windowId
        }));
      this.activeEditor.show('form.annotation-tooltip');
      jQuery(api.elements.tooltip).removeClass("qtip-viewer");
      if (viewerParams.onEnterEditMode) {
        viewerParams.onEnterEditMode(api, oaAnno);
      }
    },

    unFreezeQtip: function(api, oaAnno, viewerParams) {
      if (!this.inEditOrCreateMode) { throw 'AnnotationTooltip not in edit mode'; }
      this.inEditOrCreateMode = false;
      jQuery.publish('enableRectTool.' + this.windowId);
      api.set({
        'content.text': this.getViewerContent([oaAnno]),
        'hide.event': 'mouseleave'
      }).hide();
      jQuery(api.elements.tooltip).addClass("qtip-viewer");
      if (viewerParams.onExitEditMode) {
        viewerParams.onExitEditMode(api, oaAnno);
      }
    },

    //when this is being used to edit an existing annotation, insert them into the inputs
    editorTemplate: Handlebars.compile([
      '<form id="annotation-editor-{{windowId}}" class="annotation-editor annotation-tooltip" {{#if id}}data-anno-id="{{id}}"{{/if}}>',
      '<div>',
      // need to add a delete, if permissions allow
      '<div class="button-container">',
      '<a href="#cancel" class="cancel"><i class="fa fa-times-circle-o fa-fw"></i>{{t "cancel"}}</a>',
      '<a href="#save" class="save"><i class="fa fa-database fa-fw"></i>{{t "save"}}</a>',
      '</div>',
      '</div>',
      '</form>'
    ].join('')),

    viewerTemplate: Handlebars.compile([
      '<div class="all-annotations" id="annotation-viewer-{{windowId}}">',
      '{{#each annotations}}',
      '<div class="annotation-display annotation-tooltip" data-anno-id="{{id}}">',
      '<div class="button-container">',
        '{{#if showUpdate}}<a href="#edit" class="edit"><i class="fa fa-pencil-square-o fa-fw"></i>{{t "edit"}}</a>{{/if}}',
        '{{#if showDelete}}<a href="#delete" class="delete"><i class="fa fa-trash-o fa-fw"></i>{{t "delete"}}</a>{{/if}}',
      '</div>',
      '<div class="text-viewer">',
      '{{#if username}}<p class="user">{{username}}:</p>{{/if}}',
      '<p>{{{annoText}}}</p>',
      '</div>',
      '<div id="tags-viewer-{{windowId}}" class="tags-viewer">',
      '{{#each tags}}',
      '<span class="tag">{{this}}</span>',
      '{{/each}}',
      '</div>',
      '</div>',
      '{{/each}}',
      '</div>'
    ].join(''))
  };

}(Mirador));
