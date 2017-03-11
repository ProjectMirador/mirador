(function($) {
  $.Polygon = function(options) {
    jQuery.extend(this, {
      name: 'Polygon',
      logoClass: 'timeline',
      idPrefix: 'rough_path_',
      tooltip: 'polygonTooltip'
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
        dashArray: overlay.dashArray,
        strokeColor: overlay.strokeColor,
        name: overlay.getName(_this)
      });
      shape.data.strokeWidth = overlay.strokeWidth;
      shape.strokeWidth = shape.data.strokeWidth / overlay.paperScope.view.zoom;
      return shape;
    },

    updateSelection: function(selected, item, overlay) {
      if (item._name.toString().indexOf(this.idPrefix) != -1) {
        item.selected = selected;

        if(selected){
          if (!item.data.deleteIcon && overlay.mode !=='create') {
            item.data.deleteIcon = new overlay.annotationUtils.DeleteActionIcon(overlay.paperScope, {
              name: item.name + this.partOfPrefix + 'delete',
              fillColor:item.selectedColor
            });
            item.data.deleteIcon.addData('pivot',new overlay.paperScope.Point(this.getPivotPointForDeleteIcon(item)));
            item.data.deleteIcon.addData('type', 'deleteIcon');
            item.data.deleteIcon.addData('self', item.data.deleteIcon);
            item.data.deleteIcon.addData('parent', item);
            item.data.deleteIcon.setPosition(item.data.deleteIcon.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom)));
            item.data.deleteIcon.setOnMouseDownListener(overlay);
          }
        }else{

          if(item.data.deleteIcon){
            item.data.deleteIcon.remove();
            item.data.deleteIcon = null;
          }
        }
      }
    },

    onResize:function(item,overlay){
      if(item._name.toString().indexOf(this.partOfPrefix)!== -1){
        if(item._name.toString().indexOf('delete') !==-1){

          item.data.self.setPosition(item.data.self.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom)));
          item.data.self.resize(24 *  1 / overlay.paperScope.view.zoom);
        }
      }
    },

    getPivotPointForDeleteIcon:function(item){
      var points = [];

      for(var i=0;i<item.segments.length;i++){
        points.push(item.segments[i].point);
      }

      return {
        x:this.getGeometricCenterOfPoints(points).x,
        y:this.getLowestPoint(points).y
      };
    },

    getLowestPoint: function (points) {
      var lx = 0;
      var ly = 0;

      for (var i = 0; i < points.length; i++) {
        lx = Math.max(lx, points[i].x);
        ly = Math.max(ly, points[i].y);
      }

      return {
        x: lx,
        y: ly
      };
    },

    getGeometricCenterOfPoints: function (points) {
      var cx = 0;
      var cy = 0;
      for(var i= 0;i<points.length;i++){
        cx +=points[i].x;
        cy +=points[i].y;
      }

      return {
        x:cx/points.length,
        y:cy/points.length
      };
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
        delete shape.data.nonHoverStrokeColor;
        delete shape.data.hovered;
      }
    },

    onMouseUp: function(event, overlay) {

    },

    onMouseDrag: function(event, overlay) {
      if (overlay.mode === 'deform') {
        if (overlay.segment) {
          overlay.segment.point.x += event.delta.x;
          overlay.segment.point.y += event.delta.y;

          var path = overlay.segment.path;

          if(path.data.deleteIcon){
            path.data.deleteIcon.addData('pivot', new overlay.paperScope.Point(this.getPivotPointForDeleteIcon(path)));
            path.data.deleteIcon.setPosition(path.data.deleteIcon.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom)));
          }

          return;
        }
      }

      if (overlay.mode === 'translate') {
        if (overlay.path) {
          overlay.path.position.x += event.delta.x;
          overlay.path.position.y += event.delta.y;
          if (overlay.path.data.deleteIcon) {
            overlay.path.data.deleteIcon.translateByXY(event.delta.x, event.delta.y);
          }

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

      if(hitResult.type === 'handle-in' || hitResult.type === 'handle-out'){
        jQuery(overlay.viewer.canvas).css('cursor','pointer');
        return;
      }

      // mouse over attached icon
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
      if (hitResult && hitResult.item._name.toString().indexOf(this.idPrefix) !== -1) {

        if (hitResult.item._name.toString().indexOf(this.partOfPrefix) !== -1) {
          hitResult.item.data.self.onMouseDown();
          return;
        }

        if (overlay.mode !== 'create') {
          if (!overlay.path) {
            overlay.mode = 'edit';
            overlay.segment = null;
            overlay.path = null;
            document.body.style.cursor = "move";
          } else {

            document.body.style.cursor = "default";
          }

          if (hitResult.type === 'stroke') {
            overlay.mode = 'translate';
            overlay.path = hitResult.item;
            return;
          }

          if (hitResult.type === 'segment') {
            // When shift is being pressed and segment point selected it deletes
            if(event.modifiers.shift){
              if(hitResult.item.segments.length > 2){
                hitResult.segment.remove();
                return;
              }

            }
            overlay.mode = 'deform';
            overlay.segment = hitResult.segment;
            overlay.path = hitResult.item;
            return;
          }


        }
      } else {
        if(overlay.mode !=='create'){
          overlay.mode = '';
        }
      }

      if (overlay.mode === '') {
        overlay.path = this.createShape(event.point, overlay);

        return;
      }
      if (overlay.mode === 'create') {
        overlay.path.add(event.point);

        return;
      }

    },

    onDoubleClick: function(event, overlay) {
      if (overlay.mode === 'create') {
        if (overlay.path && overlay.path.segments.length > 1) {

          if (overlay.path.segments[0].point.getDistance(overlay.path.segments[overlay.path.segments.length - 1].point) * overlay.paperScope.view.zoom < overlay.hitOptions.tolerance) {
            overlay.path.closed = true;
            overlay.path.fillColor = overlay.fillColor;
            overlay.path.fillColor.alpha = overlay.fillColorAlpha;
            overlay.path.segments[overlay.path.segments.length - 1].remove();
          }
          overlay.onDrawFinish();
        }

      }

    }
  };
}(Mirador));
