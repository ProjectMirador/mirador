function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { Utils } from 'manifesto.js';
import MiradorManifest from './MiradorManifest';
import MiradorCanvas from './MiradorCanvas';
/** */

function asArray(value) {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}
/** */


function isLevel0ImageProfile(service) {
  var profile = service.getProfile(); // work around a bug in manifesto with normalized urls that strip # values.

  if (profile.endsWith('#level1') || profile.endsWith('#level2')) return false; // support IIIF v3-style profiles

  if (profile === 'level0') return true;
  return Utils.isLevel0ImageProfile(profile);
}
/** */


function isLevel2ImageProfile(service) {
  var profile = service.getProfile(); // work around a bug in manifesto with normalized urls that strip # values.

  if (profile.endsWith('#level0') || profile.endsWith('#level1')) return false; // support IIIF v3-style profiles

  if (profile === 'level2') return true;
  return Utils.isLevel2ImageProfile(profile);
}
/** */


function iiifv3ImageServiceType(service) {
  var type = service.getProperty('type') || [];
  return asArray(type).some(function (v) {
    return v.startsWith('ImageService');
  });
}
/** */


function iiifImageService(resource) {
  var service = resource && resource.getServices().find(function (s) {
    return iiifv3ImageServiceType(s) || Utils.isImageProfile(s.getProfile());
  });
  if (!service) return undefined;
  return service;
}
/** */


var ThumbnailFactory = /*#__PURE__*/function () {
  /** */
  function ThumbnailFactory(resource) {
    var iiifOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ThumbnailFactory);

    this.resource = resource;
    this.iiifOpts = iiifOpts;
  }
  /** */


  _createClass(ThumbnailFactory, [{
    key: "iiifThumbnailUrl",
    value:
    /**
     * Creates a canonical image request for a thumb
     * @param {Number} height
     */
    function iiifThumbnailUrl(resource) {
      var size;
      var width;
      var height;
      var minDimension = 120;
      var maxHeight = minDimension;
      var maxWidth = minDimension;
      var _this$iiifOpts = this.iiifOpts,
          requestedMaxHeight = _this$iiifOpts.maxHeight,
          requestedMaxWidth = _this$iiifOpts.maxWidth,
          tileFormat = _this$iiifOpts.tileFormat;
      if (requestedMaxHeight) maxHeight = Math.max(requestedMaxHeight, minDimension);
      if (requestedMaxWidth) maxWidth = Math.max(requestedMaxWidth, minDimension);
      var service = iiifImageService(resource);
      if (!service) return undefined;
      var aspectRatio = resource.getWidth() && resource.getHeight() && resource.getWidth() / resource.getHeight(); // just bail to a static image, even though sizes might provide something better

      if (isLevel0ImageProfile(service)) {
        var sizes = asArray(service.getProperty('sizes'));
        var serviceHeight = service.getProperty('height');
        var serviceWidth = service.getProperty('width');
        var target = requestedMaxWidth && requestedMaxHeight ? requestedMaxWidth * requestedMaxHeight : maxHeight * maxWidth;
        var closestSize = {
          "default": true,
          height: serviceHeight || Number.MAX_SAFE_INTEGER,
          width: serviceWidth || Number.MAX_SAFE_INTEGER
        };
        /** Compare the total image area to our target */

        var imageFitness = function imageFitness(test) {
          return test.width * test.height - target;
        };
        /** Look for the size that's just bigger than we prefer... */


        closestSize = sizes.reduce(function (best, test) {
          var score = imageFitness(test);
          if (score < 0) return best;
          return Math.abs(score) < Math.abs(imageFitness(best)) ? test : best;
        }, closestSize);
        /** .... but not "too" big; we'd rather scale up an image than download too much */

        if (closestSize.width * closestSize.height > target * 6) {
          closestSize = sizes.reduce(function (best, test) {
            return Math.abs(imageFitness(test)) < Math.abs(imageFitness(best)) ? test : best;
          }, closestSize);
        }
        /** Bail if the best available size is the full size.. maybe we'll get lucky with the @id */


        if (closestSize["default"] && !serviceHeight && !serviceWidth) {
          return ThumbnailFactory.staticImageUrl(resource);
        }

        width = closestSize.width;
        height = closestSize.height;
        size = "".concat(width, ",").concat(height);
      } else if (requestedMaxHeight && requestedMaxWidth) {
        // IIIF level 2, no problem.
        if (isLevel2ImageProfile(service)) {
          size = "!".concat(maxWidth, ",").concat(maxHeight);
          width = maxWidth;
          height = maxHeight;
          if (aspectRatio && aspectRatio > 1) height = Math.round(maxWidth / aspectRatio);
          if (aspectRatio && aspectRatio < 1) width = Math.round(maxHeight * aspectRatio);
        } else if (maxWidth / maxHeight < aspectRatio) {
          size = "".concat(maxWidth, ",");
          width = maxWidth;
          if (aspectRatio) height = Math.round(maxWidth / aspectRatio);
        } else {
          size = ",".concat(maxHeight);
          height = maxHeight;
          if (aspectRatio) width = Math.round(maxHeight * aspectRatio);
        }
      } else if (requestedMaxHeight && !requestedMaxWidth) {
        size = ",".concat(maxHeight);
        height = maxHeight;
        if (aspectRatio) width = Math.round(maxHeight * aspectRatio);
      } else if (!requestedMaxHeight && requestedMaxWidth) {
        size = "".concat(maxWidth, ",");
        width = maxWidth;
        if (aspectRatio) height = Math.round(maxWidth / aspectRatio);
      } else {
        size = ",".concat(minDimension);
        height = minDimension;
        if (aspectRatio) width = Math.round(height * aspectRatio);
      }

      var region = 'full';
      var quality = Utils.getImageQuality(service.getProfile());
      var id = service.id.replace(/\/+$/, '');
      var format = tileFormat;
      return {
        height: height,
        url: [id, region, size, 0, "".concat(quality, ".").concat(format)].join('/'),
        width: width
      };
    }
    /** */

  }, {
    key: "getThumbnail",
    value: function getThumbnail(resource, _ref) {
      var requireIiif = _ref.requireIiif,
          quirksMode = _ref.quirksMode;
      if (!resource) return undefined;
      var thumb = resource.getThumbnail();
      if (thumb && iiifImageService(thumb)) return this.iiifThumbnailUrl(thumb);
      if (requireIiif) return undefined;
      if (thumb && typeof thumb.__jsonld !== 'string') return ThumbnailFactory.staticImageUrl(thumb);
      if (!quirksMode) return undefined;
      return thumb && typeof thumb.__jsonld === 'string' ? {
        url: thumb.__jsonld
      } : undefined;
    }
    /** */

  }, {
    key: "getResourceThumbnail",
    value: function getResourceThumbnail(resource) {
      var thumb = this.getThumbnail(resource, {
        requireIiif: true
      });
      if (thumb) return thumb;
      if (iiifImageService(resource)) return this.iiifThumbnailUrl(resource);
      if (['image', 'dctypes:Image'].includes(resource.getProperty('type'))) return ThumbnailFactory.staticImageUrl(resource);
      return this.getThumbnail(resource, {
        quirksMode: true,
        requireIiif: false
      });
    }
    /** */

  }, {
    key: "getIIIFThumbnail",
    value: function getIIIFThumbnail(canvas) {
      var thumb = this.getThumbnail(canvas, {
        requireIiif: true
      });
      if (thumb) return thumb;
      var miradorCanvas = new MiradorCanvas(canvas);
      var preferredCanvasResource = miradorCanvas.iiifImageResources[0] || canvas.imageResource;
      return preferredCanvasResource && this.getResourceThumbnail(preferredCanvasResource) || this.getThumbnail(canvas, {
        quirksMode: true,
        requireIiif: false
      });
    }
    /** */

  }, {
    key: "getManifestThumbnail",
    value: function getManifestThumbnail(manifest) {
      var thumb = this.getThumbnail(manifest, {
        requireIiif: true
      });
      if (thumb) return thumb;
      var miradorManifest = new MiradorManifest(manifest);
      var canvas = miradorManifest.startCanvas || miradorManifest.canvasAt(0);
      return canvas && this.getIIIFThumbnail(canvas) || this.getThumbnail(manifest, {
        quirksMode: true,
        requireIiif: false
      });
    }
    /** */

  }, {
    key: "getCollectionThumbnail",
    value: function getCollectionThumbnail(collection) {
      var thumb = this.getThumbnail(collection, {
        requireIiif: true
      });
      if (thumb) return thumb;
      var firstManifest = this.resource.getManifests()[0];
      return firstManifest && this.getManifestThumbnail(firstManifest) || this.getThumbnail(collection, {
        quirksMode: true,
        requireIiif: false
      });
    }
    /** */

  }, {
    key: "get",
    value: function get() {
      if (!this.resource) return undefined;
      if (this.resource.isCanvas()) return this.getIIIFThumbnail(this.resource);
      if (this.resource.isManifest()) return this.getManifestThumbnail(this.resource);
      if (this.resource.isCollection()) return this.getCollectionThumbnail(this.resource);
      return this.getResourceThumbnail(this.resource, {
        requireIiif: true
      });
    }
  }], [{
    key: "staticImageUrl",
    value: function staticImageUrl(resource) {
      return {
        height: resource.getProperty('height'),
        url: resource.id,
        width: resource.getProperty('width')
      };
    }
  }]);

  return ThumbnailFactory;
}();
/** */


function getBestThumbnail(resource, iiifOpts) {
  return new ThumbnailFactory(resource, iiifOpts).get();
}

export default getBestThumbnail;