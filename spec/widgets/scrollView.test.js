describe('ScrollView', function() {
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
    this.scrollView = new Mirador.ScrollView({
      manifest: this.manifest,
      appendTo: this.appendTo,
      windowId: this.windowId,
      eventEmitter: this.eventEmitter,
      imagesList: this.imagesList,
      imagesListLtr: this.imagesList.concat(),
      state: this.state,
      vDirectionStatus: 'rtl',
      bottomPanelAvailable: true,
      annoEndpointAvailable: false,
      canvasControls: this.canvasControls,
      annotationState: this.canvasControls.annotations.annotationState,
      thumbInfo: {listingCssCls: 'scroll-listing-thumbs', thumbnailCls: 'scroll-view'}
    });
    subject = this.scrollView;
  });

  afterEach(function() {
    delete this.scrollView;
  });

  describe('Initialization', function() {
    it('should initialize', function() {
      expect(jQuery(subject.appendTo).find('.scroll-view')).toExist();
    });
  });

  describe('Right to Left scrollview', function() {
    it('should have the correct CSS Class applied', function() {
      expect(jQuery(subject.appendTo).find('.scroll-view')).toHaveClass('v-direction-rtl');
    });
  });
});
