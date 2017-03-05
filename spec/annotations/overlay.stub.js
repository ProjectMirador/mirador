(function () {
  window.MockOverlay = {
    getOverlay: function (paperScope) {
      return {
        viewer: {
          canvas: '',
        },
        paperScope: paperScope,
        strokeColor: 'red',
        fillColor: 'red',
        fillColorAlpha: 1.0,
        mode: '',
        path: null,
        segment: null,
        viewZoom: 1,
        hitOptions: {
          stroke:true,
          handles: true,
          segments: true,
          tolerance: 0
        },
        selectedColor:'red',
        fitFixedSizeShapes: jasmine.createSpy(),
        fixedShapeSize: 5,
        annotationUtils: new AnnotationUtilsStub(),
        state: {
          getStateProperty: jasmine.createSpy()
        },
        onDrawFinish: jasmine.createSpy(),
        getName: function (tool) {
          return tool.idPrefix + '1';
        },
        show: jasmine.createSpy(),
        hide: jasmine.createSpy(),
        disable: jasmine.createSpy(),
        destroy: jasmine.createSpy(),
        restoreEditedShapes: jasmine.createSpy()
      }
    }
  }
})();
