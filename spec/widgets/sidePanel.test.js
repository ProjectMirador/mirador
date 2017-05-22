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
      hasStructures: false
    }, sidePanelOptions);

    return new Mirador.SidePanel(config);
  }

  describe('Methods using fixed configuration', function() {
    beforeEach(function() {
      spyOn(Mirador, 'TableOfContents').and.callThrough();
      spyOn(Mirador, 'SearchTab').and.callThrough();
      spyOn(Mirador, 'LayersTab').and.callThrough();
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
    });
  });
});
