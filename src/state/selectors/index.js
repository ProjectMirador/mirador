import { LanguageMap } from 'manifesto.js';

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
* Return the IIIF v3 provider of a manifest or null
* @param {object} manifest
* @return {String|null}
*/
export function getManifestProvider(manifest) {
  if (manifest && manifest.provider) {
    return manifest.provider;
  }

  return manifest
    && manifest.manifestation
    && manifest.manifestation.getProperty('provider')
    && manifest.manifestation.getProperty('provider')[0].label
    && LanguageMap.parse(manifest.manifestation.getProperty('provider')[0].label, manifest.manifestation.options.locale).map(label => label.value)[0];
}

/**
* Return the logo of a manifest or null
* @param {object} manifest
* @return {String|null}
*/
export function getManifestThumbnail(manifest) {
  return manifest.manifestation
    && manifest.manifestation.getThumbnail()
    && manifest.manifestation.getThumbnail().id;
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

  if (!manifest.manifestation.getSequences || !manifest.manifestation.getSequences()[0]) {
    return [];
  }

  return manifest.manifestation.getSequences()[0].getCanvases();
}

/**
* Return ids and labels of canvases
* @ param {Array} canvases
* @return {Array} - [ {id: 'id', label: 'label' }, ... ]
*/
export function getIdAndLabelOfCanvases(canvases) {
  return canvases.map((canvas, index) => ({
    id: canvas.id,
    label: getCanvasLabel(canvas, index),
  }));
}

/**
* Return the current canvas selected in a window
* @param {object} state
* @param {String} windowId
* @return {Object}
*/
export function getSelectedCanvas(state, windowId) {
  const manifest = getWindowManifest(state, windowId);
  const { canvasIndex } = state.windows[windowId];

  return manifest
    && manifest.manifestation
    && manifest.manifestation
      .getSequences()[0]
      .getCanvasByIndex(canvasIndex);
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

/**
* Return manifest description
* @param {object} manifest
* @return {String}
*/
export function getManifestDescription(manifest) {
  return manifest
    && manifest.manifestation
    && manifest.manifestation.getDescription().map(label => label.value)[0];
}

/**
* Return canvas label, or alternatively return the given index + 1 to be displayed
* @param {object} canvas
* @return {String|Integer}
*/
export function getCanvasLabel(canvas, canvasIndex) {
  if (!canvas) {
    return undefined;
  }
  if (canvas.getLabel().length > 0) {
    return canvas.getLabel().map(label => label.value)[0];
  }
  return String(canvasIndex + 1);
}

/**
* Return metadata in a label / value structure
* This is a potential seam for pulling the i18n locale from
* state and plucking out the appropriate language.
* For now we're just getting the first.
* @param {object} Manifesto IIIF Resource (e.g. canvas, manifest)
* @return {Array[Object]}
*/
export function getDestructuredMetadata(iiifResource) {
  return (iiifResource
    && iiifResource.getMetadata().map(labelValuePair => ({
      label: labelValuePair.getLabel(),
      value: labelValuePair.getValue(),
    }))
  );
}

/**
* Return canvas description
* @param {object} canvas
* @param {String}
*/
export function getCanvasDescription(canvas) {
  return canvas
    && canvas.getProperty('description');
}

/**
* Return the companion window string from state in a given windowId and position
* @param {object} state
* @param {String} windowId
* @param {String} position
* @return {String}
*/
export function getCompanionWindowForPosition(state, windowId, position) {
  return Object.values((state.companionWindows || [])).find(cw => (
    cw.windowId === windowId && cw.position === position
  ));
}

/**
* Return compantion window ids from a window
* @param {String} windowId
* @return {Array}
*/
export function getCompanionWindowIds(state, windowId) {
  return state.windows[windowId].companionWindowIds;
}

/**
 * Return companion windows of a window
 * @param {String} windowId
 * @return {Array}
 */
export function getCompanionWindowsOfWindow(state, windowId) {
  return getCompanionWindowIds(state, windowId)
    .map(id => state.companionWindows[id]);
}

/**
* Return languages from config (in state) and indicate which is currently set
* @param {object} state
* @return {Array} [ {locale: 'de', label: 'Deutsch', current: true}, ... ]
*/
export function getLanguagesFromConfigWithCurrent(state) {
  const { availableLanguages, language } = state.config;

  return Object.keys(availableLanguages).map(key => ({
    locale: key,
    label: availableLanguages[key],
    current: key === language,
  }));
}
