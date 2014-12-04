Annotator.Widget.prototype.checkOrientation = function(container) {
    var current, offset, viewport, widget, containerOffset;
    this.resetOrientation();
    containerOffset = container.offset();
    widget = this.element.children(":first");
    offset = widget.offset();
    viewport = {
      top: containerOffset.top,
      right: containerOffset.left + container.width()
    };
    current = {
      top: offset.top,
      right: offset.left + widget.width()
    };
    if ((current.top - viewport.top) < 0) {
      this.invertY();
    }
    if ((current.right - viewport.right) > 0) {
      this.invertX();
    }
    return this;
};

    Annotator.prototype.onAdderClick = function(event, container) {
      var annotation, cancel, cleanup, position, save;
      if (event !== null) {
        event.preventDefault();
      }
      position = this.adder.position();
      this.adder.hide();
      annotation = this.setupAnnotation(this.createAnnotation());
      $(annotation.highlights).addClass('annotator-hl-temporary');
      save = (function(_this) {
        return function() {
          cleanup();
          $(annotation.highlights).removeClass('annotator-hl-temporary');
          return _this.publish('annotationCreated', [annotation]);
        };
      })(this);
      cancel = (function(_this) {
        return function() {
          cleanup();
          return _this.deleteAnnotation(annotation);
        };
      })(this);
      cleanup = (function(_this) {
        return function() {
          _this.unsubscribe('annotationEditorHidden', cancel);
          return _this.unsubscribe('annotationEditorSubmit', save);
        };
      })(this);
      this.subscribe('annotationEditorHidden', cancel);
      this.subscribe('annotationEditorSubmit', save);
      return this.showEditor(annotation, position, container);
    };
    
    Annotator.prototype.showEditor = function(annotation, location, container) {
      this.editor.element.css(location);
      this.editor.load(annotation, container);
      this.publish('annotationEditorShown', [this.editor, annotation]);
      return this;
    };
    
    Annotator.Editor.prototype.load = function(annotation, container) {
      var field, _k, _len2, _ref2;
      this.annotation = annotation;
      this.publish('load', [this.annotation]);
      _ref2 = this.fields;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        field = _ref2[_k];
        field.load(field.element, this.annotation);
      }
      return this.show(null, container);
    };
    
    Annotator.Editor.prototype.show = function(event, container) {
      Annotator.Util.preventEventDefault(event);
      this.element.removeClass(this.classes.hide);
      this.element.find('.annotator-save').addClass(this.classes.focus);
      this.checkOrientation(container);
      this.element.find(":input:first").focus();
      this.setupDraggables();
      return this.publish('show');
    };
    