Annotator.Widget.prototype.checkOrientation = function() {
    var current, offset, viewport, widget, containerOffset;
    this.resetOrientation();
    container = jQuery(jQuery(this.element[0]).parents('.image-view').find('.mirador-osd')[0]);  //this is slightly less brittle
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

    