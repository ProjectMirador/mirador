describe('Mirador | mirador.js', function() {
  function startMirador(done, testContext) {
      localStorage.clear();

      testContext.viewerDiv = jQuery('<div/>');
      testContext.viewerDiv.attr('id', 'viewer');
      testContext.viewerDiv.appendTo('body');

      setTimeout(function() {
        done();
      }, 2000);

      Mirador({
        id: 'viewer',
        layout: "1x2",
        data: [{
          "manifestUri": "spec/data/manifest.json",
          "location": "Stanford University",
          "title": "MS 5",
          "widgets": []
        }]
      });
  };

  // Tests for object initialization
  describe('Initialization', function() {
    beforeEach(function(done) {
      startMirador(done, this);
    });
    afterEach(function() {
      this.viewerDiv.remove();
    });

    it('should render manifest list items', function() {
      expect(Mirador.viewer.manifests['spec/data/Walters/bd183mz0176/manifest.json']).not.toBe(null);
    });

    it('should push in manifest list items', function() {
      expect(Mirador.viewer.manifestsPanel.manifestListItems.length).toBe(1);
    });

  });
  describe('open object from blank workspace', function() {
    var testContext = {};

    it('should start Mirador as blank workspace', function(done) {
      startMirador(done, testContext);
    });

    it('should Select Objects', function(done) {
      expect(testContext.viewerDiv.find('.addItemLink').first()).toExist();
      testContext.viewerDiv.find('.addItemLink').first().click();

      setTimeout(function() {
        done();
      }, 2000);
    });

    it('should show logo specified in manifest', function(done){
      expect(testContext.viewerDiv.find(".repo-image>img")[0].getAttribute("src"))
        .toEqual("https://stacks-test.stanford.edu/image/iiif/ck546xs5106%2Folemiss1/full/300,/0/default.jpg");

      setTimeout(function() {
        done();
      }, 2000);
    });

    it('should click manifest', function(done) {
      expect(testContext.viewerDiv.find('.select-metadata').first()).toExist();
      expect(testContext.viewerDiv.find('.window').first()).not.toExist();
      expect(testContext.viewerDiv.find('.select-metadata').first()).toBeVisible();
      testContext.viewerDiv.find('.select-metadata').first().click();
      
      setTimeout(function() {
        done();
      }, 2000);
    });

    it('should click first page in thumbnail view', function(done) {
      expect(testContext.viewerDiv.find('.window').first()).toExist();
      setTimeout(function() {
        done();
      }, 2000);
    });
    
    it('should click the next button', function(done) {
      setTimeout(function() {
        testContext.viewerDiv.remove();
        done();
      }, 2000);
    })
  });
});
