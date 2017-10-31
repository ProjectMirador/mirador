describe('SidePanel', function() {

  function createSidePanel(sidePanelOptions) {
    sidePanelOptions = sidePanelOptions || {};

    var eventEmitter = new Mirador.EventEmitter();
    var state = new Mirador.SaveController(jQuery.extend(
      true, {}, Mirador.DEFAULT_SETTINGS, {eventEmitter: eventEmitter}
    ));

    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    var fixture = getJSONFixture('BNF-condorcet-florus-dispersus-manifest.json');
    var manifest = new Mirador.Manifest(fixture['@id'], 'IIIF', fixture);
    var canvasID = manifest.getCanvases()[0]['@id'];
    var appendTo = jQuery('<div class="sidePanel"></div>');

    var config = jQuery.extend(true, {
      windowId: '380c9e54-7561-4010-a99f-f132f5dc13fd',
      state: state,
      eventEmitter: eventEmitter,
      appendTo: appendTo,
      manifest: manifest,
      canvasID: canvasID,
      layersTabAvailable: false,
      tocTabAvailable: false,
      searchTabAvailable: false,
      annotationsTabAvailable: false,
      hasStructures: false
    }, sidePanelOptions);

    return new Mirador.SidePanel(config);
  }

  describe('Methods using fixed configuration', function() {
    beforeEach(function() {
      spyOn(Mirador, 'TableOfContents').and.callThrough();
      spyOn(Mirador, 'SearchTab').and.callThrough();
      spyOn(Mirador, 'LayersTab').and.callThrough();
      spyOn(Mirador, 'AnnotationsTab').and.callThrough();
      this.sidePanel = createSidePanel();
    });

    afterEach(function() {
      delete this.sidePanel;
    });

    describe('Initialization', function() {
      it('should initialize', function() {
        expect(this.sidePanel instanceof Mirador.SidePanel).toBeTruthy();
        expect(this.sidePanel.appendTo).toBeTruthy();
      });
    });

    describe('loadSidePanelComponents', function() {
      describe('should show all unavailable by default', function() {
        this.sidePanel = createSidePanel();
        it('should show toc is not available', function(){
          expect(Mirador.TableOfContents).not.toHaveBeenCalled();
        });
        it('should show searchTab is not available', function(){
          expect(Mirador.SearchTab).not.toHaveBeenCalled();
        });
        it('should show layerTab is not available', function(){
          expect(Mirador.LayersTab).not.toHaveBeenCalled();
        });
      });

      describe('Initialization', function() {
        it('should initialize', function() {
          expect(true).toBe(true); //Force beforeEach() setup to run
          expect(this.sidePanel instanceof Mirador.SidePanel).toBeTruthy();
          expect(this.sidePanel.appendTo).toBeTruthy();
        });
      });

      describe('update', function() {
        it('should make panels unavailable or available', function() {
          this.sidePanel.update('search', false);
          expect(this.sidePanel.panelState.tabs[2].options.available).toBe(false);
          this.sidePanel.update('search', true);
          expect(this.sidePanel.panelState.tabs[2].options.available).toBe(true);
        });
      });

      describe('updateState', function() {
        var target_state;
        beforeEach(function() {
          target_state = {};
          jQuery.extend(target_state, this.sidePanel.panelState, {
            additional_key: true
          });
        });
        it('should return the state as-is when given no arguments', function() {
          expect(this.sidePanel.updateState()).toEqual(this.sidePanel.panelState);
          expect(this.sidePanel.updateState()).not.toEqual(target_state);
        });
        it('should set and return the new state when given arguments', function() {
          expect(this.sidePanel.updateState(target_state, true)).toEqual(target_state);
          expect(this.sidePanel.updateState()).toEqual(target_state);
        });
        it('should publish a annotationsTabStateUpdated event on non-initial setup', function() {
          spyOn(this.sidePanel.eventEmitter, 'publish');
          expect(this.sidePanel.updateState(target_state, false)).toEqual(target_state);
          expect(this.sidePanel.eventEmitter.publish).toHaveBeenCalledWith('sidePanelStateUpdated.' + this.sidePanel.windowId, target_state);
          expect(this.sidePanel.updateState()).toEqual(target_state);
        });
      });

      describe('panelToggled', function() {
        it('should turn open on and off', function() {
          this.sidePanel.panelToggled();
          expect(this.sidePanel.panelState.open).toBeFalsy();
          this.sidePanel.panelToggled();
          expect(this.sidePanel.panelState.open).toBeTruthy();
        });
      });

      describe('listenForActions', function() {
        it('should re-render upon a sidePanelStateUpdated event', function() {
          spyOn(this.sidePanel, 'render');
          this.sidePanel.eventEmitter.publish('sidePanelStateUpdated.'+this.sidePanel.windowId, {data:'waahoo'});
          expect(this.sidePanel.render).toHaveBeenCalledWith({data:'waahoo'});
        });
        it('should toggle upon a sidePanelToggled event', function() {
          spyOn(this.sidePanel, 'panelToggled');
          this.sidePanel.eventEmitter.publish('sidePanelToggled.'+this.sidePanel.windowId);
          expect(this.sidePanel.panelToggled).toHaveBeenCalled();
        });
        it('should update canvas ID upon a currentCanvasIDUpdated event', function() {
          this.sidePanel.eventEmitter.publish('currentCanvasIDUpdated.'+this.sidePanel.windowId, 'newcanvas');
          expect(this.sidePanel.canvasID).toEqual('newcanvas');
        });
      });

    });

  });

  describe('loadSidePanelComponents with varying configurations', function() {
    afterEach(function(){
      delete this.sidePanel;
    });

    describe('should initialise all tabs if they are configured to be available', function() {
      beforeEach(function() {
        spyOn(Mirador, 'TableOfContents');
        spyOn(Mirador, 'SearchTab');
        spyOn(Mirador, 'LayersTab');
        this.sidePanel = createSidePanel({
          layersTabAvailable: true,
          tocTabAvailable: true,
          searchTabAvailable: true
        });
      });
      it('should initialise Toc', function(){
        expect(Mirador.TableOfContents).toHaveBeenCalled();
      });
      it('should initialise SearchTab', function(){
        expect(Mirador.SearchTab).toHaveBeenCalled();
      });
      it('should initialise LayersTab', function(){
        expect(Mirador.LayersTab).toHaveBeenCalled();
      });
      describe('toggle', function() {
        beforeEach(function() {
          spyOn(jQuery.fn, 'hide');
          spyOn(jQuery.fn, 'show');
          spyOn(this.sidePanel.eventEmitter, 'publish');
        });
        it('should toggle on', function() {
          this.sidePanel.toggle(true);
          expect(jQuery.fn.hide).not.toHaveBeenCalled();
          expect(jQuery.fn.show).toHaveBeenCalled();
          expect(this.sidePanel.eventEmitter.publish).toHaveBeenCalledWith('REMOVE_CLASS.'+this.sidePanel.windowId, 'focus-max-width');
          expect(this.sidePanel.eventEmitter.publish).toHaveBeenCalledWith('SHOW_ICON_TOC.'+this.sidePanel.windowId);
        });
        it('should toggle off', function() {
          this.sidePanel.toggle(false);
          expect(jQuery.fn.hide).toHaveBeenCalled();
          expect(jQuery.fn.show).not.toHaveBeenCalled();
          expect(this.sidePanel.eventEmitter.publish).toHaveBeenCalledWith('ADD_CLASS.'+this.sidePanel.windowId, 'focus-max-width');
          expect(this.sidePanel.eventEmitter.publish).toHaveBeenCalledWith('HIDE_ICON_TOC.'+this.sidePanel.windowId);
        });
      });
    });
  });
});
