describe('Iiif', function () {
  describe('getImageUrl', function() {
    it('should return default id for image entries without a service', function() {
      var sample = {
        "@id": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/canvas/canvas-5",
        "@type": "sc:Canvas",
        "label": "page de garde recto",
        "height": "4785",
        "width": "3760",
        "images": [
          {
            "@id": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/imageanno/anno-5",
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@id": "http://stacks.stanford.edu/image/jr903ng8662/T0000005",
              "@type": "dctypes:Image",
              "format": "image/jpeg",
              "height": "4785",
              "width": "3760",
              "default": {
                "service": {
                  "@id": "https://stacks.stanford.edu/image/iiif/jr903ng8662%252FT0000005",
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "profile": "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1"
                }
              }
            },
            "on": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/canvas/canvas-5"
          }
        ]
      };
      expect(Mirador.Iiif.getImageUrl(sample)).toEqual("https://stacks.stanford.edu/image/iiif/jr903ng8662%252FT0000005");
    });
    
    it('should return IIIF root for image entries with a service', function() {
      var sample = {
        "@id": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/canvas/canvas-5",
        "@type": "sc:Canvas",
        "label": "page de garde recto",
        "height": "4785",
        "width": "3760",
        "images": [
          {
            "@id": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/imageanno/anno-5",
            "@type": "oa:Annotation",
            "motivation": "sc:painting",
            "resource": {
              "@id": "http://stacks.stanford.edu/image/jr903ng8662/T0000005",
              "@type": "dctypes:Image",
              "format": "image/jpeg",
              "height": "4785",
              "width": "3760",
              "service": {
                "@id": "https://stacks.stanford.edu/image/iiif/jr903ng8662%252FT0000005",
                "@context": "http://iiif.io/api/image/2/context.json",
                "profile": "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1"
              }
            },
            "on": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/canvas/canvas-5"
          }
        ]
      };
      expect(Mirador.Iiif.getImageUrl(sample)).toEqual("https://stacks.stanford.edu/image/iiif/jr903ng8662%252FT0000005");
    });
  });
  
  describe('getVersionFromContext', function () {
    it('should handle array contexts', function() {
      var context = ['http://iiif.io/api/image/2/context.json',
                     {'someField': 'ns:some-field'}];
      expect(Mirador.Iiif.getVersionFromContext(context)).toEqual('2.0');
    });
    it('should identify 2.0', function() {
      var context = 'http://iiif.io/api/image/2/context.json';
      expect(Mirador.Iiif.getVersionFromContext(context)).toEqual('2.0');
    });
    it('should identify 1.1', function() {
      var context = 'http://iiif.io/api/image/1/context.json';
      expect(Mirador.Iiif.getVersionFromContext(context)).toEqual('1.1');
    });
  });
  
  describe('getComplianceLevelFromProfile', function () {
    it('should identify 0 from string', function() {
      var profile = 'http://iiif.io/api/image/2/level0.json';
      expect(Mirador.Iiif.getComplianceLevelFromProfile(profile)).toEqual(0);
    });
    it('should identify 2 from array', function() {
      var profile = [
        "http://iiif.io/api/image/2/level2.json",
        {
        "formats" : [ "gif", "pdf" ],
        "qualities" : [ "color", "gray" ],
        "supports" : [
            "canonicalLinkHeader", "rotationArbitrary", "profileLinkHeader", "http://example.com/feature/"
        ]
        }
      ];
      expect(Mirador.Iiif.getComplianceLevelFromProfile(profile)).toEqual(2);
    });
    it('should return -1 for empty profile', function() {
      var profile = null;
      expect(Mirador.Iiif.getComplianceLevelFromProfile(profile)).toEqual(-1);
    });
    it('should return -1 for unrecognised profile', function() {
      var profile = "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0";
      expect(Mirador.Iiif.getComplianceLevelFromProfile(profile)).toEqual(-1);
    });
  });
  
  
  describe('makeUriWithWidth', function () {
    it('should return native.jpg URL for IIIF v1.x', function() {
      expect(Mirador.Iiif.makeUriWithWidth('http://images.waahoo.com/iiif/MYTEST', 512, '1.1')).toEqual('http://images.waahoo.com/iiif/MYTEST/full/512,/0/native.jpg');
    });
    it('should return native.jpg URL for IIIF v2.x', function() {
      expect(Mirador.Iiif.makeUriWithWidth('http://images.waahoo.com/iiif/MYTEST', 512, '2.0')).toEqual('http://images.waahoo.com/iiif/MYTEST/full/512,/0/default.jpg');
    });
  });
  
  describe('getImageHostUrl', function () {
    it('should return image_host if it exists', function() {
      expect(Mirador.Iiif.getImageHostUrl({ image_host: "http://0.0.0.0/abc" })).toEqual("http://0.0.0.0/abc");
    });
    it('should return identifier portion if it exists', function() {
      expect(Mirador.Iiif.getImageHostUrl({ '@id': "http://0.0.0.0/abc/def", identifier: "def" })).toEqual("http://0.0.0.0/abc");
    });
    it('should split URL in half if found', function() {
      expect(Mirador.Iiif.getImageHostUrl({'@id': "http://0.0.0.0/abc/def"})).toEqual("http://0.0.0.0/abc");
    });
    it('should return empty string if all attempts fail', function() {
      expect(Mirador.Iiif.getImageHostUrl({})).toEqual('');
    });
  });
});
