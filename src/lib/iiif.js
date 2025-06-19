import { Utils } from 'manifesto.js';

/** @returns an IIIF image service for the given resource */
export function getIiifResourceImageService(resource) {
  return resource.getServices().find(service => (
    (service.getProfile && Utils.isImageProfile(service.getProfile() || '')) || Utils.isImageServiceType(service.getIIIFResourceType() || '')));
}
