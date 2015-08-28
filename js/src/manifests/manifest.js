(function($){

  $.Manifest = function(manifestUri, location) {

    jQuery.extend(true, this, {
      jsonLd: null,
      location: location,
      uri: manifestUri,
      request: null 
    });

    this.init(manifestUri);
  };

  $.Manifest.prototype = {
    init: function(manifestUri) {
      var _this = this;
      this.request = jQuery.ajax({
        url: manifestUri,
        dataType: 'json',
        async: true
      });

      this.request.done(function(jsonLd) {
        _this.jsonLd = jsonLd;
      });
    },
    getThumbnailForCanvas : function(canvas, width) {
      var version = "1.1",
      service,
      thumbnailUrl;

      // Ensure width is an integer...
      width = parseInt(width, 10);

      // Respecting the Model...
      if (canvas.hasOwnProperty('thumbnail')) {
        // use the thumbnail image, prefer via a service
        if (typeof(canvas.thumbnail) == 'string') {
          thumbnailUrl = canvas.thumbnail;
        } else if (canvas.thumbnail.hasOwnProperty('service')) {
          // Get the IIIF Image API via the @context
          service = canvas.thumbnail.service;
          if (service.hasOwnProperty('@context')) {
            version = $.Iiif.getVersionFromContext(service['@context']);
          }
          thumbnailUrl = $.Iiif.makeUriWithWidth(service['@id'], width, version);
        } else {
          thumbnailUrl = canvas.thumbnail['@id'];
        }
      } 
      else {
         //BH edit for no thumbnail image defined
        var resource = "";
        if(canvas.images[0] === undefined || canvas.images[0] === ""){
          /*
             If an image is not found, then there is no resource for it.  This is a place where you can set
             a default image resource within mirador or specific to a project.  Here, I have specified one for
             broken books default imgNotFound.png.  My service is invalid and will break.  

             @see: createOpenSeadragonInstance in imageView.js for what to do with invalid image service.
         */
          resource = {
                            "@id":"http://165.134.241.141/brokenBooks/images/imgNotFound.png",
                            "format":"image/jpg",
                            "@type":"dctypes:Image",
                            "service":
                                {                                       
                                    "@context": "http://iiif.io/api/image/2/context.json",
                                    "profile":"http://iiif.io/api/image/2/profiles/level2.json",
                                    "@id" : "http://165.134.241.141/brokenBooks/images/imgNotFound.png"
                                },
                            "width": 667,
                            "height":1000
                        };
        }
        else{
          resource = canvas.images[0].resource;
        }
        //End BH edit
        service = resource['default'] ? resource['default'].service : resource.service;
        if (service.hasOwnProperty('@context')) {
          version = $.Iiif.getVersionFromContext(service['@context']);
        }       
        thumbnailUrl = resource["@id"];   
      }
      return thumbnailUrl;
    },
    getCanvases : function() {
      var _this = this;
      return _this.jsonLd.sequences[0].canvases;
    },
    getAnnotationsListUrl: function(canvasId) {
      var _this = this;
      var canvas = jQuery.grep(_this.getCanvases(), function(canvas, index) {
        return canvas['@id'] === canvasId;
      })[0];
       
      //bh edit:  Need to make sure that other content is defined and not empty before attempting to access.
      if (canvas && canvas.otherContent && canvas.otherContent.length >= 1) {
        return canvas.otherContent[0]['@id'];
      } 
      else { return false; }
    },
    getStructures: function() {
      var _this = this;
      return _this.jsonLd.structures;
    }
  };

}(Mirador));
