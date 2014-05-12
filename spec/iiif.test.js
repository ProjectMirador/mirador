describe('Mirador IIIF wrapper | iiif.js', function() {
  var $;

  beforeEach(function() {
    localStorage.clear();

    Mirador({
      id: 'abc',
      data: [
        { "manifestUri": "spec/data/Walters/bd183mz0176/manifest.json", "location": "Stanford University", "title": "MS 5", "widgets": [] }
      ]
    });

    $ = Mirador;
  });


  //  Tests for wrapper/shim methods
  describe('Wrapper/shim methods', function() {
    var json = {
      "@id": "http://www.shared-canvas.org/iiif/f2r",
      "identifier": "f2r",
      "scale_factors": [1, 2, 3, 4, 5, 8, 10, 16, 20],
      "tilesUrl": "http://www.shared-canvas.org/iiif",
      "profile": "http://iiif.io/api/image-api/1.1/compliance.html"
    };

    var preppedJson = {
      "@id": "http://www.shared-canvas.org/iiif/f2r",
      "identifier": "f2r",
      "scale_factors": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      "tilesUrl": "http://www.shared-canvas.org/iiif",
      "image_host": "http://www.shared-canvas.org/iiif",
      "profile": "http://iiif.io/api/image-api/compliance.html",
      "tile_width": 256,
      "tile_height": 256
    };


    // it('should create Stanford IIIF URI from Stanford stacks non-IIIF URI', function() {
    //   var nonStanfordUri = 'http://scale.ydc2.yale.edu/iiif/ed04f5ff-b815-40b4-99d8-98a8650b0eb0/';

    //   expect($.Iiif.getUri('http://stacks.stanford.edu/image/bd183mz0176/W688_000001_300')).toEqual('https://stacks.stanford.edu/image/iiif/bd183mz0176%2FW688_000001_300');
    //   expect($.Iiif.getUri(nonStanfordUri)).toEqual(nonStanfordUri);
    // });


    // it('should return a IIIF URI with given height', function() {
    //   expect($.Iiif.getUriWithHeight('http://abc.edu/iiif/ed04f5ff/', 400)).toEqual('http://abc.edu/iiif/ed04f5ff/full/,400/0/native.jpg');
    // });

    // it('should make sure IIIF info.json data is backwards compatible with consistent scale_factors', function() {
    //     expect($.Iiif.prepJsonForOsd(json)).toEqual(preppedJson);
    // });

    // it('should return image host URL for a given IIIF info.json response', function() {
    //   var json = { "image_host": "http://www.shared-canvas.org/iiif" };
    //   var jsonNoIdentifier = { "@id": "http://www.shared-canvas.org/iiif/f2r" };

    //   expect($.Iiif.getImageHostUrl(json)).toEqual(json.image_host);
    //   expect($.Iiif.getImageHostUrl(jsonNoIdentifier)).toEqual(json.image_host);
    // });

  });

});
