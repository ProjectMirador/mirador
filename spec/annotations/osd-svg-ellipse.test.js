paper.install(window);

describe('Ellipse', function() {
  var diagonalSize;

  beforeAll(function() {
    this.canvas = jQuery('<canvas></canvas>');
    this.canvas.attr('id', 'paperId');
    jasmine.getFixtures().set(this.canvas);
    paper.setup(this.canvas.attr('id'));
    this.ellipse = new Mirador.Ellipse();
    diagonalSize = Math.sqrt(2);
  });
  afterAll(function() {
    delete this.ellipse;
  });

  it('should create ellipse shape', function() {
    var initialPoint = {
      'x': 123,
      'y': 456
    };
    var overlay = MockOverlay.getOverlay(paper);
    var shape = this.ellipse.createShape(initialPoint, overlay);

    expect(overlay.mode).toBe('create');

    expect(overlay.segment).toBe(shape.segments[6]);

    expect(shape.strokeColor.red).toBe(1);
    expect(shape.strokeColor.green).toBe(0);
    expect(shape.strokeColor.blue).toBe(0);

    expect(shape.fillColor.red).toBe(1);
    expect(shape.fillColor.green).toBe(0);
    expect(shape.fillColor.blue).toBe(0);

    expect(shape.fillColor.alpha).toBe(overlay.fillColorAlpha);

    expect(shape.closed).toBe(true);

    expect(shape.data.rotation).toBe(0);

    expect(shape.name).toBe(this.ellipse.idPrefix + '1');

    expect(shape.segments.length).toBe(10);

    expect(shape.segments[0].point.x).toBe(initialPoint.x - 2);
    expect(shape.segments[0].point.y).toBe(initialPoint.y - 2);

    expect(shape.segments[1].point.x).toBe(initialPoint.x - 1);
    expect(shape.segments[1].point.y).toBe(initialPoint.y - diagonalSize - 1);

    expect(shape.segments[2].point.x).toBe(initialPoint.x - 1);
    expect(shape.segments[2].point.y).toBe(initialPoint.y - diagonalSize - 1);

    expect(shape.segments[3].point.x).toBe(initialPoint.x - 1);
    expect(shape.segments[3].point.y).toBe(initialPoint.y - diagonalSize - 1);

    expect(shape.segments[4].point.x).toBe(initialPoint.x);
    expect(shape.segments[4].point.y).toBe(initialPoint.y - 2);

    expect(shape.segments[5].point.x).toBe(initialPoint.x + diagonalSize - 1);
    expect(shape.segments[5].point.y).toBe(initialPoint.y - 1);

    expect(shape.segments[6].point.x).toBe(initialPoint.x);
    expect(shape.segments[6].point.y).toBe(initialPoint.y);

    expect(shape.segments[7].point.x).toBe(initialPoint.x - 1);
    expect(shape.segments[7].point.y).toBe(initialPoint.y + diagonalSize - 1);

    expect(shape.segments[8].point.x).toBe(initialPoint.x - 2);
    expect(shape.segments[8].point.y).toBe(initialPoint.y);

    expect(shape.segments[9].point.x).toBe(initialPoint.x - diagonalSize - 1);
    expect(shape.segments[9].point.y).toBe(initialPoint.y - 1);
  });

  describe('Ellipse Mouse Tool', function() {
    var overlay;

    beforeEach(function() {
      overlay = MockOverlay.getOverlay(paper);
      this.ellipse = new Mirador.Ellipse();
      this.initialPoint = {
        'x': 987,
        'y': 654
      };
      this.shape = this.ellipse.createShape(this.initialPoint, overlay);
    });

    afterEach(function() {
      delete this.shape;
      delete this.ellipse;
    });

    it('should update selection', function() {
      this.ellipse.updateSelection(true, this.shape, overlay);

      expect(this.shape.selected).toBe(true);

      this.ellipse.updateSelection(true, this.shape, overlay);

      expect(this.shape.selected).toBe(true);

      this.shape.scale(-10);

      this.ellipse.updateSelection(true, this.shape, overlay);

      expect(this.shape.selected).toBe(true);

      this.ellipse.updateSelection(false, this.shape, overlay);

      expect(this.shape.selected).toBe(false);

      this.shape.add(new Segment(0, 0));

      this.ellipse.updateSelection(false, this.shape, overlay);

      expect(this.shape.segments.length).toBe(10);
    });

    it('should do nothing on mouse drag when there is no mode set', function() {
      var event = TestUtils.getEvent({
        'x': 100,
        'y': 100
      });
      overlay.mode = '';
      var expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }
      this.ellipse.onMouseDrag(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should translate the whole ellipse shape', function() {
      var event = TestUtils.getEvent({
        'x': 3,
        'y': -3
      });
      overlay.mode = 'translate';
      overlay.path = this.shape;

      this.ellipse.onMouseDrag(event, overlay);

      expect(this.shape.segments[0].point.x - event.delta.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[0].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[1].point.x - event.delta.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[1].point.y - event.delta.y).toBe(this.initialPoint.y - diagonalSize - 1);

      expect(this.shape.segments[2].point.x - event.delta.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[2].point.y - event.delta.y).toBe(this.initialPoint.y - diagonalSize - 1);

      expect(this.shape.segments[3].point.x - event.delta.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[3].point.y - event.delta.y).toBe(this.initialPoint.y - diagonalSize - 1);

      expect(this.shape.segments[4].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[4].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[5].point.x - event.delta.x).toBe(this.initialPoint.x + diagonalSize - 1);
      expect(this.shape.segments[5].point.y - event.delta.y).toBe(this.initialPoint.y - 1);

      expect(this.shape.segments[6].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[6].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[7].point.x - event.delta.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[7].point.y - event.delta.y).toBe(this.initialPoint.y + diagonalSize - 1);

      expect(this.shape.segments[8].point.x - event.delta.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[8].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[9].point.x - event.delta.x).toBe(this.initialPoint.x - diagonalSize - 1);
      expect(this.shape.segments[9].point.y - event.delta.y).toBe(this.initialPoint.y - 1);
    });

    it('should resize the whole ellipse shape dragging point[6]', function() {
      var event = TestUtils.getEvent({
        'x': 10,
        'y': 100
      });
      var diagonalSizeX = event.delta.x * (2 / (1 + Math.sqrt(1 / 2)));
      var diagonalSizeY = event.delta.y * (2 / (1 + Math.sqrt(1 / 2)));

      overlay.mode = 'deform';
      overlay.path = this.shape;
      overlay.segment = this.shape.segments[6];
      this.ellipse.onMouseDrag(event, overlay);

      expect(this.shape.segments[0].point.x - diagonalSizeX * ((2 - Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.x - 2, 1);
      expect(this.shape.segments[0].point.y - diagonalSizeY * ((2 - Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.y - 2, 1);

      expect(this.shape.segments[1].point.x - diagonalSizeX / 2).toBeCloseTo(this.initialPoint.x - 1, 1);
      expect(this.shape.segments[1].point.y).toBeCloseTo(this.initialPoint.y - diagonalSize - 1, 1);

      expect(this.shape.segments[2].point.x - diagonalSizeX / 2).toBeCloseTo(this.initialPoint.x - 1, 1);
      expect(this.shape.segments[2].point.y).toBeCloseTo(this.initialPoint.y - diagonalSize - 1, 1);

      expect(this.shape.segments[3].point.x - diagonalSizeX / 2).toBeCloseTo(this.initialPoint.x - 1, 1);
      expect(this.shape.segments[3].point.y).toBeCloseTo(this.initialPoint.y - diagonalSize - 1, 1);

      expect(this.shape.segments[4].point.x - diagonalSizeX * ((2 + Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.x, 1);
      expect(this.shape.segments[4].point.y - diagonalSizeY * ((2 - Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.y - 2, 1);

      expect(this.shape.segments[5].point.x - diagonalSizeX).toBeCloseTo(this.initialPoint.x + diagonalSize - 1, 1);
      expect(this.shape.segments[5].point.y - diagonalSizeY / 2).toBeCloseTo(this.initialPoint.y - 1, 1);

      expect(this.shape.segments[6].point.x - event.delta.x).toBeCloseTo(this.initialPoint.x, 1);
      expect(this.shape.segments[6].point.y - event.delta.y).toBeCloseTo(this.initialPoint.y, 1);

      expect(this.shape.segments[7].point.x - diagonalSizeX / 2).toBeCloseTo(this.initialPoint.x - 1, 1);
      expect(this.shape.segments[7].point.y - diagonalSizeY).toBeCloseTo(this.initialPoint.y + diagonalSize - 1, 1);

      expect(this.shape.segments[8].point.x - diagonalSizeX * ((2 - Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.x - 2, 1);
      expect(this.shape.segments[8].point.y - diagonalSizeY * ((2 + Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.y, 1);

      expect(this.shape.segments[9].point.x).toBeCloseTo(this.initialPoint.x - diagonalSize - 1, 1);
      expect(this.shape.segments[9].point.y - diagonalSizeY / 2).toBeCloseTo(this.initialPoint.y - 1, 1);
    });


    it('should resize the whole ellipse shape dragging point[0]', function() {
      var event = TestUtils.getEvent({
        'x': 10,
        'y': 100
      });
      var diagonalSizeX = event.delta.x * (2 / (1 + Math.sqrt(1 / 2)));
      var diagonalSizeY = event.delta.y * (2 / (1 + Math.sqrt(1 / 2)));

      overlay.mode = 'deform';
      overlay.path = this.shape;
      overlay.segment = this.shape.segments[0];
      this.ellipse.onMouseDrag(event, overlay);

      expect(this.shape.segments[0].point.x - event.delta.x).toBeCloseTo(this.initialPoint.x - 2, 1);
      expect(this.shape.segments[0].point.y - event.delta.y).toBeCloseTo(this.initialPoint.y - 2, 1);

      expect(this.shape.segments[1].point.x - diagonalSizeX / 2).toBeCloseTo(this.initialPoint.x - 1, 1);
      expect(this.shape.segments[1].point.y - diagonalSizeY).toBeCloseTo(this.initialPoint.y - diagonalSize - 1, 1);

      expect(this.shape.segments[2].point.x - diagonalSizeX / 2).toBeCloseTo(this.initialPoint.x - 1, 1);
      expect(this.shape.segments[2].point.y - diagonalSizeY).toBeCloseTo(this.initialPoint.y - diagonalSize - 1, 1);

      expect(this.shape.segments[3].point.x - diagonalSizeX / 2).toBeCloseTo(this.initialPoint.x - 1, 1);
      expect(this.shape.segments[3].point.y - diagonalSizeY).toBeCloseTo(this.initialPoint.y - diagonalSize - 1, 1);

      expect(this.shape.segments[4].point.x - diagonalSizeX * ((2 - Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.x, 1);
      expect(this.shape.segments[4].point.y - event.delta.y).toBeCloseTo(this.initialPoint.y - 2, 1);

      expect(this.shape.segments[5].point.x).toBeCloseTo(this.initialPoint.x + diagonalSize - 1, 1);
      expect(this.shape.segments[5].point.y - diagonalSizeY / 2).toBeCloseTo(this.initialPoint.y - 1, 1);

      expect(this.shape.segments[6].point.x - diagonalSizeX * ((2 - Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.x, 1);
      expect(this.shape.segments[6].point.y - diagonalSizeY * ((2 - Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.y, 1);

      expect(this.shape.segments[7].point.x - diagonalSizeX / 2).toBeCloseTo(this.initialPoint.x - 1, 1);
      expect(this.shape.segments[7].point.y).toBeCloseTo(this.initialPoint.y + diagonalSize - 1, 1);

      expect(this.shape.segments[8].point.x - event.delta.x).toBeCloseTo(this.initialPoint.x - 2, 1);
      expect(this.shape.segments[8].point.y - diagonalSizeY * ((2 - Math.sqrt(2)) / 4)).toBeCloseTo(this.initialPoint.y, 1);

      expect(this.shape.segments[9].point.x - diagonalSizeX).toBeCloseTo(this.initialPoint.x - diagonalSize - 1, 1);
      expect(this.shape.segments[9].point.y - diagonalSizeY / 2).toBeCloseTo(this.initialPoint.y - 1, 1);
    });


    function rotatePoint(point, initialPoint, angle) {
      var angleRad = angle * Math.PI / 180.0;
      return {
        x: Math.cos(angleRad) * (point.x - initialPoint.x) - Math.sin(angleRad) * (point.y - initialPoint.y) + initialPoint.x,
        y: Math.sin(angleRad) * (point.x - initialPoint.x) + Math.cos(angleRad) * (point.y - initialPoint.y) + initialPoint.y
      };
    }

    it('should rotate the whole ellipse shape', function() {
      var size = {
        'x': 1,
        'y': 1
      };
      var scale = 2;
      var rotationAngle = -90;
      // -90 degrees rotation + scale
      var event = TestUtils.getEvent({
        'x': -size.x,
        'y': size.y
      }, {
        'x': this.shape.position.x,
        'y': this.shape.position.y - size.y
      });
      var localCenterPoint = {
        'x': this.shape.position.x,
        'y': this.shape.position.y
      };

      overlay.mode = 'rotate';
      overlay.path = this.shape;
      var expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = this.shape.segments[idx].point;
        point = rotatePoint(point, localCenterPoint, rotationAngle);
        expected.push(point);
      }
      this.ellipse.onMouseDrag(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should create ellipse shape', function() {
      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x + 1000,
        'y': this.initialPoint.y + 1000
      });
      overlay.mode = '';
      this.ellipse.onMouseDown(event, overlay);

      expect(overlay.path).not.toBeNull();
      expect(overlay.onDrawFinish.calls.count()).toEqual(0);

      this.ellipse.onMouseUp(event, overlay);

      expect(overlay.onDrawFinish.calls.count()).toEqual(1);

      overlay.mode = '';
      overlay.onDrawFinish.calls.reset();
      this.ellipse.onMouseUp(event, overlay);

      expect(overlay.onDrawFinish.calls.count()).toEqual(0);
    });

    describe('should select elipse shape when clicking on',function(){

      beforeEach(function(){
        overlay.mode = '';
      });

      it('point[6] to deform ellipse', function() {

        var event = TestUtils.getEvent({}, {
          'x': this.initialPoint.x,
          'y': this.initialPoint.y
        });

        this.ellipse.onMouseDown(event, overlay);

        expect(overlay.mode).toBe('deform');
        expect(overlay.segment).toBe(this.shape.segments[6]);
        expect(overlay.path).toBe(this.shape);
      });

      it('point[5] to deform ellipse', function() {

        var event = TestUtils.getEvent({}, {
          'x': this.initialPoint.x + diagonalSize - 1,
          'y': this.initialPoint.y - 1
        });
        this.ellipse.onMouseDown(event, overlay);

        expect(overlay.mode).toBe('deform');
        expect(overlay.segment).toBe(this.shape.segments[5]);
        expect(overlay.path).toBe(this.shape);

      });

      it('point[1] to deform ellipse', function() {

        var event = TestUtils.getEvent({}, {
          'x': this.initialPoint.x - 1,
          'y': this.initialPoint.y - diagonalSize - 1
        });
        this.ellipse.onMouseDown(event, overlay);

        expect(overlay.mode).toBe('deform');
        expect(overlay.segment).toBe(this.shape.segments[1]);
        expect(overlay.path).toBe(this.shape);

      });

      it('point[0] to deform ellipse', function() {

        var event = TestUtils.getEvent({}, {
          'x': this.initialPoint.x - 2,
          'y': this.initialPoint.y - 2
        });
        this.ellipse.onMouseDown(event, overlay);

        expect(overlay.mode).toBe('deform');
        expect(overlay.segment).toBe(this.shape.segments[0]);
        expect(overlay.path).toBe(this.shape);

      });

      it('point[7] to deform ellipse', function() {

        var event = TestUtils.getEvent({}, {
          'x': this.initialPoint.x - 1,
          'y': this.initialPoint.y + diagonalSize - 1
        });
        this.ellipse.onMouseDown(event, overlay);

        expect(overlay.mode).toBe('deform');
        expect(overlay.segment).toBe(this.shape.segments[7]);
        expect(overlay.path).toBe(this.shape);

      });

      it('point[8] to deform ellipse', function() {

        var event = TestUtils.getEvent({}, {
          'x': this.initialPoint.x - 2,
          'y': this.initialPoint.y
        });
        this.ellipse.onMouseDown(event, overlay);

        expect(overlay.mode).toBe('deform');
        expect(overlay.segment).toBe(this.shape.segments[8]);
        expect(overlay.path).toBe(this.shape);

      });

      it('point[9] to deform ellipse', function() {

        var event = TestUtils.getEvent({}, {
          'x': this.initialPoint.x - diagonalSize - 1,
          'y': this.initialPoint.y - 1
        });
        this.ellipse.onMouseDown(event, overlay);

        expect(overlay.mode).toBe('deform');
        expect(overlay.segment).toBe(this.shape.segments[9]);
        expect(overlay.path).toBe(this.shape);
      });

    });

    it('should change stroke when hovering ellipse',function(){
      var red = {
        r:1,
        g:0,
        b:0
      };
      this.ellipse.onHover(true,this.shape,1,'red');

      expect(this.shape.data.hovered).toBe(true);
      expect(this.shape.strokeColor.red).toBe(red.r);
      expect(this.shape.strokeColor.green).toBe(red.g);
      expect(this.shape.strokeColor.blue).toBe(red.b);
    });

    it('should change stroke back to original when not hovering ellipse',function(){

      var oldColor = this.shape.strokeColor;
      this.ellipse.onHover(true,this.shape,'red');

      expect(this.shape.data.nonHoverStrokeColor.red).toBe(oldColor.red);
      expect(this.shape.data.nonHoverStrokeColor.green).toBe(oldColor.green);
      expect(this.shape.data.nonHoverStrokeColor.blue).toBe(oldColor.blue);

      this.ellipse.onHover(false,this.shape,1);
      expect(this.shape.data.hovered).toBe(undefined);
      expect(this.shape.strokeColor.red).toBe(oldColor.red);
      expect(this.shape.strokeColor.green).toBe(oldColor.green);
      expect(this.shape.strokeColor.blue).toBe(oldColor.blue);
    });


    it('should change cursor to move when stroke is hit',function(){
      var hitResult = {
        type:'stroke'
      };

      overlay.viewer.canvas = this.canvas;
      this.ellipse.setCursor(hitResult,overlay);

      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('move');
    });

    it('should change cursor to move when handle-in is hit',function(){
      var hitResult = {
        type:'handle-in'
      };

      overlay.viewer.canvas = this.canvas;
      this.ellipse.setCursor(hitResult,overlay);

      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('move');
    });

    it('should change cursor to move when handle-out is hit',function(){
      var hitResult = {
        type:'handle-in'
      };

      overlay.viewer.canvas = this.canvas;
      this.ellipse.setCursor(hitResult,overlay);

      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('move');
    });

    // it('should change cursor when hovering icon',function(){
    //
    // });

    it('should change cursor on mouse move',function(){
      var event = TestUtils.getEvent({},{
        x: this.initialPoint.x,
        y: this.initialPoint.y
      });
      overlay.viewer.canvas = this.canvas;
      this.ellipse.onMouseMove(event,overlay);

      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('move');
    });

    it('should not update selection if the item is part of selected shape',function(){
      var _this = this;
      var item = {
        '_name':{
          toString:function(){
            return 'dummy_tool_shape';
          }
        }
      };
      this.ellipse.updateSelection(true,item,overlay);
      expect(item.selected).toBeUndefined();
    });

    it('should resize the trash can icon when resized',function(){
      var _this = this;
      var item = {
        '_name':{
          toString:function(){
            return _this.ellipse.idPrefix + _this.ellipse.partOfPrefix + 'delete';
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

      this.ellipse.onResize(item,overlay);

      expect(item.data.self.resize).toHaveBeenCalledWith(24);
      expect(item.data.self.rotate).toHaveBeenCalledWith(180);
    });

  });
});
