(function($) {
  $.Pin = function(options) {
    jQuery.extend(this, {
      name: 'Pin',
      logoClass: 'room',
      idPrefix: 'pin_'
    }, options);

    this.init();
  };

  $.Pin.prototype = {
    init: function() {
    },

    createShape: function(initialPoint, overlay) {
      overlay.mode = 'create';
      var _this = this;
      var pathData = '';
      var size = overlay.pinSize;
      pathData += 'M' + initialPoint.x + ',' + initialPoint.y;
      pathData += ' Q' + initialPoint.x + ',' + (initialPoint.y - size);
      pathData += ' ' + (initialPoint.x + size) + ',' + (initialPoint.y - 2 * size);
      pathData += ' A' + size + ',' + size + ' 0 1 0';
      pathData += ' ' + (initialPoint.x - size) + ',' + (initialPoint.y - 2 * size);
      pathData += ' Q' + initialPoint.x + ',' + (initialPoint.y - size);
      pathData += ' ' + initialPoint.x + ',' + initialPoint.y;
      var shape = new overlay.paperScope.Path(pathData);
      shape.name = overlay.getName(_this);
      shape.strokeWidth = 1 / overlay.paperScope.view.zoom;
      shape.strokeColor = overlay.strokeColor;
      shape.fillColor = overlay.fillColor;
      shape.fillColor.alpha = overlay.fillColorAlpha;
      shape.fullySelected = true;
      shape.closed = true;
      overlay.fitPinSize(shape);
      return shape;
    },

    onMouseUp: function(event, overlay) {
      // Empty block.
    },

    onMouseDrag: function(event, overlay) {
      if (overlay.mode === 'translate') {
        if (overlay.path) {
          overlay.path.position.x += event.delta.x;
          overlay.path.position.y += event.delta.y;
        }
      }
    },

    onMouseMove: function(event, overlay) {
      // Empty block.
    },

    onMouseDown: function(event, overlay) {
      var hitResult = overlay.paperScope.project.hitTest(event.point, overlay.hitOptions);
      if (hitResult && hitResult.item._name.toString().indexOf(this.idPrefix) != -1) {
        if (!overlay.path) {
          overlay.mode = 'translate';
          overlay.segment = null;
          overlay.path = null;
          document.body.style.cursor = "move";
        } else {
          document.body.style.cursor = "default";
        }
      } else {
        document.body.style.cursor = "default";
      }
      if (overlay.mode === '') {
        overlay.path = this.createShape(event.point, overlay);
        overlay.onDrawFinish();
      } else if (overlay.mode === 'translate') {
        if (hitResult) {
          if (overlay.path) {
            overlay.segment = null;
            overlay.path = null;
            overlay.mode = '';
          } else {
            overlay.path = hitResult.item;
          }
        }
      }
    },

    onDoubleClick: function(event, overlay) {
      // Empty block.
    }
  };
}(Mirador));