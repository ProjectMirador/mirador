"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addResource = addResource;
exports.removeResource = removeResource;

var _actionTypes = _interopRequireDefault(require("./action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * add a manifest to the resource catalog
 * @param {string} manifestId
 */
function addResource(manifestId) {
  var manifestJson = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var payload = arguments.length > 2 ? arguments[2] : undefined;
  return {
    manifestId: manifestId,
    manifestJson: manifestJson,
    payload: payload,
    type: _actionTypes["default"].ADD_RESOURCE
  };
}
/** remove a manifest from the resource catalog */


function removeResource(manifestId) {
  return {
    manifestId: manifestId,
    type: _actionTypes["default"].REMOVE_RESOURCE
  };
}