
(function($) {

  $.Iiif = {

    getImageUrl: function(image) {

      if (!image.images[0].resource.service) {
        id = image.images[0].resource['default'].service['@id'];
        id = id.replace(/\/$/, "");
        return id;
      }
      var id = image.images[0].resource.service['@id'];
      id = id.replace(/\/$/, "");

      return id;
    },

    getVersionFromContext: function(context) {
      if (context instanceof Array) {
        context = context.filter(function(ctx) {
          return typeof ctx === "string" && ctx.indexOf('http://iiif.io') === 0;
        })[0];
      }
      if (context == "http://iiif.io/api/image/2/context.json") {
        return "2.0";
      } else {
        return "1.1";
      }
    },

    getComplianceLevelFromProfile: function(profile) {
        // what to return if we can't determine profile? 0 is not a good idea
        // would be better to have $.Iiif.supports(profile, feature) but that needs a lot more! 
        var compliance = -1;
        var complianceString = null;
        if(profile) {
            if(typeof(profile) === 'string'){
                complianceString = profile;    
            } else if (typeof(profile) === 'object'){
               complianceString = profile[0];
            }   
            switch(complianceString){
                case "http://iiif.io/api/image/2/level0.json":
                    compliance = 0;
                    break;
                case "http://iiif.io/api/image/2/level1.json":
                    compliance = 1;
                    break;
                case "http://iiif.io/api/image/2/level2.json":
                    compliance = 2;
                    break;
            }
        }
        return compliance;
    },
    
    makeUriWithWidth: function(uri, width, version) {
      uri = uri.replace(/\/$/, '');
      if (version[0] == '1') {
        return uri + '/full/' + width + ',/0/native.jpg';
      } else {
        return uri + '/full/' + width + ',/0/default.jpg';
      }
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

          if (matches && matches.length > 1) {
            json.image_host = matches[1];
            json.identifier = matches[2];
          }
        }
      }

      return json.image_host;
    }

  };

}(Mirador));

