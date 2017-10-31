(function($){

  $.Manifest = function(manifestUri, location, manifestContent) {
    if (manifestContent) {
      jQuery.extend(true, this, {
        jsonLd: null,
        location: location,
        uri: manifestUri,
        request: null
      });
      this.initFromManifestContent(manifestContent);
    } else if (manifestUri.indexOf('info.json') !== -1) {
      // The following is an ugly hack. We need to finish the
      // Manifesto utility library.
      // See: https://github.com/IIIF/manifesto
      //
      // If manifestUri is not a string, then
      // it's an object, namely a light-weight
      // dummy manifest wrapped around the
      // contents of an an info.json response.
      //
      // The wrapper is still going to need these
      // accessor methods. We can just set the
      // jsonLd directly, and the request needs to
      // be a jQuery deferred object that is completed
      // immediately upon creation. This allows
      // components listening for this request to finish
      // to react immediately without having to be
      // re-written.
      jQuery.extend(true, this, {
        jsonLd: null,
        location: location,
        uri: manifestUri,
        request: null,
      });

      this.initFromInfoJson(manifestUri);
    } else {
      jQuery.extend(true, this, {
        jsonLd: null,
        location: location,
        uri: manifestUri,
        request: null
      });

      this.init(manifestUri);
    }
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
    buildCanvasMap: function() {
      var _this = this;
      this.canvasMap = {};

      if (this.getCanvases()) {
        this.getCanvases().forEach(function(canvas) {
          _this.canvasMap[canvas['@id']] = canvas;
        });
      }
    },
    initFromInfoJson: function(infoJsonUrl) {
      var _this = this;
      this.request = jQuery.ajax({
        url: infoJsonUrl,
        dataType: 'json',
        async: true
      });
      this.request.done(function(jsonLd) {
        _this.jsonLd = _this.generateInfoWrapper(jsonLd);
      });
    },
    initFromManifestContent: function (manifestContent) {
      var _this = this;
      this.request = jQuery.Deferred();
      this.request.done(function(jsonLd) {
        _this.jsonLd = jsonLd;
      });
      _this.request.resolve(manifestContent); // resolve immediately
    },
    getThumbnailForCanvas : function(canvas, width) {
      var version = "1.1",
      compliance = -1,
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
            service = canvas.thumbnail.service;
            if(service.hasOwnProperty('profile')) {
               compliance = $.Iiif.getComplianceLevelFromProfile(service.profile);
            }
            if(compliance === 0){
                // don't change existing behaviour unless compliance is explicitly 0
                thumbnailUrl = canvas.thumbnail['@id'];
            } else {
                // Get the IIIF Image API via the @context
                if (service.hasOwnProperty('@context')) {
                    version = $.Iiif.getVersionFromContext(service['@context']);
                }
                thumbnailUrl = $.Iiif.makeUriWithWidth(service['@id'], width, version);
            }
        } else {
          thumbnailUrl = canvas.thumbnail['@id'];
        }
      } else {
        // No thumbnail, use main image
        var resource = canvas.images[0].resource;
        service = resource['default'] ? resource['default'].service : resource.service;
        if (service.hasOwnProperty('@context')) {
          version = $.Iiif.getVersionFromContext(service['@context']);
        }
        thumbnailUrl = $.Iiif.makeUriWithWidth(service['@id'], width, version);
      }
      return thumbnailUrl;
    },
    getVersion: function() {
      var versionMap = {
        'http://www.shared-canvas.org/ns/context.json': '1', // is this valid?
        'http://iiif.io/api/presentation/1/context.json': '1',
        'http://iiif.io/api/presentation/2/context.json': '2',
        'http://iiif.io/api/presentation/2.1/context.json': '2.1'
      };
      return versionMap[this.jsonLd['@context']];
    },
    getCanvases : function() {
      var _this = this;
      return _this.jsonLd.sequences && _this.jsonLd.sequences[0].canvases;
    },
    getAnnotationsListUrls: function(canvasId) {
      var _this = this;
      var canvas = jQuery.grep(_this.getCanvases(), function(canvas, index) {
        return canvas['@id'] === canvasId;
      })[0],
      annotationsListUrls = [];

      if (canvas && canvas.otherContent) {
        for (var i = 0; i < canvas.otherContent.length; i++) {
          annotationsListUrls.push(canvas.otherContent[i]['@id']);
        }
      }
      return annotationsListUrls;
    },
    getStructures: function() {
      var _this = this;
      return _this.jsonLd.structures;
    },
    generateInfoWrapper: function(infoJson) {
      // Takes in info.json and creates the
      // dummy manifest wrapper around it
      // that will allow it to behave like a
     // manifest with one canvas in it, with
      // one image on it. Some of the metadata
      // of the image will be used as the
      // label, and so on, of the manifest.
      var dummyManifest = {
        '@context': "http://www.shared-canvas.org/ns/context.json",
        '@id': infoJson['@id'],
        '@type': 'sc:Manifest',
        label: infoJson['@id'].split('/')[infoJson['@id'].split('/').length -1],
        sequences: [
          {
            '@id': infoJson['@id'] + '/sequence/1',
            '@type': 'sc:Sequence',
            canvases: [
              {
                '@id': infoJson['@id'] + '/sequence/1/canvas/1',
                '@type': 'sc:Canvas',
                width: infoJson.width,
                height: infoJson.height,
                images: [
                  {
                    '@id': infoJson['@id'] + '/sequence/1/canvas/1/image/1',
                    '@type': 'sc:image',
                    'motivation': 'sc:painting',
                    resource: {
                      '@id': infoJson,
                      '@type': "dctypes:Image",
                      format: "image/jpeg",
                      height: infoJson.height,
                      width: infoJson.width,
                      service: {
                        '@id': infoJson['@id'],
                        '@context': infoJson['@context'],
                        'profile': infoJson.profile
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      };

      return dummyManifest;
    },
    getSearchWithinService: function(){
      var _this = this;
      var serviceProperty = _this.jsonLd.service;
      var service = [];
      if (serviceProperty === undefined){
        service = null;
      }
      else if (serviceProperty.constructor === Array){
        for (var i = 0; i < serviceProperty.length; i++){
          //TODO: should we be filtering search by context
          if (serviceProperty[i]["@context"] === "http://iiif.io/api/search/0/context.json" ||
            serviceProperty[i]["@context"] === "http://iiif.io/api/search/1/context.json") {
            //returns the first service object with the correct context
            service.push(serviceProperty[i]);
          }
        }
      }
      else if (_this.jsonLd.service["@context"] === "http://iiif.io/api/search/0/context.json" ||
        serviceProperty["@context"] === "http://iiif.io/api/search/1/context.json"){
        service.push(_this.jsonLd.service);
      }
      else {
        //no service object with the right context is found
        service = null;
      }
      return service;
    },

    /**
     * Get the label of the a canvas by ID
     * @param  {[type]} canvasId ID of desired canvas
     * @return {[type]}          string
     */
    getCanvasLabel: function(canvasId) {
      console.assert(canvasId && canvasId !== '', "No canvasId was specified.");
      if (this.canvasMap && canvasId.indexOf('#') >= 0) {
        var canvas = this.canvasMap[canvasId.split('#')[0]];
        return canvas ? canvas.label : undefined;
      }
    },
    getViewingDirection : function() {
      var _this = this;
      return _this.jsonLd.viewingDirection || _this.jsonLd.sequences[0].viewingDirection;

    }
  };

}(Mirador));
