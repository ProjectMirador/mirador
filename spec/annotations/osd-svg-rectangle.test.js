paper.install(window);

describe('Rectangle', function() {

  beforeAll(function() {
    this.canvas = jQuery('<canvas></canvas>');
    this.canvas.attr('id', 'paperId');
    jasmine.getFixtures().set(this.canvas);
    paper.setup(this.canvas.attr('id'));
    this.rectangle = new Mirador.Rectangle();
  });
  afterAll(function() {
    delete this.rectangle;
  });

  it('should create rectangular shape', function() {
    var initialPoint = {
      'x': 123,
      'y': 456
    };
    var overlay = MockOverlay.getOverlay(paper);

    var shape = this.rectangle.createShape(initialPoint, overlay);

    expect(overlay.mode).toBe('create');

    expect(overlay.segment).toBe(shape.segments[5]);

    expect(shape.strokeColor.red).toBe(1);
    expect(shape.strokeColor.green).toBe(0);
    expect(shape.strokeColor.blue).toBe(0);

    expect(shape.fillColor.red).toBe(1);
    expect(shape.fillColor.green).toBe(0);
    expect(shape.fillColor.blue).toBe(0);

    expect(shape.fillColor.alpha).toBe(overlay.fillColorAlpha);

    expect(shape.closed).toBe(true);

    expect(shape.data.rotation).toBe(0);

    expect(shape.selected).toBe(true);

    expect(shape.name).toBe(this.rectangle.idPrefix + '1');

    expect(shape.segments.length).toBe(9);

    expect(shape.segments[0].point.x).toBe(initialPoint.x - 2);
    expect(shape.segments[0].point.y).toBe(initialPoint.y - 2);

    expect(shape.segments[1].point.x).toBe(initialPoint.x - 1);
    expect(shape.segments[1].point.y).toBe(initialPoint.y - 2);

    expect(shape.segments[2].point.x).toBe(initialPoint.x - 1);
    expect(shape.segments[2].point.y).toBe(initialPoint.y - 2);

    expect(shape.segments[3].point.x).toBe(initialPoint.x);
    expect(shape.segments[3].point.y).toBe(initialPoint.y - 2);

    expect(shape.segments[4].point.x).toBe(initialPoint.x);
    expect(shape.segments[4].point.y).toBe(initialPoint.y - 1);

    expect(shape.segments[5].point.x).toBe(initialPoint.x);
    expect(shape.segments[5].point.y).toBe(initialPoint.y);

    expect(shape.segments[6].point.x).toBe(initialPoint.x - 1);
    expect(shape.segments[6].point.y).toBe(initialPoint.y);

    expect(shape.segments[7].point.x).toBe(initialPoint.x - 2);
    expect(shape.segments[7].point.y).toBe(initialPoint.y);

    expect(shape.segments[8].point.x).toBe(initialPoint.x - 2);
    expect(shape.segments[8].point.y).toBe(initialPoint.y - 1);
  });

  describe('Rectangle Mouse Tool', function() {
    var overlay;

    beforeEach(function() {
      overlay = MockOverlay.getOverlay(paper);
      this.rectangle = new Mirador.Rectangle();
      this.initialPoint = {
        'x': 987,
        'y': 654
      };
      this.shape = this.rectangle.createShape(this.initialPoint, overlay);
    });

    afterEach(function() {
      delete this.shape;
      delete this.rectangle;
    });

    it('should update selection to false', function() {
      // when created the shape is selected by default
      expect(this.shape.selected).toBe(true);

      this.rectangle.updateSelection(false, this.shape, overlay);

      expect(this.shape.selected).toBe(false);

      this.rectangle.updateSelection(true, this.shape, overlay);

      expect(this.shape.selected).toBe(true);
    });

    it('should change stroke when hovering rectangle',function(){
      var red = {
        r:1,
        g:0,
        b:0
      };
      this.rectangle.onHover(true,this.shape,1,'red');

      expect(this.shape.data.hovered).toBe(true);
      expect(this.shape.strokeColor.red).toBe(red.r);
      expect(this.shape.strokeColor.green).toBe(red.g);
      expect(this.shape.strokeColor.blue).toBe(red.b);
    });

    it('should change stroke back to original when not hovering rectangle',function(){
      var oldColor = this.shape.strokeColor;

      this.rectangle.onHover(true,this.shape,1,'red');
      expect(this.shape.data.nonHoverStrokeColor.red).toBe(oldColor.red);
      expect(this.shape.data.nonHoverStrokeColor.green).toBe(oldColor.green);
      expect(this.shape.data.nonHoverStrokeColor.blue).toBe(oldColor.blue);

      this.rectangle.onHover(false,this.shape,1);
      expect(this.shape.data.hovered).toBe(undefined);
      expect(this.shape.strokeColor.red).toBe(oldColor.red);
      expect(this.shape.strokeColor.green).toBe(oldColor.green);
      expect(this.shape.strokeColor.blue).toBe(oldColor.blue);
    });

    it('should do nothing on mouse drag when there is not set mode', function () {
      var event = TestUtils.getEvent({
        'x': 100,
        'y': 100
      });
      var expected = [];
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        var point = {
          'x': this.shape.segments[idx].point.x,
          'y': this.shape.segments[idx].point.y
        };
        expected.push(point);
      }

      overlay.mode = '';

      this.rectangle.onMouseDrag(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should translate the whole rectangular shape', function() {
      var event = TestUtils.getEvent({
        'x': 3,
        'y': -3
      });

      overlay.mode = 'translate';
      overlay.path = this.shape;

      this.rectangle.onMouseDrag(event, overlay);

      expect(this.shape.segments[0].point.x - event.delta.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[0].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[1].point.x - event.delta.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[1].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[2].point.x - event.delta.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[2].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[3].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[3].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[4].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[4].point.y - event.delta.y).toBe(this.initialPoint.y - 1);

      expect(this.shape.segments[5].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[5].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[6].point.x - event.delta.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[6].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[7].point.x - event.delta.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[7].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[8].point.x - event.delta.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[8].point.y - event.delta.y).toBe(this.initialPoint.y - 1);
    });

    it('should resize the whole rectangular shape when resized from the bottom right corner and then from the top left corner', function() {
      var event = TestUtils.getEvent({
        'x': 10,
        'y': 100
      });
      overlay.mode = 'deform';
      overlay.path = this.shape;
      overlay.segment = this.shape.segments[5];
      this.rectangle.onMouseDrag(event, overlay);

      expect(this.shape.segments[0].point.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[0].point.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[1].point.x - event.delta.x / 2).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[1].point.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[2].point.x - event.delta.x / 2).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[2].point.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[3].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[3].point.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[4].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[4].point.y - event.delta.y / 2).toBe(this.initialPoint.y - 1);

      expect(this.shape.segments[5].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[5].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[6].point.x - event.delta.x / 2).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[6].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[7].point.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[7].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[8].point.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[8].point.y - event.delta.y / 2).toBe(this.initialPoint.y - 1);

      var event2 = TestUtils.getEvent({
        'x': 100,
        'y': 10
      });
      overlay.segment = this.shape.segments[0];
      this.rectangle.onMouseDrag(event2, overlay);

      expect(this.shape.segments[0].point.x - event2.delta.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[0].point.y - event2.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[1].point.x - event.delta.x / 2 - event2.delta.x / 2).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[1].point.y - event2.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[2].point.x - event.delta.x / 2 - event2.delta.x / 2).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[2].point.y - event2.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[3].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[3].point.y - event2.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[4].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[4].point.y - event.delta.y / 2 - event2.delta.y / 2).toBe(this.initialPoint.y - 1);

      expect(this.shape.segments[5].point.x - event.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[5].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[6].point.x - event.delta.x / 2 - event2.delta.x / 2).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[6].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[7].point.x - event2.delta.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[7].point.y - event.delta.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[8].point.x - event2.delta.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[8].point.y - event.delta.y / 2 - event2.delta.y / 2).toBe(this.initialPoint.y - 1);
    });


    it('should resize the whole rectangular shape from top middle corner and then left middle', function() {
      var event = TestUtils.getEvent({
        'x': 10,
        'y': 100
      });
      overlay.mode = 'deform';
      overlay.path = this.shape;
      overlay.segment = this.shape.segments[2];

      this.rectangle.onMouseDrag(event, overlay);

      expect(this.shape.segments[0].point.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[0].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[1].point.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[1].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[2].point.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[2].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[3].point.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[3].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[4].point.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[4].point.y - event.delta.y / 2).toBe(this.initialPoint.y - 1);

      expect(this.shape.segments[5].point.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[5].point.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[6].point.x).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[6].point.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[7].point.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[7].point.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[8].point.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[8].point.y - event.delta.y / 2).toBe(this.initialPoint.y - 1);

      var event2 = TestUtils.getEvent({
        'x': 100,
        'y': 10
      });
      overlay .segment = this.shape.segments[4];
      this.rectangle.onMouseDrag(event2, overlay);

      expect(this.shape.segments[0].point.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[0].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[1].point.x - event2.delta.x / 2).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[1].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[2].point.x - event2.delta.x / 2).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[2].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[3].point.x - event2.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[3].point.y - event.delta.y).toBe(this.initialPoint.y - 2);

      expect(this.shape.segments[4].point.x - event2.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[4].point.y - event.delta.y / 2).toBe(this.initialPoint.y - 1);

      expect(this.shape.segments[5].point.x - event2.delta.x).toBe(this.initialPoint.x);
      expect(this.shape.segments[5].point.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[6].point.x - event2.delta.x / 2).toBe(this.initialPoint.x - 1);
      expect(this.shape.segments[6].point.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[7].point.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[7].point.y).toBe(this.initialPoint.y);

      expect(this.shape.segments[8].point.x).toBe(this.initialPoint.x - 2);
      expect(this.shape.segments[8].point.y - event.delta.y / 2).toBe(this.initialPoint.y - 1);
    });

    it('should rotate the whole rectangular shape', function() {
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
        point = TestUtils.rotatePoint(point, localCenterPoint, rotationAngle);
        expected.push(point);
      }
      this.rectangle.onMouseDrag(event, overlay);

      expect(this.shape.segments.length).toBe(expected.length);
      for (var idx = 0; idx < this.shape.segments.length; idx++) {
        expect(this.shape.segments[idx].point.x).toBeCloseTo(expected[idx].x, 6);
        expect(this.shape.segments[idx].point.y).toBeCloseTo(expected[idx].y, 6);
      }
    });

    it('should create rectangular shape', function() {
      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x + 1000,
        'y': this.initialPoint.y + 1000
      });

      this.rectangle.onMouseDown(event, overlay);

      expect(overlay.path).not.toBeNull();
      expect(overlay.onDrawFinish.calls.count()).toEqual(0);

      this.rectangle.onMouseUp(event, overlay);

      expect(overlay.onDrawFinish.calls.count()).toEqual(1);

      overlay.mode = '';
      overlay.onDrawFinish.calls.reset();

      this.rectangle.onMouseUp(event, overlay);

      expect(overlay.onDrawFinish.calls.count()).toEqual(0);
    });

    it('should select point[5] deform rectangular', function() {

      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y
      });
      overlay.mode = '';

      this.rectangle.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('deform');
      expect(overlay.segment).toBe(this.shape.segments[5]);
      expect(overlay.path).toBe(this.shape);
    });

    it('should select point[4] to deform rectangular', function() {

     var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y - 1
      });
      overlay.mode = '';

      this.rectangle.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('deform');
      expect(overlay.segment).toBe(this.shape.segments[4]);
      expect(overlay.path).toBe(this.shape);
    });

    it('should select point[3] to deform rectangular', function() {

      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x,
        'y': this.initialPoint.y - 2
      });

      overlay.mode = '';

      this.rectangle.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('deform');
      expect(overlay.segment).toBe(this.shape.segments[3]);
      expect(overlay.path).toBe(this.shape);
    });

    it('should select point[1] to deform rectangular', function() {

      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x - 1,
        'y': this.initialPoint.y - 2
      });
      overlay.mode = '';
      this.rectangle.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('deform');
      expect(overlay.segment).toBe(this.shape.segments[1]);
      expect(overlay.path).toBe(this.shape);
    });

    it('should select point[0] to deform rectangular', function() {

     var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x - 2,
        'y': this.initialPoint.y - 2
      });
      overlay.mode = '';
      this.rectangle.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('deform');
      expect(overlay.segment).toBe(this.shape.segments[0]);
      expect(overlay.path).toBe(this.shape);

    });

    it('should select point[6] to deform rectangular', function() {

     var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x - 1,
        'y': this.initialPoint.y
      });
      overlay.mode  = '';
      this.rectangle.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('deform');
      expect(overlay.segment).toBe(this.shape.segments[6]);
      expect(overlay.path).toBe(this.shape);

    });

    it('should select point[7] to deform rectangular', function() {

      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x - 2,
        'y': this.initialPoint.y
      });
      overlay.mode = '';
      this.rectangle.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('deform');
      expect(overlay.segment).toBe(this.shape.segments[7]);
      expect(overlay.path).toBe(this.shape);

    });

    it('should select point[8] to deform rectangular', function() {

      var event = TestUtils.getEvent({}, {
        'x': this.initialPoint.x - 2,
        'y': this.initialPoint.y - 1
      });
      overlay.mode = '';
      this.rectangle.onMouseDown(event, overlay);

      expect(overlay.mode).toBe('deform');
      expect(overlay.segment).toBe(this.shape.segments[8]);
      expect(overlay.path).toBe(this.shape);

    });

    it('should change cursor to move when stroke is hit',function(){
     var hitResult = {
       type:'stroke'
     };

      overlay.viewer.canvas = this.canvas;
      this.rectangle.setCursor(hitResult,overlay);

      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('move');
    });

    // it('should change cursor to pointer when hovering delete icon',function(){
    //
    //
    // });

    it('should change cursor on mouse move',function(){
      var event = TestUtils.getEvent({},{
        x: this.initialPoint.x,
        y: this.initialPoint.y
      });
      overlay.viewer.canvas = this.canvas;
      overlay.hoveredPath = this.shape;
      this.rectangle.onMouseMove(event,overlay);

      expect(jQuery(overlay.viewer.canvas).css('cursor')).toBe('pointer');
    });

    it('should not update selection if the item is part of selected shape',function(){
      var _this = this;
      var item = {
        '_name':{
          toString:function(){
            return _this.rectangle.idPrefix + _this.rectangle.partOfPrefix;
          }
        }
      };
      this.rectangle.updateSelection(true,item,overlay);
      expect(item.selected).toBeUndefined();
    });

    it('should adapt segments (old rects have different pivot points)',function(){

      this.rectangle.adaptSegments(this.shape);
      expect(this.shape.segments[1].point.x).toBe(this.shape.segments[2].point.x);
      expect(this.shape.segments[1].point.y).toBe(this.shape.segments[2].point.y);

    });

    it('should resize the trash can icon',function(){
      var _this = this;
      var item = {
        '_name':{
          toString:function(){
            return _this.rectangle.idPrefix + _this.rectangle.partOfPrefix + 'delete';
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

      this.rectangle.onResize(item,overlay);

      expect(item.data.self.resize).toHaveBeenCalledWith(24);
      expect(item.data.self.rotate).toHaveBeenCalledWith(180);
    });

  });

});
