describe('ManifestListItem', function () {

  beforeEach(function() {
    this.eventEmitter = new Mirador.EventEmitter();
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.dummyManifestContent = getJSONFixture('dummyManifest.json');
    this.manifest = new Mirador.Manifest(null, 'Dummy Location', this.dummyManifestContent);
    this.appendTo = jQuery('<ul>'+
      '<li data-index-number="1"></li>'+
      '<li data-index-number="5"></li>'+
      '<li data-index-number="8"></li>'+
      '<li data-index-number="13"></li>'+
      '<li data-index-number="14"></li>'+
      '<li data-index-number="16"></li>'+
      '</ul>');
  });

  it('insert index 2', function() {
    var listItem = new Mirador.ManifestListItem({
      appendTo: this.appendTo,
      state: new Mirador.SaveController({
        eventEmitter:this.eventEmitter, 
        preserveManifestOrder: true,
        data: [
          { "manifestUri": "http://www.example.org/iiif/book2/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book3/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book1/manifest"}
        ]
      }),
      eventEmitter: this.eventEmitter,
      resultsWidth: 500,
      manifest: this.manifest
    });

    var expectedHTML = '<ul>'+
    '<li data-index-number="1"></li>'+
    '<li data-index-number="2" style="display: list-item; opacity: 0; ">'+
    '<div class="repo-image"><img src="build/mirador/images/logos/iiif_logo.png" alt="repoImg"></div>'+
    '<div class="select-metadata"><div class="manifest-title"><h3 title="Dummy Manifest">Dummy Manifest</h3></div>'+
    '<div class="item-info"><div class="item-info-row"><div class="repo-label">Dummy Location</div>'+
    '<div class="canvas-count">1 </div></div></div></div><div class="preview-images"></div><i class="fa fa fa-ellipsis-h remaining"></i></li>'+
    '<li data-index-number="5"></li>'+
    '<li data-index-number="8"></li>'+
    '<li data-index-number="13"></li>'+
    '<li data-index-number="14"></li>'+
    '<li data-index-number="16"></li></ul>';

    expect(this.appendTo[0].outerHTML).toBe(expectedHTML);
  });
  xit('fetchTplData', function () {
  });
  xit('render', function () {
  });
  xit('listenForActions', function () {
  });
  xit('bindEvents', function () {
  });
  xit('updateDisplay', function () {
  });
  xit('hide', function () {
  });
  xit('show', function () {
  });
});
