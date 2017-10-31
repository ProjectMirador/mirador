paper.install(window);

describe('Polygon', function() {

  beforeAll(function() {
    this.canvas = jQuery('<canvas></canvas>');
    this.canvas.attr('id', 'paperId');
    jasmine.getFixtures().set(this.canvas);
    paper.setup(this.canvas.attr('id'));
    this.polygon = new Mirador.Polygon();
  });
  afterAll(function() {
    delete this.polygon;
  });

  it('should create polygon shape', function() {
    var initialPoint = {
      'x': 123,
      'y': 456
    };
    var overlay = MockOverlay.getOverlay(paper);
    var shape = this.polygon.createShape(initialPoint, overlay);

    expect(overlay.mode).toBe('create');

    expect(shape.strokeColor.red).toBe(1);
    expect(shape.strokeColor.green).toBe(0);
    expect(shape.strokeColor.blue).toBe(0);

    expect(shape.closed).toBe(false);

    expect(shape.name).toBe(this.polygon.idPrefix + '1');

    expect(shape.segments.length).toBe(1);

    expect(shape.segments[0].point.x).toBe(initialPoint.x);
    expect(shape.segments[0].point.y).toBe(initialPoint.y);
  });

  describe('Polygon Mouse Tool', function() {
    var overlay;

    beforeEach(function() {
      overlay = MockOverlay.getOverlay(paper);
      this.polygon = new Mirador.Polygon();
      this.initialPoint = {
        'x': 987,
        'y': 654
      };
      this.shape = this.polygon.createShape(this.initialPoint, overlay);
      var point = {
        'x': this.initialPoint.x + 5,
        'y': this.initialPoint.y
      };
      this.shape.add(point);
      point = {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y + 5
      };
      this.shape.add(point);
    });

    afterEach(function() {
      delete this.shape;
      delete this.polygon;
    });

    it('should update selection', function() {
      var ellipseTool = new Mirador.Ellipse(); // TODO should use stub
      var initialPoint = {
        'x': 987,
        'y': 654
      };
      var ellipse = ellipseTool.createShape(initialPoint, overlay);
      this.polygon.updateSelection(true, ellipse, overlay);

      expect(this.shape.selected).toBe(false);

      this.polygon.updateSelection(true, this.shape, overlay);

      expect(this.shape.selected).toBe(true);
    });

    it('should update selection to true', function() {
      overlay.mode = 'edit';
      this.polygon.updateSelection(true, this.shape, overlay);

      expect(this.shape.selected).toBe(true);
      expect(this.shape.data.deleteIcon).not.toBeUndefined();
    });

    it('should update selection to false', function() {
      overlay.mode = 'edit'
      this.polygon.updateSelection(true, this.shape, overlay);
      this.polygon.updateSelection(false, this.shape, overlay);

      expect(this.shape.selected).toBe(false);
      expect(this.shape.data.deleteIcon).toBe(null);
    });


    it('should change stroke when hovering polygon',function(){
      var red = {
        r:1,
        g:0,
        b:0
      };
      this.polygon.onHover(true,this.shape,1,'red');

      expect(this.shape.data.hovered).toBe(true);
      expect(this.shape.strokeColor.red).toBe(red.r);
      expect(this.shape.strokeColor.green).toBe(red.g);
      expect(this.shape.strokeColor.blue).toBe(red.b);
    });

    it('should change stroke back to original when not hovering polygon',function(){

      var oldColor = this.shape.strokeColor;
      this.polygon.onHover(true,this.shape,1,'red');

      expect(this.shape.data.nonHoverStrokeColor.red).toBe(oldColor.red);
      expect(this.shape.data.nonHoverStrokeColor.green).toBe(oldColor.green);
      expect(this.shape.data.nonHoverStrokeColor.blue).toBe(oldColor.blue);

      this.polygon.onHover(false,this.shape,1);
      expect(this.shape.data.hovered).toBe(undefined);
      expect(this.shape.strokeColor.red).toBe(oldColor.red);
      expect(this.shape.strokeColor.green).toBe(oldColor.green);
      expect(this.shape.strokeColor.blue).toBe(oldColor.blue);
    });

    it('should do nothing', function() {
      var event = TestUtils.getEvent({
        'x': 100,
        'y': 100
      });
      overlay = MockOverlay.getOverlay(paper);
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
      this.polygon.onMouseDrag(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      overlay = MockOverlay.getOverlay(paper);
      overlay.mode = 'edit';
      this.polygon.onMouseDrag(event, overlay);

      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should edit the whole polygon shape', function() {
      var event = TestUtils.getEvent({
        'x': 3,
        'y': -3
      });
      overlay.mode = 'edit';
      this.polygon.updateSelection(true,this.shape,overlay);
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
      this.polygon.onMouseDrag(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      var selectedPointIndex = 1;
      overlay = MockOverlay.getOverlay(paper);
      overlay.mode = 'deform';
      overlay.path = this.shape;
      overlay.segment = this.shape.segments[selectedPointIndex];

      expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        if (idx == selectedPointIndex) {
          var point = {
            'x': this.shape.segments[idx].point.x + event.delta.x,
            'y': this.shape.segments[idx].point.y + event.delta.y
          };
          expected.push(point);
        } else {
          var point = {
            'x': this.shape.segments[idx].point.x,
            'y': this.shape.segments[idx].point.y
          };
          expected.push(point);
        }
      }
      this.polygon.onMouseDrag(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should finish generation of polygon shape', function() {
      var event = TestUtils.getEvent({
        'x': 100,
        'y': 100
      });
      overlay.mode = 'create';
      var expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }
      this.polygon.onDoubleClick(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      overlay = MockOverlay.getOverlay(paper);
      overlay.path = this.shape;
      overlay.mode = 'create';
      this.polygon.onDoubleClick(event, overlay);

      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      event = TestUtils.getEvent({
        'x': this.initialPoint.x,
        'y': this.initialPoint.y
      });
      overlay = MockOverlay.getOverlay(paper);
      overlay.path = this.shape;
      overlay.hitOptions.stroke = false;
      overlay.hitOptions.segments = false;
      overlay.hitOptions.tolerance = 5;
      overlay.mode = 'create';

      expected.push(this.initialPoint);
      this.shape.add(this.initialPoint);
      this.polygon.onDoubleClick(event, overlay);

      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      expect(this.shape.closed).toBe(true);

      expect(this.shape.fillColor.red).toBe(1);
      expect(this.shape.fillColor.green).toBe(0);
      expect(this.shape.fillColor.blue).toBe(0);

      expect(this.shape.fillColor.alpha).toBe(overlay.fillColorAlpha);
    });

    it('should change cursor on mouse move',function(){
      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y
      });
      overlay.viewer.canvas = this.canvas;
      overlay.hoveredPath = this.shape;
      this.polygon.onMouseMove(event,overlay);

      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('pointer');
    });
    
    it('should set cursor to pointer on handle-in or handle-out', function() {
      var _this = this;
      jQuery.each(['handle-in', 'handle-out'], function(k, v) {
        var hitResult = { type: v };
        overlay.viewer.canvas = _this.canvas;
        _this.polygon.setCursor(hitResult, overlay);
        expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('pointer');
      });
    });

    it('should set cursor to pointer when stoke is hit',function(){
      var hitResult = {
        type:'stroke'
      };
      overlay.viewer.canvas = this.canvas;
      this.polygon.setCursor(hitResult,overlay);
      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('move');
    });

    it('should set cursor to pointer when icon is hit',function(){
      var hitResult = {
        type:'pixel'
      };
      overlay.viewer.canvas = this.canvas;
      this.polygon.setCursor(hitResult,overlay);
      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('pointer');
    });

    it('should select polygon shape', function() {
      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x - 100,
        'y': this.initialPoint.y - 100
      });
      overlay.mode = '';
      this.polygon.updateSelection(true,this.shape,overlay);
      this.polygon.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('create');
      expect(overlay.segment).toBeNull();
      expect(overlay.path).not.toBe(this.shape);
      event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x - 100,
        'y': this.initialPoint.y - 100
      }, {
        'shift': null
      });

      overlay.mode = 'create';
      overlay.path = this.shape;

      var expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }
      expected.push(event.point);
      this.polygon.onMouseDown(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      overlay = MockOverlay.getOverlay(paper);
      overlay.mode  = 'edit';

      this.polygon.onMouseDown(event, overlay);

      expect(overlay.segment.point.x).toBe(event.point.x);
      expect(overlay.segment.point.y).toBe(event.point.y);

      expect(overlay.path).not.toBe(this.shape);
      expect(document.body.style.cursor).toBe('move');

      overlay = MockOverlay.getOverlay(paper);
      overlay.mode = 'translate';
      overlay.path = this.shape;
      this.polygon.onMouseDown(event, overlay);

      event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x + 5,
        'y': this.initialPoint.y
      }, {
        'shift': 'selected'
      });

      overlay = MockOverlay.getOverlay(paper);
      overlay.mode = '';

      expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        if (point.x != event.point.x || point.y != event.point.y) {
          expected.push(point);
        }
      }
      this.polygon.onMouseDown(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x + 3,
        'y': this.initialPoint.y
      }, {
        'shift': 'selected'
      });
      overlay = MockOverlay.getOverlay(paper);
      expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }
      this.polygon.onMouseDown(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x + 3,
        'y': this.initialPoint.y
      }, {
        'shift': null
      });
      overlay = MockOverlay.getOverlay(paper);
      overlay.edit = 'edit';
      overlay.path = this.shape;

      expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }
      this.polygon.onMouseDown(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x + 3,
        'y': this.initialPoint.y
      }, {
        'shift': null
      });

      overlay = MockOverlay.getOverlay(paper);
      overlay.mode = 'edit';
      expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }
      this.polygon.onMouseDown(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x + 100,
        'y': this.initialPoint.y
      }, {
        'shift': null
      });
      expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }
      this.polygon.onMouseDown(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }

      event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y
      }, {
        'shift': null
      });
      overlay.mode = 'edit';
      overlay.hitOptions.stroke = false;
      overlay.hitOptions.segments = false;
      overlay.hitOptions.tolerance = 5;
      this.shape.closed = true;
      this.shape.fillColor = '#0000ff';
      expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }
      this.polygon.onMouseDown(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });
    
    it('should select prefixed shapes', function() {
      var event = TestUtils.getEvent();
      spyOn(overlay.paperScope.project, 'hitTest').and.returnValue({
        item: this.shape
      });
      this.shape._name = "12-ABCD-EFG";
      this.shape.data.self = jasmine.createSpyObj('self', ['onMouseDown']);
      this.polygon.idPrefix = "ABCD";
      this.polygon.partOfPrefix = "12";
      this.polygon.onMouseDown(event, overlay);
      expect(this.shape.data.self.onMouseDown).toHaveBeenCalled();
    });

    it('should resize the trash can icon when resized',function(){
      var _this = this;
      var item = {
        '_name':{
          toString:function(){
            return _this.polygon.idPrefix + _this.polygon.partOfPrefix + 'delete';
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

      this.polygon.onResize(item,overlay);

      expect(item.data.self.resize).toHaveBeenCalledWith(24);
    });


  });

});
