import { createSelector } from 'reselect';
import CanvasWorld from '../../lib/CanvasWorld';

import { getVisibleCanvases, selectProbeResponses, selectInfoResponses } from './canvases';
import { getLayersForVisibleCanvases } from './layers';
import { getSequenceViewingDirection } from './sequences';
import { getMiradorCanvasWrapper } from './wrappers';

/**
 * Apply probe replacements to image resources (Auth1 and Auth2 pattern)
 */
const probeReplacements = (resources, probeResponses, infoResponses) => {
  if (!probeResponses && !infoResponses) return resources;

  console.log('[probeReplacements] Processing', resources.length, 'resources');
  console.log('[probeReplacements] Available probe responses:', Object.keys(probeResponses || {}));
  console.log('[probeReplacements] Available info responses:', Object.keys(infoResponses || {}));

  return resources.map((r) => {
    console.log('[probeReplacements] Processing resource:', r.id);

    const resourceId = r.id;
    const resourceIdDecoded = decodeURIComponent(resourceId);
    const resourceBaseUrl = resourceIdDecoded.split('/full/')[0];

    console.log('[probeReplacements] Resource base URL:', resourceBaseUrl);

    // FIRST: Check if we have a degraded info response for this resource
    // This is faster than waiting for probe responses
    const infoResponseKey = Object.keys(infoResponses || {}).find((key) => {
      // Normalize both URLs by decoding and removing trailing /info.json
      const normalizedInfoKey = decodeURIComponent(key).replace('/info.json', '');
      const normalizedResourceBase = resourceBaseUrl.replace('/info.json', '');

      console.log('[probeReplacements] Comparing info key:', normalizedInfoKey, 'with resource base:', normalizedResourceBase);

      return (
        normalizedInfoKey === normalizedResourceBase ||
        normalizedInfoKey.includes(normalizedResourceBase.split('/image/iiif/')[1] || '') ||
        normalizedResourceBase.includes(normalizedInfoKey.split('/image/iiif/')[1] || '')
      );
    });

    if (infoResponseKey) {
      const infoResponse = infoResponses[infoResponseKey];
      if (infoResponse && infoResponse.degraded && infoResponse.json) {
        const degradedServiceId = infoResponse.json['@id'] || infoResponse.json.id;
        if (degradedServiceId && degradedServiceId !== resourceBaseUrl) {
          console.log('[probeReplacements] Using degraded info response service:', degradedServiceId);
          return new Proxy(r, {
            get(target, prop) {
              if (prop === 'id') {
                return degradedServiceId;
              }
              if (prop === 'getId') {
                return () => degradedServiceId;
              }
              if (prop === '__jsonld') {
                return { ...target.__jsonld, id: degradedServiceId };
              }
              return target[prop];
            },
          });
        }
      }
    }

    // Try multiple matching strategies
    let matchingProbeResponse = null;
    let matchedProbeId = null;

    // Strategy 1: Look for probe ID that contains ?id= parameter
    matchedProbeId = Object.keys(probeResponses).find((probeId) => {
      if (probeId.includes('?id=')) {
        // Decode the resource ID from the probe service URL
        const encodedResourceId = probeId.split('?id=')[1];
        const decodedResourceId = decodeURIComponent(encodedResourceId);
        const probeBaseUrl = decodedResourceId.split('/full/')[0]; // Get base service URL
        console.log('[probeReplacements] Strategy 1 - Probe base URL:', probeBaseUrl, 'vs resource:', resourceBaseUrl);
        return probeBaseUrl === resourceBaseUrl;
      }
      return false;
    });

    // Strategy 2: Look for probe ID that contains the resource path
    if (!matchedProbeId) {
      const resourcePath = resourceId.split('/iiif/')[1]; // Get the path after /iiif/
      if (resourcePath) {
        matchedProbeId = Object.keys(probeResponses).find((probeId) => {
          console.log('[probeReplacements] Strategy 2 - Checking if probe:', probeId, 'contains path:', resourcePath);
          return probeId.includes(resourcePath);
        });
      }
    }

    // Strategy 3: Direct match on base service URLs
    if (!matchedProbeId) {
      matchedProbeId = Object.keys(probeResponses).find((probeId) => {
        console.log('[probeReplacements] Strategy 3 - Checking probe:', probeId, 'vs resource base:', resourceBaseUrl);
        return probeId.startsWith(resourceBaseUrl) || resourceBaseUrl.includes(probeId.split('?')[0]);
      });
    }

    if (matchedProbeId) {
      matchingProbeResponse = matchedProbeId;
      console.log('[probeReplacements] Found matching probe response:', matchedProbeId);
    } else {
      console.log('[probeReplacements] No matching probe response found for resource:', resourceId);
    }

    const probeResponse = matchingProbeResponse && probeResponses[matchingProbeResponse];
    if (!probeResponse || probeResponse.isFetching) {
      console.log('[probeReplacements] No probe response or still fetching for:', resourceId);
      return r;
    }

    const probeJson = probeResponse.json;
    console.log('[probeReplacements] Probe response for resource:', r.id);
    console.log('[probeReplacements] Probe JSON:', probeJson);

    let probeContentUrl;
    const probeReplacedProperties = {};

    // Handle Auth2 location (for redirects)
    if (probeJson && probeJson.location && probeJson.location.id) {
      console.log('[probeReplacements] Using location redirect:', probeJson.location.id);
      // Extract base URL from location info.json URL if needed
      probeContentUrl = probeJson.location.id.replace('/info.json', '');
      if (probeJson.location.format) probeReplacedProperties.format = probeJson.location.format;
    }
    // Handle Auth2 substitute (for degraded resources)
    else if (probeJson && probeJson.substitute && probeJson.substitute.id) {
      console.log('[probeReplacements] Using substitute (object):', probeJson.substitute.id);
      // Extract base URL from substitute info.json URL
      probeContentUrl = probeJson.substitute.id.replace('/info.json', '');
      if (probeJson.substitute.format) probeReplacedProperties.format = probeJson.substitute.format;
    }
    // Handle Auth2 substitute array (for degraded resources - fallback for other formats)
    else if (probeJson && probeJson.substitute && Array.isArray(probeJson.substitute) && probeJson.substitute.length > 0) {
      console.log('[probeReplacements] Using substitute (array):', probeJson.substitute[0]);
      probeContentUrl = probeJson.substitute[0].id;
      if (probeJson.substitute[0].format) probeReplacedProperties.format = probeJson.substitute[0].format;
    }
    // Handle degraded probe response (failed authentication)
    else if (probeResponse.degraded && probeJson) {
      console.log('[probeReplacements] Using degraded probe response for immediate display');
      // Use the probe response JSON directly as degraded service
      probeContentUrl = probeJson.id || probeJson['@id'];
      console.log('[probeReplacements] Degraded service URL:', probeContentUrl);
    } else {
      console.log('[probeReplacements] No substitute/location found in probe response, structure:', Object.keys(probeJson || {}));
    }

    if (probeContentUrl) {
      probeReplacedProperties.id = probeContentUrl;
      console.log('[probeReplacements] Replacing image resource', r.id, 'with', probeContentUrl);
      // Create a proxy that preserves all original methods but overrides id-related properties
      return new Proxy(r, {
        get(target, prop) {
          if (prop === 'id') {
            return probeContentUrl;
          }
          if (prop === 'getId') {
            return () => probeContentUrl;
          }
          if (prop === '__jsonld') {
            return { ...target.__jsonld, ...probeReplacedProperties };
          }
          return target[prop];
        },
      });
    }
    return r;
  });
};

/**
 *  Instantiate a manifesto instance.
 * @param {object} state
 * @param {string} windowId
 * @return {object}
 */
export const getCurrentCanvasWorld = createSelector(
  [
    getVisibleCanvases,
    getLayersForVisibleCanvases,
    getSequenceViewingDirection,
    getMiradorCanvasWrapper,
    selectProbeResponses,
    selectInfoResponses,
  ],
  (canvases, layers, viewingDirection, getMiradorCanvas, probeResponses, infoResponses) => {
    console.log('[getCurrentCanvasWorld] REGENERATING canvas world at:', new Date().toISOString());
    console.log('[getCurrentCanvasWorld] Processing', canvases.length, 'canvases');
    console.log('[getCurrentCanvasWorld] Probe responses available:', Object.keys(probeResponses || {}));
    console.log('[getCurrentCanvasWorld] Info responses available:', Object.keys(infoResponses || {}));

    // Check if any canvases have auth services that need probe responses
    let hasAuthServicesNeedingProbes = false;
    let hasPendingProbeRequests = false;

    const canvasesWithProbeReplacement = canvases.map((canvas) => {
      const miradorCanvas = getMiradorCanvas(canvas);
      console.log('[getCurrentCanvasWorld] Canvas image resources:', miradorCanvas.imageResources?.length);

      // Check if this canvas has auth services that might need probe responses
      const imageResources = miradorCanvas.imageResources || [];
      for (const resource of imageResources) {
        const resourceId = resource.id || resource.getId();
        if (resourceId && resourceId.includes('iiif')) {
          // This looks like an IIIF resource - check if we need probe responses
          const baseUrl = resourceId.split('/full/')[0];
          const hasMatchingProbe = Object.keys(probeResponses || {}).some((probeId) => {
            if (probeId.includes('?id=')) {
              const encodedResourceId = probeId.split('?id=')[1];
              const decodedResourceId = decodeURIComponent(encodedResourceId);
              return decodedResourceId.includes(baseUrl.split('/image/iiif/')[1] || '');
            }
            return false;
          });

          if (!hasMatchingProbe) {
            hasAuthServicesNeedingProbes = true;
            // Check if there's a pending probe request
            const pendingProbe = Object.values(probeResponses || {}).find(
              (response) => response.isFetching && response.id && response.id.includes(baseUrl.split('/image/iiif/')[1] || ''),
            );
            if (pendingProbe) {
              hasPendingProbeRequests = true;
            }
          }
        }
      }
      const replacedImageResources = probeReplacements(miradorCanvas.imageResources, probeResponses, infoResponses);
      console.log('[getCurrentCanvasWorld] Replaced image resources:', replacedImageResources?.length);

      // Create a new canvas with replaced image resources
      return new Proxy(miradorCanvas, {
        get(target, prop) {
          if (prop === 'imageResources') {
            return replacedImageResources;
          }
          return target[prop];
        },
      });
    });

    console.log('[getCurrentCanvasWorld] Has auth services needing probes:', hasAuthServicesNeedingProbes);
    console.log('[getCurrentCanvasWorld] Has pending probe requests:', hasPendingProbeRequests);

    // If we have auth services that need probes and they're still pending, return empty canvas world
    // This prevents OpenSeadragon from loading with original URLs
    if (hasAuthServicesNeedingProbes && hasPendingProbeRequests) {
      console.log('[getCurrentCanvasWorld] Waiting for probe responses - returning empty canvas world');
      return new CanvasWorld([], layers, viewingDirection);
    }

    return new CanvasWorld(canvasesWithProbeReplacement, layers, viewingDirection);
  },
);
