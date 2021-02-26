"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getManifestThumbnail = getManifestThumbnail;
exports.getDestructuredMetadata = getDestructuredMetadata;
exports.getManifestAutocompleteService = exports.getManifestSearchService = exports.getMetadataLocales = exports.getManifestMetadata = exports.getManifestUrl = exports.getManifestDescription = exports.getManifestTitle = exports.getRights = exports.getRequiredStatement = exports.getManifestRelatedContent = exports.getManifestRenderings = exports.getManifestHomepage = exports.getManifestProvider = exports.getManifestLogo = exports.getManifestLocale = exports.getManifestoInstance = exports.getManifestError = exports.getManifestStatus = void 0;

var _reselect = require("reselect");

var _reReselect = _interopRequireDefault(require("re-reselect"));

var _PropertyValue = require("manifesto.js/dist-esmodule/PropertyValue");

var _Utils = require("manifesto.js/dist-esmodule/Utils");

var _ThumbnailFactory = _interopRequireDefault(require("../../lib/ThumbnailFactory"));

var _companionWindows = require("./companionWindows");

var _getters = require("./getters");

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/** */
function createManifestoInstance(json, locale) {
  if (!json) return undefined;

  var manifestoObject = _Utils.Utils.parseManifest(json, locale ? {
    locale: locale
  } : undefined); // Local patching of Manifesto so that when its a Collection, it behaves similarly


  if (typeof manifestoObject.getSequences != 'function') {
    manifestoObject.getSequences = function () {
      return [];
    };
  }

  return manifestoObject;
}
/** */


var getLocale = (0, _reselect.createSelector)([_companionWindows.getCompanionWindow, _config.getConfig], function () {
  var companionWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return companionWindow.locale || config.language;
});
/** Convenience selector to get a manifest (or placeholder) */

var getManifestStatus = (0, _reselect.createSelector)([_getters.getManifest], function (manifest) {
  return manifest || {
    missing: true
  };
});
/** Convenience selector to get a manifest loading error */

exports.getManifestStatus = getManifestStatus;
var getManifestError = (0, _reselect.createSelector)([_getters.getManifest], function (manifest) {
  return manifest && manifest.error;
});
/** Instantiate a manifesto instance */

exports.getManifestError = getManifestError;
var getContextualManifestoInstance = (0, _reReselect["default"])(_getters.getManifest, getLocale, function (manifest, locale) {
  return manifest && createManifestoInstance(manifest.json, locale);
})(function (state, _ref) {
  var companionWindowId = _ref.companionWindowId,
      manifestId = _ref.manifestId,
      windowId = _ref.windowId;
  return [manifestId, windowId, getLocale(state, {
    companionWindowId: companionWindowId
  })].join(' - ');
} // Cache key consisting of manifestId, windowId, and locale
);
/** Instantiate a manifesto instance */

var getManifestoInstance = (0, _reselect.createSelector)(getContextualManifestoInstance, function (state, _ref2) {
  var json = _ref2.json;
  return json;
}, getLocale, function (manifesto, manifestJson, locale) {
  return manifestJson && createManifestoInstance(manifestJson, locale) || manifesto;
});
exports.getManifestoInstance = getManifestoInstance;
var getManifestLocale = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.options && manifest.options.locale && manifest.options.locale.replace(/-.*$/, '');
});
/** */

exports.getManifestLocale = getManifestLocale;

function getProperty(property) {
  return (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
    return manifest && manifest.getProperty(property);
  });
}
/**
 * Get the logo for a manifest
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {String|null}
 */


var getManifestLogo = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.getLogo();
});
/**
* Return the IIIF v3 provider of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/

exports.getManifestLogo = getManifestLogo;
var getManifestProvider = (0, _reselect.createSelector)([getProperty('provider'), getManifestLocale], function (provider, locale) {
  return provider && provider[0].label && _PropertyValue.PropertyValue.parse(provider[0].label, locale).getValue();
});
/**
 */

exports.getManifestProvider = getManifestProvider;

function asArray(value) {
  if (!Array.isArray(value)) {
    return [value];
  }

  return value;
}
/**
* Return the IIIF v3 homepage of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/


var getManifestHomepage = (0, _reselect.createSelector)([getProperty('homepage'), getManifestLocale], function (homepages, locale) {
  return homepages && asArray(homepages).map(function (homepage) {
    return {
      label: _PropertyValue.PropertyValue.parse(homepage.label, locale).getValue(),
      value: homepage.id || homepage['@id']
    };
  });
});
/**
* Return the IIIF v3 renderings of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/

exports.getManifestHomepage = getManifestHomepage;
var getManifestRenderings = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.getRenderings().map(function (rendering) {
    return {
      label: rendering.getLabel().getValue(),
      value: rendering.id
    };
  });
});
/**
* Return the IIIF v2/v3 seeAlso data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/

exports.getManifestRenderings = getManifestRenderings;
var getManifestRelatedContent = (0, _reselect.createSelector)([getProperty('seeAlso'), getManifestLocale], function (seeAlso, locale) {
  return seeAlso && asArray(seeAlso).map(function (related) {
    return {
      format: related.format,
      label: _PropertyValue.PropertyValue.parse(related.label, locale).getValue(),
      value: related.id || related['@id']
    };
  });
});
/**
* Return the IIIF requiredStatement (v3) or attribution (v2) data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/

exports.getManifestRelatedContent = getManifestRelatedContent;
var getRequiredStatement = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && asArray(manifest.getRequiredStatement()).filter(function (l) {
    return l.getValues().some(function (v) {
      return v;
    });
  }).map(function (labelValuePair) {
    return {
      label: labelValuePair.label && labelValuePair.label.getValue() || null,
      values: labelValuePair.getValues()
    };
  });
});
/**
* Return the IIIF v2 rights (v3) or license (v2) data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/

exports.getRequiredStatement = getRequiredStatement;
var getRights = (0, _reselect.createSelector)([getProperty('rights'), getProperty('license'), getManifestLocale], function (rights, license, locale) {
  var data = rights || license;
  return asArray(_PropertyValue.PropertyValue.parse(data, locale).getValues());
});
/**
* Return the supplied thumbnail for a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/

exports.getRights = getRights;

function getManifestThumbnail(state, props) {
  var manifest = getManifestoInstance(state, props);
  if (!manifest) return undefined;
  var thumbnail = (0, _ThumbnailFactory["default"])(manifest, {
    maxHeight: 80,
    maxWidth: 120
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


var getManifestTitle = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.getLabel().getValue();
});
/**
* Return manifest description
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String}
*/

exports.getManifestTitle = getManifestTitle;
var getManifestDescription = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.getDescription().getValue();
});
/**
* Return manifest title
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String}
*/

exports.getManifestDescription = getManifestDescription;
var getManifestUrl = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.id;
});
/**
* Return metadata in a label / value structure
* This is a potential seam for pulling the i18n locale from
* state and plucking out the appropriate language.
* For now we're just getting the first.
* @param {object} Manifesto IIIF Resource (e.g. canvas, manifest)
* @return {Array[Object]}
*/

exports.getManifestUrl = getManifestUrl;

function getDestructuredMetadata(iiifResource) {
  return iiifResource && iiifResource.getMetadata().map(function (labelValuePair) {
    return {
      label: labelValuePair.getLabel(),
      values: labelValuePair.getValues()
    };
  });
}
/**
 * Return manifest metadata in a label / value structure
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {Array[Object]}
 */


var getManifestMetadata = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && getDestructuredMetadata(manifest);
});
/** */

exports.getManifestMetadata = getManifestMetadata;

function getLocalesForStructure(item) {
  var languages = [];

  if (Array.isArray(item)) {
    languages.push.apply(languages, _toConsumableArray(item.filter(function (i) {
      return typeof i === 'object' && i['@language'];
    }).map(function (i) {
      return i['@language'];
    })));
  } else if (item && typeof item === 'object') {
    if (item['@language']) languages.push(item['@language']);
  }

  return languages;
}
/** */


function getLocales(resource) {
  if (!resource) return [];
  var metadata = resource.getProperty('metadata') || [];
  var languages = {};

  for (var i = 0; i < metadata.length; i += 1) {
    var item = metadata[i];
    getLocalesForStructure(item.label).forEach(function (l) {
      languages[l] = true;
    });
    getLocalesForStructure(item.value).forEach(function (l) {
      languages[l] = true;
    });
  }

  return Object.keys(languages);
}

var getMetadataLocales = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return getLocales(manifest);
});
/** */

exports.getMetadataLocales = getMetadataLocales;
var getManifestSearchService = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  if (!manifest) return null;
  var searchService = manifest.getService('http://iiif.io/api/search/0/search') || manifest.getService('http://iiif.io/api/search/1/search');
  if (searchService) return searchService;
  return null;
});
/** */

exports.getManifestSearchService = getManifestSearchService;
var getManifestAutocompleteService = (0, _reselect.createSelector)([getManifestSearchService], function (searchService) {
  var autocompleteService = searchService && (searchService.getService('http://iiif.io/api/search/0/autocomplete') || searchService.getService('http://iiif.io/api/search/1/autocomplete'));
  return autocompleteService && autocompleteService;
});
exports.getManifestAutocompleteService = getManifestAutocompleteService;