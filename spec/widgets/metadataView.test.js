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

  describe('addLinksToUris', function() {
    it('should properly wrap a single URL in an anchor tag', function() {
      var withLinksAdded = Mirador.MetadataView.prototype.addLinksToUris(this.fixture.metadata[5].value);
      expect(withLinksAdded).toBe("There's an URL: <a href=\"http://example.com\" target=\"_blank\">http://example.com</a>");
    });
    it('should properly wrap multiple URLs in anchor tags', function() {
      var withLinksAdded = Mirador.MetadataView.prototype.addLinksToUris(this.fixture.metadata[6].value);
      expect(withLinksAdded).toBe(
        "There's an URL: <a href=\"http://example.com\" target=\"_blank\">http://example.com</a> and here's another: " +
        "<a href=\"http://foobar.org\" target=\"_blank\">http://foobar.org</a>");
    });
    it('should not wrap links in pre-existing anchor tags with an anchor tag', function() {
      var withLinksAdded = Mirador.MetadataView.prototype.addLinksToUris(this.fixture.metadata[4].value);
      expect(withLinksAdded).toBe(this.fixture.metadata[4].value);
    });
    it('should add target blank to existing links', function() {
      var withAttributeAdded = Mirador.MetadataView.prototype.addLinksToUris(this.fixture.metadata[7].value);
      expect(withAttributeAdded).toBe("There's an URL: <a href=\"http://example.com\" target=\"_blank\">foobar</a>")
    });
  });
});
