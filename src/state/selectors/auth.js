import { createSelector } from 'reselect';
import { Utils } from 'manifesto.js';
import { miradorSlice, EMPTY_ARRAY, EMPTY_OBJECT } from './utils';
import { getConfig } from './config';
import { getVisibleCanvases, selectInfoResponses } from './canvases';
import { getMiradorCanvasWrapper } from './wrappers';
import { getIiifResourceImageService } from '../../lib/iiif';
import { getAuth2AccessServices, getAuth2RelatedService } from '../../lib/auth2';

/**
 * Returns the authentification profile from the configuration
 * @param {object} state
 * @returns {Array}
 */
export const getAuthProfiles = createSelector([getConfig], ({ auth: { serviceProfiles = [] } = {} }) => serviceProfiles);

/**
 * Returns access tokens from the state
 * @param {object} state
 * @returns {object}
 */
export const getAccessTokens = (state) => miradorSlice(state).accessTokens || EMPTY_OBJECT;

/**
 * Return the authentification data from the state
 * @param {object} state
 * @returns {object}
 */
export const getAuth = (state) => miradorSlice(state).auth || EMPTY_OBJECT;

/**
 * Returns current authentification services based on state and windowId
 * @param {object} state
 * @param {string} windowId
 * @returns {Array}
 */
export const selectCurrentAuthServices = createSelector(
  [
    getVisibleCanvases,
    selectInfoResponses,
    getAuthProfiles,
    getAuth,
    getMiradorCanvasWrapper,
    (state, { iiifResources }) => iiifResources,
  ],
  // eslint-disable-next-line max-params
  (canvases, infoResponses = {}, serviceProfiles, auth, getMiradorCanvas, iiifResources) => {
    let currentAuthResources = iiifResources;

    if (!currentAuthResources && canvases) {
      currentAuthResources = canvases.flatMap((c) => {
        const miradorCanvas = getMiradorCanvas(c);
        const images = miradorCanvas.iiifImageResources;

        return images.map((i) => {
          const iiifImageService = getIiifResourceImageService(i);

          const infoResponse = infoResponses[iiifImageService.id];
          if (infoResponse && infoResponse.json) {
            return {
              ...infoResponse.json,
              auth2Degraded: infoResponse.degraded,
              auth2TokenServiceId: infoResponse.tokenServiceId,
              auth2ProbeResult: infoResponse.probeResult,
              options: {},
            };
          }

          return iiifImageService;
        });
      });
    }

    if (!currentAuthResources) return EMPTY_ARRAY;
    if (currentAuthResources.length === 0) return EMPTY_ARRAY;

    const currentAuthServices = currentAuthResources.map((resource) => {
      let lastAttemptedService;
      const services = Utils.getServices(resource);
      if (resource.auth2Degraded || resource.auth2TokenServiceId) {
        services.push(
          ...getAuth2AccessServices(resource)
            .filter(
              ({ service }) =>
                resource.auth2Degraded ||
                getAuth2RelatedService(service, 'AuthAccessTokenService2')?.id === resource.auth2TokenServiceId,
            )
            .map(({ id, probeId, service }) => ({
              auth2: true,
              auth2ProbeId: probeId,
              auth2ProbeResult: resource.auth2ProbeResult,
              auth2Service: service,
              getProfile: () => `http://iiif.io/api/auth/2/${service.getProfile()}`,
              id,
            })),
        );
      }

      for (const authProfile of serviceProfiles) {
        const profiledAuthServices = services.filter((p) => authProfile.profile === p.getProfile());

        for (const service of profiledAuthServices) {
          lastAttemptedService = service;

          if (!auth[service.id] || auth[service.id].isFetching || auth[service.id].ok) {
            return service;
          }
        }
      }

      return lastAttemptedService;
    });

    return Object.values(
      currentAuthServices.reduce((h, service) => {
        if (service && !h[service.id]) {
          // eslint-disable-next-line no-param-reassign
          h[service.id] = service;
        }

        return h;
      }, {}),
    );
  },
);
