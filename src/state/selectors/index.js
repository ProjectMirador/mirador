import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import { LanguageMap } from 'manifesto.js';
import Annotation from '../../lib/Annotation';
import ManifestoCanvas from '../../lib/ManifestoCanvas';
import CanvasGroupings from '../../lib/CanvasGroupings';

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
* Return the supplied thumbnail for a manifest or null
* @param {object} manifest
* @return {String|null}
*/
export function getManifestThumbnail(manifest) {
  /** */
  function getTopLevelManifestThumbnail() {
    return manifest.manifestation
      && manifest.manifestation.getThumbnail()
      && manifest.manifestation.getThumbnail().id;
  }

  /** */
  function getFirstCanvasThumbnail() {
    const canvases = getManifestCanvases(manifest);

    return canvases.length > 0 && canvases[0].getThumbnail() && canvases[0].getThumbnail().id;
  }

  /** */
  function generateThumbnailFromFirstCanvas() {
    const canvases = getManifestCanvases(manifest);

    if (canvases.length === 0) return null;

    const manifestoCanvas = new ManifestoCanvas(canvases[0]);

    return manifestoCanvas.thumbnail(null, 80);
  }

  return getTopLevelManifestThumbnail()
    || getFirstCanvasThumbnail()
    || generateThumbnailFromFirstCanvas();
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

/**
* Return the current canvases selected in a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {String} windowId
* @return {Array}
*/
export function getSelectedCanvases(state, windowId) {
  const manifest = getWindowManifest(state, windowId);
  const { canvasIndex, view } = state.windows[windowId];

  return manifest
    && manifest.manifestation
    && new CanvasGroupings(
      manifest.manifestation.getSequences()[0].getCanvases(),
      view,
    ).getCanvases(canvasIndex);
}


/**
* Return annotations for an array of targets
* @param {object} state
* @param {Array} targets
* @return {Array}
*/
export function getSelectedTargetsAnnotations(state, targets) {
  const annotations = state.annotations
    && targets.map(target => getSelectedTargetAnnotations(state, target));
  if (!annotations) return [];

  return flatten(annotations);
}

/**
* Return a single target's annotations
* @param {object} state
* @param {String} target
* @return {Array}
*/
export function getSelectedTargetAnnotations(state, target) {
  const annotations = state.annotations && state.annotations[target];

  if (!annotations) return [];

  return filter(
    Object.keys(annotations).map(id => new Annotation(annotations[id].json, target)),
    annotation => annotation
                  && annotation.present(),
  );
}

/**
* Return an array of annotation resources filtered by the given motivation
* @param {Array} annotations
* @param {Array} motivations
* @return {Array}
*/
export function getAnnotationResourcesByMotivation(annotations, motivations) {
  const resources = flatten(annotations.map(annotation => annotation.resources));

  return filter(resources, resource => resource.motivations.some(
    motivation => motivations.includes(motivation),
  ));
}

/**
 * @param {Array} resources
 * @return {Array} [{ id: 'abc123', content: 'Annotation Content' }, ...]
 */
export function getIdAndContentOfResources(resources) {
  return resources.map((resource, i) => ({
    id: resource.id,
    targetId: resource.targetId,
    content: resource.chars,
  }));
}

/** Return position of thumbnail navigation in a certain window.
* @param {object} state
* @param {String} windowId
* @param {String}
*/
export function getThumbnailNavigationPosition(state, windowId) {
  return state.windows[windowId]
    && state.windows[windowId].thumbnailNavigationId
    && state.companionWindows[state.windows[windowId].thumbnailNavigationId]
    && state.companionWindows[state.windows[windowId].thumbnailNavigationId].position;
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
  return ((state.windows[windowId] || {}).companionWindowIds || []).map(key => (
    state.companionWindows[key]
  )).find(cw => (
    cw.position === position
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

/**
 * Return the selected annotations IDs of a given CanvasId
 * @param {Object} state
 * @param {String} windowId
 * @param {Array} targetIds
 * @return {Array}
 */
export function getSelectedAnnotationIds(state, windowId, targetIds) {
  return flatten(targetIds.map(targetId => state.windows[windowId].selectedAnnotations
     && state.windows[windowId].selectedAnnotations[targetId]));
}

/**
* Return the current canvas' (selected in a window) selected annotations
* @param {object} state
* @param {Array} targetIds
* @param {Array} annotationIds
* @return {Array}
*/
export function getSelectedTargetAnnotationResources(state, targetIds, annotationIds) {
  return getSelectedTargetsAnnotations(state, targetIds)
    .map(annotation => ({
      id: (annotation['@id'] || annotation.id),
      resources: annotation.resources.filter(r => annotationIds && annotationIds.includes(r.id)),
    }));
}
