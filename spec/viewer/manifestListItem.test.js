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

    var html = jQuery.parseHTML(this.appendTo[0].outerHTML);
    var testImage = jQuery(html).find('li[data-index-number="0"] img');

    var ids = [];
    jQuery(html).find('li').each(function(i, el){
      ids.push(jQuery(this).data('index-number'));
    });

    expect(ids).toEqual([-1, 0, 1, 5, 8, 13, 14, 16]);
    expect(testImage).toHaveData('image-id', 'http://www.example.org/iiif/book1/canvas/p1');

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

    var html = jQuery.parseHTML(this.appendTo[0].outerHTML);
    var testImage = jQuery(html).find('li[data-index-number="2"] img');
    var ids = [];
    jQuery(html).find('li').each(function(i, el){
      ids.push(jQuery(this).data('index-number'));
    });

    expect(ids).toEqual([-1, 1, 2, 5, 8, 13, 14, 16]);
    expect(testImage).toHaveData('image-id', 'http://www.example.org/iiif/book1/canvas/p1');

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

    var html = jQuery.parseHTML(this.appendTo[0].outerHTML);
    var testImage = jQuery(html).find('li[data-index-number="6"] img');
    var ids = [];
    jQuery(html).find('li').each(function(i, el){
      ids.push(jQuery(this).data('index-number'));
    });

    expect(ids).toEqual([-1, 1, 5, 6, 8, 13, 14, 16]);
    expect(testImage).toHaveData('image-id', 'http://www.example.org/iiif/book1/canvas/p1');

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

    var html = jQuery.parseHTML(this.appendTo[0].outerHTML);
    var testImage = jQuery(html).find('li[data-index-number="17"] img');

    var ids = [];
    jQuery(html).find('li').each(function(i, el){
      ids.push(jQuery(this).data('index-number'));
    });

    expect(ids).toEqual([-1, 1, 5, 8, 13, 14, 16, 17]);
    expect(testImage).toHaveData('image-id', 'http://www.example.org/iiif/book1/canvas/p1');

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

    var html = jQuery.parseHTML(this.appendTo[0].outerHTML);
    var testImage = jQuery(html).find('li[data-index-number="-1"] img');

    expect(testImage).toHaveData('image-id', 'http://www.example.org/iiif/book1/canvas/p1');

  });
  
  it('insert at a forced position', function() {
    var listItem = new Mirador.ManifestListItem({
      appendTo: this.appendTo,
      state: new Mirador.SaveController({
        eventEmitter:this.eventEmitter,
        preserveManifestOrder: true,
        data: [
          { "manifestUri": "http://www.example.org/iiif/book1/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book2/manifest"},
          { "manifestUri": "http://www.example.org/iiif/book3/manifest"},
          { "manifestUri": this.manifest.uri},
        ]
      }),
      eventEmitter: this.eventEmitter,
      resultsWidth: 500,
      forcedIndex: 0,
      manifest: this.manifest
    });

    var html = jQuery.parseHTML(this.appendTo[0].outerHTML);
    var testImage = jQuery(html).find('li[data-index-number="0"] img');

    var ids = [];
    jQuery(html).find('li').each(function(i, el){
      ids.push(jQuery(this).data('index-number'));
    });

    expect(ids).toEqual([-1, 0, 1, 5, 8, 13, 14, 16]);
    expect(testImage).toHaveData('image-id', 'http://www.example.org/iiif/book1/canvas/p1');

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
