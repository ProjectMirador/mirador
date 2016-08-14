describe('OsdRegionDrawTool', function() {

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

  beforeEach(function() {

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

  xdescribe('render', function() {

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

}); 