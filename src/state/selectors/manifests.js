import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { PropertyValue, Utils } from 'manifesto.js';
import getThumbnail from '../../lib/ThumbnailFactory';
import asArray from '../../lib/asArray';
import { getCompanionWindow } from './companionWindows';
import { getManifest } from './getters';
import { getConfig } from './config';

/** */
function createManifestoInstance(json, locale) {
  if (!json) return undefined;
  const manifestoObject = Utils.parseManifest(json, locale ? { locale } : undefined);
  // Local patching of Manifesto so that when its a Collection, it behaves similarly
  if (typeof manifestoObject.getSequences != 'function') {
    manifestoObject.getSequences = () => [];
  }
  return manifestoObject;
}

/** */
const getLocale = createSelector(
  [
    getCompanionWindow,
    getConfig,
  ],
  (companionWindow = {}, config = {}) => (
    companionWindow.locale || config.language
  ),
);

/** Convenience selector to get a manifest (or placeholder) */
export const getManifestStatus = createSelector(
  [getManifest],
  manifest => manifest || { missing: true },
);

/** Convenience selector to get a manifest loading error */
export const getManifestError = createSelector(
  [getManifest],
  manifest => manifest && manifest.error,
);

/** Instantiate a manifesto instance */
const getContextualManifestoInstance = createCachedSelector(
  getManifest,
  getLocale,
  (manifest, locale) => manifest
    && createManifestoInstance(manifest.json, locale),
)(
  (state, { companionWindowId, manifestId, windowId }) => [
    manifestId,
    windowId,
    getLocale(state, { companionWindowId }),
  ].join(' - '), // Cache key consisting of manifestId, windowId, and locale
);

/** Instantiate a manifesto instance */
export const getManifestoInstance = createSelector(
  getContextualManifestoInstance,
  (state, { json }) => json,
  getLocale,
  (manifesto, manifestJson, locale) => (
    manifestJson && createManifestoInstance(manifestJson, locale)
  ) || manifesto,
);

export const getManifestLocale = createSelector(
  [getManifestoInstance],
  manifest => manifest && manifest.options && manifest.options.locale && manifest.options.locale.replace(/-.*$/, ''),
);

/** */
function getProperty(property) {
  return createSelector(
    [getManifestoInstance],
    manifest => manifest && manifest.getProperty(property),
  );
}

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
  [
    getProperty('provider'),
    getManifestLocale,
  ],
  (provider, locale) => provider
    && provider[0].label
    && PropertyValue.parse(provider[0].label, locale).getValue(),
);

/**
* Return the IIIF v3 homepage of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
export const getManifestHomepage = createSelector(
  [
    getProperty('homepage'),
    getProperty('related'),
    getManifestLocale,
  ],
  (homepages, relatedLinks, locale) => ((homepages
    && asArray(homepages).map(homepage => (
      {
        label: PropertyValue.parse(homepage.label, locale)
          .getValue(),
        value: homepage.id || homepage['@id'],
      }
    ))) || (relatedLinks
    && asArray(relatedLinks).map(related => (
      typeof related === 'string'
        ? {
          label: related,
          value: related,
        } : {
          label: PropertyValue.parse(related.label, locale)
            .getValue() || related.id || related['@id'],
          value: related.id || related['@id'],
        }
    )))
  ),
);

/**
* Return the IIIF v3 renderings of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
export const getManifestRenderings = createSelector(
  [getManifestoInstance],
  manifest => manifest
    && manifest.getRenderings().map(rendering => (
      {
        label: rendering.getLabel().getValue(),
        value: rendering.id,
      }
    )),
);

/**
* Return the IIIF v2/v3 seeAlso data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
export const getManifestRelatedContent = createSelector(
  [
    getProperty('seeAlso'),
    getManifestLocale,
  ],
  (seeAlso, locale) => seeAlso
    && asArray(seeAlso).map(related => (
      {
        format: related.format,
        label: PropertyValue.parse(related.label, locale)
          .getValue(),
        value: related.id || related['@id'],
      }
    )),
);

/**
* Return the IIIF requiredStatement (v3) or attribution (v2) data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
export const getRequiredStatement = createSelector(
  [getManifestoInstance],
  manifest => manifest
    && asArray(manifest.getRequiredStatement())
      .filter(l => l.getValues().some(v => v))
      .map(labelValuePair => ({
        label: (labelValuePair.label && labelValuePair.label.getValue()) || null,
        values: labelValuePair.getValues(),
      })),
);

/**
* Return the IIIF v2 rights (v3) or license (v2) data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
export const getRights = createSelector(
  [
    getProperty('rights'),
    getProperty('license'),
    getManifestLocale,
  ],
  (rights, license, locale) => {
    const data = rights || license;
    return asArray(PropertyValue.parse(data, locale).getValues());
  },
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
  const manifest = getManifestoInstance(state, props);
  const { thumbnails = {} } = getConfig(state);

  if (!manifest) return undefined;

  const thumbnail = getThumbnail(manifest, {
    maxHeight: 80, maxWidth: 120, preferredFormats: thumbnails.preferredFormats,
  });

  return thumbnail && thumbnail.url;
}

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
    && manifest.getLabel().getValue(),
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
    && manifest.getDescription().getValue(),
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
      values: labelValuePair.getValues(),
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
  } else if (item && typeof item === 'object') {
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

export const getMetadataLocales = createSelector(
  [getManifestoInstance],
  manifest => getLocales(manifest),
);

/** */
export const getManifestSearchService = createSelector(
  [getManifestoInstance],
  (manifest) => {
    if (!manifest) return null;
    const searchService = manifest.getService('http://iiif.io/api/search/0/search')
     || manifest.getService('http://iiif.io/api/search/1/search');
    if (searchService) return searchService;
    return null;
  },
);

/** */
export const getManifestAutocompleteService = createSelector(
  [getManifestSearchService],
  (searchService) => {
    const autocompleteService = searchService && (
      searchService.getService('http://iiif.io/api/search/0/autocomplete')
      || searchService.getService('http://iiif.io/api/search/1/autocomplete')
    );

    return autocompleteService && autocompleteService;
  },
);
