describe('Dialog Builder', function () {

  // stub bootbox.js ( DialogBuilder is wrapper)

  bootbox = jasmine.createSpy();

  beforeEach(function () {
    this.dialogBuilder = new Mirador.DialogBuilder();
  });

  it('should call underlying lib method', function () {
    bootbox.confirm = jasmine.createSpy();
    var onConfirm = function(){};
    this.dialogBuilder.confirm('msg',onConfirm);
    expect(bootbox.confirm).toHaveBeenCalledWith('msg',onConfirm);
  })

});
