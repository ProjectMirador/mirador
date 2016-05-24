describe('MetadataView', function() {
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';

    this.fixture = getJSONFixture('metadataFixture.json');
    this.mockManifest = {
      metadata : this.fixture
    };
  });

  afterEach(function() {

  });

  xdescribe('Initialization', function() {
    xit('should initialize', function() {
      var testMDView = new Mirador.MetadataView({
        manifest: this.mockManifest,
        appendTo: this.sandbox,
        windowId: 'dummyID',
        canvasID: 1234
      });
    });
  });

  xdescribe('stringifyObject', function() {

  });

  xdescribe('stringifyRelated', function() {

  });

  xdescribe('getMetadataDetails', function() {

  });

  xdescribe('getMetadataRights', function() {

  });

  xdescribe('getMetadataLInks', function() {

  });

  xdescribe('extractLabelFromAttribute', function() {

  });

  xdescribe('bindEvents', function() {

  });

  xdescribe('toggle', function() {

  });

  xdescribe('show', function() {

  });

  xdescribe('hide', function() {

  });

  xdescribe('addLinksToUris', function() {

  });
});
