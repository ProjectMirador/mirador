(function () {
  window.MockIcon = function () {

  };

  MockIcon.prototype = {
    translateByXY: jasmine.createSpy(),
    translateByPoint: jasmine.createSpy(),
    click: jasmine.createSpy(),
    setOnMouseDownListener: jasmine.createSpy(),
    onMouseDown: jasmine.createSpy(),
    remove: jasmine.createSpy(),
    rotate: jasmine.createSpy(),
    getWidth: jasmine.createSpy(),
    getHeight: jasmine.createSpy(),
    setSize: jasmine.createSpy(),
    addData: jasmine.createSpy()
  }

})();