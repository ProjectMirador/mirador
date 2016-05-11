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
      this.SEGMENT_POINTS_COUNT = 9;
    },

    createShape: function(initialPoint, overlay) {
      overlay.mode = 'create';
      var pixel = 1 / overlay.paperScope.view.zoom;
      var segments = this._createSegments(initialPoint,pixel,overlay);
      var shape = new overlay.paperScope.Path({
        segments: segments,
        fullySelected: true,
        name: overlay.getName(this)
      });
      shape.dashArray = overlay.dashArray;
      shape.strokeWidth = 1 / overlay.paperScope.view.zoom;
      shape.strokeColor = overlay.strokeColor;
      shape.fillColor = overlay.fillColor;
      shape.fillColor.alpha = overlay.fillColorAlpha;
      shape.closed = true;
      shape.data.rotation = 0;
      overlay.segment = shape.segments[5];
      this.updateSelection(true, shape, overlay);
      return shape;
    },

    _createSegments:function(initialPoint,pixel, overlay){
      var segments = [];
      // point indexes
      // 0    1&2    3
      //   ┌ ─ ─ ─ ┐
      // 8 │       │ 4
      //   └ ─ ─ ─ ┘
      // 7     6     5
      // points 1 & 2 are workaround used to draw rotation handle

      segments.push(new overlay.paperScope.Point(initialPoint.x - 2 * pixel, initialPoint.y - 2 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1 * pixel, initialPoint.y - 2 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1 * pixel, initialPoint.y - 2 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y - 2 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y - 1 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1 * pixel, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2 * pixel, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2 * pixel, initialPoint.y - 1 * pixel));
      return segments;
    },

    updateSelection: function(selected, item, overlay) {
      if (item._name.toString().indexOf(this.idPrefix) != -1) {
        item.fullySelected = selected;
        if (selected) {
          item.segments[1].handleOut = new overlay.paperScope.Point(0, -20 / overlay.paperScope.view.zoom);
          item.segments[1].handleOut = item.segments[1].handleOut.rotate(item.data.rotation, item.segments[1]);
          var point = item.segments[1].point.clone();
          point = point.add(item.segments[1].handleOut);
          if (item.contains(point)) {
            item.segments[1].handleOut = item.segments[1].handleOut.rotate(180, item.segments[1]);
          }
        } else {
          item.segments[1].handleOut = new overlay.paperScope.Point(0, 0);
        }
      }
    },

    // Old rectangle shapes does not have rotation handle point
    // add it manually for old shapes
    adaptSegments:function(shape,overlay){
      var handleSegment = shape.segments[1].clone();
      shape.segments.splice(1,0,handleSegment);
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
      } else if (overlay.mode == 'create' || overlay.mode == 'deform') {
        var idx = -1;
        for (var l = 0; l < overlay.path.segments.length; l++) {
          if (overlay.path.segments[l] == overlay.segment) {
            idx = l;
            break;
          }
        }
        if (idx === -1) {
          var segment = overlay.path.segments[1];
          var center = overlay.path.position;
          var oldPoint = new overlay.paperScope.Point(event.point.x - center.x, event.point.y - center.y);
          var newPoint = new overlay.paperScope.Point(event.point.x - center.x + event.delta.x, event.point.y - center.y + event.delta.y);
          var rotation = Math.atan2(newPoint.y, newPoint.x) - Math.atan2(oldPoint.y, oldPoint.x);
          rotation = rotation * (180 / Math.PI);
          overlay.path.rotate(rotation, overlay.path.position);
          overlay.path.data.rotation += rotation;
        } else {
          var translation = new overlay.paperScope.Point(event.delta.x, event.delta.y);
          var rot = overlay.path.data.rotation;
          translation = translation.rotate(-rot);
          var translationX = new overlay.paperScope.Point(translation.x, 0);
          translationX = translationX.rotate(rot);
          var translationY = new overlay.paperScope.Point(0, translation.y);
          translationY = translationY.rotate(rot);
          var moveTopSize = idx === 0 || idx === 1 || idx === 2 || idx === 3;
          var moveBottomSize = idx === 5 || idx === 6 || idx === 7;
          var moveRightSize = idx === 3 || idx === 4 || idx === 5;
          var moveLeftSize = idx === 0 || idx === 7 || idx === 8;
          if (moveTopSize) {
            overlay.path.segments[0].point = overlay.path.segments[0].point.add(translationY);
            overlay.path.segments[1].point = overlay.path.segments[1].point.add(translationY);
            overlay.path.segments[2].point = overlay.path.segments[2].point.add(translationY);
            overlay.path.segments[3].point = overlay.path.segments[3].point.add(translationY);
          }
          if (moveBottomSize) {
            overlay.path.segments[5].point = overlay.path.segments[5].point.add(translationY);
            overlay.path.segments[6].point = overlay.path.segments[6].point.add(translationY);
            overlay.path.segments[7].point = overlay.path.segments[7].point.add(translationY);
          }
          if (moveTopSize || moveBottomSize) {
            translationY = translationY.multiply(0.5);
            overlay.path.segments[4].point = overlay.path.segments[4].point.add(translationY);
            overlay.path.segments[8].point = overlay.path.segments[8].point.add(translationY);
          }
          if (moveRightSize) {
            overlay.path.segments[3].point = overlay.path.segments[3].point.add(translationX);
            overlay.path.segments[4].point = overlay.path.segments[4].point.add(translationX);
            overlay.path.segments[5].point = overlay.path.segments[5].point.add(translationX);
          }
          if (moveLeftSize) {
            overlay.path.segments[0].point = overlay.path.segments[0].point.add(translationX);
            overlay.path.segments[7].point = overlay.path.segments[7].point.add(translationX);
            overlay.path.segments[8].point = overlay.path.segments[8].point.add(translationX);
          }
          if (moveRightSize || moveLeftSize) {
            translationX = translationX.multiply(0.5);
            overlay.path.segments[1].point = overlay.path.segments[1].point.add(translationX);
            overlay.path.segments[2].point = overlay.path.segments[2].point.add(translationX);
            overlay.path.segments[6].point = overlay.path.segments[6].point.add(translationX);
          }
          var point = overlay.path.segments[1].point.clone();
          point = point.add(overlay.path.segments[1].handleOut);
          if (overlay.path.contains(point)) {
            overlay.path.segments[1].handleOut = overlay.path.segments[1].handleOut.rotate(180, overlay.path.segments[1]);
          }
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
          if (hitResult.type == 'segment' || hitResult.type == 'handle-out') {
            overlay.mode = 'deform';
            overlay.segment = null;
            overlay.path = null;
            if (hitResult.type == 'handle-out') {
              jQuery('body').awesomeCursor('repeat', {
                color: 'white',
                hotspot: 'center'
              });
            } else {
              var cursor = '';
              var rotation = hitResult.item.data.rotation;
              switch (hitResult.segment) {
                case hitResult.item.segments[0]:
                  cursor = 'arrows-v';
                  rotation -= 45;
                  break;
                case hitResult.item.segments[1]:
                  cursor = 'arrows-v';
                  break;
                case hitResult.item.segments[2]:
                  cursor = 'arrows-v';
                  break;
                case hitResult.item.segments[3]:
                  cursor = 'arrows-v';
                  rotation += 45;
                  break;
                case hitResult.item.segments[4]:
                  cursor = 'arrows-h';
                  break;
                case hitResult.item.segments[5]:
                  cursor = 'arrows-v';
                  rotation -= 45;
                  break;
                case hitResult.item.segments[6]:
                  cursor = 'arrows-v';
                  break;
                case hitResult.item.segments[7]:
                  cursor = 'arrows-v';
                  rotation += 45;
                  break;
                case hitResult.item.segments[8]:
                  cursor = 'arrows-h';
                  break;
                default:
                  cursor = 'default';
                  break;
              }
              jQuery('body').awesomeCursor(cursor, {
                color: 'white',
                hotspot: 'center',
                rotate: rotation
              });
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
        } else if (hitResult.type == 'handle-out') {
          overlay.path = hitResult.item;
          overlay.segment = null;
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
