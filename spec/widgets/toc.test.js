
describe('Table of Contents', function() {
  beforeEach(function(){
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';

    this.v1SimpleStructures = getJSONFixture('simpleStructuresFixtureV1.json'),
    this.v1SimpleStructuresTemplateData = '[{"@id":"http://www.example.org/iiif/book1/range/r1.json","@type":"sc:Range","label":"Introduction","canvases":["http://www.example.org/iiif/book1/canvas/p1.json"],"within":"root","level":0,"children":[{"@id":"http://www.example.org/iiif/book1/range/r2.json","@type":"sc:Range","label":"Part 1","within":"http://www.example.org/iiif/book1/range/r1.json","canvases":["http://www.example.org/iiif/book1/canvas/p2.json","http://www.example.org/iiif/book1/canvas/p3.json#xywh=0,0,750,300"],"level":1}]}]',
    this.v2SimpleStructures = getJSONFixture('simpleStructuresFixtureV2.json'),
    // v21SimpleStructures = getJSONFixture('simpleStructuresFixtureV21.json'),
    this.realisticV1 = getJSONFixture('Richardson7manifest.json'),
    this.realisticV2 = getJSONFixture('BNF-condorcet-florus-dispersus-manifest.json');
    // this.realisticV21 = {},

    this.sandbox = sandbox();

  });

  afterEach(function() {
  });

  describe('Initialisation', function(){

    it('should render a table of contents element', function() {
      var testToc = new Mirador.TableOfContents({
        structures: this.v1SimpleStructures.structures,
        appendTo: this.sandbox,
        windowId: 'dummyID',
        canvasID: 1234
      });

      expect(this.sandbox.find('.toc')).toExist();
      expect(testToc.structures.length).toEqual(2);
    });

    xit('should render an empty table if there are no strcutures', function(){
      var testToc = new Mirador.TableOfContents({
        structures: [],
        appendTo: this.sandbox,
        windowId: 'dummyID',
        canvasID: 1234
      });

      expect(this.sandbox.find('.toc')).toExist();
      expect('h2>span').toContainText('No index available');
    });

    xit('should bind events on the element(s)', function(){

    });

    xit('should set tocData with a cached element for each range', function() {

    });
  });

  describe('Template data', function() {
    xit('should set structures property with children if there is only one "structure"', function() {
    });

    xit('should set structures property with top-level ranges if there is more than one "structure"', function() {

    });

    it('should return a tree of ranges from the structures (v1.0)', function() {
      var testToc = new Mirador.TableOfContents({
        structures: this.v1SimpleStructures.structures,
        appendTo: this.sandbox,
        windowId: 'dummyID',
        canvasID: 1234
      });

      expect(testToc.structures.length).toEqual(2);
      expect(JSON.stringify(testToc.extractRangeTrees(testToc.structures)))
        .toEqual(this.v1SimpleStructuresTemplateData);
    });

    xit('should return a tree of ranges from the structures (v2.0)', function() {

      var testToc = new Mirador.TableOfContents({
        structures: this.vSimpleStructures.structures,
        appendTo: this.sandbox,
        windowId: 'dummyID',
        canvasID: 1234
      });

      expect(testToc.ranges.length).toEqual(2);
      expect(JSON.stringify(testToc.extractRangeTrees(this.v2SimpleStructures)))
        .toEqual(this.v1SimpleStructuresTemplateData);
    });

    xit('should return a tree of ranges from the structures (v2.1)', function() {

    });
  });

  describe('render conditions', function() {
    xit('should re-render when the canvasID is updated', function() {

    });
  });

  describe('Open, closed, selected, unselected states', function() {
    xit('sets an open item when it is clicked', function(){

    });
    xit('sets an item to active when one of its child canvases are deemed the "currentCanvasID"', function(){

    });
    xit('sets a toc item to "open" when the caret is clicked', function() {

    });
  });

  describe('Tab state interactions', function() {
    xit('shows the toc element on tabStateUpdated when the selected tab is not the tocTab', function(){

    });

    xit('hides the toc element on tabStateUpdated when the selected tab is the tocTab', function(){

    });
  });
});
