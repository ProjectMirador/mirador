
describe('Search tab', function() {
  beforeEach(function(){
    var _this = this;

    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';

    this.searchURI = "/search?q="
    this.eventEmitter = new Mirador.EventEmitter();
    this.jsonLd = getJSONFixture('searchManifest.json');
    this.results = getJSONFixture('searchManifest.results.json');
    this.manifest = new Mirador.Manifest(null, null, this.jsonLd);
    this.jsonLdNoSearch = getJSONFixture('BNF-condorcet-florus-dispersus-manifest.json');
    this.noResults = getJSONFixture('searchManifest.noresults.json');
    this.manifestNoSearch = new Mirador.Manifest(null, null, this.jsonLdNoSearch);
    this.sandbox = sandbox();
    this.windowId = '380c9e54-7561-4010-a99f-f132f5dc13fd';
    this.createSearchTab = function(manifest) {
      return new Mirador.SearchTab({
        manifest: manifest,
        appendTo: _this.sandbox,
        windowId: this.windowId,
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

    it('should allow clicking on results after searching for some text', function() {
      this.sandbox.find('#search-within-form input.js-query').val('found');
      this.sandbox.find('#search-within-form').trigger('submit');
      var hit = this.sandbox.find('.result-paragraph').first();
      expect(hit.trigger.bind(hit, 'click')).not.toThrow();
    });

    it('should navigate to a specific canvas and bounds after clicking on a search result', function() {
      spyOn(this.eventEmitter, 'publish').and.callThrough();
      this.sandbox.find('#search-within-form input.js-query').val('found');
      this.sandbox.find('#search-within-form').trigger('submit');
      var hit = this.sandbox.find('.result-paragraph').first(),
          canvasID = hit.attr('data-canvasid'),
          coordinates = hit.attr('data-coordinates'),
          xywh = coordinates && coordinates.split('=')[1].split(',').map(Number),
          bounds = xywh && {x: xywh[0], y: xywh[1], width: xywh[2], height: xywh[3]};
      hit.trigger('click');
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('SET_CURRENT_CANVAS_ID.' + this.windowId, {
        "canvasID": canvasID,
        "bounds": bounds
      });
    });

    it('should show annotations when a search result is linked to more than one', function() {
      this.sandbox.find('#search-within-form input.js-query').val('found');
      this.sandbox.find('#search-within-form').trigger('submit');
      expect(this.sandbox.find('.search-annotation').first()).toExist();
    });

    it('should allow clicking on annotations when a search result is linked to more than one', function() {
      this.sandbox.find('#search-within-form input.js-query').val('found');
      this.sandbox.find('#search-within-form').trigger('submit');
      var anno = this.sandbox.find('.search-annotation').first();
      expect(anno).toExist();
      expect(anno.trigger.bind(anno, 'click')).not.toThrow();
    });

    it('should navigate to a specific bounds and canvas after clicking on an search result linked annotation', function() {
      spyOn(this.eventEmitter, 'publish').and.callThrough();
      this.sandbox.find('#search-within-form input.js-query').val('found');
      this.sandbox.find('#search-within-form').trigger('submit');
      var anno = this.sandbox.find('.search-annotation').first(),
          canvasID = anno.attr('data-canvasid'),
          coordinates = anno.attr('data-coordinates'),
          xywh = coordinates && coordinates.split('=')[1].split(',').map(Number),
          bounds = xywh && {x: xywh[0], y: xywh[1], width: xywh[2], height: xywh[3]};
      anno.trigger('click');
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('SET_CURRENT_CANVAS_ID.' + this.windowId, {
        "canvasID": canvasID,
        "bounds": bounds
      });
    });

    it('should not change canvas after clicking on a second annotation linked to a search result', function() {
      this.sandbox.find('#search-within-form input.js-query').val('found');
      this.sandbox.find('#search-within-form').trigger('submit');
      var anno1 = this.sandbox.find('.search-annotation').first(),
          anno2 = this.sandbox.find('.search-annotation:nth-child(2)').first(),
          canvasID1 = anno2.attr('data-canvasid'),
          canvasID2 = anno2.attr('data-canvasid'),
          coordinates = anno2.attr('data-coordinates'),
          xywh = coordinates && coordinates.split('=')[1].split(',').map(Number),
          bounds = xywh && {x: xywh[0], y: xywh[1], width: xywh[2], height: xywh[3]};
      anno1.trigger('click');
      spyOn(this.eventEmitter, 'publish').and.callThrough();
      anno2.trigger('click');
      expect(canvasID1).toBe(canvasID2);
      expect(this.eventEmitter.publish).toHaveBeenCalledWith('SET_CURRENT_CANVAS_ID.' + this.windowId, {
        "canvasID": canvasID2,
        "bounds": bounds
      });
    });
  });
});
