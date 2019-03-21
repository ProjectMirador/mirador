import { createSelector } from 'reselect';
import manifesto, { LanguageMap } from 'manifesto.js';
import ManifestoCanvas from '../../lib/ManifestoCanvas';

/** Get the relevant manifest information */
export function getManifest(state, { manifestId, windowId }) {
  return state.manifests[
    manifestId
    || (windowId && state.windows && state.windows[windowId] && state.windows[windowId].manifestId)
  ];
}

/** */
function getLocale(state, { companionWindowId }) {
  return companionWindowId
    && state.companionWindows[companionWindowId]
    && state.companionWindows[companionWindowId].locale;
}

/** Instantiate a manifesto instance */
export const getManifestoInstance = createSelector(
  [
    getManifest,
    getLocale,
  ],
  (manifest, locale) => manifest
    && manifest.json
    && manifesto.create(manifest.json, locale ? { locale } : undefined),
);

/**
 * Get the logo for a manifest
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {String|null}
 */
export const getManifestLogo = createSelector(
  [getManifestoInstance],
  manifest => manifest && manifest.getLogo(),
);

/**
* Return the IIIF v3 provider of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
export const getManifestProvider = createSelector(
  [getManifestoInstance],
  manifest => manifest
    && manifest.getProperty('provider')
    && manifest.getProperty('provider')[0].label
    && LanguageMap.parse(manifest.getProperty('provider')[0].label, manifest.options.locale).map(label => label.value)[0],
);

/**
* Return the supplied thumbnail for a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
export function getManifestThumbnail(state, props) {
  /** */
  function getTopLevelManifestThumbnail() {
    const manifest = getManifestoInstance(state, props);

    return manifest
      && manifest.getThumbnail()
      && manifest.getThumbnail().id;
  }

  /** */
  function getFirstCanvasThumbnail() {
    const canvases = getManifestCanvases(state, props);

    return canvases.length > 0 && canvases[0].getThumbnail() && canvases[0].getThumbnail().id;
  }

  /** */
  function generateThumbnailFromFirstCanvas() {
    const canvases = getManifestCanvases(state, props);

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
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
export const getManifestCanvases = createSelector(
  [getManifestoInstance],
  (manifest) => {
    if (!manifest) {
      return [];
    }

    if (!manifest.getSequences || !manifest.getSequences()[0]) {
      return [];
    }

    return manifest.getSequences()[0].getCanvases();
  },
);

/**
* Return manifest title
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String}
*/
export const getManifestTitle = createSelector(
  [getManifestoInstance],
  manifest => manifest
    && manifest.getLabel().map(label => label.value)[0],
);

/**
* Return manifest description
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String}
*/
export const getManifestDescription = createSelector(
  [getManifestoInstance],
  manifest => manifest
    && manifest.getDescription().map(label => label.value)[0],
);

/**
* Return manifest title
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String}
*/
export const getManifestUrl = createSelector(
  [getManifestoInstance],
  manifest => manifest && manifest.id,
);

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
 * Return manifest metadata in a label / value structure
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {Array[Object]}
 */
export const getManifestMetadata = createSelector(
  [getManifestoInstance],
  manifest => manifest && getDestructuredMetadata(manifest),
);

/** */
function getLocalesForStructure(item) {
  const languages = [];
  if (Array.isArray(item)) {
    languages.push(...item.filter(i => (typeof i === 'object' && i['@language'])).map(i => i['@language']));
  } else if (typeof item === 'object') {
    if (item['@language']) languages.push(item['@language']);
  }
  return languages;
}

/** */
function getLocales(resource) {
  if (!resource) return [];

  const metadata = resource.getProperty('metadata') || [];
  const languages = {};

  for (let i = 0; i < metadata.length; i += 1) {
    const item = metadata[i];
    getLocalesForStructure(item.label).forEach((l) => { languages[l] = true; });
    getLocalesForStructure(item.value).forEach((l) => { languages[l] = true; });
  }
  return Object.keys(languages);
}

export const getDefaultManifestLocale = createSelector(
  [getManifestoInstance],
  manifest => manifest && manifest.options && manifest.options.locale && manifest.options.locale.replace(/-.*$/, ''),
);

export const getMetadataLocales = createSelector(
  [getManifestoInstance],
  manifest => getLocales(manifest),
);
