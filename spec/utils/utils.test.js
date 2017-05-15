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
  
  it('should find the correct image index by ID', function() {
    expect(this.utils.getImageIndexById(this.imagesList, '1')).toEqual(0);
    expect(this.utils.getImageIndexById(this.imagesList, '2')).toEqual(1);
  });
  
  describe('getThumbnailForCanvas', function() {
    it('should get the thumbnail if found as a string', function() {
      this.imagesList[0].thumbnail = "http://0.0.0.0/thumbnail.png";
      expect(this.utils.getThumbnailForCanvas(this.imagesList[0], "20")).toEqual(this.imagesList[0].thumbnail);
    });
    it('should get the thumbnail if found as a service', function() {
      this.imagesList[0].thumbnail = {
        service: {
          '@context': "http://iiif.io/api/image/2/context.json",
          '@id': "http://0.0.0.0/iiif/thumbnail"
        }
      };
      expect(this.utils.getThumbnailForCanvas(this.imagesList[0], "20")).toEqual("http://0.0.0.0/iiif/thumbnail/full/20,/0/default.jpg");
    });
    it('should use main image if nothing else is found', function() {
      this.imagesList[0].images = [{
        resource: {
          "service": {
            '@context': "http://iiif.io/api/image/2/context.json",
            "@id": "http://0.0.0.0/iiif/thumbnail"
          }
        }
      }];
      expect(this.utils.getThumbnailForCanvas(this.imagesList[0], "20")).toEqual("http://0.0.0.0/iiif/thumbnail/full/20,/0/default.jpg");
    });
  });
  
  describe('jQuery.fn.slideFadeToggle()', function() {
    var elem;
    beforeEach(function() {
      elem = document.createElement('div');
      $('<p>Waahoo</p>').appendTo(elem);
    });
    it('should hide a shown element', function(done) {
      jQuery(elem).slideFadeToggle(10, 'linear', function() {
        expect(jQuery(this)).not.toBeVisible();
        done();
      });
    });
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
  
  describe('isOnScreen', function() {
    var subject, win, el_offset, el;
    beforeEach(function() {
      subject = this.utils;
      win = {
        scrollTop: jasmine.createSpy('scrollTop').and.returnValue(320),
        scrollLeft: jasmine.createSpy('scrollLeft').and.returnValue(48),
        outerHeight: jasmine.createSpy('outerHeight').and.returnValue(200),
        outerWidth: jasmine.createSpy('outerWidth').and.returnValue(150)
      };
      el_offset = {
        top: 0,
        left: 0
      };
      el = {
        offset: jasmine.createSpy().and.callFake(function() {
          return el_offset;
        }),
        height: jasmine.createSpy().and.returnValue(16),
        width: jasmine.createSpy().and.returnValue(32)
      };
      spyOn(window, 'jQuery').and.callFake(function(arg) {
        if (arg === window) {
          return win;
        }
        else {
          return el;
        }
      });
    });
    it('should return true for things on screen', function() {
      el_offset = { top: 330, left: 60 };
      expect(subject.isOnScreen('elem')).toBe(true);
      el_offset = { top: 660, left: 200 };
      expect(subject.isOnScreen('elem', 2)).toBe(true);
    });
    it('should return false for things off screen', function() {
      jQuery.each([{ top: 0, left: 60 }, { top: 900, left: 60 }, { top: 330, left: 0 }, { top: 650, left: 2000 }], function(k, eo) {
        el_offset = eo;
        expect(subject.isOnScreen('elem')).toBe(false);
      });
      jQuery.each([{ top: 0, left: 100 }, { top: 1900, left: 100 }, { top: 650, left: 0 }, { top: 330, left: 700 }], function(k, eo) {
        el_offset = eo;
        expect(subject.isOnScreen('elem', 2)).toBe(false);
      });
    });
  });
  
  describe('getRangeIDByCanvasID', function() {
    it('should find ranges correctly', function() {
      var canvasID = 'http://0.0.0.0/iiif/0/canvas',
          structures = [
            {
              '@id': 'http://0.0.0.0/iiif/no1/sequence',
              canvases: [ 'http://0.0.0.0/iiif/1/canvas', 'http://0.0.0.0/iiif/2/canvas' ]
            },
            {
              '@id': 'http://0.0.0.0/iiif/no2/sequence',
              canvases: [ ]
            },
            {
              '@id': 'http://0.0.0.0/iiif/yes1/sequence',
              canvases: [ 'http://0.0.0.0/iiif/0/canvas' ]
            },
            {
              '@id': 'http://0.0.0.0/iiif/yes2/sequence',
              canvases: [ 'http://0.0.0.0/iiif/1/canvas', 'http://0.0.0.0/iiif/0/canvas' ]
            },
          ];
      expect(this.utils.getRangeIDByCanvasID(structures, canvasID)).toEqual(['http://0.0.0.0/iiif/yes1/sequence', 'http://0.0.0.0/iiif/yes2/sequence']);
    });
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

    it('should return an error message to the console if the result is bad', function(done) {
      var dataUri = 'http://0.0.0.0/invalid.png';
      spyOn(console, 'log').and.returnValue();
      var imagePromise = Mirador.createImagePromise(dataUri);
      imagePromise.fail(function(image) {
        expect(image).toBe(dataUri);
        expect(console.log).toHaveBeenCalledWith('image failed to load: http://0.0.0.0/invalid.png');
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

  describe('getThumbnailForCanvas', function() {
    it('should get the proper thumbnail for a canvas when thumbnail is given as a string', function() {
      var stringUrl = 'http://images.example.org/thumbnail/1';
      var canvas = {
        '@id': 'http://manifests.example.org/canvas/1',
        thumbnail: stringUrl
      };
      expect(this.utils.getThumbnailForCanvas(canvas, 100)).toEqual(stringUrl);
    });

    it('should get the proper thumbnail for a canvas when thumbnail is given as a service', function() {
      var canvas = {
        '@id': 'http://manifests.example.org/canvas/2',
        thumbnail: {
          service: {
            profile: 'http://iiif.io/api/image/2/level1.json',
            '@context': 'http://iiif.io/api/image/2/context.json',
            '@id': 'http://images.example.org/image/1'
          }
        }
      }
      expect(this.utils.getThumbnailForCanvas(canvas, 100))
        .toEqual('http://images.example.org/image/1/full/100,/0/default.jpg');
    });
  });

  describe('getQueryParams', function() {
    it('should properly parse a url with query parameters', function() {
      var queryParams = this.utils.getQueryParams('http://zimeon.github.io/iiif-dragndrop/e-codices-help.html?manifest=http://www.e-codices.unifr.ch/metadata/iiif/kba-0003/manifest.json&canvas=http://www.e-codices.unifr.ch/metadata/iiif/kba-0003/canvas/kba-0003_002r.json');
      expect(queryParams.manifest).toBe("http://www.e-codices.unifr.ch/metadata/iiif/kba-0003/manifest.json");
      expect(queryParams.canvas).toBe("http://www.e-codices.unifr.ch/metadata/iiif/kba-0003/canvas/kba-0003_002r.json");
    });
    it('should properly parse a url without query parameters', function() {
      var queryParams = this.utils.getQueryParams('http://www.google.com');
      expect(queryParams).toEqual({});
    });
  });
  
  describe('exitFullscreen', function() {
    beforeEach(function() {
      delete document.exitFullscreen;
      delete document.mozCancelFullScreen;
      delete document.webkitExitFullscreen;
    });
    it('should run without prefixes if available', function() {
      document.exitFullscreen = jasmine.createSpy();
      this.utils.exitFullscreen();
      expect(document.exitFullscreen).toHaveBeenCalled();
    });
    it('should run with moz prefix as a backup', function() {
      document.mozCancelFullScreen = jasmine.createSpy();
      this.utils.exitFullscreen();
      expect(document.mozCancelFullScreen).toHaveBeenCalled();
    });
    it('should run with webkit prefix as a backup', function() {
      document.webkitExitFullscreen = jasmine.createSpy();
      this.utils.exitFullscreen();
      expect(document.webkitExitFullscreen).toHaveBeenCalled();
    });
  });
  
  describe('enterFullscreen', function() {
    var subject;
    beforeEach(function() {
      subject = this.utils;
    });
    it('should run standard requestFullscreen over all others', function() {
      jQuery.each(['mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'], function(k, v) {
        var el = jasmine.createSpyObj('el', ['requestFullscreen', v]);
        subject.enterFullscreen(el);
        expect(el.requestFullscreen).toHaveBeenCalled();
        expect(el[v]).not.toHaveBeenCalled();
      });
    });
    it('should run mozRequestFullScreen if available', function() {
      var el = jasmine.createSpyObj('el', ['mozRequestFullScreen']);
      subject.enterFullscreen(el);
      expect(el.mozRequestFullScreen).toHaveBeenCalled();
    });
    it('should run webkitRequestFullscreen if available', function() {
      var el = jasmine.createSpyObj('el', ['webkitRequestFullscreen']);
      subject.enterFullscreen(el);
      expect(el.webkitRequestFullscreen).toHaveBeenCalled();
    });
    it('should run msRequestFullscreen if available', function() {
      var el = jasmine.createSpyObj('el', ['msRequestFullscreen']);
      subject.enterFullscreen(el);
      expect(el.msRequestFullscreen).toHaveBeenCalled();
    });
  });
  
  describe('isFullscreen', function() {
    var dummyFullscreenElement = {
      length: 1
    };
    beforeEach(function() {
      spyOn(this.utils, 'fullscreenElement').and.returnValue(dummyFullscreenElement);
    });
    it('should detect fullscreen', function() {
      expect(this.utils.isFullscreen()).toBe(true);
    });
    it('should detect non-fullscreen', function() {
      dummyFullscreenElement.length = 0;
      expect(this.utils.isFullscreen()).toBe(false);
    });
  });
  
  describe('fullscreenElement', function() {
    beforeEach(function() {
      delete document.fullscreenElement;
      delete document.mozFullScreenElement;
      delete document.webkitFullscreenElement;
    });
    it('should return document.fullscreenElement if available', function() {
      document.fullscreenElement = jasmine.createSpyObj('fullscreenElement', ['length']);
      expect(this.utils.fullscreenElement()).toBe(document.fullscreenElement);
    });
    it('should return document.mozFullScreenElement if available', function() {
      document.mozFullScreenElement = jasmine.createSpyObj('mozFullScreenElement', ['length']);
      expect(this.utils.fullscreenElement()).toBe(document.mozFullScreenElement);
    });
    it('should return document.webkitFullscreenElement if available', function() {
      document.webkitFullscreenElement = jasmine.createSpyObj('webkitFullscreenElement', ['length']);
      expect(this.utils.fullscreenElement()).toBe(document.webkitFullscreenElement);
    });
  });
});
