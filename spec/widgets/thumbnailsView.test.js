describe('ThumbnailsView', function () {
  var subject;
  
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.viewContainer = document.createElement('div', {
      class: 'view-container'
    });
    this.fixture = getJSONFixture('Richardson7manifest.json');
    this.manifest = new Mirador.Manifest(
      this.fixture['@id'], 'IIIF', this.fixture
    );
    this.appendTo = this.viewContainer;
    this.eventEmitter = new Mirador.EventEmitter;
    this.imagesList = this.manifest.getCanvases();
    this.canvasControls = jQuery.extend(
      true, {}, Mirador.DEFAULT_SETTINGS.windowSettings.canvasControls
    );
    this.state = state = new Mirador.SaveController(jQuery.extend(
      true, {}, Mirador.DEFAULT_SETTINGS, {eventEmitter: this.eventEmitter}
    ));
    this.windowId = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.thumbnailsView = new Mirador.ThumbnailsView({
      manifest: this.manifest,
      appendTo: this.appendTo,
      windowId: this.windowId,
      eventEmitter: this.eventEmitter,
      imagesList: this.imagesList,
      state: this.state,
      bottomPanelAvailable: true,
      annoEndpointAvailable: false,
      canvasControls: this.canvasControls,
      annotationState: this.canvasControls.annotations.annotationState
    });
    subject = this.thumbnailsView;
  });

  afterEach(function() {
    delete this.thumbnailsView;
  });

  describe('Initialization', function () {
    it('should initialize', function () {
      expect(true).toBe(true); // Force initial beforeEach() to run
      expect(subject.currentImgIndex).toEqual(0);
    });
    it('should initialize with a defined canvas to show', function() {
      this.thumbnailsView = new Mirador.ThumbnailsView({
        manifest: this.manifest,
        appendTo: this.appendTo,
        windowId: this.windowId,
        eventEmitter: this.eventEmitter,
        imagesList: this.imagesList,
        state: this.state,
        bottomPanelAvailable: true,
        annoEndpointAvailable: false,
        canvasControls: this.canvasControls,
        annotationState: this.canvasControls.annotations.annotationState,
        canvasID: this.imagesList[3]['@id']
      });
      subject = this.thumbnailsView;
      expect(subject.currentImgIndex).toEqual(3);
    });
  });

  describe('r-t-l viewing', function() {
    it('should add proper CSS to list items, floating right', function() {
      var thumbnailsView = new Mirador.ThumbnailsView({
        manifest: this.manifest,
        appendTo: this.appendTo,
        windowId: this.windowId,
        eventEmitter: this.eventEmitter,
        imagesList: this.imagesList,
        imagesListLtr: this.imagesList.concat(),
        vDirectionStatus: 'rtl',
        state: this.state,
        bottomPanelAvailable: true,
        annoEndpointAvailable: false,
        canvasControls: this.canvasControls,
        annotationState: this.canvasControls.annotations.annotationState,
        canvasId: this.imagesList[3]['@id']
      });

      expect(jQuery(thumbnailsView.appendTo).find('.thumbnail-view li')).toHaveClass('thumbnail-rtl');
    });
  });

  describe('loadContent', function () {
    beforeEach(function() {
      this.imagesList[this.imagesList.length-1].width = 0; // Zero out width of last canvas, as a test
    });
    it('should add template to appendTo', function() {
      jQuery(subject.appendTo).html("");
      subject.loadContent();
      expect(jQuery(subject.appendTo).find('.thumbnail-image').length).toEqual(this.imagesList.length);
    });
  });

  describe('updateImage', function () {
    var canvas_id, selector;
    it('should reapply highlighting correctly', function() {
      canvas_id = this.imagesList[5]['@id'];
      subject.updateImage(canvas_id);
      selector = "img[data-image-id='"+canvas_id+"']";
      expect(jQuery(subject.element).find('img').first().is('.highlight')).toBe(false);
      expect(jQuery(subject.element).find(selector).is('.highlight')).toBe(true);
    });
  });

  describe('updateFocusImages', function () {
    var canvas_ids, selector;
    it('should reapply highlighting correctly', function() {
      canvas_ids = [this.imagesList[5]['@id'], this.imagesList[6]['@id']];
      subject.updateFocusImages(canvas_ids);
      selector = "img[data-image-id='"+this.imagesList[5]['@id']+"']";
      expect(jQuery(subject.element).find('img').first().is('.highlight')).toBe(false);
      expect(jQuery(subject.element).find(selector).is('.highlight')).toBe(true);
      selector = "img[data-image-id='"+this.imagesList[6]['@id']+"']";
      expect(jQuery(subject.element).find(selector).is('.highlight')).toBe(true);
    });
  });

  describe('currentImageChanged', function () {
    it('should scroll to make the highlighted item visible', function(done) {
      subject.updateImage(this.imagesList[12]['@id']);
      subject.currentImageChanged();
      setTimeout(function() {
        expect(subject.element.scrollLeft()).not.toBeLessThan(subject.element.find('.highlight').position().left);
        done();
      }, 1000);
    });
    it('should scroll on BookView', function(done) {
      var windowObject = {
        viewType: 'BookView'
      };
      spyOn(subject.state, 'getWindowObjectById').and.returnValue(windowObject);
      subject.updateImage(this.imagesList[12]['@id']);
      subject.currentImageChanged();
      setTimeout(function() {
        expect(subject.element.scrollLeft()).not.toBeLessThan(subject.element.find('.highlight').position().left);
        done();
      }, 1000);
    });
  });

  describe('listenForActions', function() {
    it('should respond to currentCanvasIDUpdated broadcasts', function() {
      spyOn(subject, 'currentImageChanged');
      this.eventEmitter.publish('currentCanvasIDUpdated.' + this.windowId);
      expect(subject.currentImageChanged).toHaveBeenCalled();
    });
    it('should respond to windowResize', function(done) {
      spyOn(subject, 'loadImages');
      this.eventEmitter.publish('windowResize');
      setTimeout(function() {
        expect(subject.loadImages).toHaveBeenCalled();
        done();
      }, 200);
    })
  });

  describe('bindEvents', function () {
    it('should make images fade in after loading', function(done) {
      spyOn(jQuery.fn, 'hide').and.callThrough();
      spyOn(jQuery.fn, 'fadeIn').and.callThrough();
      jQuery(subject.element).find('img').first().trigger('load');
      setTimeout(function() {
        expect(jQuery.fn.hide).toHaveBeenCalled();
        expect(jQuery.fn.fadeIn).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
        done();
      }, 800);
    });
    it('should call loadImages when scrolling', function() {
      spyOn(subject, 'loadImages');
      expect(subject.loadImages).not.toHaveBeenCalled();
      jQuery(subject.element).trigger('scroll');
      expect(subject.loadImages).toHaveBeenCalled();
    });
    it('should change canvases when a thumbnail is clicked', function() {
      spyOn(this.eventEmitter, 'publish');
      jQuery(subject.element).find('.thumbnail-image').first().click();
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('SET_CURRENT_CANVAS_ID.' + this.windowId, this.imagesList[0]['@id']);
    });
  });

  describe('toggle', function() {
    beforeEach(function() {
      spyOn(subject, 'show');
      spyOn(subject, 'hide');
    });
    it('should call show for true', function() {
      subject.toggle(true);
      expect(subject.show).toHaveBeenCalled();
      expect(subject.hide).not.toHaveBeenCalled();
    });
    it('should call hide for false', function() {
      subject.toggle(false);
      expect(subject.show).not.toHaveBeenCalled();
      expect(subject.hide).toHaveBeenCalled();
    });
  });

  describe('loadImages', function () {
    it('should load visible images only', function() {
      var images_loaded = 0;
      spyOn(Mirador, 'isOnScreen').and.callFake(function() {
        return ++images_loaded > 2;
      });
      spyOn(subject, 'loadImage');
      subject.loadImages();
      expect(subject.loadImage).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(String));
      expect(subject.loadImage.calls.count()).toEqual(this.imagesList.length-2);
    });
  });

  describe('loadImage', function () {
    var imageElement, spyImagePromise;
    var url = "http://www.test.org/iiif/00001/full/full/0/default.jpg";
    beforeEach(function() {
      imageElement = document.createElement('img');
      spyImagePromise = jQuery.Deferred();
      spyOn(Mirador, 'createImagePromise').and.returnValue(spyImagePromise);
    });
    it('should set src after promise is fulfilled', function() {
      subject.loadImage(imageElement, url);
      spyImagePromise.resolve(url);
      expect(jQuery(imageElement).attr('src')).toEqual(url);
    });
  });

  describe('reloadImages', function () {
    it('should set attributes', function() {
      spyOn(jQuery.fn, 'attr').and.callThrough();
      subject.reloadImages(200, false);
      expect(jQuery.fn.attr).toHaveBeenCalledWith('height', 200);
      expect(jQuery.fn.attr).toHaveBeenCalledWith('width', jasmine.any(Number));
      expect(jQuery.fn.attr).toHaveBeenCalledWith('src', '');
    });
    it('should trigger show when requested', function() {
      spyOn(subject, 'show');
      subject.reloadImages(150, true);
      expect(subject.show).toHaveBeenCalled();
    });
  });

  describe('hide', function () {
    it('should hide the thumbnailsView', function () {
      spyOn(jQuery.fn, 'hide');
      subject.hide();
      expect(jQuery.fn.hide).toHaveBeenCalled();
    });
    it('should hide at the parent level if embedded', function() {
      var dummyParent = document.createElement('span');
      subject.panel = { panel: "fake" };
      spyOn(subject.element, 'parent').and.returnValue(dummyParent);
      spyOn(jQuery.fn, 'hide');
      subject.hide();
      expect(jQuery.fn.hide).toHaveBeenCalled();
    });
  });

  describe('show', function () {
    it('should show the thumbnailsView', function () {
      spyOn(jQuery.fn, 'show');
      subject.show();
      expect(jQuery.fn.show).toHaveBeenCalled();
    });
    it('should load content when fully shown', function(done) {
      spyOn(subject, 'loadImages');
      subject.show();
      setTimeout(function() {
        expect(subject.loadImages).toHaveBeenCalled();
        done();
      }, 400);
    });
    it('should show at the parent level if embedded', function() {
      var dummyParent = document.createElement('span');
      subject.panel = { panel: "fake" };
      spyOn(subject.element, 'parent').and.returnValue(dummyParent);
      spyOn(jQuery.fn, 'show');
      subject.show();
      expect(jQuery.fn.show).toHaveBeenCalled();
    });
  });


  describe('adjustWidth', function() {
    beforeEach(function() {
      spyOn(subject.eventEmitter, 'publish').and.callThrough();
    });
    it('should publish REMOVE_CLASS event when hasClass is true', function() {
      subject.adjustWidth('xekko', true);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('REMOVE_CLASS.'+this.windowId, 'xekko');
    });
    it('should publish ADD_CLASS event when hasClass is false', function() {
      subject.adjustWidth('xekko', false);
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_CLASS.'+this.windowId, 'xekko');
    });
  });

  describe('adjustHeight', function() {
    it('should remove class when hasClass is true', function() {
      subject.element.addClass('xekko');
      subject.adjustHeight('xekko', true);
      expect(subject.element.hasClass('xekko')).toBe(false);
    });
    it('should add class when hasClass is false', function() {
      subject.element.removeClass('xekko');
      subject.adjustHeight('xekko', false);
      expect(subject.element.hasClass('xekko')).toBe(true);
    });
  });
});
