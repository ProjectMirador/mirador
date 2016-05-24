(function($) {
  $.Polygon = function(options) {
    jQuery.extend(this, {
      name: 'Polygon',
      logoClass: 'timeline',
      idPrefix: 'rough_path_'
    }, options);

    this.init();
  };

  $.Polygon.prototype = {
    init: function() {
    },

    createShape: function(initialPoint, overlay) {
      overlay.mode = 'create';
      var _this = this;
      var shape = new overlay.paperScope.Path({
        segments: [initialPoint],
        strokeWidth: 1 / overlay.paperScope.view.zoom,
        strokeColor: overlay.strokeColor,
        fullySelected: true,
        name: overlay.getName(_this)
      });
      return shape;
    },

    onMouseUp: function(event, overlay) {
      // Empty block.
    },

    onMouseDrag: function(event, overlay) {
      if (overlay.mode === 'edit') {
        if (overlay.segment) {
          overlay.segment.point.x += event.delta.x;
          overlay.segment.point.y += event.delta.y;
        } else if (overlay.path) {
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
          overlay.mode = 'edit';
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
      } else if (overlay.mode === 'create') {
        overlay.path.add(event.point);
      } else if (overlay.mode === 'edit') {
        if (hitResult) {
          if (event.modifiers.shift) {
            if (hitResult.type == 'segment') {
              hitResult.segment.remove();
            }
          } else if (overlay.path) {
            overlay.segment = null;
            overlay.path = null;
            overlay.mode = '';
          } else {
            overlay.path = hitResult.item;
            if (hitResult.type == 'segment') {
              overlay.segment = hitResult.segment;
            } else if (hitResult.type == 'fill') {
              overlay.paperScope.project.activeLayer.addChild(hitResult.item);
            }
          }
        }
      }
    },

    onDoubleClick: function(event, overlay) {
      if (overlay.path) {
        if (overlay.path.segments[0].point.getDistance(overlay.path.segments[overlay.path.segments.length - 1].point) < overlay.hitOptions.tolerance) {
          overlay.path.closed = true;
          overlay.path.fillColor = overlay.fillColor;
          overlay.path.fillColor.alpha = overlay.fillColorAlpha;
        }
      }
      overlay.onDrawFinish();
    }
  };
}(Mirador));