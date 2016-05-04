describe('Manifest', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
    this.manifestUri = 'path/to/manifest.json';
  });

  afterEach(function() {
    this.server.restore();
  });
  
  describe('init', function() {
    xit('should have expected data constructed from manifest content', function(done) {
      done();
    });

    it('should have expected data constructed from info.json', function(done) {
      var uri = 'http://example.com/iiif/book1/info.json';
      var data = {
        height:4737,
        width: 3152,
        '@context': 'http://library.stanford.edu/iiif/image-api/1.1/context.json',
        '@id': 'http://example.com/iiif/image1',
        formats: ['jpg', 'png'],
        profile: 'http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2'
      };
      this.server.respondWith('GET', uri,
        [ 200,
          { 'Content-Type': 'application/json' },
          JSON.stringify(data)
        ]
      );
      var manifestInstance = new Mirador.Manifest(uri);
      this.server.respond();
      
      var jsonLd = manifestInstance.jsonLd;
      var canvas = jsonLd.sequences[0].canvases[0];
      var image = canvas.images[0];
      
      // Attributes passed from info.json
      
      expect(canvas.height).toEqual(4737);
      expect(canvas.width).toEqual(3152);
      expect(image.resource.height).toEqual(4737);
      expect(image.resource.width).toEqual(3152);
      expect(image.resource.service['@id']).toEqual(data['@id']);
      expect(image.resource.service['@context']).toEqual(data['@context']);
      expect(image.resource.service.profile).toEqual(data.profile);

      // Attributes built by Manifest code.
      expect(jsonLd['@type']).toEqual('sc:Manifest');
      done();
    });
    
    it('should have expected data constructed from manifest URI', function(done) {
      var data = {manifest : "here"};

      this.server.respondWith("GET", "path/to/manifest.json",
        [ 200,
          { "Content-Type": "application/json" },
          JSON.stringify(data)
        ]
      );
      var manifestInstance = new Mirador.Manifest(this.manifestUri);
      this.server.respond();

      expect(manifestInstance.jsonLd).toEqual(data);
      done();
    });
    
  });
  
});
