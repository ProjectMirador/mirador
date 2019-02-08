
/**
* Return the manifest that belongs to a certain window.
* @param {object} state
* @param {String} windowId
* @return {object}
*/
export function getWindowManifest(state, windowId) {
  return state.windows[windowId]
    && state.windows[windowId].manifestId
    && state.manifests[state.windows[windowId].manifestId];
}

/**
* Return the logo of a manifest or null
* @param {object} manifest
* @return {String|null}
*/
export function getManifestLogo(manifest) {
  return manifest.manifestation
    && manifest.manifestation.getLogo();
}

/**
* Return the logo of a manifest or null
* @param {object} manifest
* @return {String|null}
*/
export function getManifestCanvases(manifest) {
  if (!manifest.manifestation) {
    return [];
  }

  return manifest.manifestation.getSequences()[0].getCanvases();
}
