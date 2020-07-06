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
  const profile = service.getProfile();

  // work around a bug in manifesto with normalized urls that strip # values.
  if (profile.endsWith('#level1') || profile.endsWith('#level2')) return false;

  // support IIIF v3-style profiles
  if (profile === 'level0') return true;

  return Utils.isLevel0ImageProfile(profile);
}

/** */
function isLevel2ImageProfile(service) {
  const profile = service.getProfile();

  // work around a bug in manifesto with normalized urls that strip # values.
  if (profile.endsWith('#level0') || profile.endsWith('#level1')) return false;

  // support IIIF v3-style profiles
  if (profile === 'level2') return true;

  return Utils.isLevel2ImageProfile(profile);
}

/** */
function iiifv3ImageServiceType(service) {
  const type = service.getProperty('type') || [];

  return asArray(type).some(v => v.startsWith('ImageService'));
}

/** */
function iiifImageService(resource) {
  const service = resource
    && resource.getServices().find(s => (
      iiifv3ImageServiceType(s) || Utils.isImageProfile(s.getProfile())
    ));

  if (!(service)) return undefined;

  return service;
}

/** */
class ThumbnailFactory {
  /** */
  constructor(resource, iiifOpts = {}) {
    this.resource = resource;
    this.iiifOpts = iiifOpts;
  }

  /** */
  static staticImageUrl(resource) {
    return { height: resource.getProperty('height'), url: resource.id, width: resource.getProperty('width') };
  }

  /**
   * Creates a canonical image request for a thumb
   * @param {Number} height
   */
  iiifThumbnailUrl(resource) {
    let size;
    let width;
    let height;
    const minDimension = 120;
    let maxHeight = minDimension;
    let maxWidth = minDimension;
    const { maxHeight: requestedMaxHeight, maxWidth: requestedMaxWidth } = this.iiifOpts;

    if (requestedMaxHeight) maxHeight = Math.max(requestedMaxHeight, minDimension);
    if (requestedMaxWidth) maxWidth = Math.max(requestedMaxWidth, minDimension);

    const service = iiifImageService(resource);

    if (!service) return undefined;

    const aspectRatio = resource.getWidth()
      && resource.getHeight()
      && (resource.getWidth() / resource.getHeight());

    // just bail to a static image, even though sizes might provide something better
    if (isLevel0ImageProfile(service)) {
      const sizes = asArray(service.getProperty('sizes'));
      const serviceHeight = service.getProperty('height');
      const serviceWidth = service.getProperty('width');

      const target = (requestedMaxWidth && requestedMaxHeight)
        ? requestedMaxWidth * requestedMaxHeight
        : maxHeight * maxWidth;

      let closestSize = {
        default: true,
        height: serviceHeight || Number.MAX_SAFE_INTEGER,
        width: serviceWidth || Number.MAX_SAFE_INTEGER,
      };

      /** Compare the total image area to our target */
      const imageFitness = (test) => test.width * test.height - target;

      /** Look for the size that's just bigger than we prefer... */
      closestSize = sizes.reduce(
        (best, test) => {
          const score = imageFitness(test);

          if (score < 0) return best;

          return Math.abs(score) < Math.abs(imageFitness(best))
            ? test
            : best;
        }, closestSize,
      );

      /** .... but not "too" big; we'd rather scale up an image than download too much */
      if (closestSize.width * closestSize.height > target * 6) {
        closestSize = sizes.reduce(
          (best, test) => (
            Math.abs(imageFitness(test)) < Math.abs(imageFitness(best))
              ? test
              : best
          ), closestSize,
        );
      }

      /** Bail if the best available size is the full size.. maybe we'll get lucky with the @id */
      if (closestSize.default && !serviceHeight && !serviceWidth) {
        return ThumbnailFactory.staticImageUrl(resource);
      }

      width = closestSize.width;
      height = closestSize.height;
      size = `${width},${height}`;
    } else if (requestedMaxHeight && requestedMaxWidth) {
      // IIIF level 2, no problem.
      if (isLevel2ImageProfile(service)) {
        size = `!${maxWidth},${maxHeight}`;
        width = maxWidth;
        height = maxHeight;

        if (aspectRatio && aspectRatio > 1) height = Math.round(maxWidth / aspectRatio);
        if (aspectRatio && aspectRatio < 1) width = Math.round(maxHeight * aspectRatio);
      } else if ((maxWidth / maxHeight) < aspectRatio) {
        size = `${maxWidth},`;
        width = maxWidth;
        if (aspectRatio) height = Math.round(maxWidth / aspectRatio);
      } else {
        size = `,${maxHeight}`;
        height = maxHeight;
        if (aspectRatio) width = Math.round(maxHeight * aspectRatio);
      }
    } else if (requestedMaxHeight && !requestedMaxWidth) {
      size = `,${maxHeight}`;
      height = maxHeight;
      if (aspectRatio) width = Math.round(maxHeight * aspectRatio);
    } else if (!requestedMaxHeight && requestedMaxWidth) {
      size = `${maxWidth},`;
      width = maxWidth;
      if (aspectRatio) height = Math.round(maxWidth / aspectRatio);
    } else {
      size = `,${minDimension}`;
      height = minDimension;
      if (aspectRatio) width = Math.round(height * aspectRatio);
    }

    const region = 'full';
    const quality = Utils.getImageQuality(service.getProfile());
    const id = service.id.replace(/\/+$/, '');
    const format = 'jpg';
    return {
      height,
      url: [id, region, size, 0, `${quality}.${format}`].join('/'),
      width,
    };
  }

  /** */
  getThumbnail(resource, { requireIiif, quirksMode }) {
    if (!resource) return undefined;
    const thumb = resource.getThumbnail();
    if (thumb && iiifImageService(thumb)) return this.iiifThumbnailUrl(thumb);

    if (requireIiif) return undefined;
    if (thumb && typeof thumb.__jsonld !== 'string') return ThumbnailFactory.staticImageUrl(thumb);

    if (!quirksMode) return undefined;

    return (thumb && typeof thumb.__jsonld === 'string') ? { url: thumb.__jsonld } : undefined;
  }

  /** */
  getResourceThumbnail(resource) {
    const thumb = this.getThumbnail(resource, { requireIiif: true });

    if (thumb) return thumb;

    if (iiifImageService(resource)) return this.iiifThumbnailUrl(resource);
    if (['image', 'dctypes:Image'].includes(resource.getProperty('type'))) return ThumbnailFactory.staticImageUrl(resource);

    return this.getThumbnail(resource, { quirksMode: true, requireIiif: false });
  }

  /** */
  getIIIFThumbnail(canvas) {
    const thumb = this.getThumbnail(canvas, { requireIiif: true });
    if (thumb) return thumb;

    const miradorCanvas = new MiradorCanvas(canvas);

    const preferredCanvasResource = miradorCanvas.iiifImageResources[0]
     || canvas.imageResource;

    return (preferredCanvasResource && this.getResourceThumbnail(preferredCanvasResource))
      || this.getThumbnail(canvas, { quirksMode: true, requireIiif: false });
  }

  /** */
  getManifestThumbnail(manifest) {
    const thumb = this.getThumbnail(manifest, { requireIiif: true });
    if (thumb) return thumb;

    const miradorManifest = new MiradorManifest(manifest);
    const canvas = miradorManifest.startCanvas || miradorManifest.canvasAt(0);

    return (canvas && this.getIIIFThumbnail(canvas))
      || this.getThumbnail(manifest, { quirksMode: true, requireIiif: false });
  }

  /** */
  getCollectionThumbnail(collection) {
    const thumb = this.getThumbnail(collection, { requireIiif: true });
    if (thumb) return thumb;

    const firstManifest = this.resource.getManifests()[0];

    return (firstManifest && this.getManifestThumbnail(firstManifest))
      || this.getThumbnail(collection, { quirksMode: true, requireIiif: false });
  }

  /** */
  get() {
    if (!this.resource) return undefined;

    if (this.resource.isCanvas()) return this.getIIIFThumbnail(this.resource);
    if (this.resource.isManifest()) return this.getManifestThumbnail(this.resource);
    if (this.resource.isCollection()) return this.getCollectionThumbnail(this.resource);
    return this.getResourceThumbnail(this.resource, { requireIiif: true });
  }
}

/** */
function getBestThumbnail(resource, iiifOpts) {
  return new ThumbnailFactory(resource, iiifOpts).get();
}

export default getBestThumbnail;
