describe('Dialog Builder', function () {

  beforeEach(function () {
    // stub bootbox.js ( DialogBuilder is wrapper)
    bootbox = jasmine.createSpy();
    var self = this;
    self.initSpy = jasmine.createSpyObj('initSpy', ['init']);
    bootbox.confirm = jasmine.createSpy('confirm').and.returnValue(self.initSpy);

    bootbox.dialog = jasmine.createSpy().and.returnValue(self.initSpy);

    bootbox.setDefaults = jasmine.createSpy();

    this.dialogBuilder = new Mirador.DialogBuilder();
  });

  it('should call setDefaults', function () {
    expect(bootbox.setDefaults).toHaveBeenCalled();
  });

  it('should call underlying confirm method', function () {
    var onConfirm = function () {
    };
    this.initSpy.init.calls.reset();
    this.dialogBuilder.confirm('msg', onConfirm);
    expect(bootbox.confirm).toHaveBeenCalledWith('msg', onConfirm);
    expect(this.initSpy.init).toHaveBeenCalled();
  });

  it('should call underlying dialog method', function () {
    var opts = {};
    this.initSpy.init.calls.reset();
    this.dialogBuilder.dialog(opts);
    expect(bootbox.dialog).toHaveBeenCalledWith(opts);
    expect(this.initSpy.init).toHaveBeenCalled();
  })

});
