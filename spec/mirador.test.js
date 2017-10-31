describe('Mirador | mirador.js', function() {
  function startMirador(done, testContext) {
    localStorage.clear();
    var manifestLoadedCount = 0;

    testContext.viewerDiv = jQuery('<div/>');
    testContext.viewerDiv.attr('id', 'viewer');
    testContext.viewerDiv.appendTo('body');

    testContext.mirador = Mirador({
      id: 'viewer',
      layout: "1x2",
      buildPath: 'spec/',
      preserveManifestOrder: true,
      data: [{
        "manifestUri": "spec/data/manifest.json",
        "location": "Stanford University",
        "title": "MS 5"
      }, {
        "manifestUri": "spec/data/manifest2.json",
        "location": "Stanford University",
        "title": "Walters"
      }],
      language: "de"
    });

    testContext.mirador.viewer.eventEmitter.subscribe('manifestListItemRendered', function(data) {
      manifestLoadedCount++;
      if (manifestLoadedCount === 2) {
        done();
      }
      return;
    });
  }

  // Tests for object initialization
  describe('Initialization', function() {
    beforeAll(function(done) {
      startMirador(done, this);
    });
    afterAll(function() {
      jQuery(window).unbind('resize');
      d3.select(window).on('resize', null);
      this.viewerDiv.remove();
      delete this.mirador;
    });

    it('should apply the correct class to the container', function() {
      expect(jQuery('#viewer').hasClass('mirador-container')).toBe(true);
    });

    it('should render manifest list items', function() {
      console.log(this.mirador.viewer.manifestsPanel.manifestListItems.length)
      expect(this.mirador.viewer.manifestsPanel.manifestListItems.length).toBe(2);
    });

    it('should start Mirador as blank workspace', function() {
      expect(this.mirador.viewer).toBeDefined();
    });

    it('should set the configured language', function(){
      expect(i18next.language).toBe('de')
    });

    it('should select a manifest', function() {
      expect(this.viewerDiv.find('.addItemLink').first()).toExist();
      this.viewerDiv.find('.addItemLink').first().click();
      this.viewerDiv.find('.select-metadata').first().click();
      expect(this.mirador.viewer.workspace.windows[0].manifest.uri).toBe('spec/data/manifest.json');
    });

    xit('should open page from thumbnail view', function() {
      expect(this.viewerDiv.find('.window').first()).toExist();
      expect(this.viewerDiv.find('.thumbnail-view .thumbnail-image.highlight').first()).toExist();
      var _this = this,
          eventId = 'currentCanvasIDUpdated.' + this.mirador.viewer.workspace.windows[0].id;
      this.mirador.viewer.eventEmitter.subscribe(eventId, function(event, data) {
        expect(_this.viewerDiv.find('.image-view').first()).toBeVisible();
        expect(_this.viewerDiv.find('.thumbnail-view').first()).toBeHidden();
      });
      this.viewerDiv.find('.thumbnail-view .thumbnail-image.highlight').first().click();
    });

    it('should replace the window', function() {
      expect(this.viewerDiv.find('.new-object-option').first()).toExist();
      this.viewerDiv.find('.new-object-option').first().click();
      this.viewerDiv.find('.select-metadata').eq(1).click();
      expect(this.mirador.viewer.workspace.windows[0].manifest.uri).not.toEqual('spec/data/manifest.json');
    });

    it('should show logo specified in manifest', function(){
      expect(this.viewerDiv.find(".repo-image>img")[0].getAttribute("src"))
        .toEqual("https://stacks-test.stanford.edu/image/iiif/ck546xs5106%2Folemiss1/full/300,/0/default.jpg");
    });

    xit('should change the page on clicking next button', function() {
      this.viewerDiv.find('.thumbnail-view .thumbnail-image.highlight').first().click();
      expect(this.viewerDiv.find('.mirador-osd-next').first()).toExist();
      this.viewerDiv.find('.mirador-osd-next').first().click();
    });
  });
});
