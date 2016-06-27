paper.install(window);

describe('Pin', function() {
  var pinNumber;

  function getEvent(delta, point) {
    return {
      'delta': delta,
      'point': point
    };
  }

  function getOverlay(paperScope, strokeColor, fillColor, fillColorAlpha, mode, path, segment) {
    return {
      'currentPinSize': 1.0,
      'paperScope': paperScope,
      'strokeColor': strokeColor,
      'fillColor': fillColor,
      'fillColorAlpha': fillColorAlpha,
      'mode': mode,
      'path': path,
      'segment': segment,
      'fixedShapeSize': 5,
      'hitOptions': {
        'fill': true,
        'stroke': true,
        'segments': true,
        'tolerance': 0
      },
      'fitFixedSizeShapes': function() {
      },
      onDrawFinish: function() {
      },
      getName: function(tool) {
        pinNumber++;
        return tool.idPrefix + pinNumber;
      }
    };
  }

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
    var overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0);
    var pinScale = 5 / overlay.currentPinSize;
    var shape = this.pin.createShape(initialPoint, overlay);

    expect(overlay.mode).toBe('create');

    expect(shape.strokeColor.red).toBe(1);
    expect(shape.strokeColor.green).toBe(0);
    expect(shape.strokeColor.blue).toBe(0);

    expect(shape.fillColor.red).toBe(0);
    expect(shape.fillColor.green).toBe(1);
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
      overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, '', null, null);
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

    it('should update selection', function() {
      var ellipseTool = new Mirador.Ellipse();
      var initialPoint = {
        'x': 987,
        'y': 654
      };
      var ellipse = ellipseTool.createShape(initialPoint, overlay);
      this.pin.updateSelection(true, ellipse, overlay);

      expect(this.shape.selected).toBe(false);

      var event = getEvent(initialPoint);

      this.pin.onMouseUp(event, overlay);
      this.pin.updateSelection(true, this.shape, overlay);

      var redColor = {
        red:1,
        green: 0,
        blue:0
      };

      expect(this.shape.strokeColor.red).toBe(redColor.red);
      expect(this.shape.strokeColor.green).toBe(redColor.green);
      expect(this.shape.strokeColor.blue).toBe(redColor.blue);
    });

    it('should change stroke when hovering pin',function(){
      var red = {
        r:1,
        g:0,
        b:0
      };
      this.pin.onHover(true,this.shape,'red');

      expect(this.shape.data.hovered).toBe(true);
      expect(this.shape.strokeColor.red).toBe(red.r);
      expect(this.shape.strokeColor.green).toBe(red.g);
      expect(this.shape.strokeColor.blue).toBe(red.b);
    });

    it('should change stroke back to original when not hovering pin',function(){

      var oldColor = this.shape.strokeColor;
      this.pin.onHover(true,this.shape,'red');

      expect(this.shape.data.nonHoverStroke.red).toBe(oldColor.red);
      expect(this.shape.data.nonHoverStroke.green).toBe(oldColor.green);
      expect(this.shape.data.nonHoverStroke.blue).toBe(oldColor.blue);

      this.pin.onHover(false,this.shape);
      expect(this.shape.data.hovered).toBe(undefined);
      expect(this.shape.strokeColor.red).toBe(oldColor.red);
      expect(this.shape.strokeColor.green).toBe(oldColor.green);
      expect(this.shape.strokeColor.blue).toBe(oldColor.blue);
    });

    it('should do nothing', function() {
      var event = getEvent({
        'x': 100,
        'y': 100
      });
      overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, '', null, null);
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
      var event = getEvent({
        'x': 3,
        'y': -3
      });
      overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, 'translate', this.shape, null);
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

      overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, 'translate', null, null);
      this.pin.onMouseDrag(event, overlay);

      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should select pin shape', function() {
      var event = getEvent({}, {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y
      });
      overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, '', null, null);
      this.pin.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('translate');
      expect(overlay.segment).toBeNull();
      expect(overlay.path).toBe(this.shape);
      expect(document.body.style.cursor).toBe('move');

      this.pin.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('');
      expect(overlay.segment).toBeNull();
      expect(overlay.path).toBeNull();

      event = getEvent({}, {
        'x': this.initialPoint.x + 100,
        'y': this.initialPoint.y + 100
      });
      overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, 'translate', null, null);
      this.pin.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('translate');
      expect(overlay.segment).toBeNull();
      expect(overlay.path).toBeNull();

      overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, 'deform', null, null);
      this.pin.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('deform');
      expect(overlay.segment).toBeNull();
      expect(overlay.path).toBeNull();

      event = getEvent({}, {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y
      });
      overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, 'translate', this.shape, null);
      this.pin.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('');
      expect(overlay.segment).toBeNull();
      expect(overlay.path).toBeNull();
      expect(document.body.style.cursor).toBe('default');

      event = getEvent({}, {
        'x': this.initialPoint.x + 100,
        'y': this.initialPoint.y + 100
      });
      overlay = getOverlay(paper, '#ff0000', '#00ff00', 1.0, '', null, null);
      this.pin.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('create');
    });
  });
});