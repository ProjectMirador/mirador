describe('Dialog Builder', function () {
  var dialogElement;

  beforeEach(function () {
    // stub bootbox.js ( DialogBuilder is wrapper)
    dialogElement = document.createElement('div');
    dialogElement.className = "dummy-dialog";
    jQuery('<div class="modal-backdrop" style="width:50px;height:50px;"></div><div class="window">BACKGROUND</div>').appendTo('body');
    bootbox = jasmine.createSpy();
    bootbox.confirm = jasmine.createSpy();
    bootbox.dialog = jasmine.createSpy().and.returnValue(dialogElement);
    bootbox.setDefaults = jasmine.createSpy();

    this.dialogBuilder = new Mirador.DialogBuilder(jQuery('.window'));
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
  });
  
  it('should respond to modal show', function() {
    this.dialogBuilder.dialog();
    jQuery(dialogElement).trigger("shown.bs.modal");
    expect(jQuery('.window .modal-backdrop')).toExist();
  });
  
  it('should respond to modal hide', function() {
    this.dialogBuilder.dialog();
    $('<div class="modal-backdrop">waahoo</div>').appendTo('body');
    expect(jQuery('.modal-backdrop')).toBeInDOM();
    jQuery(dialogElement).trigger("hidden.bs.modal");
    expect(jQuery('.modal-backdrop')).not.toBeInDOM();
  });
});
