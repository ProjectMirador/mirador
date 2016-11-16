(function () {

  window.MockItem = function () {

  };

  MockItem.prototype = {
    getItem: jasmine.createSpy().and.callFake(function() { return this; }),
    translateByXY: jasmine.createSpy(),
    translateByPoint: jasmine.createSpy(),
    click: jasmine.createSpy(),
    setOnMouseDownListener: jasmine.createSpy(),
    onMouseDown: jasmine.createSpy(),
    resize:jasmine.createSpy(),
    remove: jasmine.createSpy(),
    rotate: jasmine.createSpy(),
    getWidth: jasmine.createSpy(),
    getHeight: jasmine.createSpy(),
    setSize: jasmine.createSpy(),
    addData: jasmine.createSpy(),
    getData: function (key) {
      if (key === 'pivot') {
        return {
          add: jasmine.createSpy()
        };
      }
    },
    getMask:function () {
      return this;
    },
    setPosition: jasmine.createSpy()
  };

  window.MockGroup = function(paperScope,children){
    this.children = children;
  };

  MockGroup.prototype = Object.create(MockItem.prototype,{});
  MockGroup.prototype.rotate = function(angle,pivot){
    for(var child = 0;child < this.children.length; child++){
      this.children[child].rotate(angle,pivot);
    }
  };
  MockGroup.prototype.remove = jasmine.createSpy();


  window.AnnotationUtilsStub = function(){

  };

  AnnotationUtilsStub.prototype = {
    Icon: MockItem,
    PointText:MockItem,
    RotationIcon:MockItem,
    DeleteActionIcon:MockItem,
    Group: MockGroup
  };

})();