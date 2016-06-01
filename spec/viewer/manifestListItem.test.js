describe('ManifestListItem', function () {

  beforeEach(function() {
    this.eventEmitter = new Mirador.EventEmitter();
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.dummyManifestContent = getJSONFixture('dummyManifest.json');
    this.manifest = new Mirador.Manifest(null, 'Dummy Location', this.dummyManifestContent);
    this.appendTo = jQuery('<ul>'+
      '<li data-index-number="-1"></li>'+
      '<li data-index-number="1"></li>'+
      '<li data-index-number="5"></li>'+
      '<li data-index-number="8"></li>'+
      '<li data-index-number="13"></li>'+
      '<li data-index-number="14"></li>'+
      '<li data-index-number="16"></li>'+
      '</ul>');
  });

  it('insert index 0', function() {
    var listItem = new Mirador.ManifestListItem({
      appendTo: this.appendTo,
      state: new Mirador.SaveController({
        eventEmitter:this.eventEmitter, 
        preserveManifestOrder: true,
        data: [
          { "manifestUri": "http://www.example.org/iiif/book1/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book2/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book3/manifest"}
        ]
      }),
      eventEmitter: this.eventEmitter,
      resultsWidth: 500,
      manifest: this.manifest
    });

    var expectedHTML = '<ul>'+
    '<li data-index-number="-1"></li>'+
    '<li data-index-number="0" style="display: list-item; opacity: 0; ">'+
    '<div class="repo-image"><img src="build/mirador/images/logos/iiif_logo.png" alt="repoImg"></div>'+
    '<div class="select-metadata"><div class="manifest-title"><h3 title="Dummy Manifest">Dummy Manifest</h3></div>'+
    '<div class="item-info"><div class="item-info-row"><div class="repo-label">Dummy Location</div>'+
    '<div class="canvas-count">1 </div></div></div></div><div class="preview-images"></div><i class="fa fa fa-ellipsis-h remaining"></i></li>'+
    '<li data-index-number="1"></li>'+
    '<li data-index-number="5"></li>'+
    '<li data-index-number="8"></li>'+
    '<li data-index-number="13"></li>'+
    '<li data-index-number="14"></li>'+
    '<li data-index-number="16"></li></ul>';

    expect(this.appendTo[0].outerHTML).toBe(expectedHTML);
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
    '<li data-index-number="-1"></li>'+
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

  it('insert index 6', function() {
    var listItem = new Mirador.ManifestListItem({
      appendTo: this.appendTo,
      state: new Mirador.SaveController({
        eventEmitter:this.eventEmitter, 
        preserveManifestOrder: true,
        data: [
          { "manifestUri": "http://www.example.org/iiif/book2/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book3/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book4/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book5/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book6/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book7/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book1/manifest"}
        ]
      }),
      eventEmitter: this.eventEmitter,
      resultsWidth: 500,
      manifest: this.manifest
    });

    var expectedHTML = '<ul>'+
    '<li data-index-number="-1"></li>'+
    '<li data-index-number="1"></li>'+
    '<li data-index-number="5"></li>'+
    '<li data-index-number="6" style="display: list-item; opacity: 0; ">'+
    '<div class="repo-image"><img src="build/mirador/images/logos/iiif_logo.png" alt="repoImg"></div>'+
    '<div class="select-metadata"><div class="manifest-title"><h3 title="Dummy Manifest">Dummy Manifest</h3></div>'+
    '<div class="item-info"><div class="item-info-row"><div class="repo-label">Dummy Location</div>'+
    '<div class="canvas-count">1 </div></div></div></div><div class="preview-images"></div><i class="fa fa fa-ellipsis-h remaining"></i></li>'+    
    '<li data-index-number="8"></li>'+
    '<li data-index-number="13"></li>'+
    '<li data-index-number="14"></li>'+
    '<li data-index-number="16"></li></ul>';

    expect(this.appendTo[0].outerHTML).toBe(expectedHTML);
  });

  it('insert index 17', function() {
    var listItem = new Mirador.ManifestListItem({
      appendTo: this.appendTo,
      state: new Mirador.SaveController({
        eventEmitter:this.eventEmitter, 
        preserveManifestOrder: true,
        data: [
          { "manifestUri": "http://www.example.org/iiif/book2/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book3/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book4/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book5/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book6/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book7/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book8/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book9/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book10/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book11/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book12/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book13/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book14/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book15/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book16/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book17/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book18/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book1/manifest"}
        ]
      }),
      eventEmitter: this.eventEmitter,
      resultsWidth: 500,
      manifest: this.manifest
    });

    var expectedHTML = '<ul>'+
    '<li data-index-number="-1"></li>'+
    '<li data-index-number="1"></li>'+
    '<li data-index-number="5"></li>'+
    '<li data-index-number="8"></li>'+
    '<li data-index-number="13"></li>'+
    '<li data-index-number="14"></li>'+
    '<li data-index-number="16"></li>'+
    '<li data-index-number="17" style="display: list-item; opacity: 0; ">'+
    '<div class="repo-image"><img src="build/mirador/images/logos/iiif_logo.png" alt="repoImg"></div>'+
    '<div class="select-metadata"><div class="manifest-title"><h3 title="Dummy Manifest">Dummy Manifest</h3></div>'+
    '<div class="item-info"><div class="item-info-row"><div class="repo-label">Dummy Location</div>'+
    '<div class="canvas-count">1 </div></div></div></div><div class="preview-images"></div><i class="fa fa fa-ellipsis-h remaining"></i></li>'+
    '</ul>';

    expect(this.appendTo[0].outerHTML).toBe(expectedHTML);
  });

  it('insert another at index -1', function() {
    var listItem = new Mirador.ManifestListItem({
      appendTo: this.appendTo,
      state: new Mirador.SaveController({
        eventEmitter:this.eventEmitter, 
        preserveManifestOrder: true,
        data: [
          { "manifestUri": "http://www.example.org/iiif/book2/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book3/manifest"}
        ]
      }),
      eventEmitter: this.eventEmitter,
      resultsWidth: 500,
      manifest: this.manifest
    });

    var expectedHTML = '<ul>'+
    '<li data-index-number="-1" style="display: list-item; opacity: 0; ">'+
    '<div class="repo-image"><img src="build/mirador/images/logos/iiif_logo.png" alt="repoImg"></div>'+
    '<div class="select-metadata"><div class="manifest-title"><h3 title="Dummy Manifest">Dummy Manifest</h3></div>'+
    '<div class="item-info"><div class="item-info-row"><div class="repo-label">Dummy Location</div>'+
    '<div class="canvas-count">1 </div></div></div></div><div class="preview-images"></div><i class="fa fa fa-ellipsis-h remaining"></i></li>'+
    '<li data-index-number="-1"></li>'+
    '<li data-index-number="1"></li>'+
    '<li data-index-number="5"></li>'+
    '<li data-index-number="8"></li>'+
    '<li data-index-number="13"></li>'+
    '<li data-index-number="14"></li>'+
    '<li data-index-number="16"></li>'+
    '</ul>';

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
