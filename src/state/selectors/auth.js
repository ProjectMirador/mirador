import { createSelector } from 'reselect';
import { Utils } from 'manifesto.js';
import flatten from 'lodash/flatten';
import { miradorSlice, EMPTY_ARRAY, EMPTY_OBJECT } from './utils';
import { getConfig } from './config';
import { getVisibleCanvases, selectInfoResponses } from './canvases';
import { getMiradorCanvasWrapper } from './wrappers';

/**
 * Returns the authentification profile from the configuration
 * @param {object} state
 * @returns {Array}
 */
export const getAuthProfiles = createSelector(
  [
    getConfig,
  ],
  ({ auth: { serviceProfiles = [] } = {} }) => serviceProfiles,
);

/**
 * Returns access tokens from the state
 * @param {object} state
 * @returns {object}
 */
export const getAccessTokens = state => miradorSlice(state).accessTokens || EMPTY_OBJECT;

/**
 * Return the authentification data from the state
 * @param {object} state
 * @returns {object}
 */
export const getAuth = state => miradorSlice(state).auth || EMPTY_OBJECT;

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
  (canvases, infoResponses = {}, serviceProfiles, auth, getMiradorCanvas, iiifResources) => {
    let currentAuthResources = iiifResources;

    if (!currentAuthResources && canvases) {
      currentAuthResources = flatten(canvases.map(c => {
        const miradorCanvas = getMiradorCanvas(c);
        const images = miradorCanvas.iiifImageResources;

        return images.map(i => {
          const iiifImageService = i.getServices()[0];

          const infoResponse = infoResponses[iiifImageService.id];
          if (infoResponse && infoResponse.json) {
            return { ...infoResponse.json, options: {} };
          }

          return iiifImageService;
        });
      }));
    }

    if (!currentAuthResources) return EMPTY_ARRAY;
    if (currentAuthResources.length === 0) return EMPTY_ARRAY;

    const currentAuthServices = currentAuthResources.map(resource => {
      let lastAttemptedService;
      const services = Utils.getServices(resource);

      for (const authProfile of serviceProfiles) {
        const profiledAuthServices = services.filter(
          p => authProfile.profile === p.getProfile(),
        );

        for (const service of profiledAuthServices) {
          lastAttemptedService = service;

          if (!auth[service.id] || auth[service.id].isFetching || auth[service.id].ok) {
            return service;
          }
        }
      }

      return lastAttemptedService;
    });

    return Object.values(currentAuthServices.reduce((h, service) => {
      if (service && !h[service.id]) {
        h[service.id] = service; // eslint-disable-line no-param-reassign
      }

      return h;
    }, {}));
  },
);
