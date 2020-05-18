import { Utils } from 'manifesto.js';
import MiradorManifest from './MiradorManifest';
import MiradorCanvas from './MiradorCanvas';

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

  return (Array.isArray(type) ? type : [type]).some(v => v.startsWith('ImageService'));
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
    let maxHeight;
    let maxWidth;
    const minDimension = 120;
    const { maxHeight: requestedMaxHeight, maxWidth: requestedMaxWidth } = this.iiifOpts;

    if (requestedMaxHeight) maxHeight = Math.max(requestedMaxHeight, minDimension);
    if (requestedMaxWidth) maxWidth = Math.max(requestedMaxWidth, minDimension);

    const service = iiifImageService(resource);

    if (!service) return undefined;

    // just bail to a static image, even though sizes might provide something better
    if (isLevel0ImageProfile(service)) {
      return ThumbnailFactory.staticImageUrl(resource);
    }

    const aspectRatio = resource.getWidth()
      && resource.getHeight()
      && (resource.getWidth() / resource.getHeight());

    if (maxHeight && maxWidth) {
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
    } else if (maxHeight && !maxWidth) {
      size = `,${maxHeight}`;
      height = maxHeight;
      if (aspectRatio) width = Math.round(maxHeight * aspectRatio);
    } else if (!maxHeight && maxWidth) {
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
  getCanvasThumbnail(canvas) {
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
    const canvas = (
      miradorManifest.startCanvas
      || (manifest.getSequences()[0] && manifest.getSequences()[0].getCanvases()[0])
    );

    return (canvas && this.getCanvasThumbnail(canvas))
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

    if (this.resource.isCanvas()) return this.getCanvasThumbnail(this.resource);
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
