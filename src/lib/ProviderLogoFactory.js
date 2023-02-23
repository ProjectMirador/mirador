import { ThumbnailUtils } from './ThumbnailUtils';
import { ImageFactory } from './ImageFactory';

/** */
function iiifProviderLogoService(resource) {
  const service = resource
    && resource.service.find(s => (
      ThumbnailUtils.iiifv3ImageServiceType(s)
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
function getLogoSourceContent(resource) {
  if (resource.type === 'Agent') {
    const { logo } = resource;
    if (logo && logo[0]) { return this.getSourceContentResource(logo[0]); }
    return undefined;
  }

  if (resource.type === 'Image') {
    return resource;
  }

  return undefined;
}

// Adapted from Manifesto's IIIF v2 getLogo method:
// https://github.com/IIIF-Commons/manifesto/blob/6e355e34c38b64b9cf9c366d6ff60006db341968/src/IIIFResource.ts#LL93C3-L98C35
/** */
function getLogo(logo) {
  if (!logo) return null;
  if (typeof logo === 'string') return logo;
  return logo && logo.url;
}

/** */
class ProviderLogoFactory extends ImageFactory {
  /** */
  constructor(resource, iiifOpts = {}) {
    super(resource, iiifProviderLogoService, getLogoSourceContent, iiifOpts);
  }
}
/** */
function getBestLogo(agent, iiifOpts) {
  const logoData = new ProviderLogoFactory(agent, iiifOpts).get();
  return getLogo(logoData);
}

export { ProviderLogoFactory };
export default getBestLogo;
