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


  // Tests for wrapper/shim methods
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

  });

});
