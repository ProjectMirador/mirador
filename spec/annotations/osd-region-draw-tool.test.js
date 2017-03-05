describe('OsdRegionDrawTool', function() {

  beforeEach(function() {
    var config = {
      osdViewer:{
        svgOverlay:function(){
          return MockOverlay.getOverlay();
        },
        addHandler:jasmine.createSpy(),
        removeHandler:jasmine.createSpy()
      },
      eventEmitter: new MockEventEmitter(new Mirador.EventEmitter())
    };
    this.drawTool = new Mirador.OsdRegionDrawTool(config);
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
      var drawTool = createDrawToolForRenderingTest(annotations);
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
    this.drawTool.destroy();
    for(var key in this.drawTool.eventEmitter.events){
      expect(this.drawTool.eventEmitter.events[key]).toBe(0);
    }
    expect(this.drawTool.osdViewer.addHandler.callCount).toBe(this.drawTool.osdViewer.removeHandler.callCount);
  });

  function createDrawToolForRenderingTest(annotations) {
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
          module: function() { console.log('HHHHH'); }
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
      element: osdViewerElem
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
