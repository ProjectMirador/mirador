import { createSelector } from 'reselect';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { miradorSlice } from './utils';
import { getConfig } from './config';
import { selectInfoResponse, getCanvas } from './canvases';

/** */
export const getAccessTokens = state => miradorSlice(state).accessTokens || {};

/** */
export const getAuth = state => miradorSlice(state).auth || {};

export const selectCanvasAuthService = createSelector(
  [
    selectInfoResponse,
    getCanvas,
    getConfig,
    getAuth,
  ],
  (infoResponse, canvas, { auth: { serviceProfiles = [] } }, auth) => {
    let iiifResource;
    iiifResource = infoResponse && infoResponse.json && { ...infoResponse.json, options: {} };

    if (!iiifResource && canvas) {
      const miradorCanvas = new MiradorCanvas(canvas);
      const [image] = miradorCanvas.iiifImageResources;

      iiifResource = image && image.getServices()[0];
    }

    if (!iiifResource) return undefined;

    const orderedAuthServiceProfiles = serviceProfiles.map(p => p.profile);

    let lastAttemptedService;

    for (const profile of orderedAuthServiceProfiles) {
      const services = getServices(iiifResource, profile);
      for (const service of services) {
        if (!auth[service.id]) return service;

        lastAttemptedService = service;

        if (auth[service.id].isFetching || auth[service.id].ok) return service;
      }
    }

    return lastAttemptedService;
  },
);

/** */
export function selectAuthStatus({ auth }, service) {
  if (!service) return null;
  if (!auth[service.id]) return null;
  if (auth[service.id].isFetching) return 'fetching';
  if (auth[service.id].ok) return 'ok';
  return 'failed';
}

/** Get all the services that match a profile */
function getServices(resource, profile) {
  const services = Utils.getServices(resource);

  return services.filter(service => service.getProfile() === profile);
}

/** check if the current auth service is "interactive" */
export const isInteractiveAuth = createSelector(
  [
    selectCanvasAuthService,
    getConfig,
  ],
  (service, { auth: { serviceProfiles = [] } }) => {
    const profile = service && service.getProfile();

    return serviceProfiles.some(
      config => config.profile === profile && !(config.external || config.kiosk),
    );
  },
);
