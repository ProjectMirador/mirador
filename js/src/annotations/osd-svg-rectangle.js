(function($) {
  $.Rectangle = function(options) {
    jQuery.extend(this, {
      name: 'Rectangle',
      logoClass: 'check_box_outline_blank',
      idPrefix: 'rectangle_'
    }, options);

    this.init();
  };

  $.Rectangle.prototype = {
    init: function() {
    },

    createShape: function(initialPoint, overlay) {
      overlay.mode = 'create';
      var segments = [];
      // point indexes
      // 0     1     2
      //   ┌ ─ ─ ─ ┐  
      // 7 │       │ 3
      //   └ ─ ─ ─ ┘  
      // 6     5     4
      var pixel = 1 / overlay.paperScope.view.zoom;
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2 * pixel, initialPoint.y - 2 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1 * pixel, initialPoint.y - 2 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y - 2 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y - 1 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1 * pixel, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2 * pixel, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2 * pixel, initialPoint.y - 1 * pixel));
      var _this = this;
      var shape = new overlay.paperScope.Path({
        segments: segments,
        fullySelected: true,
        name: overlay.getName(_this)
      });
      shape.strokeWidth = 1 / overlay.paperScope.view.zoom;
      shape.strokeColor = overlay.strokeColor;
      shape.fillColor = overlay.fillColor;
      shape.fillColor.alpha = overlay.fillColorAlpha;
      shape.closed = true;
      shape.data.rotation = 0;
      overlay.segment = shape.segments[4];
      return shape;
    },

    onMouseUp: function(event, overlay) {
      if (overlay.mode == 'create' && overlay.path) {
        overlay.onDrawFinish();
      }
    },

    onMouseDrag: function(event, overlay) {
      if (overlay.mode == 'translate') {
        for (var i = 0; i < overlay.path.segments.length; i++) {
          overlay.path.segments[i].point.x += event.delta.x;
          overlay.path.segments[i].point.y += event.delta.y;
        }
      } else if (overlay.mode == 'create') {
        overlay.path.segments[1].point.x += event.delta.x / 2;
        overlay.path.segments[2].point.x += event.delta.x;
        overlay.path.segments[3].point.x += event.delta.x;
        overlay.path.segments[4].point.x += event.delta.x;
        overlay.path.segments[5].point.x += event.delta.x / 2;
        overlay.path.segments[3].point.y += event.delta.y / 2;
        overlay.path.segments[4].point.y += event.delta.y;
        overlay.path.segments[5].point.y += event.delta.y;
        overlay.path.segments[6].point.y += event.delta.y;
        overlay.path.segments[7].point.y += event.delta.y / 2;
      } else if (overlay.mode == 'deform') {
        var idx = -1;
        for (var l = 0; l < overlay.path.segments.length; l++) {
          if (overlay.path.segments[l] == overlay.segment) {
            idx = l;
            break;
          }
        }
        if (idx % 2 == 1) {
          var oldPoint = new overlay.paperScope.Point(overlay.segment.point.x - overlay.path.position.x, overlay.segment.point.y - overlay.path.position.y);
          var newPoint = new overlay.paperScope.Point(overlay.segment.point.x - overlay.path.position.x + event.delta.x, overlay.segment.point.y - overlay.path.position.y + event.delta.y);
          var scale = Math.sqrt(newPoint.x * newPoint.x + newPoint.y * newPoint.y) / Math.sqrt(oldPoint.x * oldPoint.x + oldPoint.y * oldPoint.y);
          var rotation = Math.atan2(newPoint.y, newPoint.x) - Math.atan2(oldPoint.y, oldPoint.x);
          rotation = rotation * (180 / Math.PI);
          overlay.path.scale(scale);
          overlay.path.rotate(rotation, overlay.path.position);
          overlay.path.data.rotation += rotation;
        } else {
          var oldRotPoint = new overlay.paperScope.Point(overlay.segment.point.x - overlay.path.position.x, overlay.segment.point.y - overlay.path.position.y);
          var newRotPoint = new overlay.paperScope.Point(overlay.segment.point.x - overlay.path.position.x + event.delta.x, overlay.segment.point.y - overlay.path.position.y + event.delta.y);
          var rot = overlay.path.data.rotation;
          oldRotPoint = oldRotPoint.rotate(-rot);
          newRotPoint = newRotPoint.rotate(-rot);
          var rotScale = new overlay.paperScope.Point(newRotPoint.x / oldRotPoint.x, newRotPoint.y / oldRotPoint.y);
          overlay.path.rotate(-rot, overlay.path.position);
          overlay.path.scale(rotScale);
          overlay.path.rotate(rot, overlay.path.position);
        }
      }
    },

    onMouseMove: function(event, overlay) {
      // Empty block.
    },

    onMouseDown: function(event, overlay) {
      var hitResult = overlay.paperScope.project.hitTest(event.point, overlay.hitOptions);
      if (hitResult && hitResult.item._name.toString().indexOf(this.idPrefix) != -1) {
        if (overlay.mode != 'deform' && overlay.mode != 'translate' && overlay.mode != 'create') {
          if (hitResult.type == 'segment') {
            overlay.mode = 'deform';
            overlay.segment = null;
            overlay.path = null;
            var segments = hitResult.item.segments;
            for (var idx = 0; idx < segments.length; idx++) {
              if (segments[idx] == hitResult.segment) {
                if (idx % 2 === 0) {
                  document.body.style.cursor = "move";
                } else {
                  jQuery('body').awesomeCursor('repeat', {
                    color: 'white',
                    hotspot: 'center'
                  });
                }
              }
            }
          } else {
            overlay.mode = 'translate';
            overlay.segment = null;
            overlay.path = null;
            document.body.style.cursor = "move";
          }
        } else {
          document.body.style.cursor = "default";
        }
      } else {
        document.body.style.cursor = "default";
      }
      if (overlay.mode == 'translate') {
        if (overlay.path) {
          overlay.segment = null;
          overlay.path = null;
          overlay.mode = '';
        } else {
          overlay.path = hitResult.item;
        }
      } else if (overlay.mode == 'deform') {
        if (overlay.path) {
          overlay.segment = null;
          overlay.path = null;
          overlay.mode = '';
        } else {
          overlay.path = hitResult.item;
          overlay.segment = hitResult.segment;
        }
      } else {
        overlay.path = this.createShape(event.point, overlay);
      }
    },

    onDoubleClick: function(event, overlay) {
      // Empty block.
    }
  };
}(Mirador));