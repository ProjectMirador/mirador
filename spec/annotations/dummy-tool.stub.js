(function () {
  window.DummyTool = {
    createShape: function (initialPoint, overlay) {
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
    updateSelection: function (selected, item, overlay) {
      if (item._name.toString().indexOf(this.idPrefix) != -1) {

        if(item._name.toString().indexOf(this.partOfPrefix)!=-1){
          return;
        }

        item.selected = selected;
        if (selected) {
          item.segments[1].handleOut = new overlay.paperScope.Point(0, 32 / overlay.paperScope.view.zoom);
          item.segments[1].handleOut = item.segments[1].handleOut.rotate(item.data.rotation, item.segments[1]);
          var point = item.segments[1].point.clone();
          point = point.add(item.segments[1].handleOut);
        } 
      }
    }
  }
})();