describe('SidePanel', function() {
  var subject;
  beforeEach(function() {
    jQuery('body').append('<div id="mysidepanel"></div>');
    this.sandbox = jQuery('#mysidepanel');
    this.windowId = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.eventEmitter = new Mirador.EventEmitter();
    this.state = state = new Mirador.SaveController(jQuery.extend(
      true, {}, Mirador.DEFAULT_SETTINGS, {eventEmitter: this.eventEmitter}
    ));
    this.fixture = getJSONFixture('Richardson7manifest.json');
    this.manifest = new Mirador.Manifest(
      this.fixture['@id'], 'IIIF', this.fixture
    );
    this.imagesList = this.manifest.getCanvases();
    this.sidePanel = new Mirador.SidePanel({
      windowId: this.windowId,
      state: this.state,
      eventEmitter: this.eventEmitter,
      appendTo: this.sandbox,
      manifest: this.manifest,
      canvasID: this.imagesList[0]['@id'],
      layersTabAvailable: true,
      tocTabAvailable: true,
      annotationsTab: false,
      hasStructures: true
    });
    subject = this.sidePanel;
  });

  afterEach(function() {
    delete this.sidePanel;
    this.sandbox.remove();
  });

  describe('Initialization', function() {
    it('should initialize', function() {
      expect(true).toBe(true); //Force beforeEach() setup to run
      expect(this.sidePanel instanceof Mirador.SidePanel).toBeTruthy();
      expect(this.sidePanel.appendTo).toBeTruthy();
    });
  });

  xdescribe('loadSidePanelComponents', function() {

  });

  describe('update', function() {
    it('should make panels unavailable or available', function() {
      subject.update('layers', false);
      expect(subject.panelState.tabs[1].options.available).toBe(false);
      subject.update('layers', true);
      expect(subject.panelState.tabs[1].options.available).toBe(true);
    });
  });

  describe('updateState', function() {
    var target_state;
    beforeEach(function() {
      target_state = {};
      jQuery.extend(target_state, subject.panelState, {
        additional_key: true
      });
    });
    it('should return the state as-is when given no arguments', function() {
      expect(subject.updateState()).toEqual(subject.panelState);
      expect(subject.updateState()).not.toEqual(target_state);
   });
    it('should set and return the new state when given arguments', function() {
      expect(subject.updateState(target_state, true)).toEqual(target_state);
      expect(subject.updateState()).toEqual(target_state);
    });
    it('should publish a annotationsTabStateUpdated event on non-initial setup', function() {
      spyOn(this.eventEmitter, 'publish');
      expect(subject.updateState(target_state, false)).toEqual(target_state);
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('sidePanelStateUpdated.' + this.windowId, target_state);
      expect(subject.updateState()).toEqual(target_state);
    });
  });

  describe('panelToggled', function() {
    it('should turn open on and off', function() {
      subject.panelToggled();
      expect(subject.panelState.open).toBeFalsy();
      subject.panelToggled();
      expect(subject.panelState.open).toBeTruthy();
    });
  });

  describe('listenForActions', function() {
    it('should re-render upon a sidePanelStateUpdated event', function() {
      spyOn(subject, 'render');
      subject.eventEmitter.publish('sidePanelStateUpdated.'+this.windowId, {data:'waahoo'});
      expect(subject.render).toHaveBeenCalledWith({data:'waahoo'});
    });
    it('should toggle upon a sidePanelToggled event', function() {
      spyOn(subject, 'panelToggled');
      subject.eventEmitter.publish('sidePanelToggled.'+this.windowId);
      expect(subject.panelToggled).toHaveBeenCalled();
    });
    it('should update canvas ID upon a currentCanvasIDUpdated event', function() {
      subject.eventEmitter.publish('currentCanvasIDUpdated.'+this.windowId, 'newcanvas');
      expect(subject.canvasID).toEqual('newcanvas');
    });
  });

  describe('render', function() {
    it('should render on initialization', function() {
      expect(this.sidePanel.appendTo.html()).toBeTruthy();
    });
  });

  describe('toggle', function() {
    beforeEach(function() {
      spyOn(jQuery.fn, 'hide');
      spyOn(jQuery.fn, 'show');
      spyOn(subject.eventEmitter, 'publish');
    });
    it('should toggle on', function() {
      subject.toggle(true);
      expect(jQuery.fn.hide).not.toHaveBeenCalled();
      expect(jQuery.fn.show).toHaveBeenCalled();
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('REMOVE_CLASS.'+this.windowId, 'focus-max-width');
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('SHOW_ICON_TOC.'+this.windowId);
    });
    it('should toggle off', function() {
      subject.toggle(false);
      expect(jQuery.fn.hide).toHaveBeenCalled();
      expect(jQuery.fn.show).not.toHaveBeenCalled();
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('ADD_CLASS.'+this.windowId, 'focus-max-width');
      expect(subject.eventEmitter.publish).toHaveBeenCalledWith('HIDE_ICON_TOC.'+this.windowId);
    });
  });
}); 
