import { Utils } from 'manifesto.js';
import { ThumbnailUtils } from './ThumbnailUtils';
import { ImageFactory } from './ImageFactory';
import MiradorManifest from './MiradorManifest';

/** */
function iiifImageService(resource) {
  const service = resource
    && resource.getServices().find(s => (
      ThumbnailUtils.iiifv3ImageServiceType(s) || Utils.isImageProfile(s.getProfile())
    ));

  if (!(service)) return undefined;

  return service;
}

/**
 * Determines the content resource from which to derive a thumbnail to represent a given resource.
 * This method is recursive.
 * @param {Object} resource A IIIF resource to derive a thumbnail from
 * @return {Object|undefined} The Image Resource to derive a thumbnail from, or undefined
 * if no appropriate resource exists
 */
function getSourceContentResource(resource) {
  const thumbnail = resource.getThumbnail();

  // Any resource type may have a thumbnail
  if (thumbnail) {
    if (typeof thumbnail.__jsonld === 'string') return thumbnail.__jsonld;

    // Prefer an image's ImageService over its image's thumbnail
    // Note that Collection, Manifest, and Canvas don't have `getType()`
    if (!resource.isCollection() && !resource.isManifest() && !resource.isCanvas()) {
      if (resource.getType() === 'image' && this.iiifImageService(resource) && !this.iiifImageService(thumbnail)) {
        return resource;
      }
    }

    return thumbnail;
  }

  if (resource.isCollection()) {
    const firstManifest = resource.getManifests()[0];
    if (firstManifest) return this.getSourceContentResource(firstManifest);

    return undefined;
  }

  if (resource.isManifest()) {
    const miradorManifest = new MiradorManifest(resource);
    const canvas = miradorManifest.startCanvas || miradorManifest.canvasAt(0);
    if (canvas) return this.getSourceContentResource(canvas);

    return undefined;
  }

  if (resource.isCanvas()) {
    const image = ImageFactory.getPreferredImage(resource);
    if (image) return this.getSourceContentResource(image);

    return undefined;
  }

  if (resource.getType() === 'image' || resource.type === 'Image') {
    return resource;
  }

  return undefined;
}

/** */
class ThumbnailFactory extends ImageFactory {
/** */
  constructor(resource, iiifOpts = {}) {
    super(resource, iiifImageService, getSourceContentResource, iiifOpts);
  }
}

/** */
function getBestThumbnail(resource, iiifOpts) {
  return new ThumbnailFactory(resource, iiifOpts).get();
}

export { ThumbnailFactory };
export default getBestThumbnail;
