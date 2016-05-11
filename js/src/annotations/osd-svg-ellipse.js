(function($) {
  $.Ellipse = function(options) {
    jQuery.extend(this, {
      name: 'Ellipse',
      logoClass: 'radio_button_unchecked',
      idPrefix: 'ellipse_'
    }, options);

    this.init();
  };

  $.Ellipse.prototype = {
    init: function() {
    },

    createShape: function(initialPoint, overlay) {
      overlay.mode = 'create';
      var segments = [];
      // point indexes
      //     1&2&3
      //   0   ─   4
      //     /   \
      //  9 |     | 5
      //     \   /
      //   8   ─   6
      //       7
      // points 1 & 2 & 3 are workaround used to draw rotation handle
      var pixel = 1 / overlay.paperScope.view.zoom;
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2 * pixel, initialPoint.y - 2 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1 * pixel, initialPoint.y - (Math.sqrt(2) + 1) * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1 * pixel, initialPoint.y - (Math.sqrt(2) + 1) * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1 * pixel, initialPoint.y - (Math.sqrt(2) + 1) * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y - 2 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x + (Math.sqrt(2) - 1) * pixel, initialPoint.y - 1 * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1 * pixel, initialPoint.y + (Math.sqrt(2) - 1) * pixel));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2 * pixel, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - (Math.sqrt(2) + 1) * pixel, initialPoint.y - 1 * pixel));
      var _this = this;
      var shape = new overlay.paperScope.Path({
        segments: segments,
        name: overlay.getName(_this)
      });
      shape.dashArray = overlay.dashArray;
      shape.strokeWidth = 1 / overlay.paperScope.view.zoom;
      shape.strokeColor = overlay.strokeColor;
      shape.fillColor = overlay.fillColor;
      shape.fillColor.alpha = overlay.fillColorAlpha;
      shape.closed = true;
      shape.data.rotation = 0;
      overlay.segment = shape.segments[6];
      this.updateSelection(true, shape, overlay);
      return shape;
    },
    
    updateSelection: function(selected, item, overlay) {
      if (item._name.toString().indexOf(this.idPrefix) != -1) {
        if (item.segments.length > 10) {
          item.removeSegment(10);
        }
        item.smooth({from: -7, to: 1});
        item.selected = selected;
        item.segments[2].selected = selected;
        var inHandle = item.segments[7].handleIn.clone();
        inHandle = inHandle.multiply(-1);
        var outHandle = item.segments[7].handleOut.clone();
        outHandle = outHandle.multiply(-1);
        item.segments[1].handleIn = inHandle;
        item.segments[1].handleOut = new overlay.paperScope.Point(0, 0);
        item.segments[2].handleIn = new overlay.paperScope.Point(0, 0);
        item.segments[2].handleOut = new overlay.paperScope.Point(0, 0);
        item.segments[3].handleIn = new overlay.paperScope.Point(0, 0);
        item.segments[3].handleOut = outHandle;
        if (selected) {
          item.segments[2].handleOut = new overlay.paperScope.Point(0, -20 / overlay.paperScope.view.zoom);
          item.segments[2].handleOut = item.segments[2].handleOut.rotate(item.data.rotation, item.segments[2]);
          var point = item.segments[2].point.clone();
          point = point.add(item.segments[2].handleOut);
          if (item.contains(point)) {
            item.segments[2].handleOut = item.segments[2].handleOut.rotate(180, item.segments[2]);
          }
        } else {
          item.segments[2].handleOut = new overlay.paperScope.Point(0, 0);
        }
      }
    },

    onHover:function(activate,shape,hoverColor){
      // shape needs to have hovered styles
      if(activate && !shape.data.hovered){
        shape.data.nonHoverStroke = shape.strokeColor.clone();
        shape.data.hovered = true;
        shape.strokeColor = hoverColor;
      }
      // shape is not longer hovered
      if(!activate && shape.data.hovered){
        shape.strokeColor = shape.data.nonHoverStroke.clone();
        delete shape.data.nonHoverStroke;
        delete shape.data.hovered;
      }
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
          var segment = overlay.path.segments[2];
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
          if (idx === 0 || idx === 4 || idx === 6 || idx === 8) {
            translationX = translationX.multiply(2 / (1 + Math.sqrt(1 / 2)));
            translationY = translationY.multiply(2 / (1 + Math.sqrt(1 / 2)));
          }
          var moveTopSize = idx === 0 || idx === 1 || idx === 2 || idx === 3 || idx === 4;
          var moveBottomSize = idx === 6 || idx === 7 || idx === 8;
          var moveRightSize = idx === 4 || idx === 5 || idx === 6;
          var moveLeftSize = idx === 0 || idx === 8 || idx === 9;
          if (moveTopSize) {
            overlay.path.segments[1].point = overlay.path.segments[1].point.add(translationY);
            overlay.path.segments[2].point = overlay.path.segments[2].point.add(translationY);
            overlay.path.segments[3].point = overlay.path.segments[3].point.add(translationY);
            var trTop = translationY.clone();
            trTop = trTop.multiply((1 + Math.sqrt(1 / 2)) / 2);
            overlay.path.segments[0].point = overlay.path.segments[0].point.add(trTop);
            overlay.path.segments[4].point = overlay.path.segments[4].point.add(trTop);
            trTop = trTop.multiply((1 - Math.sqrt(1 / 2)) / (1 + Math.sqrt(1 / 2)));
            overlay.path.segments[6].point = overlay.path.segments[6].point.add(trTop);
            overlay.path.segments[8].point = overlay.path.segments[8].point.add(trTop);
          }
          if (moveBottomSize) {
            overlay.path.segments[7].point = overlay.path.segments[7].point.add(translationY);
            var trBottom = translationY.clone();
            trBottom = trBottom.multiply((1 + Math.sqrt(1 / 2)) / 2);
            overlay.path.segments[6].point = overlay.path.segments[6].point.add(trBottom);
            overlay.path.segments[8].point = overlay.path.segments[8].point.add(trBottom);
            trBottom = trBottom.multiply((1 - Math.sqrt(1 / 2)) / (1 + Math.sqrt(1 / 2)));
            overlay.path.segments[0].point = overlay.path.segments[0].point.add(trBottom);
            overlay.path.segments[4].point = overlay.path.segments[4].point.add(trBottom);
          }
          if (moveTopSize || moveBottomSize) {
            translationY = translationY.multiply(0.5);
            overlay.path.segments[5].point = overlay.path.segments[5].point.add(translationY);
            overlay.path.segments[9].point = overlay.path.segments[9].point.add(translationY);
          }
          if (moveRightSize) {
            overlay.path.segments[5].point = overlay.path.segments[5].point.add(translationX);
            var trRight = translationX.clone();
            trRight = trRight.multiply((1 + Math.sqrt(1 / 2)) / 2);
            overlay.path.segments[4].point = overlay.path.segments[4].point.add(trRight);
            overlay.path.segments[6].point = overlay.path.segments[6].point.add(trRight);
            trRight = trRight.multiply((1 - Math.sqrt(1 / 2)) / (1 + Math.sqrt(1 / 2)));
            overlay.path.segments[0].point = overlay.path.segments[0].point.add(trRight);
            overlay.path.segments[8].point = overlay.path.segments[8].point.add(trRight);
          }
          if (moveLeftSize) {
            overlay.path.segments[9].point = overlay.path.segments[9].point.add(translationX);
            var trLeft = translationX.clone();
            trLeft = trLeft.multiply((1 + Math.sqrt(1 / 2)) / 2);
            overlay.path.segments[0].point = overlay.path.segments[0].point.add(trLeft);
            overlay.path.segments[8].point = overlay.path.segments[8].point.add(trLeft);
            trLeft = trLeft.multiply((1 - Math.sqrt(1 / 2)) / (1 + Math.sqrt(1 / 2)));
            overlay.path.segments[4].point = overlay.path.segments[4].point.add(trLeft);
            overlay.path.segments[6].point = overlay.path.segments[6].point.add(trLeft);
          }
          if (moveRightSize || moveLeftSize) {
            translationX = translationX.multiply(0.5);
            overlay.path.segments[1].point = overlay.path.segments[1].point.add(translationX);
            overlay.path.segments[2].point = overlay.path.segments[2].point.add(translationX);
            overlay.path.segments[3].point = overlay.path.segments[3].point.add(translationX);
            overlay.path.segments[7].point = overlay.path.segments[7].point.add(translationX);
          }
          var point = overlay.path.segments[2].point.clone();
          point = point.add(overlay.path.segments[2].handleOut);
          if (overlay.path.contains(point)) {
            overlay.path.segments[2].handleOut = overlay.path.segments[2].handleOut.rotate(180, overlay.path.segments[2]);
          }
        }
        overlay.updateSelection(true, overlay.path, overlay);
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
                  break;
                case hitResult.item.segments[4]:
                  cursor = 'arrows-v';
                  rotation += 45;
                  break;
                case hitResult.item.segments[5]:
                  cursor = 'arrows-h';
                  break;
                case hitResult.item.segments[6]:
                  cursor = 'arrows-v';
                  rotation -= 45;
                  break;
                case hitResult.item.segments[7]:
                  cursor = 'arrows-v';
                  break;
                case hitResult.item.segments[8]:
                  cursor = 'arrows-v';
                  rotation += 45;
                  break;
                case hitResult.item.segments[9]:
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