"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestSearch = requestSearch;
exports.receiveSearch = receiveSearch;
exports.receiveSearchFailure = receiveSearchFailure;
exports.removeSearch = removeSearch;
exports.fetchSearch = fetchSearch;
exports.setContentSearchCurrentAnnotation = setContentSearchCurrentAnnotation;

var _actionTypes = _interopRequireDefault(require("./action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * requestSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} searchId
 * @param  {String} query
 * @memberof ActionCreators
 */
function requestSearch(windowId, companionWindowId, searchId, query) {
  return {
    companionWindowId: companionWindowId,
    query: query,
    searchId: searchId,
    type: _actionTypes["default"].REQUEST_SEARCH,
    windowId: windowId
  };
}
/**
 * receiveSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} searchId
 * @param  {Object} searchJson
 * @memberof ActionCreators
 */


function receiveSearch(windowId, companionWindowId, searchId, searchJson) {
  return {
    companionWindowId: companionWindowId,
    searchId: searchId,
    searchJson: searchJson,
    type: _actionTypes["default"].RECEIVE_SEARCH,
    windowId: windowId
  };
}
/**
 * receiveSearchFailure - action creator
 *
 * @param  {String} windowId
 * @param  {String} searchId
 * @param  {String} error
 * @memberof ActionCreators
 */


function receiveSearchFailure(windowId, companionWindowId, searchId, error) {
  return {
    companionWindowId: companionWindowId,
    error: error,
    searchId: searchId,
    type: _actionTypes["default"].RECEIVE_SEARCH_FAILURE,
    windowId: windowId
  };
}
/**
 * removeSearch - action creator
 *
 * @param  {String} windowId
 * @param  {String} companionWindowId
 * @memberof ActionCreators
 */


function removeSearch(windowId, companionWindowId) {
  return {
    companionWindowId: companionWindowId,
    type: _actionTypes["default"].REMOVE_SEARCH,
    windowId: windowId
  };
}
/**
 * fetchSearch - action creator
 *
 * @param  {String} searchId
 * @param  {String} query
 * @memberof ActionCreators
 */


function fetchSearch(windowId, companionWindowId, searchId, query) {
  return requestSearch(windowId, companionWindowId, searchId, query);
}
/**
 * setContentSearchCurrentAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */


function setContentSearchCurrentAnnotation(windowId, companionWindowId, annotationIds) {
  return {
    annotationIds: annotationIds,
    companionWindowId: companionWindowId,
    type: _actionTypes["default"].SET_CONTENT_SEARCH_CURRENT_ANNOTATIONS,
    windowId: windowId
  };
}