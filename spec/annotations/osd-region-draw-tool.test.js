describe('OsdRegionDrawTool', function() {

  beforeEach(function() {
  });

  afterEach(function() {
  });

  xdescribe('Initialization', function() {
    it('should initialize', function() {

    });
  });

  xdescribe('enterEditMode', function() {

  });

  xdescribe('exitEditMode', function() {

  });

  xdescribe('deleteShape', function() {

  });

  xdescribe('saveEditedShape', function() {

  });

  describe('render', function() {
    it('should still render the other annotations when SVG parsing fails for one or more', function() {
      var annotations = [{
        on: {
          selector: {
            '@type': 'oa:SvgSelector',
            value: '<svg><path></path></sv' // invalid SVG
          }
        }
      }];
      var drawTool = createDrawTool(annotations);
      drawTool.render();
    });
  });

  xdescribe('showTooltipsFromMousePosition', function() {

  });

  xdescribe('bindEvents', function() {

  });

  xdescribe('getAnnoFromRegion', function() {

  });

  it('should unsubscibe from all events when destroying',function(){
    var drawTool = createDrawTool([]);
    drawTool.destroy();
    for(var key in drawTool.eventEmitter.events){
      expect(drawTool.eventEmitter.events[key]).toBe(0);
    }
    expect(drawTool.osdViewer.addHandler.callCount).toBe(drawTool.osdViewer.removeHandler.callCount);
  });

  function createDrawTool(annotations) {
    var windowId = 'window1';
    jQuery('document.body').append(jQuery('<div>').attr('id', windowId));
    var osdViewerElem = jQuery('<div/>');
    var mockPaperScope = {
      activate: jasmine.createSpy(),
      project: {
        clear: jasmine.createSpy()
      },
      view: {
        draw: jasmine.createSpy()
      }
    };
    var mockSvgOverlay = function() {
      return MockOverlay.getOverlay(mockPaperScope);
    };
    var mockSaveController = {
      currentConfig: {
        annotationBodyEditor: {
          module: jasmine.createSpy()
        }
      },
      getWindowElement: function() {
        return jQuery('#' + windowId);
      }
    };
    var mockAnnotationsLayer = {
      mode: Mirador.AnnotationsLayer.DISPLAY_ANNOTATIONS
    };
    var mockOpenSeadragon = {
      addHandler: jasmine.createSpy(),
      svgOverlay: mockSvgOverlay,
      element: osdViewerElem,
      removeHandler:jasmine.createSpy()
    };
    return new Mirador.OsdRegionDrawTool({
      eventEmitter: new MockEventEmitter(new Mirador.EventEmitter()),
      list: annotations,
      parent: mockAnnotationsLayer,
      osdViewer: mockOpenSeadragon,
      state: mockSaveController,
      svgOverlay: mockSvgOverlay
    });
  }
});
