(function($) {
  $.Rectangle = function(options) {
    jQuery.extend(this, {
      name: 'Rectangle',
      logoClass: 'check_box_outline_blank',
      idPrefix: 'rectangle_',
      tooltip: 'rectangleTooltip'
    }, options);
    this.init();
  };

  $.Rectangle.prototype = {
    init: function() {
      this.SEGMENT_POINTS_COUNT = 9;
    },

    createShape: function(initialPoint, overlay) {
      overlay.mode = 'create';
      var segments = this._createSegments(initialPoint, overlay);
      var shape = new overlay.paperScope.Path({
        segments: segments,
        fullySelected: true,
        name: overlay.getName(this)
      });
      shape.dashArray = overlay.dashArray;
      shape.data.strokeWidth = overlay.strokeWidth;
      shape.strokeWidth = shape.data.strokeWidth / overlay.paperScope.view.zoom;
      shape.strokeColor = overlay.strokeColor;
      shape.fillColor = overlay.fillColor;
      shape.fillColor.alpha = overlay.fillColorAlpha;
      shape.closed = true;
      shape.data.rotation = 0;
      overlay.segment = shape.segments[5];
      this.updateSelection(true, shape, overlay);
      return shape;
    },

    _createSegments:function(initialPoint, overlay){
      var segments = [];
      // point indexes
      // 0    1&2    3
      //   ┌ ─ ─ ─ ┐
      // 8 │       │ 4
      //   └ ─ ─ ─ ┘
      // 7     6     5(initial point)
      // points 1 & 2 are workaround used to draw rotation handle
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2, initialPoint.y - 2));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1, initialPoint.y - 2));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1, initialPoint.y - 2));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y - 2));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y - 1));
      segments.push(new overlay.paperScope.Point(initialPoint.x, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 1, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2, initialPoint.y));
      segments.push(new overlay.paperScope.Point(initialPoint.x - 2, initialPoint.y - 1));

      return segments;
    },

    updateSelection: function (selected, item, overlay) {
      if (item._name.toString().indexOf(this.idPrefix) != -1) {

        if(item._name.toString().indexOf(this.partOfPrefix)!=-1){
          return;
        }

        item.selected = selected;
        if (selected) {

          //item.segments[1].handleOut = new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom);
         // item.segments[1].handleOut = item.segments[1].handleOut.rotate(item.data.rotation, item.segments[1]);

          if (!item.data.deleteIcon) {

            item.data.deleteIcon = new overlay.annotationUtils.DeleteActionIcon(overlay.paperScope, {
              name: item.name + this.partOfPrefix + 'delete',
              fillColor: item.selectedColor
            });

            item.data.deleteIcon.addData('pivot',item.segments[6].point);
            item.data.deleteIcon.addData('type', 'deleteIcon');
            item.data.deleteIcon.addData('self', item.data.deleteIcon);
            item.data.deleteIcon.addData('parent', item);

            item.data.deleteIcon.setPosition(item.data.deleteIcon.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom).rotate(item.data.rotation)));

            item.data.deleteIcon.setOnMouseDownListener(overlay);

          }

          if (!item.data.rotationIcon) {

            item.data.rotationIcon = new overlay.annotationUtils.RotationIcon(overlay.paperScope, {
              name: item.name + this.partOfPrefix + 'rotation',
              fillColor: item.selectedColor
            });

            item.data.rotationIcon.addData('pivot',item.segments[1].point);
            item.data.rotationIcon.addData('type', 'rotationIcon');
            item.data.rotationIcon.addData('self', item.data.rotationIcon);
            item.data.rotationIcon.addData('parent', item);

            item.data.rotationIcon.setPosition(item.data.rotationIcon.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom).rotate(item.data.rotation)));

            item.data.rotationIcon.setOnMouseDownListener(overlay);

          }

          if (!item.data.group) {
            item.data.group = new overlay.annotationUtils.Group(overlay.paperScope,[item,item.data.deleteIcon.getItem(),item.data.deleteIcon.getMask().getItem(),item.data.rotationIcon.getItem(),item.data.rotationIcon.getMask().getItem()]);
          }

          var point = item.segments[1].point.clone();
          point = point.add(item.segments[1].handleOut);

          if (item.contains(point)) {
            item.segments[1].handleOut = item.segments[1].handleOut.rotate(180, item.segments[1]);
          }

          if(item.contains(item.data.deleteIcon.getItem().position)){
            item.data.deleteIcon.setPosition(item.data.deleteIcon.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom).rotate(item.data.rotation)));
            item.data.deleteIcon.rotate(180,item.data.deleteIcon.getData('pivot'));
            item.data.deleteIcon.rotate(180);
          }

          if(item.contains(item.data.rotationIcon.getItem().position)){
            item.data.rotationIcon.setPosition(item.data.rotationIcon.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom).rotate(item.data.rotation)));
            item.data.rotationIcon.rotate(180,item.data.rotationIcon.getData('pivot'));
            item.data.rotationIcon.rotate(180);
          }

          item.segments[1].handleOut.selected = false;
        } else {

          if(item.data.group){
            item.data.group.remove();
            item.data.group = null;
            overlay.paperScope.project.activeLayer.addChild(item);
          }

          if(item.data.deleteIcon){
            item.data.deleteIcon.remove();
            item.data.deleteIcon = null;
          }

          if(item.data.rotationIcon){
            item.data.rotationIcon.remove();
            item.data.rotationIcon = null;
          }
          item.segments[1].handleOut = new overlay.paperScope.Point(0, 0);
        }
      }
    },

    onHover:function(activate,shape,hoverWidth,hoverColor){
      shape.strokeWidth = hoverWidth;

      // shape needs to have hovered styles
      if(activate && !shape.data.hovered){
        shape.data.nonHoverStrokeColor = shape.strokeColor.clone();
        shape.data.hovered = true;
        shape.strokeColor = hoverColor;
      }
      // shape is not longer hovered
      if(!activate && shape.data.hovered){
        shape.strokeColor = shape.data.nonHoverStrokeColor.clone();
        delete shape.data.nonHoverStrokeColorColor;
        delete shape.data.hovered;
      }
    },

    // Old rectangle shapes does not have rotation handle point
    // add it manually for old shapes
    adaptSegments:function(shape,overlay){
      var handleSegment = shape.segments[1].clone();
      shape.segments.splice(1,0,handleSegment);
    },

    onMouseUp: function(event, overlay) {
      if (overlay.mode === 'create' && overlay.path) {
        overlay.onDrawFinish();
      } else if (overlay.mode === 'translate' || overlay.mode === 'deform' && overlay.path) {
        overlay.onEditFinish();
      }
    },

    translate: function(event, overlay) {
      for (var i = 0; i < overlay.path.segments.length; i++) {
        overlay.path.segments[i].point.x += event.delta.x;
        overlay.path.segments[i].point.y += event.delta.y;
      }
      overlay.path.data.rotationIcon.translateByXY(event.delta.x,event.delta.y);
      overlay.path.data.deleteIcon.translateByXY(event.delta.x,event.delta.y);
    },

    rotate:function(event,overlay){
      var center = overlay.path.position;
      var rotation = Math.atan2(event.point.y - center.y + event.delta.y, event.point.x - center.x + event.delta.x) - Math.atan2(event.point.y - center.y, event.point.x - center.x);
      rotation = rotation * (180 / Math.PI);

      overlay.path.data.group.rotate(rotation,overlay.path.position);

      overlay.path.data.deleteIcon.rotate(-rotation);
      overlay.path.data.rotationIcon.rotate(-rotation);
      overlay.path.data.rotation += rotation;
    },

    onMouseDrag: function (event, overlay) {
      if (overlay.mode == 'translate') {
        this.translate(event, overlay);
        return;
      }

      if (overlay.mode === 'rotate') {
        this.rotate(event, overlay);
        return;
      }

      if (overlay.mode == 'create' || overlay.mode == 'deform') {
        var idx = -1;
        for (var l = 0; l < overlay.path.segments.length; l++) {
          if (overlay.path.segments[l] == overlay.segment) {
            idx = l;
            break;
          }
        }

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
          overlay.path.data.rotationIcon.translateByPoint(translationY);
          overlay.path.segments[0].point = overlay.path.segments[0].point.add(translationY);
          overlay.path.segments[1].point = overlay.path.segments[1].point.add(translationY);
          overlay.path.segments[2].point = overlay.path.segments[2].point.add(translationY);
          overlay.path.segments[3].point = overlay.path.segments[3].point.add(translationY);
        }
        if (moveBottomSize) {
          overlay.path.data.deleteIcon.translateByPoint(translationY);

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
          overlay.path.data.rotationIcon.translateByPoint(translationX);
          overlay.path.data.deleteIcon.translateByPoint(translationX);

          overlay.path.segments[1].point = overlay.path.segments[1].point.add(translationX);
          overlay.path.segments[2].point = overlay.path.segments[2].point.add(translationX);
          overlay.path.segments[6].point = overlay.path.segments[6].point.add(translationX);
        }
        var point = overlay.path.segments[1].point.clone();
        point = point.add(overlay.path.segments[1].handleOut);
        if (overlay.path.contains(point)) { // TODO should delete this
          overlay.path.segments[1].handleOut = overlay.path.segments[1].handleOut.rotate(180, overlay.path.segments[1]);
        }

        if (overlay.path.contains(overlay.path.data.deleteIcon.getItem().position)) {
          overlay.path.data.deleteIcon.rotate(180, overlay.path.data.deleteIcon.getData('pivot'));
          overlay.path.data.deleteIcon.rotate(180);
        }

        if (overlay.path.contains(overlay.path.data.rotationIcon.getItem().position)) {
          overlay.path.data.rotationIcon.rotate(180, overlay.path.data.rotationIcon.getData('pivot'));
          overlay.path.data.rotationIcon.rotate(180);
        }

      }
    },

    onResize:function(item,overlay){
      if(item._name.toString().indexOf(this.partOfPrefix)!== -1){
        if(item._name.toString().indexOf('delete') !==-1){
          item.data.self.setPosition(item.data.self.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom).rotate(item.data.parent.data.rotation)));

          if(item.data.parent.contains(item.position)){
            item.data.self.rotate(180,item.data.self.getData('pivot'));
            item.data.self.rotate(180);
          }

          item.data.self.resize(24 *  1 / overlay.paperScope.view.zoom);
        }

        if(item._name.toString().indexOf('rotation') !== -1){
          item.data.self.setPosition(item.data.self.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom).rotate(item.data.parent.data.rotation)));

          if(item.data.parent.contains(item.position)){
            item.data.self.rotate(180,item.data.self.getData('pivot'));
            item.data.self.rotate(180);
          }

          item.data.self.resize(16 *  1 / overlay.paperScope.view.zoom);
        }

      }
    },

    onMouseMove: function(event, overlay) {
      var hitResult = overlay.paperScope.project.hitTest(event.point, overlay.hitOptions);
      if(hitResult && hitResult.item._name.toString().indexOf(this.idPrefix)!==-1){
        if(!overlay.disabled && overlay.hoveredPath && hitResult.item._name.toString().indexOf(overlay.hoveredPath._name.toString()) !==-1){
          this.setCursor(hitResult,overlay);
        }
      }
    },

    setCursor:function(hitResult,overlay){

      if(hitResult.type === 'stroke'){
        jQuery(overlay.viewer.canvas).css('cursor','move');
        return;
      }

      if(hitResult.type === 'pixel'){
        jQuery(overlay.viewer.canvas).css('cursor', 'pointer');
        return;
      }

      if(hitResult.segment){
        jQuery(overlay.viewer.canvas).css('cursor','pointer');
      }

    },

    onMouseDown: function(event, overlay) {
      var hitResult = overlay.paperScope.project.hitTest(event.point, overlay.hitOptions);
      if (hitResult && hitResult.item._name.toString().indexOf(this.idPrefix) != -1) {
        if (overlay.mode !== 'deform' && overlay.mode !== 'translate' && overlay.mode !== 'create') {
          if (hitResult.item._name.toString().indexOf(this.partOfPrefix) !== -1) {
            hitResult.item.data.self.onMouseDown(); // TODO should check this for memory leak
            if(overlay.mode === 'rotate'){
              overlay.path = hitResult.item.data.self.getItem().data.parent;
            }
            return;
          }

          if (hitResult.type === 'segment') {
            overlay.mode = 'deform';
            overlay.segment = null;
            overlay.path = null;
            this.setCursor(hitResult, overlay);
          }

          if (hitResult.type === 'stroke') {
            overlay.mode = 'translate';
            overlay.segment = null;
            overlay.path = null;
          }
        }
      }

      if (overlay.mode === 'translate') {
        if (overlay.path) {
          overlay.segment = null;
          overlay.path = null;
          overlay.mode = '';
        } else {
          overlay.path = hitResult.item;
        }
        return;
      }

      if (overlay.mode === 'deform') {
        if (overlay.path) {
          overlay.segment = null;
          overlay.path = null;
          overlay.mode = '';
        } else {
          overlay.path = hitResult.item;
          overlay.segment = hitResult.segment;
        }
        return;
      }
      overlay.path = this.createShape(event.point, overlay);
    },

    onDoubleClick: function(event, overlay) {

    }

  };

}(Mirador));
