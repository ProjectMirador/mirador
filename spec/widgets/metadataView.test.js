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

  describe('renderWithin', function() {
    it('should render simple strings as-is', function() {
      var within = "http://example.com";
      expect(Mirador.MetadataView.prototype.getWithin(within)).toBe(within);
    });

    it('should render a collection object without a label', function() {
      var within = {'@id': 'http://example.com', '@type': 'sc:Collection'};
      expect(Mirador.MetadataView.prototype.getWithin(within)).toBe(
        '<a href="http://example.com" target="_blank">http://example.com</a>');
    });

    it('should render a collection object with a label', function() {
      var within = {'@id': 'http://example.com', '@type': 'sc:Collection', 'label': 'foobar'};
      expect(Mirador.MetadataView.prototype.getWithin(within)).toBe(
        '<a href="http://example.com" target="_blank">foobar</a>');
    });

    it('should render a list of collection objects', function() {
      var within = [
        {'@id': 'http://example.com', '@type': 'sc:Collection', 'label': 'foobar'},
        {'@id': 'http://foo.org', '@type': 'sc:Collection', 'label': 'barfoo'}];
      expect(Mirador.MetadataView.prototype.getWithin(within)).toBe(
        '<a href="http://example.com" target="_blank">foobar</a><br/>' +
        '<a href="http://foo.org" target="_blank">barfoo</a>');
    });

    it('should render a list of strings <br/>-concatenated', function() {
      var within = ['http://example.com/foo', 'http://example.com/bar'];
      expect(Mirador.MetadataView.prototype.getWithin(within)).toBe(
        'http://example.com/foo<br/>http://example.com/bar');
    });
  });
});
