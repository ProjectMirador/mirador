describe('SidePanel', function() {
  
  function createSidePanel(sidePanelOptions) {
    sidePanelOptions = sidePanelOptions || {};	

    var eventEmitter = new Mirador.EventEmitter();
    var state = new Mirador.SaveController(jQuery.extend(
      true, {}, Mirador.DEFAULT_SETTINGS, {eventEmitter: eventEmitter}
    ));
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
      annotationsTabAvailable: false,
      hasStructures: false
    }, sidePanelOptions);

    return new Mirador.SidePanel(config);
  }

  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.sidePanel = createSidePanel();
  });

  afterEach(function() {

  });

  describe('Initialization', function() {
    it('should initialize', function() {
      expect(this.sidePanel instanceof Mirador.SidePanel).toBeTruthy();
      expect(this.sidePanel.appendTo).toBeTruthy();
    });
  });

  xdescribe('loadSidePanelComponents', function() {

  });

  xdescribe('update', function() {

  });

  xdescribe('updateState', function() {

  });

  xdescribe('panelToggled', function() {

  });

  xdescribe('listenForActions', function() {

  });

  describe('render', function() {
    it('should render on initialization', function() {
      expect(this.sidePanel.appendTo.html()).toBeTruthy();
    });
  });

  xdescribe('toggle', function() {

  });
}); 
