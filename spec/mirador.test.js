describe('Mirador | mirador.js', function() {
  function startMirador(done, testContext) {
    localStorage.clear();

    testContext.viewerDiv = jQuery('<div/>');
    testContext.viewerDiv.attr('id', 'viewer');
    testContext.viewerDiv.appendTo('body');

    setTimeout(function() {
      done();
    }, 2000);

    testContext.mirador = Mirador({
      id: 'viewer',
      layout: "1x2",
      buildPath: 'spec/',
      data: [{
        "manifestUri": "spec/data/manifest.json",
        "location": "Stanford University",
        "title": "MS 5",
        "widgets": []
      }]
    });
  }

  // Tests for object initialization
  describe('Initialization', function() {
    beforeAll(function(done) {
      startMirador(done, this);
    });
    afterAll(function() {
      this.viewerDiv.remove();
      delete this.mirador;
    });

    it('should render manifest list items', function() {
      expect(this.mirador.viewer.manifestsPanel.manifestListItems.length).toBe(1);
    });

    it('should start Mirador as blank workspace', function() {
      expect(this.mirador.viewer).toBeDefined();
    });

    it('should select a manifest', function() {
      expect(this.viewerDiv.find('.addItemLink').first()).toExist();
      this.viewerDiv.find('.addItemLink').first().click();
      this.viewerDiv.find('.select-metadata').first().click();
      expect(this.mirador.viewer.workspace.windows[0].manifest.uri).toEqual('spec/data/manifest.json');
    });

    it('should show logo specified in manifest', function(){
      expect(this.viewerDiv.find(".repo-image>img")[0].getAttribute("src"))
        .toEqual("https://stacks-test.stanford.edu/image/iiif/ck546xs5106%2Folemiss1/full/300,/0/default.jpg");
    });

    it('should click first page in thumbnail view', function() {
      expect(this.viewerDiv.find('.window').first()).toExist();
    });

    it('should click the next button', function() {
      expect(this.viewerDiv.find('.window').first()).toExist();
    });
  });
});
