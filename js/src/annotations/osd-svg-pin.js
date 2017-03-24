(function($) {
  $.Pin = function(options) {
    jQuery.extend(this, {
      name: 'Pin',
      logoClass: 'room',
      idPrefix: 'pin_',
      tooltip: 'pinTooltip',
    }, options);

    this.init();
  };

  $.Pin.prototype = {
    init: function() {
    },

    createShape: function(initialPoint, overlay) {
      overlay.mode = 'create';
      var _this = this;
      var size = overlay.fixedShapeSize;
      var pathData = '';
      pathData += 'M' + initialPoint.x + ',' + initialPoint.y;
      pathData += ' Q' + initialPoint.x + ',' + (initialPoint.y - size);
      pathData += ' ' + (initialPoint.x + size) + ',' + (initialPoint.y - 2 * size);
      pathData += ' A' + size + ',' + size + ' 0 1 0';
      pathData += ' ' + (initialPoint.x - size) + ',' + (initialPoint.y - 2 * size);
      pathData += ' Q' + initialPoint.x + ',' + (initialPoint.y - size);
      pathData += ' ' + initialPoint.x + ',' + initialPoint.y;
      var shape = new overlay.paperScope.Path(pathData);
      shape.name = overlay.getName(_this);
      shape.dashArray = overlay.dashArray;
      shape.data.strokeWidth = overlay.strokeWidth;
      shape.strokeWidth = shape.data.strokeWidth / overlay.paperScope.view.zoom;
      shape.strokeColor = overlay.strokeColor;
      shape.fillColor = overlay.fillColor;
      shape.fillColor.alpha = overlay.fillColorAlpha;
      shape.closed = true;
      overlay.fitFixedSizeShapes(shape);
      return shape;
    },

    updateSelection: function(selected, item, overlay) {
      if (item._name.toString().indexOf(this.idPrefix) !== -1) {
        if (selected) {
          item.strokeColor = overlay.selectedColor;

          if (!item.data.deleteIcon) {
            item.data.deleteIcon = new overlay.annotationUtils.DeleteActionIcon(overlay.paperScope, {
              name: item.name + this.partOfPrefix + 'delete',
              fillColor : item.selectedColor
            });

            item.data.deleteIcon.addData('pivot', item.segments[0].point);
            item.data.deleteIcon.addData('type', 'deleteIcon');
            item.data.deleteIcon.addData('self', item.data.deleteIcon);
            item.data.deleteIcon.addData('parent', item);

            item.data.deleteIcon.setPosition(item.data.deleteIcon.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom)));
            item.data.deleteIcon.setOnMouseDownListener(overlay);

          }

        } else {
          item.strokeColor = overlay.strokeColor;

          if (item.data.deleteIcon) {
            item.data.deleteIcon.remove();
            item.data.deleteIcon = null;
          }

        }
      }
    },

    onResize:function(item,overlay){
      if(item._name.toString().indexOf(this.partOfPrefix)!== -1){
        if(item._name.toString().indexOf('delete')){
          item.data.self.setPosition(item.data.self.getData('pivot').add(new overlay.paperScope.Point(0, 21 / overlay.paperScope.view.zoom)));
          item.data.self.resize(24 *  1 / overlay.paperScope.view.zoom);
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
        delete shape.data.nonHoverStrokeColor;
        delete shape.data.hovered;
      }
    },

    onMouseUp: function(event, overlay) {
      // Empty block.
    },

    onMouseDrag: function(event, overlay) {
      if (overlay.mode === 'translate') {
        if (overlay.path) {
          overlay.path.position.x += event.delta.x;
          overlay.path.position.y += event.delta.y;
          if(overlay.path.data.deleteIcon){
            overlay.path.data.deleteIcon.translateByXY(event.delta.x,event.delta.y);
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
      if(hitResult.type === 'stroke' || hitResult.type === 'handle-in' || hitResult.type === 'handle-out' || hitResult.type === 'segment'){
        jQuery(overlay.viewer.canvas).css('cursor','move');
        return;
      }

      // mouse over attached icon
      if(hitResult.type === 'pixel'){
        jQuery(overlay.viewer.canvas).css('cursor', 'pointer');
        return;
      }
    },

    onMouseDown: function (event, overlay) {
      var hitResult = overlay.paperScope.project.hitTest(event.point, overlay.hitOptions);
      if (hitResult && hitResult.item._name.toString().indexOf(this.idPrefix) != -1) {

        if (hitResult.item._name.toString().indexOf(this.partOfPrefix) !== -1) {
          hitResult.item.data.self.onMouseDown();
          return;
        }

        if (overlay.mode !== 'translate') {
          overlay.mode = 'translate';
          overlay.segment = null;
          overlay.path = null;
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

      overlay.path = this.createShape(event.point, overlay);
      overlay.onDrawFinish();
    },

    onDoubleClick: function(event, overlay) {
      // Empty block.
    }
  };
}(Mirador));
