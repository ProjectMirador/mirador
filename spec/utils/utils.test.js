describe('Utils', function() {
  beforeEach(function() {
    this.utils = Mirador;
    this.imagesList = [{
      '@id':     '1',
      'title':  '1r',
      'height': 10,
      'width':  20
    }, {
      '@id':     '2',
      'title':  '1v',
      'height': 15,
      'width':  25
    }];

    this.imageTitlesAndIds = [{
      '@id':     '1',
      'title': '1r'
    }, {
      '@id':     '2',
      'title': '1v'
    }];
    this.manifests = {
      "manifest-1234": {
        "uri":"http://xyz.edu/data/Manifest.json",
        "metadata": {
          "details": {
            'label': 'Collection 123'
          }
        },
        "sequences": [{
          "imagesList": this.imagesList
        }]
      }
    };
  });

  it('should trim trailing whitespaces from a string', function() {
    expect(this.utils.trimString('  abc ')).toEqual('abc');
  });

  describe('XHR utils', function() {
    beforeEach(function() {
      this.server = sinon.fakeServer.create();
    });

    afterEach(function() {
      this.server.restore();
    });

    // it('should return JSON data for a given URL via ajax call', function() {
    //   var data = { 'a': 'b' },
    //   error; // undefined
    //   
    //   this.server.respondWith("GET", "http://manifest/url/success",
    //                           [200, { "Content-Type": "application/json" },
    //                             JSON.stringify(data)]);
    //   this.server.respondWith("GET", "http://manifest/url/failed",
    //                           [500, {}, '']);

    //   var callback = sinon.spy();
    //   myLib.getCommentsFor("/manifest/url", callback);
    //   this.server.respond();

    //   // spyOn(jQuery, 'ajax').and.callFake(function(params) {
    //   //   if (/success$/.test(params.url)) {
    //   //     params.success(data);
    //   //   } else {
    //   //     params.error(error);
    //   //   }
    //   // });

    //   expect(this.utils.getJsonFromUrl('http://manifest/url/success', true)).toEqual(data);
    //   expect(this.utils.getJsonFromUrl('http://manifest/url/success', false)).toEqual(data);
    //   expect(this.utils.getJsonFromUrl('http://manifest/url/failed', false)).toEqual(error);
    // });
  });

  describe('createImagePromise', function() {

    it('should load an image if the request is good', function(done) {
      var dataUri = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

      var imagePromise = Mirador.createImagePromise(dataUri);

      imagePromise.done(function(image) {
        expect(image).toBe(dataUri);
        console.log(image);
        done();
      });

    });

    xit('should return an error message to the console if the result is bad', function(done) {
      var dataUri = 'http://thing.notanimagehfhfhfhf.png/';
      spyOn(console, 'log').and.returnValue();


      var imagePromise = Mirador.createImagePromise(dataUri);

      imagePromise.fail(function(image) {
        expect(image).toBe(dataUri);
        expect(console.log).toHaveBeenCalledWith('image failed to load: http://thing.notanimagehfhfhfhf.png/');
        done();
      });
    });
  });

  describe('getImageIndexById', function() {
    it('should return index of the image with the given id', function() {
      expect(this.utils.getImageIndexById(this.imagesList, '1')).toBe(0);
      expect(this.utils.getImageIndexById(this.imagesList, '2')).toBe(1);
      // TODO: should expect -1 or throw exception instead
      expect(this.utils.getImageIndexById(this.imagesList, '0')).toBe(0);
    });
  });

  xdescribe('getThumbnailForCanvas', function() {
    it('should get the proper thumbnail for a canvas', function () {
      
    });
  });

  describe('getQueryParams', function() {
    it('should properly parse a url with query parameters', function() {
      var queryParams = this.utils.getQueryParams('http://zimeon.github.io/iiif-dragndrop/e-codices-help.html?manifest=http://www.e-codices.unifr.ch/metadata/iiif/kba-0003/manifest.json&canvas=http://www.e-codices.unifr.ch/metadata/iiif/kba-0003/canvas/kba-0003_002r.json');
      expect(queryParams.manifest).toBe("http://www.e-codices.unifr.ch/metadata/iiif/kba-0003/manifest.json");
      expect(queryParams.canvas).toBe("http://www.e-codices.unifr.ch/metadata/iiif/kba-0003/canvas/kba-0003_002r.json");
    });
  });
});
