describe('BookView', function() {
  var subject;
  var viewportBounds = new OpenSeadragon.Rect(
    -0.03149220690309984,
    -1.1102230246251565e-16,
    1.0629844138061997,
    1.3985897967648282,
    0
  );
  var imageBounds = new OpenSeadragon.Rect(
    -75.92771084337372,
    -2.6767477123712524e-13,
    2562.8554216867474,
    3372.000000000001,
    0
  );
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
    this.bookView = new Mirador.BookView({
      manifest: this.manifest,
      appendTo: this.appendTo,
      windowId: this.windowId,
      eventEmitter: this.eventEmitter,
      imagesList: this.imagesList,
      state: this.state,
      bottomPanelAvailable: true,
      annoEndpointAvailable: true,
      canvasControls: this.canvasControls,
      annotationState: this.canvasControls.annotations.annotationState
    });
    subject = this.bookView;
  });

  afterEach(function() {
    delete this.bookView;
  });

  describe('Initialization', function() {
    it('should initialize', function() {
      expect(true).toBe(true); //Force beforeEach() to run
    });
    it('should initialize with a specified canvas ID', function() {
      this.bookView = new Mirador.BookView({
        manifest: this.manifest,
        appendTo: this.appendTo,
        windowId: this.windowId,
        eventEmitter: this.eventEmitter,
        imagesList: this.imagesList,
        state: this.state,
        bottomPanelAvailable: true,
        annoEndpointAvailable: true,
        canvasControls: this.canvasControls,
        annotationState: this.canvasControls.annotations.annotationState,
        canvasID: this.imagesList[2]['@id']
      });
      subject = this.bookView;
      expect(subject.currentImgIndex).toEqual(2);
    });
    it('should initialize with null osdOptions', function() {
      this.bookView = new Mirador.BookView({
        manifest: this.manifest,
        appendTo: this.appendTo,
        windowId: this.windowId,
        eventEmitter: this.eventEmitter,
        imagesList: this.imagesList,
        state: this.state,
        bottomPanelAvailable: true,
        annoEndpointAvailable: true,
        canvasControls: this.canvasControls,
        annotationState: this.canvasControls.annotations.annotationState,
        canvasID: this.imagesList[2]['@id'],
        osdOptions: null
      });
      subject = this.bookView;
      expect(subject.currentImgIndex).toEqual(2);
    });
    it('should initialize with bottom panel disabled', function() {
      spyOn(this.eventEmitter, 'publish');
      this.bookView = new Mirador.BookView({
        manifest: this.manifest,
        appendTo: this.appendTo,
        windowId: this.windowId,
        eventEmitter: this.eventEmitter,
        imagesList: this.imagesList,
        state: this.state,
        bottomPanelAvailable: false,
        annoEndpointAvailable: false,
        canvasControls: this.canvasControls,
        annotationState: this.canvasControls.annotations.annotationState
      });
      subject = this.bookView;
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('SET_BOTTOM_PANEL_VISIBILITY.' + this.windowId, false);
    });
  });

  describe('listenForActions', function() {
    describe('Bottom panel', function() {
      var dodger_bottom_panel, dodger_zoom, arrow_next, arrow_prev;
      beforeEach(function() {
        dodger_bottom_panel = subject.element.find('.mirador-osd-toggle-bottom-panel');
        dodger_zoom = subject.element.find('.mirador-pan-zoom-controls');
        arrow_next = subject.element.find('.mirador-osd-next');
        arrow_prev = subject.element.find('.mirador-osd-previous');
      });
      it('should adjust canvas controls to accommodate bottom panel height', function() {
        subject.eventEmitter.publish('bottomPanelSet.' + this.windowId, true);
        expect(dodger_bottom_panel).toHaveClass('bottom-panel-open');
        expect(dodger_zoom).toHaveClass('bottom-panel-open');
        expect(arrow_next).toHaveClass('bottom-panel-open');
        expect(arrow_prev).toHaveClass('bottom-panel-open');
      });
      it('should adjust canvas controls to accommodate the absence of the bottom panel', function() {
        subject.eventEmitter.publish('bottomPanelSet.' + this.windowId, false);
        expect(dodger_bottom_panel).not.toHaveClass('bottom-panel-open');
        expect(dodger_zoom).not.toHaveClass('bottom-panel-open');
        expect(arrow_next).not.toHaveClass('bottom-panel-open');
        expect(arrow_prev).not.toHaveClass('bottom-panel-open');
      });
    });
    describe('fitBounds', function() {
      beforeEach(function() {
        subject.osd = {
          viewport: {
            imageToViewportRectangle: jasmine.createSpy('imageToViewportRectangle').and.returnValue(new OpenSeadragon.Rect(1, 2, 640, 480, 0)),
            fitBoundsWithConstraints: jasmine.createSpy('fitBoundsWithConstraints')
          }
        };
      });
      it('should call fitBoundsWithConstraints', function() {
        subject.eventEmitter.publish('fitBounds.' + this.windowId, imageBounds);
        expect(subject.osd.viewport.fitBoundsWithConstraints).toHaveBeenCalled();
      });
    });
    describe('Changing canvases', function() {
      var navs;
      beforeEach(function() {
        navs = {
          prev: subject.element.find('.mirador-osd-previous'),
          next: subject.element.find('.mirador-osd-next')
        }
        spyOn(subject.element, 'find').and.callFake(function(sel) {
          switch (sel) {
            case '.mirador-osd-previous': return navs.prev;
            case '.mirador-osd-next': return navs.next;
          }
        });
        for (k in navs) {
          spyOn(navs[k], 'show');
          spyOn(navs[k], 'hide');
        }
      });
      it('should hide the previous button upon going to the first canvas', function() {
        subject.eventEmitter.publish('currentCanvasIDUpdated.' + this.windowId, this.imagesList[0]['@id']);
        expect(navs.prev.hide).toHaveBeenCalled();
        expect(navs.prev.show).not.toHaveBeenCalled();
        expect(navs.next.hide).not.toHaveBeenCalled();
        expect(navs.next.show).toHaveBeenCalled();
      });
      it('should hide the next button upon going to the last canvas', function() {
        subject.eventEmitter.publish('currentCanvasIDUpdated.' + this.windowId, this.imagesList[this.imagesList.length-1]['@id']);
        expect(navs.prev.hide).not.toHaveBeenCalled();
        expect(navs.prev.show).toHaveBeenCalled();
        expect(navs.next.hide).toHaveBeenCalled();
        expect(navs.next.show).not.toHaveBeenCalled();
      });
      it('should show both buttons upon going to any middle canvas', function() {
        subject.eventEmitter.publish('currentCanvasIDUpdated.' + this.windowId, this.imagesList[1]['@id']);
        expect(navs.prev.hide).not.toHaveBeenCalled();
        expect(navs.prev.show).toHaveBeenCalled();
        expect(navs.next.hide).not.toHaveBeenCalled();
        expect(navs.next.show).toHaveBeenCalled();
      });
    });
  });

  describe('bindEvents', function() {
    it('should respond to clicks on next', function() {
      spyOn(subject, 'next');
      subject.element.find('.mirador-osd-next').click();
      expect(subject.next).toHaveBeenCalled();
    });
    
    it('should respond to clicks on previous', function() {
      spyOn(subject, 'previous');
      subject.element.find('.mirador-osd-previous').click();
      expect(subject.previous).toHaveBeenCalled();
    });
    
    it('should respond to clicks on home', function() {
      subject.osd = {
        viewport: {
          goHome: jasmine.createSpy()
        }
      };
      subject.element.find('.mirador-osd-go-home').click();
      expect(subject.osd.viewport.goHome).toHaveBeenCalled();
    });
    
    it('should toggle bottom panel', function() {
      spyOn(subject.eventEmitter, 'publish');
      subject.element.find('.mirador-osd-toggle-bottom-panel').click();
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('TOGGLE_BOTTOM_PANEL_VISIBILITY.' + this.windowId);
    });
    
    describe('direction buttons', function() {
      var panPoint = new OpenSeadragon.Point(1, 2);
      beforeEach(function() {
        spyOn(subject, 'getPanByValue').and.returnValue(panPoint);
        subject.osd = {
          viewport: jasmine.createSpyObj('viewport', ['panBy', 'applyConstraints'])
        };
      });
      it('should respond to clicks on up', function() {
        subject.element.find('.mirador-osd-up').click();
        expect(subject.osd.viewport.panBy).toHaveBeenCalledWith(new OpenSeadragon.Point(0, -2));
      });
      it('should respond to clicks on down', function() {
        subject.element.find('.mirador-osd-down').click();
        expect(subject.osd.viewport.panBy).toHaveBeenCalledWith(new OpenSeadragon.Point(0, 2));
      });
      it('should respond to clicks on left', function() {
        subject.element.find('.mirador-osd-left').click();
        expect(subject.osd.viewport.panBy).toHaveBeenCalledWith(new OpenSeadragon.Point(-1, 0));
      });
      it('should respond to clicks on right', function() {
        subject.element.find('.mirador-osd-right').click();
        expect(subject.osd.viewport.panBy).toHaveBeenCalledWith(new OpenSeadragon.Point(1, 0));
      });
    });
    
    describe('zoom buttons', function() {
      beforeEach(function() {
        subject.osd = {
          zoomPerClick: 2,
          viewport: jasmine.createSpyObj('viewport', ['zoomBy', 'applyConstraints'])
        };
      });
      it('should respond to clicks on zoom in', function() {
        subject.element.find('.mirador-osd-zoom-in').click();
        expect(subject.osd.viewport.zoomBy).toHaveBeenCalledWith(2);
      });
      it('should respond to clicks on zoom out', function() {
        subject.element.find('.mirador-osd-zoom-out').click();
        expect(subject.osd.viewport.zoomBy).toHaveBeenCalledWith(1/2);
      });
    });
  });

  describe('getPanByValue', function() {
    var viewportBounds = {
      degrees: 0,
      height: 1.3985897967648282,
      width: 1.0629844138061997,
      x: -0.03149220690309984,
      y: -1.1102230246251565e-16
    };
    beforeEach(function() {
      subject.osd = {
        viewport: {
          getBounds: function(b) {
            return viewportBounds;
          }
        }
      }
    });
    it('should return half height and width', function() {
      expect(subject.getPanByValue().x).toBeCloseTo(viewportBounds.width/2 , 2);
      expect(subject.getPanByValue().y).toBeCloseTo(viewportBounds.height/2 , 2);
    });
  });

  describe('setBounds', function() {
    var viewportBounds = {
      degrees: 0,
      height: 1.3985897967648282,
      width: 1.0629844138061997,
      x: -0.03149220690309984,
      y: -1.1102230246251565e-16
    };
    var imageBounds = {
      degrees: 0,
      height: 3372.000000000001,
      width: 2562.8554216867474,
      x: -75.92771084337372,
      y: -2.6767477123712524e-13
    };
    beforeEach(function() {
      subject.osdOptions = {
        osdBounds: {
          degrees: 0,
          height: 1,
          width: 1,
          x: -0.5,
          y: -0.5
        }
      };
      subject.osd = {
        viewport: {
          getBounds: function(b) {
            return viewportBounds;
          },
          viewportToImageRectangle: function(ob) {
            return imageBounds;
          }
        }
      };
      spyOn(subject.eventEmitter, 'publish').and.callThrough();
    });
    it('should update osdOptions and the viewport', function() {
      subject.setBounds();
      expect(subject.eventEmitter.publish).toHaveBeenCalled();
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

  describe('hide', function() {
    beforeEach(function() {
      spyOn(jQuery.prototype, 'hide').and.stub();
    });
    it('should hide', function() {
      subject.hide();
      expect(jQuery.prototype.hide).toHaveBeenCalled();
    });
  });

  describe('show', function() {
    beforeEach(function() {
      spyOn(jQuery.prototype, 'show').and.stub();
    });
    it('should hide', function() {
      subject.show();
      expect(jQuery.prototype.show).toHaveBeenCalled();
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

  describe('updateImage', function() {
    beforeEach(function() {
      subject.canvasId = this.imagesList[0]['@id'];
      spyOn(subject.eventEmitter, 'publish');
    });
    describe('Different from original', function() {
      beforeEach(function() {
        subject.osd = {
          close: function() {}
        };
        spyOn(subject.osd, 'close');
        subject.updateImage(this.imagesList[1]['@id']);
      });
      it('should fire event', function() {
        expect(subject.eventEmitter.publish).toHaveBeenCalled();
      });
      it('should close Openseadragon', function() {
        expect(subject.osd.close).toHaveBeenCalled();
      });
    });
    describe('Same as original', function() {
      beforeEach(function() {
        subject.osd = {
          close: function() {}
        };
        spyOn(subject.osd, 'close');
        subject.updateImage(this.imagesList[0]['@id']);
      });
      it('should fire event', function() {
        expect(subject.eventEmitter.publish).toHaveBeenCalled();
      });
    });
  });

  // TODO: Fix openseadragon crash
  xdescribe('createOpenSeadragonInstance', function() {

  });

  describe('next', function() {
    beforeEach(function() {
      spyOn(this.eventEmitter, 'publish').and.callThrough();
    });
    it('should move one canvas forward on non-last canvases', function() {
      subject.currentImgIndex = 0;
      subject.next();
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('SET_CURRENT_CANVAS_ID.' + this.windowId, this.imagesList[1]['@id']);
    });
    it('should stay on last canvas', function() {
      subject.currentImgIndex = this.imagesList.length-1;
      subject.next();
      expect(this.eventEmitter.publish).not.toHaveBeenCalled();
    });
  });

  describe('previous', function() {
    beforeEach(function() {
      spyOn(this.eventEmitter, 'publish').and.callThrough();
    });
    it('should move one canvas back on non-first canvases', function() {
      subject.currentImgIndex = 1;
      subject.previous();
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('SET_CURRENT_CANVAS_ID.' + this.windowId, this.imagesList[0]['@id']);
    });
    it('should stay on first canvas', function() {
      subject.currentImgIndex = 0;
      subject.previous();
      expect(this.eventEmitter.publish).not.toHaveBeenCalled();
    });
  });

  describe('addLayer', function() {
    var dummyTileSource = [
      {height: 2000, width: 1000},
      {height: 100, width: 200}
    ];
    beforeEach(function() {
      subject.osd = jasmine.createSpyObj('osd', ['addTiledImage']);
    });
    it('adds the right layers', function() {
      subject.addLayer(dummyTileSource, 2);
      expect(subject.osd.addTiledImage).toHaveBeenCalledWith({
        tileSource: {height: 2000, width: 1000},
        opacity: 1,
        x: 1.01,
        y: 0,
        width: 1
      });
      expect(subject.osd.addTiledImage).toHaveBeenCalledWith({
        tileSource: {height: 100, width: 200},
        opacity: 1,
        x: 1.01,
        y: 0,
        width: 4
      });
    });
  });

  describe('getStitchList', function() {
    it('should return a single entry for individual viewing hint', function() {
      subject.currentImgIndex = 4;
      subject.viewingHint = 'individuals';
      subject.currentImg = this.imagesList[subject.currentImgIndex];
      expect(subject.getStitchList()).toEqual([this.imagesList[4]]);
    });
    describe('Even pages', function() {
      beforeEach(function() {
        subject.currentImgIndex = 4;
        subject.viewingHint = 'paged';
        subject.currentImg = this.imagesList[subject.currentImgIndex];
      });
      it('stitches left-to-right', function() {
        subject.viewingDirection = 'left-to-right';
        expect(subject.getStitchList()).toEqual([this.imagesList[3], this.imagesList[4]]);
      });
      it('stitches right-to-left', function() {
        subject.viewingDirection = 'right-to-left';
        expect(subject.getStitchList()).toEqual([this.imagesList[4], this.imagesList[3]]);
      });
      it('stitches top-down', function() {
        subject.viewingDirection = 'top-to-bottom';
        expect(subject.getStitchList()).toEqual([this.imagesList[3], this.imagesList[4]]);
      });
      it('stitches bottom-up', function() {
        subject.viewingDirection = 'bottom-to-top';
        expect(subject.getStitchList()).toEqual([this.imagesList[4], this.imagesList[3]]);
      });
    });
    describe('Odd pages', function() {
      beforeEach(function() {
        subject.currentImgIndex = 5;
        subject.viewingHint = 'paged';
        subject.currentImg = this.imagesList[subject.currentImgIndex];
      });
      it('stitches left-to-right', function() {
        subject.viewingDirection = 'left-to-right';
        expect(subject.getStitchList()).toEqual([this.imagesList[5], this.imagesList[6]]);
      });
      it('stitches right-to-left', function() {
        subject.viewingDirection = 'right-to-left';
        expect(subject.getStitchList()).toEqual([this.imagesList[6], this.imagesList[5]]);
      });
      it('stitches top-down', function() {
        subject.viewingDirection = 'top-to-bottom';
        expect(subject.getStitchList()).toEqual([this.imagesList[5], this.imagesList[6]]);
      });
      it('stitches bottom-up', function() {
        subject.viewingDirection = 'bottom-to-top';
        expect(subject.getStitchList()).toEqual([this.imagesList[6], this.imagesList[5]]);
      });
    });

    describe('Order of imagesList', function() {
      it('should be reversed for r-t-l sequences and manifests', function() {

        this.fixture.viewingDirection = "right-to-left";
        var manifest = new Mirador.Manifest(
          this.fixture['@id'], 'IIIF', this.fixture
        ),
            imagesList = manifest.getCanvases(),
            imagesListLtr = imagesList.concat(),
            imagesListRtl = imagesList.concat();
        imagesListRtl.reverse();
        var bookView = new Mirador.BookView({
          manifest: manifest,
          appendTo: this.appendTo,
          windowId: this.windowId,
          eventEmitter: this.eventEmitter,
          imagesList: imagesList,
          imagesListLtr: imagesListLtr,
          imagesListRtl: imagesListRtl,
          state: this.state,
          bottomPanelAvailable: true,
          annoEndpointAvailable: true,
          canvasControls: this.canvasControls,
          annotationState: this.canvasControls.annotations.annotationState
        });
        expect(imagesList[imagesList.length - 1]).toBe(bookView.imagesListRtl[0]);
      });
    });
    // TODO: Fill this in once implemented
    describe('Continuous viewing hint', function() {
      beforeEach(function() {
        subject.currentImgIndex = 4;
        subject.viewingHint = 'continuous';
        subject.currentImg = this.imagesList[subject.currentImgIndex];
      });
      xit('needs real tests', function() {
        expect(subject.getStitchList()).not.toThrowError();
      });
    });
  });
}); 
