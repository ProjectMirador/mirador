describe('Table of Contents', function() {
  beforeEach(function(){
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';

    var v1SimpleStructures = getJSONFixture('simpleFixture'),
        v2SimpleStructures = getJSONFixture('simpleFixture'),
        v21SimpleStructures = getJSONFixture('simpleFixture'),
        realisticV2 = {},
        realisticV21 = {},
        realisticV1 = getJSONFixture('v1StructuresManifest.json');
  });

  describe('Initialisation', function(){

    xit('should render a table of contents element', function() {

    });

    xit('should render an empty table if there are no strcutures', function(){

    });

    xit('should bind events on the element(s)', function(){

    });

    xit('should set tocData with a cached element for each range', function() {

    });
  });

  describe('Template data', function() {
    xit('should set ranges property with children if there is only one "structure"', function() {

    });

    xit('should set ranges property with top-level ranges if there is more than one "structure"', function() {

    });

    xit('should return a tree of ranges from the structures (v1.0)', function() {

    });

    xit('should return a tree of ranges from the structures (v2.0)', function() {

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
