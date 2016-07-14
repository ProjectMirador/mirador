describe('Annotation utils', function () {

  describe('Icon', function () {

    var paperScope = {
      Raster: function () {
        this.position = new position(0, 0);
        this.data = {};
        this.remove = jasmine.createSpy();
        this.rotate = jasmine.createSpy();
        this.width = 0;
        this.height = 0;
      }
    };

    var position = function (x, y) {
      this.x = x;
      this.y = y;
      this.add = function (point) {
        return new position(this.x + point.x, this.y + point.y);
      }
    };

    beforeEach(function () {
      this.icon = new Mirador.AnnotationUtils().Icon;
      this.icon = new this.icon(paperScope);
    });

    it('should translate icon by point', function () {
      this.icon.translateByPoint({x: 1, y: 1});
      expect(this.icon.raster.position.x).toBe(1);
      expect(this.icon.raster.position.y).toBe(1);

    });

    it('should translate icon by x and y as params', function () {
      this.icon.translateByXY(1, 1);
      expect(this.icon.raster.position.x).toBe(1);
      expect(this.icon.raster.position.y).toBe(1);

    });

    it('should set/call onMouseDown listener', function () {
      var spy = jasmine.createSpy();
      this.icon.setOnMouseDownListener(spy);
      this.icon.onMouseDown();
      expect(spy.calls.count()).toBe(1);
    });

    it('should add data to the raster', function () {
      this.icon.addData('key', 'value');
      expect(this.icon.raster.data.key).toBe('value');
    });

    it('should rotate icon', function () {
      this.icon.rotate();
      expect(this.icon.raster.rotate.calls.count()).toBe(1);
    });

    it('should remove icon', function () {
      this.icon.remove();
      expect(this.icon.raster.remove.calls.count()).toBe(1);
    });

    it('should get the width and height', function () {
      expect(this.icon.getWidth()).toBe(0);
      expect(this.icon.getHeight()).toBe(0);
    });

  });

});