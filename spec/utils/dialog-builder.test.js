describe('Dialog Builder', function () {

  beforeEach(function () {
    // stub bootbox.js ( DialogBuilder is wrapper)
    bootbox = jasmine.createSpy();
    bootbox.confirm = jasmine.createSpy();
    bootbox.dialog = jasmine.createSpy();
    bootbox.setDefaults = jasmine.createSpy();

    this.dialogBuilder = new Mirador.DialogBuilder();
  });

  it('should call setDefaults',function(){
    expect(bootbox.setDefaults).toHaveBeenCalled();
  });

  it('should call underlying confirm method', function () {
    var onConfirm = function(){};
    this.dialogBuilder.confirm('msg',onConfirm);
    expect(bootbox.confirm).toHaveBeenCalledWith('msg',onConfirm);
  });

  it('should call underlying dialog method',function(){
    var opts = {};
    this.dialogBuilder.dialog(opts);
    expect(bootbox.dialog).toHaveBeenCalledWith(opts);
  })

});
