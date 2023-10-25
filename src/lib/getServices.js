import { Utils } from 'manifesto.js';
import { filterByTypes } from './typeFilters';

/**
 */
export function anyAuthServices(resource) {
  return resource
  && Utils.getServices(resource).filter(s => (s.getProfile()
    && s.getProfile().match(/http:\/\/iiif.io\/api\/auth\//))
      || (s.getProperty('type')
        && s.getProperty('type').match(/^Auth.*2$/)));
}

/**
 */
export function anyProbeServices(resource) {
  return resource
  && Utils.getServices(resource).filter(s => (s.getProfile() === 'http://iiif.io/api/auth/1/probe')
    || (s.getProperty('type') === 'AuthProbeService2'));
}

/**
 */
export function getProbeService(resource) {
  return resource
  && anyProbeServices(resource)[0];
}

/**
 */
export function getTokenService(resource) {
  return resource
  && (
    Utils.getService(resource, 'http://iiif.io/api/auth/1/token')
    || Utils.getService(resource, 'http://iiif.io/api/auth/0/token')
    || filterByTypes(Utils.getServices(resource), 'AuthAccessTokenService2')[0]
  );
}

/**
 */
export function getLogoutService(resource) {
  return resource
  && (
    Utils.getService(resource, 'http://iiif.io/api/auth/1/logout')
    || Utils.getService(resource, 'http://iiif.io/api/auth/0/logout')
    || filterByTypes(Utils.getServices(resource), 'AuthLogoutService2')[0]
  );
}
