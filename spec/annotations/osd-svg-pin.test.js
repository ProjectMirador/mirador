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
      'pinSize': 5,
      'hitOptions': {
        'fill': true,
        'stroke': true,
        'segments': true,
        'tolerance': 0
      },
      'fitPinSize': function() {
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

    expect(shape.fullySelected).toBe(true);

    expect(shape.name).toBe(this.pin.idPrefix + '1');

    expect(shape.segments.length).toBe(5);

    expect(shape.segments[0].point.x).toBe(initialPoint.x);
    expect(shape.segments[0].point.y).toBe(initialPoint.y);

    expect(shape.segments[1].point.x).toBe(initialPoint.x + pinScale);
    expect(shape.segments[1].point.y).toBe(initialPoint.y - 2 * pinScale);

    expect(shape.segments[2].point.x).toBe(initialPoint.x);
    expect(shape.segments[2].point.y).toBe(initialPoint.y - 3 * pinScale);

    expect(shape.segments[3].point.x).toBe(initialPoint.x - pinScale);
    expect(shape.segments[3].point.y).toBe(initialPoint.y - 2 * pinScale);

    expect(shape.segments[4].point.x).toBe(initialPoint.x);
    expect(shape.segments[4].point.y).toBe(initialPoint.y);
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