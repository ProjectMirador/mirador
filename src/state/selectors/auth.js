import { createSelector } from 'reselect';
import flatten from 'lodash/flatten';
import { Utils } from 'manifesto.js';
import { anyProbeServices } from '../../lib/getServices';
import { audioResourcesFrom, iiifImageResourcesFrom, textResourcesFrom, videoResourcesFrom } from '../../lib/typeFilters';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { miradorSlice, EMPTY_OBJECT } from './utils';
import { getConfig } from './config';
import { getVisibleCanvases, selectInfoResponses, selectProbeResponses } from './canvases';
import { getMiradorCanvasWrapper } from './wrappers';

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
    selectProbeResponses,
    getAuthProfiles,
    getAuth,
    getMiradorCanvasWrapper,
    (state, { iiifResources }) => iiifResources,
  ],
  (canvases, infoResponses = {}, probeResponses = {}, serviceProfiles, auth, getMiradorCanvas, iiifResources) => {
    let currentAuthResources = iiifResources;

    // Debug: log canvases and iiifResources
    console.log('[selectCurrentAuthServices] canvases:', canvases);
    console.log('[selectCurrentAuthServices] iiifResources:', iiifResources);

    if (!currentAuthResources && canvases) {
      currentAuthResources = flatten(
        canvases.map((c) => {
          console.log('in the flatten');
          const miradorCanvas = new MiradorCanvas(c);
          const canvasResources = miradorCanvas.imageResources;
          // Debug: log canvasResources
          // console.log('[selectCurrentAuthServices] canvasResources:', canvasResources);
          const authResources = iiifImageResourcesFrom(canvasResources).map((i) => {
            const iiifImageService = i.getServices()[0];
            // Debug: log iiifImageService
            // console.log('[selectCurrentAuthServices] iiifImageService:', iiifImageService);
            const infoResponse = infoResponses[iiifImageService?.id];
            if (infoResponse && infoResponse.json) {
              // Debug: log infoResponse
              // console.log('[selectCurrentAuthServices] infoResponse:', infoResponse);
              return { ...infoResponse.json, options: {} };
            }
            return iiifImageService;
          });
          return authResources
            .concat(videoResourcesFrom(canvasResources))
            .concat(audioResourcesFrom(canvasResources))
            .concat(textResourcesFrom(canvasResources));
        }),
      );
    }

    // Debug: log currentAuthResources
    console.log('[selectCurrentAuthServices] currentAuthResources:', currentAuthResources);

    if (!currentAuthResources) return [];
    if (currentAuthResources.length === 0) return [];

    const currentAuthServices = currentAuthResources.map((resource) => {
      let lastAttemptedService;
      const resourceServices = Utils.getServices(resource);
      const probeServices = anyProbeServices(resource);
      const probeServiceServices = flatten(probeServices.map((p) => Utils.getServices(p)));

      // Check for probe responses for this resource
      const resourceProbeResponse = probeResponses[resource.id];

      for (const authProfile of serviceProfiles) {
        const profiledAuthServices = resourceServices
          .concat(probeServiceServices)
          .filter((p) => authProfile.profile === p.getProfile());

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
          h[service.id] = service; // eslint-disable-line no-param-reassign
        }
        return h;
      }, {}),
    );
  },
);
