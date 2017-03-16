
describe('Search tab', function() {
  beforeEach(function(){
    var _this = this;

    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';

    this.searchURI = "/search?q="
    this.eventEmitter = new Mirador.EventEmitter();
    this.jsonLd = getJSONFixture('scta-info-pl-zbsSII72.json');
    this.results = getJSONFixture('scta-info-pl-zbsSII72.results.json');
    this.manifest = new Mirador.Manifest(null, null, this.jsonLd);
    this.jsonLdNoSearch = getJSONFixture('BNF-condorcet-florus-dispersus-manifest.json');
    this.noResults = getJSONFixture('scta-info-pl-zbsSII72.noresults.json');
    this.manifestNoSearch = new Mirador.Manifest(null, null, this.jsonLdNoSearch);
    this.sandbox = sandbox();
    this.createSearchTab = function(manifest) {
      return new Mirador.SearchTab({
        manifest: manifest,
        appendTo: _this.sandbox,
        windowId: 'dummyID',
        canvasID: 1234,
        eventEmitter: _this.eventEmitter
      });
    }
  });

  afterEach(function() {
  });

  describe('on instantiation', function(){
    it('should instantiate a search tab object', function() {
      expect(this.createSearchTab.bind(this.createSearchTab, this.manifest)).not.toThrow();
    });
  });

  describe('on initialization', function(){
    it('should render a search tab', function() {
      this.createSearchTab(this.manifest);
      expect(this.sandbox.find('.search-results')).toExist();
    });

    it('should render a search form', function() {
      this.createSearchTab(this.manifest);
      expect(this.sandbox.find('#search-within-form')).toExist();
    });

    it('should render a search tab when there is not such service in the manifest', function() {
      this.createSearchTab(this.manifestNoSearch);
      expect(this.sandbox.find('.search-results')).toExist();
    });

    it('should not render a search form when there is not such service in the manifest', function() {
      this.createSearchTab(this.manifestNoSearch);
      expect(this.sandbox.find('#search-within-form')).not.toExist();
    });

    it('should allow to search text', function() {
      this.createSearchTab(this.manifest);
      var _this = this,
          searchForm = this.sandbox.find('#search-within-form'),
          searchInput = this.sandbox.find('#search-within-form input.js-query');
      expect(searchInput).toExist();
      searchInput.val('found');
      expect(searchForm.trigger.bind(searchForm, 'submit')).not.toThrow();
    });
  });

  describe('on search', function(){
    beforeEach(function() {
      this.createSearchTab(this.manifest);
      this.server = sinon.fakeServer.create();
      this.server.respondImmediately = true;
      this.server.respondWith("GET", this.searchURI + "found", [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(this.results)
      ]);
      this.server.respondWith("GET", this.searchURI + "notfound", [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(this.noResults)
      ]);
    });

    afterEach(function() {
      this.server.restore();
    });

    it('should show results after searching for some text', function() {
      this.sandbox.find('#search-within-form input.js-query').val('found');
      this.sandbox.find('#search-within-form').trigger('submit');
      expect(this.sandbox.find('.search-result')).toExist();
    });

    it('should not show results when no results are found', function() {
      this.sandbox.find('#search-within-form input.js-query').val('notfound');
      this.sandbox.find('#search-within-form').trigger('submit');
      expect(this.sandbox.find('.search-result')).not.toExist();
    });
  });
});
