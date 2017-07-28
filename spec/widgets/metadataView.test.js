describe('MetadataView', function() {
  var subject;
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.fixture = getJSONFixture('metadataFixture.json');
    this.manifest = new Mirador.Manifest(
      this.fixture['@id'], 'IIIF', this.fixture
    );
    $('body').append('<div id="metadata-view-container"></div>');
    this.sandbox = jQuery('#metadata-view-container');
    this.windowId = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.canvasID = 'https://iiif.lib.harvard.edu/manifests/drs:5981093/canvas/canvas-5981522.json';
    this.metadataView = new Mirador.MetadataView({
      manifest: this.manifest,
      appendTo: this.sandbox,
      windowId: this.windowId,
      canvasID: this.canvasID
    });
    subject = this.metadataView;
  });

  afterEach(function() {
    delete this.metadataView;
    this.sandbox.remove();
    $('body').html('');
  });

  describe('Initialization', function() {
    it('should initialize', function() {
      expect(true).toBe(true); //Force beforeEach() setup to run
    });
  });

  describe('stringifyObject', function() {
    it('should stringify regular expressions', function() {
      expect(subject.stringifyObject(/\w\S*/g)).toEqual('/\\w\\S*/');
    });
    it('should stringify arrays', function() {
      expect(subject.stringifyObject(['a', 'b', 'c'])).toEqual('[ a, b, c ]');
    });
    it('should stringify objects', function() {
      expect(subject.stringifyObject({ a: 3, b: 'waahoo'})).toEqual('<div style="margin-left:0px">a: 3<br/>b: waahoo</div>');
      expect(subject.stringifyObject({ a: 3, b: { c: 'waahoo' }})).toEqual('<div style="margin-left:0px">a: 3<br/>b: <div style="margin-left:15px">c: waahoo</div></div>');
    });
    it('should return strings as-is', function() {
      expect(subject.stringifyObject('abc')).toEqual('abc');
    });
  });

  describe('stringifyRelated', function() {
    it('should handle arrays of strings', function() {
      expect(subject.stringifyRelated([
        'http://projectmirador.org',
        '',
        'http://iiif.io',
        'http://github.com/iiif'
      ])).toEqual(
        '<a href="http://projectmirador.org" target="_blank">http://projectmirador.org</a>' +
        '<br/><a href="http://iiif.io" target="_blank">http://iiif.io</a>' +
        '<br/><a href="http://github.com/iiif" target="_blank">http://github.com/iiif</a>'
      );
    });
    it('should handle objects', function() {
      expect(subject.stringifyRelated({
        '@id': 'http://projectmirador.org',
        label: 'Project Mirador',
        format: 'text/html'
      })).toEqual('<a href="http://projectmirador.org"  target="_blank">Project Mirador</a> ');
      expect(subject.stringifyRelated({
        '@id': 'http://projectmirador.org/logo.png',
        format: 'image/png'
      })).toEqual('<a href="http://projectmirador.org/logo.png"  target="_blank">http://projectmirador.org/logo.png</a> (image/png)');
    });
    it('should handle strings', function() {
      expect(subject.stringifyRelated('This should not be changed.')).toEqual('This should not be changed.');
    });
    it('should handle strings with links', function() {
      expect(subject.stringifyRelated('See us at http://projectmirador.org for more examples!')).toEqual('See us at <a href="http://projectmirador.org" target="_blank">http://projectmirador.org</a> for more examples!');
    });
  });

  describe('getMetadataDetails', function() {
    it('should grab English details', function() {
      expect(subject.getMetadataDetails(this.manifest.jsonLd)).toEqual([
        { label: 'label', value: '<b></b>' },
        { label: 'description', value: '' },
        { label: 'Single', value: 'default' },
        { label: 'Multiple with default', value: 'English' },
        { label: 'Multiple without default', value: 'English' },
        { label: 'Single HTML with invalid elements', value: "<span>test bad</span>" },
        { label: 'Single HTML with valid elements', value: "<span><b>bold</b><i>italic</i><br /><a href=\"http://iiif.io/\" target=\"_blank\"><img src=\"http://iiif.io/img/logo-iiif-34x30.png\" /></a></span>" },
        { label: 'Single text with single URL', value: "There's an URL: http://example.com" },
        { label: 'Single text with multiple URLs', value: "There's an URL: http://example.com and here's another: http://foobar.org" },
        { label: "Single text with single URL already wrapped in an anchor tag, but without target blank", value: "There's an URL: <a href=\"http://example.com\">foobar</a>" }
      ]);
    });
  });

  describe('getMetadataRights', function() {
    it('should grab rights when present', function() {
      expect(subject.getMetadataRights({
        license: 'CC-BY-ND 2.0',
        attribution: 'Oodlepods Fellowship International'
      })).toEqual([
        { identifier: 'license', label: 'license', value: 'CC-BY-ND 2.0' },
        { identifier: 'attribution', label: 'attribution', value: 'Oodlepods Fellowship International' }
      ]);
    });
    it('should default to blanks when not present', function() {
      expect(subject.getMetadataRights(this.manifest.jsonLd)).toEqual([
        { identifier: 'license', label: 'license', value: '' },
        { identifier: 'attribution', label: 'attribution', value: '' }
      ]);
    });
  });

  describe('getMetadataLinks', function() {
    it('should always display the manifest id', function() {
      expect(subject.getMetadataLinks(this.manifest.jsonLd)[2].value).toContain('http://www.example.org/iiif/book1/manifest');
    });
    it('should grab metadata links when present', function() {
      expect(subject.getMetadataLinks({
        related: "http://news.example.net",
        seeAlso: "http://oodlepods.example.net",
        '@id': "http://www.example.org/iiif/book1/manifest",
        within: "Oodlepods Monthly Issue #6"
      })).toEqual([
        { identifier: 'related', label: 'related', value: '<a href="http://news.example.net" target="_blank">http://news.example.net</a>' },
        { identifier: 'seeAlso', label: 'seeAlso', value: '<a href="http://oodlepods.example.net" target="_blank">http://oodlepods.example.net</a>' },
        { identifier: 'manifest', label: 'manifest', value: '<a href="http://www.example.org/iiif/book1/manifest" target="_blank">http://www.example.org/iiif/book1/manifest</a>'},
        { identifier: 'within', label: 'within', value: 'Oodlepods Monthly Issue #6' }
      ]);
    });
    it('should default to blanks when not present', function() {
      expect(subject.getMetadataLinks(this.manifest.jsonLd)).toEqual([
        { identifier: 'related', label: 'related', value: '' },
        { identifier: 'seeAlso', label: 'seeAlso', value: '' },
        { identifier: 'manifest', label: 'manifest', value: '<a href="http://www.example.org/iiif/book1/manifest" target="_blank">http://www.example.org/iiif/book1/manifest</a>'},
        { identifier: 'within', label: 'within', value: '' }
      ]);
    });
  });

  describe('extractLabelFromAttribute', function() {
    it('Converts attributes', function() {
      expect(subject.extractLabelFromAttribute('super   WaahooLabelFromAttr')).toEqual('super WaahooLabelFromAttr');
    });
  });

  xdescribe('bindEvents', function() {

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

  describe('show', function() {
    it('should show the metadataView', function () {
      spyOn(jQuery.fn, 'show');
      subject.show();
      expect(jQuery.fn.show).toHaveBeenCalled();
    });
    it('should show at the parent level if embedded', function() {
      var dummyParent = document.createElement('span');
      subject.panel = { panel: "fake" };
      spyOn(subject.element, 'parent').and.returnValue(dummyParent);
      spyOn(jQuery.fn, 'show');
      subject.show();
      expect(jQuery.fn.show).toHaveBeenCalled();
    });
  });

  describe('hide', function() {
    it('should hide the metadataView', function () {
      spyOn(jQuery.fn, 'hide');
      subject.hide();
      expect(jQuery.fn.hide).toHaveBeenCalled();
    });
    it('should hide at the parent level if embedded', function() {
      var dummyParent = document.createElement('span');
      subject.panel = { panel: "fake" };
      spyOn(subject.element, 'parent').and.returnValue(dummyParent);
      spyOn(jQuery.fn, 'hide');
      subject.hide();
      expect(jQuery.fn.hide).toHaveBeenCalled();
    });
  });

  describe('addLinksToUris', function() {
    it('should replace URIs with links', function() {
      expect(subject.addLinksToUris('See us at http://projectmirador.org for more examples!')).toEqual('See us at <a href="http://projectmirador.org" target="_blank">http://projectmirador.org</a> for more examples!');
    });
    it('should leave other things alone', function() {
      expect(subject.addLinksToUris('This should not be changed.')).toEqual('This should not be changed.');
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
