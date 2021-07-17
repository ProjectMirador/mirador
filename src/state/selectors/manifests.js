import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { PropertyValue, Utils } from 'manifesto.js';
import getThumbnail from '../../lib/ThumbnailFactory';
import asArray from '../../lib/asArray';
import { getManifest } from './getters';
import { getConfig, getUserLanguages } from './config';

/** Modify a selector that returns one or more property values to allow overriding
 *  the default language.
 *
 * By default this will use the languages in `config.userLanguages`, but this can be
 * overridden by passing a third parameter to the selector with an alternative list
 * of languages in descending order of preference.
 *
 * Supported return types of selectors are currently:
 * - Single property value
 * - Array of property values
 * - Array of objects with a `value`/`values` and/or `label` attribute that is a property value
 *
 * Currently used to implement customizable locale selection in companion windows.
 *
 * @param {function} selector to wrap
 * @param {multiple} whether all values for the given language should be retrieved from the
 *                   property value(s)
 */
function createLanguageOverrideSelector(selector, multiple) {
  return (state, params, overrideLangs) => {
    const langs = overrideLangs ?? getUserLanguages(state);
    const rv = selector(state, params);
    if (rv?.getValue) {
      // Single property value
      return multiple ? asArray(rv?.getValues(langs)) : rv?.getValue(langs);
    }
    if (Array.isArray(rv)) {
      if (rv[0]?.getValue) {
        // Array of property values
        return multiple
          ? rv.flatMap(v => asArray(v.getValues(langs)))
          : rv.map(v => v.getValue(langs));
      }
      if (rv[0]?.value?.getValue || rv[0]?.label?.getValue || rv[0]?.values?.getValues) {
        // Array of { label, value?, values? } objects, with value/values and/or label
        // being the property value
        // NOTE: In this case the `multiple` parameter is ignored, and instead the cardinality
        //       is decided based on the presence of the `value` or `values` key
        return rv.map(({
          value, values, label, ...rest
        }) => {
          const out = rest;
          out.label = label?.getValue ? label.getValue(langs) : (label ?? null);
          if (value !== undefined) {
            out.value = value?.getValue ? value.getValue(langs) : value;
          }
          if (values !== undefined) {
            out.values = values?.getValues ? values.getValues(langs) : values;
          }
          return out;
        });
      }
    }
    // Unknown type, don't override languages, return selected value
    return rv;
  };
}

/** */
function createManifestoInstance(json) {
  if (!json) return undefined;
  const manifestoObject = Utils.parseManifest(json);
  // Local patching of Manifesto so that when its a Collection, it behaves similarly
  if (typeof manifestoObject.getSequences != 'function') {
    manifestoObject.getSequences = () => [];
  }
  return manifestoObject;
}

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
  manifest => manifest
    && createManifestoInstance(manifest.json),
)(
  (state, { manifestId, windowId }) => [
    manifestId,
    windowId,
  ].join(' - '), // Cache key consisting of manifestId and windowId
);

/** Instantiate a manifesto instance */
export const getManifestoInstance = createSelector(
  getContextualManifestoInstance,
  (state, { json }) => json,
  (manifesto, manifestJson) => (
    manifestJson && createManifestoInstance(manifestJson)
  ) || manifesto,
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
* @param {Array[string]} custom language preference for retrieving values out of property values
* @return {String|null}
*/
export const getManifestProvider = createLanguageOverrideSelector(
  createSelector(
    [getProperty('provider')],
    provider => provider
      && provider[0].label
      && PropertyValue.parse(provider[0].label),
  ),
);

/**
* Return the IIIF v3 homepage of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {Array[string]} custom language preference for retrieving values out of property values
* @return {Array[object]|null}
*/
export const getManifestHomepage = createLanguageOverrideSelector(
  createSelector(
    [getProperty('homepage')],
    homepages => homepages
      && asArray(homepages).map(homepage => (
        {
          label: PropertyValue.parse(homepage.label),
          value: homepage.id || homepage['@id'],
        }
      )),
  ),
);

/**
* Return the IIIF v3 renderings of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {Array[string]} custom language preference for retrieving values out of property values
* @return {Array[object]|null}
*/
export const getManifestRenderings = createLanguageOverrideSelector(
  createSelector(
    [getManifestoInstance],
    manifest => manifest
      && manifest.getRenderings().map(rendering => (
        {
          label: rendering.getLabel(),
          value: rendering.id,
        }
      )),
  ),
);

/**
* Return the IIIF v2/v3 seeAlso data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {Array[string]} custom language preference for retrieving values out of property values
* @return {Array[object]|null}
*/
export const getManifestRelatedContent = createLanguageOverrideSelector(
  createSelector(
    [getProperty('seeAlso')],
    seeAlso => seeAlso
      && asArray(seeAlso).map(related => (
        {
          format: related.format,
          label: PropertyValue.parse(related.label),
          value: related.id || related['@id'],
        }
      )),
  ),
);

/**
* Return the IIIF requiredStatement (v3) or attribution (v2) data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {Array[string]} custom language preference for retrieving values out of property values
* @return {Array[object]}
*/
export const getRequiredStatement = createLanguageOverrideSelector(
  createSelector(
    [getManifestoInstance],
    manifest => manifest
      && asArray(manifest.getRequiredStatement())
        .filter(l => l.getValues().some(v => v))
        .map(labelValuePair => ({
          label: labelValuePair.label,
          values: labelValuePair,
        })),
  ),
);

/**
* Return the IIIF v2 rights (v3) or license (v2) data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {string[]?} overrideLanguages
* @return {Array[string]|null}
*/
export const getRights = createLanguageOverrideSelector(
  createSelector(
    [
      getProperty('rights'),
      getProperty('license'),
      getUserLanguages,
    ],
    (rights, license) => {
      const data = rights || license;
      return PropertyValue.parse(data);
    },
  ), true,
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
* @param {Array[string]} custom language preference for retrieving values out of property values
* @return {String}
*/
export const getManifestTitle = createLanguageOverrideSelector(
  createSelector(
    [getManifestoInstance],
    manifest => manifest?.getLabel(),
  ),
);

/**
* Return manifest description
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {Array[string]} custom language preference for retrieving values out of property values
* @return {String}
*/
export const getManifestDescription = createLanguageOverrideSelector(
  createSelector(
    [getManifestoInstance],
    manifest => manifest
      && manifest.getDescription(),
  ),
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
* Return metadata in a label / value structure.

* @param {object} Manifesto IIIF Resource (e.g. canvas, manifest)
* @param {Array[string]} Languages in descending order of preference
* @return {Array[Object]}
*/
export function getDestructuredMetadata(iiifResource, langs) {
  return (iiifResource
    && iiifResource.getMetadata().map(labelValuePair => ({
      label: labelValuePair.getLabel(langs),
      values: labelValuePair.getValues(langs),
    }))
  );
}

/**
 * Return manifest metadata in a label / value structure.
 *
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @param {string[]?} Override default language preferences
 * @return {Array[Object]}
 */
export const getManifestMetadata = (state, { manifestId, windowId }, overrideLangs) => {
  const langs = overrideLangs ?? getUserLanguages(state);
  const manifest = getManifestoInstance(state, { manifestId, windowId });
  return manifest && getDestructuredMetadata(manifest, langs);
};

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
