
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

/** Return position of thumbnail navigation in a certain window.
* @param {object} state
* @param {String} windowId
* @param {String}
*/
export function getThumbnailNavigationPosition(state, windowId) {
  return state.windows[windowId]
    && state.windows[windowId].thumbnailNavigationPosition;
}

/**
* Return manifest title
* @param {object} manifest
* @return {String}
*/
export function getManifestTitle(manifest) {
  return manifest
    && manifest.manifestation
    && manifest.manifestation.getLabel().map(label => label.value)[0];
}

/** Return type of view in a certain window.
* @param {object} state
* @param {String} windowId
* @param {String}
*/
export function getWindowViewType(state, windowId) {
  return state.windows[windowId] && state.windows[windowId].view;
}
