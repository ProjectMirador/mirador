describe('ThumbnailsView', function () {

  beforeEach(function () {
    this.eventEmitter = new Mirador.EventEmitter();
    this.viewerDiv = jQuery('<div>');
    this.workspace = {
      setLayout: jasmine.createSpy()
    };
    this.view = new Mirador.ThumbnailsView({
      appendTo: this.viewerDiv,
      workspace: this.workspace,
      state: new Mirador.SaveController({eventEmitter: this.eventEmitter}),
      eventEmitter: this.eventEmitter
    });
  });

  afterEach(function () {

  });

  xdescribe('Initialization', function () {
    it('should initialize', function () {

    });
  });

  xdescribe('loadContent', function () {

  });

  xdescribe('updateImage', function () {

  });

  xdescribe('updateFocusImages', function () {

  });

  xdescribe('currentImageChanged', function () {

  });

  xdescribe('listenForActions', function () {

  });

  xdescribe('bindEvents', function () {

  });

  xdescribe('toggle', function () {

  });

  xdescribe('loadImages', function () {

  });

  xdescribe('loadImage', function () {

  });

  xdescribe('reloadImages', function () {

  });

  xdescribe('hide', function () {

  });

  describe('show', function () {
    it('should show the thumbnailsView', function () {
      spyOn(jQuery.fn, 'show');
      this.view.show();
      expect(jQuery.fn.show).toHaveBeenCalled();
    });
  });


  xdescribe('adjustWidth', function () {

  });

  xdescribe('adjustHeight', function () {

  });
}); 
