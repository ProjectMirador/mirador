
(function($) {

  $.Iiif = {

    // Temporary method to create Stanford IIIF URI from Stanford stacks non-IIIF URI
    getUri: function(uri) {
      var iiifUri = uri,
      match = /http?:\/\/stacks.stanford.edu\/image\/(\w+\/\S+)/i.exec(uri);

      if (match && match.length === 2) {
        iiifUri = 'https://stacks.stanford.edu/image/iiif/' + encodeURIComponent(match[1]);
      }

      return iiifUri;
    },


    getUriWithHeight: function(uri, height) {
      uri = uri.replace(/\/$/, '');
      return this.getUri(uri) + '/full/,' + height + '/0/native.jpg';
    },


    prepJsonForOsd: function(json) {
      json.image_host    = this.getImageHostUrl(json);
      json.scale_factors = this.packageScaleFactors(json);
      json.profile       = json.profile.replace(/image-api\/1.\d/, 'image-api');

      if (!json.tile_width) {
        json.tile_width = 256;
        json.tile_height = 256;
      }

      return json;
    },


    getImageHostUrl: function(json) {
      var regex,
          matches = [];

      if (!json.hasOwnProperty('image_host')) {

        json.image_host = json.tilesUrl || json['@id'] || '';

       if (json.hasOwnProperty('identifier')) {
          regex = new RegExp('/?' + json.identifier + '/?$', 'i');
          json.image_host = json.image_host.replace(regex, '');

        } else {
          regex = new RegExp('(.*)\/(.*)$');
          matches = regex.exec(json.image_host);

          if (matches.length > 1) {
            json.image_host = matches[1];
            json.identifier = matches[2];
          }
        }
      }

      return json.image_host;
    },


    packageScaleFactors: function(json) {
      var newScaleFactors = [];

      if (json.hasOwnProperty('scale_factors') && jQuery.isArray(json.scale_factors)) {
        for (var i = 0; i < json.scale_factors.length; i++) {
          newScaleFactors.push(i);
        }
      }

      return newScaleFactors;
    }

  };


}(Mirador));

