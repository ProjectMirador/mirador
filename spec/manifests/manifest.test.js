describe('Manifest', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });

  afterEach(function() {
    this.server.restore();
  });

  describe('init', function () {
    it('should have expected data constructed from manifest content', function(done) {
      var content = { "@context": "http://www.shared-canvas.org/ns/context.json",
                      "@type": "sc:Manifest",
                      "@id": "http://manifests.example.com/iiif/EX/manifest",
                      "label": "Book 1",
                      "sequences": [{}]
                    };
      var manifestInstance = new Mirador.Manifest(null, null, content);

      setTimeout(function () { 
        expect(manifestInstance.jsonLd.label).toEqual('Book 1');
        done(); 
      }, 0);
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
      var manifestUri = 'path/to/manifest.json';
      var data = {manifest : "here"};

      this.server.respondWith("GET", "path/to/manifest.json",
                              [ 200,
                                { "Content-Type": "application/json" },
                                JSON.stringify(data)
                              ]
                             );
      var manifestInstance = new Mirador.Manifest(manifestUri);
      this.server.respond();

      expect(manifestInstance.jsonLd).toEqual(data);
      done();
    });

    describe('getVersion for manifest', function() {
      it('should return the correct values for different versions of the manifest', function() {
        var content = { "@context": "http://www.shared-canvas.org/ns/context.json",
                        "@type": "sc:Manifest",
                        "@id": "http://manifests.example.com/iiif/EX/manifest",
                        "label": "Book 1",
                        "sequences": [{}]
                      };
        var manifestInstance = new Mirador.Manifest(null, null, content);
        expect(manifestInstance.getVersion()).toEqual('1');

        content = { "@context": "http://iiif.io/api/presentation/1/context.json",
                    "@type": "sc:Manifest",
                    "@id": "http://manifests.example.com/iiif/EX/manifest",
                    "label": "Book 1",
                    "sequences": [{}]
                  };
        manifestInstance = new Mirador.Manifest(null, null, content);
        expect(manifestInstance.getVersion()).toEqual('1');
        content = { "@context": "http://iiif.io/api/presentation/2/context.json",
                    "@type": "sc:Manifest",
                    "@id": "http://manifests.example.com/iiif/EX/manifest",
                    "label": "Book 1",
                    "sequences": [{}]
                  };
        manifestInstance = new Mirador.Manifest(null, null, content);
        expect(manifestInstance.getVersion()).toEqual('2');

        content = { "@context": "http://iiif.io/api/presentation/2.1/context.json",
                    "@type": "sc:Manifest",
                    "@id": "http://manifests.example.com/iiif/EX/manifest",
                    "label": "Book 1",
                    "sequences": [{}]
                  };
        manifestInstance = new Mirador.Manifest(null, null, content);
        expect(manifestInstance.getVersion()).toEqual('2.1');
      });
    });
    describe('getThumbnailForCanvas', function () {
      
      it('when canvas.thumbnail is a string', function () {
        var thumbnailUrl = 'http://www.example.org/iiif/book1/thumbnail/p1.jpg';
        var canvas = {
          thumbnail: thumbnailUrl
        };
        var manifestInstance = new Mirador.Manifest(null, null, {});
        var thumbnail = manifestInstance.getThumbnailForCanvas(canvas);
        expect(thumbnail).toEqual(thumbnailUrl);
      });
      
      it('when canvas.thumbnail is an object without service', function () {
        var thumbnailUrl = 'http://www.example.org/iiif/book1/thumbnail/p1.jpg';
        var canvas = {
          thumbnail: {
            '@id': thumbnailUrl
          }
        };
        var manifestInstance = new Mirador.Manifest(null, null, {});
        var thumbnail = manifestInstance.getThumbnailForCanvas(canvas);
        expect(thumbnail).toEqual(thumbnailUrl);
      });

      it('when canvas.thumbnail has a service', function () {
        var canvas = {
          thumbnail: {
            '@id': 'http://example.org/images/book1-page1/full/80,100/0/default.jpg',
            service: {
              '@id': 'http://example.org/images/book1-page1',
              profile: 'http://iiif.io/api/image/2/level1.json'
            }
          }
        };
        
        // Version 1
        canvas.thumbnail.service['@context'] = 'http://iiif.io/api/image/1/context.json';
        var manifestInstance = new Mirador.Manifest(null, null, {});
        var thumbnail = manifestInstance.getThumbnailForCanvas(canvas, 128);
        expect(thumbnail).toEqual('http://example.org/images/book1-page1/full/128,/0/native.jpg');
        
        // Version 2
        canvas.thumbnail.service['@context'] = 'http://iiif.io/api/image/2/context.json';
        var manifestInstance = new Mirador.Manifest(null, null, {});
        var thumbnail = manifestInstance.getThumbnailForCanvas(canvas, 126);
        expect(thumbnail).toEqual('http://example.org/images/book1-page1/full/126,/0/default.jpg');
        
        // No @context
        delete canvas.thumbnail.service['@context'];
        var manifestInstance = new Mirador.Manifest(null, null, {});
        var thumbnail = manifestInstance.getThumbnailForCanvas(canvas, 128);
        expect(thumbnail).toEqual('http://example.org/images/book1-page1/full/128,/0/native.jpg');
      });

    });
    
    it('when canvas has no thumbnail', function () {
      var canvas = {
        images: [
          {
            resource: {
              service: {
                '@context': 'http://iiif.io/api/image/2/context.json',
                '@id': 'http://example.org/images/book1-page1'
              }
            }
          }
        ]
      };
      var manifestInstance = new Mirador.Manifest(null, null, {});
      var thumbnail = manifestInstance.getThumbnailForCanvas(canvas, 124);
      expect(thumbnail).toEqual('http://example.org/images/book1-page1/full/124,/0/default.jpg');

      // No @context
      delete canvas.images[0].resource.service['@context'];
      var manifestInstance = new Mirador.Manifest(null, null, {});
      var thumbnail = manifestInstance.getThumbnailForCanvas(canvas, 124);
      expect(thumbnail).toEqual('http://example.org/images/book1-page1/full/124,/0/native.jpg');
    });
    
    it('when canvas has no thumbnail and the image resource has a default', function () {
      var canvas = {
        images: [
          {
            resource: {
              default: {
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id': 'http://example.org/images/book1-page1'
                }
              }
            }
          }
        ]
      };
      var manifestInstance = new Mirador.Manifest(null, null, {});
      var thumbnail = manifestInstance.getThumbnailForCanvas(canvas, 122);
      expect(thumbnail).toEqual('http://example.org/images/book1-page1/full/122,/0/default.jpg');
    });
    
  });
  
  describe('getCanvases', function () {
    it('should return correct canvases', function (done) {
      var content = {
        sequences: [
          {
            canvases: [
              {
                '@id': 'http://example.org/iiif/book1/canvas/p1'
              }
            ]
          }
        ]
      };
      var manifestInstance = new Mirador.Manifest(null, null, content);

      setTimeout(function () { 
        expect(manifestInstance.getCanvases()[0]['@id']).toEqual('http://example.org/iiif/book1/canvas/p1');
        done(); 
      }, 0);
    });
  });
  
  describe('getAnnotationsListUrl', function () {
    it('assuming otherContent has a single annotation list', function (done) {
      var canvasId = 'http://example.org/iiif/book1/canvas/p1';
      var listId = 'http://example.org/iiif/book1/canvas/p1';
      var content = {
        sequences: [
          {
            canvases: [
              {
                '@id': canvasId,
                otherContent: [
                  {
                    "@id": listId,
                    "@type": "sc:AnnotationList"
                  }
                ]
              }
            ]
          }
        ]
      };
      var manifestInstance = new Mirador.Manifest(null, null, content);
      setTimeout(function () { 
        var annotationListUrl = manifestInstance.getAnnotationsListUrl(canvasId);
        expect(annotationListUrl).toEqual(listId);
        done();
      }, 0);
    });
    
    it('when canvas does not have otherContent', function (done) {
      var canvasId = 'http://example.org/iiif/book1/canvas/p1';
      var listId = 'http://example.org/iiif/book1/canvas/p1';
      var content = {
        sequences: [
          {
            canvases: [
              {
                '@id': canvasId,
              }
            ]
          }
        ]
      };
      var manifestInstance = new Mirador.Manifest(null, null, content);
      setTimeout(function () { 
        var annotationListUrl = manifestInstance.getAnnotationsListUrl(canvasId);
        expect(annotationListUrl).toEqual(false); // XXX: why return false?
        done();
      }, 0);
    });
  });
  
  describe('getStructures', function () {
    it('should retrieve correct structures', function (done) {
      var rangeId = 'http://example.org/iiif/book1/range/r1';
      var content = {
        structures: [
          {
            '@id': rangeId
          }
        ]
      };
      var manifestInstance = new Mirador.Manifest(null, null, content);
      setTimeout(function () { 
        var structures = manifestInstance.getStructures();
        expect(structures.length).toEqual(1);
        done();
      }, 0);
    });
  });
  
});
