paper.install(window);

describe('Pin', function() {
  var pinNumber;

  beforeAll(function() {
    this.canvas = jQuery('<canvas></canvas>');
    this.canvas.attr('id', 'paperId');
    jasmine.getFixtures().set(this.canvas);
    paper.setup(this.canvas.attr('id'));
    this.pin = new Mirador.Pin();
    pinNumber = 0;
  });

  afterAll(function() {
    delete this.pin;
  });

  it('should create pin shape', function() {
    var initialPoint = {
      'x': 123,
      'y': 456
    };
    var overlay = MockOverlay.getOverlay(paper);
    var shape = this.pin.createShape(initialPoint, overlay);

    expect(overlay.mode).toBe('create');

    expect(shape.strokeColor.red).toBe(1);
    expect(shape.strokeColor.green).toBe(0);
    expect(shape.strokeColor.blue).toBe(0);

    expect(shape.fillColor.red).toBe(1);
    expect(shape.fillColor.green).toBe(0);
    expect(shape.fillColor.blue).toBe(0);

    expect(shape.fillColor.alpha).toBe(overlay.fillColorAlpha);

    expect(shape.closed).toBe(true);

    expect(shape.name).toBe(this.pin.idPrefix + '1');

    expect(shape.segments.length).toBe(5);

    expect(shape.segments[0].point.x).toBe(initialPoint.x);
    expect(shape.segments[0].point.y).toBe(initialPoint.y);
  });

  describe('Pin Mouse Tool', function() {
    var overlay;

    beforeEach(function() {
      overlay = MockOverlay.getOverlay(paper);
      this.pin = new Mirador.Pin();
      this.initialPoint = {
        'x': 987,
        'y': 654
      };
      this.shape = this.pin.createShape(this.initialPoint, overlay);
    });

    afterEach(function() {
      delete this.shape;
      delete this.pin;
    });

    it('should update selection to true', function() {
      var initialPoint = {
        'x': 987,
        'y': 654
      };

      var event = TestUtils.getEvent(initialPoint);

      this.pin.updateSelection(true, this.shape, overlay);

      var redColor = {
        red:1,
        green: 0,
        blue:0
      };

      expect(this.shape.strokeColor.red).toBe(redColor.red);
      expect(this.shape.strokeColor.green).toBe(redColor.green);
      expect(this.shape.strokeColor.blue).toBe(redColor.blue);
      expect(this.shape.data.deleteIcon).not.toBeUndefined;
    });

    it('should update selection to false', function() {
      var initialPoint = {
        'x': 987,
        'y': 654
      };

      var event = TestUtils.getEvent(initialPoint);

      this.pin.updateSelection(true, this.shape, overlay);

      this.pin.updateSelection(false, this.shape, overlay);

      var redColor = {
        red:1,
        green: 0,
        blue:0
      };

      expect(this.shape.strokeColor.red).toBe(redColor.red);
      expect(this.shape.strokeColor.green).toBe(redColor.green);
      expect(this.shape.strokeColor.blue).toBe(redColor.blue);
      expect(this.shape.data.deleteIcon).toBeUndefined;
    });

    it('should change stroke when hovering pin',function(){
      var red = {
        r:1,
        g:0,
        b:0
      };
      this.pin.onHover(true,this.shape,1,'red');

      expect(this.shape.data.hovered).toBe(true);
      expect(this.shape.strokeColor.red).toBe(red.r);
      expect(this.shape.strokeColor.green).toBe(red.g);
      expect(this.shape.strokeColor.blue).toBe(red.b);
    });

    it('should change stroke back to original when not hovering pin',function(){

      var oldColor = this.shape.strokeColor;
      this.pin.onHover(true,this.shape,1,'red');

      expect(this.shape.data.nonHoverStrokeColor.red).toBe(oldColor.red);
      expect(this.shape.data.nonHoverStrokeColor.green).toBe(oldColor.green);
      expect(this.shape.data.nonHoverStrokeColor.blue).toBe(oldColor.blue);

      this.pin.onHover(false,this.shape,1);
      expect(this.shape.data.hovered).toBe(undefined);
      expect(this.shape.strokeColor.red).toBe(oldColor.red);
      expect(this.shape.strokeColor.green).toBe(oldColor.green);
      expect(this.shape.strokeColor.blue).toBe(oldColor.blue);
    });

    it('should do nothing when no mode is selected', function() {
      var event = TestUtils.getEvent({
        'x': 100,
        'y': 100
      });
      overlay.mode = '';
      var localCenterPoint = {
        'x': this.initialPoint.x - 1,
        'y': this.initialPoint.y - 1
      };
      var expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }
      this.pin.onMouseDrag(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should translate the whole pin shape', function() {
      var event = TestUtils.getEvent({
        'x': 3,
        'y': -3
      });
      this.pin.updateSelection(true,this.shape,overlay);
      overlay.mode = 'translate';
      overlay.path = this.shape;
      var expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x + event.delta.x,
          'y': this.shape.segments[idx].point.y + event.delta.y
        };
        expected.push(point);
      }
      this.pin.onMouseDrag(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should  not translate the whole pin shape when no pin is selected', function() {
      var event = TestUtils.getEvent({
        'x': 3,
        'y': -3
      });
      overlay.mode = 'translate';
      overlay.path = this.shape;
      var expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x + event.delta.x,
          'y': this.shape.segments[idx].point.y + event.delta.y
        };
        expected.push(point);
      }
      overlay.mode = 'translate';
      this.pin.onMouseDrag(event, overlay);

      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should select pin shape for translate', function() {
      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y
      });

      overlay.mode = '';
      this.pin.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('translate');
      expect(overlay.segment).toBeNull();
      expect(overlay.path).toBe(this.shape);

      this.pin.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('');
      expect(overlay.segment).toBeNull();
      expect(overlay.path).toBeNull();
    });

    it('should create pin',function(){

      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x + 100,
        'y': this.initialPoint.y + 100
      });

      overlay.mode = '';
      this.pin.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('create');
    });
    
    it('should bubble onMouseDown event when the part-of prefix is found', function() {
      var mockHitResult = {
        item: {
          _name: "abcdefg",
          data: { self: { onMouseDown: jasmine.createSpy('onMouseDown') } }
        }
      };
      spyOn(overlay.paperScope.project, 'hitTest').and.returnValue(mockHitResult);
      this.pin.partOfPrefix = "cde";
      this.pin.idPrefix = "ab";
      var event = TestUtils.getEvent({}, {
        x: this.initialPoint.x,
        y: this.initialPoint.y
      });
      this.pin.onMouseDown(event, overlay);
      expect(mockHitResult.item.data.self.onMouseDown).toHaveBeenCalled();
    });

    it('should change cursor on mouse move',function(){
      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y
      });
      overlay.viewer.canvas = this.canvas;
      overlay.hoveredPath = this.shape;
      this.pin.onMouseMove(event,overlay);

      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('move');
    });

    it('should set cursor to pointer when stoke is hit',function(){
      var hitResult = {
        type:'stroke'
      };
      overlay.viewer.canvas = this.canvas;
      this.pin.setCursor(hitResult,overlay);
      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('move');
    });

    it('should set cursor to pointer when icon is hit',function(){
      var hitResult = {
        type:'pixel'
      };
      overlay.viewer.canvas = this.canvas;
      this.pin.setCursor(hitResult,overlay);
      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('pointer');
    });

    it('should resize the trash can icon',function(){
      var _this = this;
      var item = {
        '_name':{
          toString:function(){
            return _this.pin.idPrefix + _this.pin.partOfPrefix + 'delete';
          }
        },
        data:{
          self:new overlay.annotationUtils.DeleteActionIcon(),
          parent:{ // should use mock shape
            data:{
              rotation:1
            },
            contains:jasmine.createSpy().and.returnValue(true)
          }
        }
      };

      this.pin.onResize(item,overlay);

      expect(item.data.self.resize).toHaveBeenCalledWith(24);
    });

  });

});
