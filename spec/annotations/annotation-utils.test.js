describe('Annotation utils', function () {
  describe('Icons classes', function () {
    var paperScope = {
      view:{
        zoom:1
      },
      Size:function(){

      },
      Raster: function () {
        this.position = new position(0, 0);
        this.data = {};
        this.remove = jasmine.createSpy();
        this.rotate = jasmine.createSpy();
        this.width = 0;
        this.height = 0;
      },
      PointText: function () {
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
      };
    };

    describe('Icon', function () {

      beforeEach(function () {
        this.icon = new Mirador.AnnotationUtils().Icon;
        this.icon = new this.icon(paperScope, {name: ''});
      });

      it('should translate icon by point', function () {
        this.icon.translateByPoint({x: 1, y: 1});
        expect(this.icon.item.position.x).toBe(1);
        expect(this.icon.item.position.y).toBe(1);

      });

      it('should translate icon by x and y as params', function () {
        this.icon.translateByXY(1, 1);
        expect(this.icon.item.position.x).toBe(1);
        expect(this.icon.item.position.y).toBe(1);

      });

      it('should set/call onMouseDown listener', function () {
        var spy = jasmine.createSpy();
        this.icon.setOnMouseDownListener(spy);
        this.icon.onMouseDown();
        expect(spy.calls.count()).toBe(1);
      });

      it('should add data to the raster', function () {
        this.icon.addData('key', 'value');
        expect(this.icon.item.data.key).toBe('value');
      });

      it('should rotate icon', function () {
        this.icon.rotate();
        expect(this.icon.item.rotate.calls.count()).toBe(1);
      });

      it('should remove icon', function () {
        this.icon.remove();
        expect(this.icon.item.remove.calls.count()).toBe(1);
      });

      it('should get the width and height', function () {
        expect(this.icon.getWidth()).toBe(0);
        expect(this.icon.getHeight()).toBe(0);
      });

    });


    describe('DeleteActionIcon', function () {
      beforeEach(function () {
        this.icon = new Mirador.AnnotationUtils().DeleteActionIcon;
        this.icon = new this.icon(paperScope,{name:''});
      });

      it('should use defined trashcan icon', function () {
        expect(this.icon.content).toBe('\uf014');
      });

      it('should fire delete shape event onMouseDown',function(){
        var overlay = {
          eventEmitter:{
            publish:jasmine.createSpy()
          }
        };

        this.icon.setOnMouseDownListener(overlay);
        this.icon.mouseDown();
        expect(overlay.eventEmitter.publish).toHaveBeenCalled();
      });

    });

    describe('RotationIcon', function () {
      beforeEach(function () {
        this.icon = new Mirador.AnnotationUtils().RotationIcon;
        this.icon = new this.icon(paperScope,{name:''});
      });

      it('should use defined rotate icon', function () {
        expect(this.icon.content).toBe('\uf01e');
      });

      it('should set overlay mode to rotate onMouseDown',function(){
        var overlay = {
          mode:''
        };

        this.icon.setOnMouseDownListener(overlay);
        this.icon.mouseDown();
        expect(overlay.mode).toBe('rotate');
      });

    });

  });
});