describe('ImageView', function() {
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
    // WARNING: Need to stub to stop OpenSeadragon from crashing PhantomJS
    // If you can make this not happen, remove this line and test the method
    spyOn(Mirador.ImageView.prototype, 'initialiseImageCanvas');
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
    this.imageView = new Mirador.ImageView({
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
      canvases: {
        'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5981094.json': {
          getVisibleImages: function() { return []; },
          getBounds: function() {
            return {
              'x': 800,
              'y': 600,
              'width': 800,
              'height': 600
            };
          },
          show: function() {
          }
        },
        'https://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093/canvas/canvas-5981096.json': {
          getVisibleImages: function() { return []; },
          getBounds: function() {
            return {
              'x': 800,
              'y': 600,
              'width': 800,
              'height': 600
            };
          },
          show: function() {
          }
        }
      }
    });
    subject = this.imageView;
  });

  afterEach(function() {
    delete this.imageView;
  });
  // TODO: Fill in tests for what needs initializing
  describe('Initialization', function() {
    it('should initialize with above defaults', function() {
      expect(true).toBe(true); //Force beforeEach() to run
    });
    it('should initialize with a specified canvasID', function() {
      this.imageView = new Mirador.ImageView({
        manifest: this.manifest,
        appendTo: this.appendTo,
        windowId: this.windowId,
        eventEmitter: this.eventEmitter,
        imagesList: this.imagesList,
        canvasID: this.imagesList[1]['@id'],
        state: this.state,
        bottomPanelAvailable: true,
        annoEndpointAvailable: false,
        canvasControls: this.canvasControls,
        annotationState: this.canvasControls.annotations.annotationState
      });
      subject = this.imageView;
      expect(subject.currentImgIndex).toEqual(1);
    });
    it('should initialize with null osdOptions', function() {
      this.imageView = new Mirador.ImageView({
        manifest: this.manifest,
        appendTo: this.appendTo,
        windowId: this.windowId,
        eventEmitter: this.eventEmitter,
        imagesList: this.imagesList,
        canvasID: this.imagesList[1]['@id'],
        osdOptions: null,
        state: this.state,
        bottomPanelAvailable: true,
        annoEndpointAvailable: false,
        canvasControls: this.canvasControls,
        annotationState: this.canvasControls.annotations.annotationState
      });
      subject = this.imageView;
      expect(subject.currentImgIndex).toEqual(1);
    });
    it('should initialize with null osdOptions', function() {
      spyOn(this.eventEmitter, 'publish');
      this.imageView = new Mirador.ImageView({
        manifest: this.manifest,
        appendTo: this.appendTo,
        windowId: this.windowId,
        eventEmitter: this.eventEmitter,
        imagesList: this.imagesList,
        osdOptions: null,
        state: this.state,
        bottomPanelAvailable: false,
        annoEndpointAvailable: false,
        canvasControls: this.canvasControls,
        annotationState: this.canvasControls.annotations.annotationState
      });
      subject = this.imageView;
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
    xdescribe('InitialiseImageCanvas', function() {
      console.info(Object.keys(subject.osd));
      console.info(subject.osd.world.items.length);
      expect(subject.osd.world.items.length>1).toBe(true);
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
    describe('HUD_* events', function() {
      var dummyElement;
      beforeEach(function() {
        subject.element.append('<div class="hudelement qblok"></div>');
        dummyElement = subject.element.find('.hudelement');
        spyOn(subject.element, 'find').and.callFake(function() {
          return dummyElement;
        });
        spyOn(dummyElement, 'removeClass').and.callThrough();
        spyOn(dummyElement, 'addClass').and.callThrough();
        spyOn(dummyElement, 'fadeIn');
        spyOn(dummyElement, 'fadeOut').and.callThrough();
      });
      it('responds to HUD_REMOVE_CLASS', function() {
        subject.eventEmitter.publish('HUD_REMOVE_CLASS.' + this.windowId, ['.hudelement', 'qblok']);
        expect(subject.element.find).toHaveBeenCalledWith('.hudelement');
        expect(dummyElement.removeClass).toHaveBeenCalledWith('qblok');
        expect(dummyElement.is('.qblok')).toBe(false);
      });
      it('responds to HUD_ADD_CLASS', function() {
        subject.eventEmitter.publish('HUD_ADD_CLASS.' + this.windowId, ['.hudelement', 'qblok2']);
        expect(subject.element.find).toHaveBeenCalledWith('.hudelement');
        expect(dummyElement.addClass).toHaveBeenCalledWith('qblok2');
        expect(dummyElement.is('.qblok2')).toBe(true);
      });
      it('responds to HUD_FADE_IN', function() {
        subject.eventEmitter.publish('HUD_FADE_IN.' + this.windowId, ['.hudelement', 583]);
        expect(subject.element.find).toHaveBeenCalledWith('.hudelement');
        expect(dummyElement.fadeIn).toHaveBeenCalledWith(583);
      });
      it('responds to HUD_FADE_OUT', function(done) {
        subject.eventEmitter.publish('HUD_FADE_OUT.' + this.windowId, ['.hudelement', 1, done]);
        expect(subject.element.find).toHaveBeenCalledWith('.hudelement');
        expect(dummyElement.fadeOut).toHaveBeenCalledWith(1, done);
      });
    });
    describe('Cursor events', function() {
      beforeEach(function() {
        subject.osd = {
          canvas: '<canvas></canvas>'
        };
        spyOn(jQuery.fn, 'css');
      });
      describe('SET_STATE_MACHINE_POINTER', function() {
        beforeEach(function() {
          spyOn(subject.hud.annoState, 'startup');
          spyOn(subject.hud.annoState, 'displayOn');
          spyOn(subject.hud.annoState, 'choosePointer');
        });
        it('responds when annotation state is none', function() {
          subject.hud.annoState.current = 'none';
          subject.eventEmitter.publish('SET_STATE_MACHINE_POINTER.' + this.windowId);
          expect(subject.hud.annoState.startup).toHaveBeenCalled();
        });
        it('responds when annotation state is off', function() {
          subject.hud.annoState.current = 'off';
          subject.eventEmitter.publish('SET_STATE_MACHINE_POINTER.' + this.windowId);
          expect(subject.hud.annoState.displayOn).toHaveBeenCalled();
        });
        it('responds when annotation state is on', function() {
          subject.hud.annoState.current = 'on';
          subject.eventEmitter.publish('SET_STATE_MACHINE_POINTER.' + this.windowId);
          expect(subject.hud.annoState.choosePointer).toHaveBeenCalled();
        });
      });
      it('responds to DEFAULT_CURSOR', function() {
        subject.eventEmitter.publish('DEFAULT_CURSOR.' + this.windowId);
        expect(jQuery)
        expect(jQuery.fn.css).toHaveBeenCalledWith('cursor', 'default');
      });
      it('responds to CROSSHAIR_CURSOR', function() {
        subject.eventEmitter.publish('CROSSHAIR_CURSOR.' + this.windowId);
        expect(jQuery.fn.css).toHaveBeenCalledWith('cursor', 'crosshair');
      });
      it('responds to POINTER_CURSOR', function() {
        subject.eventEmitter.publish('POINTER_CURSOR.' + this.windowId);
        expect(jQuery.fn.css).toHaveBeenCalledWith('cursor', 'pointer');
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

    it('should respond to clicks on rotate right', function() {
      subject.osd = {
        viewport: {
          getRotation: jasmine.createSpy().and.returnValue(90),
          setRotation: jasmine.createSpy()
        }
      };
      subject.element.find('.mirador-osd-rotate-right').click();
      expect(subject.osd.viewport.setRotation).toHaveBeenCalledWith(180);
    });

    it('should respond to clicks on rotate left', function() {
      subject.osd = {
        viewport: {
          getRotation: jasmine.createSpy().and.returnValue(270),
          setRotation: jasmine.createSpy()
        }
      };
      subject.element.find('.mirador-osd-rotate-left').click();
      expect(subject.osd.viewport.setRotation).toHaveBeenCalledWith(180);
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

    describe('annotation layer toggle', function() {
      beforeEach(function() {
        spyOn(subject.hud.annoState, 'startup');
        spyOn(subject.hud.annoState, 'displayOn');
        spyOn(subject.hud.annoState, 'displayOff');
      });
      it('should start when annotation state is none', function() {
        subject.hud.annoState.current = 'none';
        subject.element.find('.mirador-osd-annotations-layer').click();
        expect(subject.hud.annoState.startup).toHaveBeenCalled();
      });
      it('should display on when annotation state is off', function() {
        subject.hud.annoState.current = 'off';
        subject.element.find('.mirador-osd-annotations-layer').click();
        expect(subject.hud.annoState.displayOn).toHaveBeenCalled();
      });
      it('should display off when annotation state is on', function() {
        subject.hud.annoState.current = 'on';
        subject.element.find('.mirador-osd-annotations-layer').click();
        expect(subject.hud.annoState.displayOff).toHaveBeenCalled();
      });
    });

    describe('manipulation toggle', function() {
      beforeEach(function() {
        spyOn(subject.hud.manipulationState, 'startup');
        spyOn(subject.hud.manipulationState, 'displayOn');
        spyOn(subject.hud.manipulationState, 'displayOff');
      });
      it('should start when manipulation state is none', function() {
        subject.hud.manipulationState.current = 'none';
        subject.element.find('.mirador-manipulation-toggle').click();
        expect(subject.hud.manipulationState.startup).toHaveBeenCalled();
      });
      it('should display on when manipulation state is off', function() {
        subject.hud.manipulationState.current = 'manipulationOff';
        subject.element.find('.mirador-manipulation-toggle').click();
        expect(subject.hud.manipulationState.displayOn).toHaveBeenCalled();
      });
      it('should display off when manipulation state is on', function() {
        subject.hud.manipulationState.current = 'manipulationOn';
        subject.element.find('.mirador-manipulation-toggle').click();
        expect(subject.hud.manipulationState.displayOff).toHaveBeenCalled();
      });
    });

    // TODO: Find way to test annotation and manipulation tools without
    // "displayOn inappropriate in current state pointer" error
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
      var imageView = new Mirador.ImageView({
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
      expect(imagesList[imagesList.length - 1]).toBe(imageView.imagesListRtl[0]);
    });
  });

  describe('getPanByValue', function() {
    beforeEach(function() {
      subject.osd = {
        viewport: {
          getBounds: function(b) {
            return viewportBounds;
          }
        }
      };
    });
    it('should return half height and width', function() {
      expect(subject.getPanByValue().x).toBeCloseTo(viewportBounds.width/2 , 2);
      expect(subject.getPanByValue().y).toBeCloseTo(viewportBounds.height/2 , 2);
    });
  });

  describe('setBounds', function() {
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
    it('should show', function() {
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

  // WARNING: This method has been spied out to stop PhantomJS from crashing.
  xdescribe('initialiseImageCanvas', function() {
  });

  describe('addAnnotationsLayer', function() {
    beforeEach(function() {
      spyOn(Mirador, 'AnnotationsLayer').and.stub();
    });
    it('should attempt to create AnnotationsLayer', function() {
      subject.addAnnotationsLayer(subject.element);
      expect(Mirador.AnnotationsLayer).toHaveBeenCalled();
    });
  });

  describe('updateImage', function() {
    beforeEach(function() {
      var oldCanvasID = this.imagesList[0]['@id'];
      subject.canvasID = oldCanvasID;
      spyOn(subject.eventEmitter, 'publish');
    });
    describe('Different from original', function() {
      beforeEach(function() {
        subject.osd = {
          viewport: {
            imageToViewportRectangle: jasmine.createSpy('imageToViewportRectangle').and.returnValue(new OpenSeadragon.Rect(1, 2, 640, 480, 0)),
            fitBoundsWithConstraints: jasmine.createSpy('fitBoundsWithConstraints'),
            fitBounds: jasmine.createSpy('fitBoundsWithConstraints')
          }
        };
        subject.updateImage(this.imagesList[1]['@id']);
      });
      it('should change the canvasID on the object', function() {
        expect(subject.canvasID).not.toEqual(this.imagesList[0]['@id']);
        expect(subject.canvasID).toEqual(this.imagesList[1]['@id']);
      });
      it('should fire event', function() {
        expect(subject.eventEmitter.publish).toHaveBeenCalled();
      });
    });
    describe('Same as original', function() {
      beforeEach(function() {
        subject.osd = {
          close: function() {}
        };
        spyOn(subject.osd, 'close');
        subject.updateImage(subject.canvasID);
      });
      it('should fire event', function() {
        expect(subject.eventEmitter.publish).toHaveBeenCalled();
      });
    });
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

  describe('manipulation tools', function() {
    describe('mirror', function() {
      beforeEach(function() {
        var allCanvasControls = jQuery.extend(
          true, {}, Mirador.DEFAULT_SETTINGS.windowSettings.canvasControls, {
            'imageManipulation': { 'controls': { 'mirror': true } }
          }
        );
        subject = new Mirador.ImageView(
          jQuery.extend(true, subject, {canvasControls: allCanvasControls })
        );
        subject.osd = {
          canvas: '<canvas></canvas>'
        };
      });
      it('when clicked, fires enableManipulation, mirror', function() {
        spyOn(subject.eventEmitter, 'publish');
        subject.element.find('.mirador-osd-mirror').click();
        expect(subject.eventEmitter.publish).toHaveBeenCalledWith('enableManipulation', 'mirror');
      });
      it('when clicked, adds mirador-mirror class', function() {
        spyOn(jQuery.fn, 'addClass');
        subject.element.find('.mirador-osd-mirror').click();
        expect(jQuery.fn.addClass).toHaveBeenCalledWith('mirador-mirror');
      });
      it('when clicked again, removes mirador-mirror class', function() {
        spyOn(jQuery.fn, 'removeClass');
        subject.element.find('.mirador-osd-mirror').click();
        subject.element.find('.mirador-osd-mirror').click();
        expect(jQuery.fn.removeClass).toHaveBeenCalledWith('mirador-mirror');
      });
    });
  });
});
