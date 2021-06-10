"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCurrentAuthServices = exports.getAuth = exports.getAccessTokens = exports.getAuthProfiles = void 0;

var _reselect = require("reselect");

var _Utils = require("manifesto.js/dist-esmodule/Utils");

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _MiradorCanvas = _interopRequireDefault(require("../../lib/MiradorCanvas"));

var _utils = require("./utils");

var _config = require("./config");

var _canvases = require("./canvases");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getAuthProfiles = (0, _reselect.createSelector)([_config.getConfig], function (_ref) {
  var _ref$auth = _ref.auth;
  _ref$auth = _ref$auth === void 0 ? {} : _ref$auth;
  var _ref$auth$serviceProf = _ref$auth.serviceProfiles,
      serviceProfiles = _ref$auth$serviceProf === void 0 ? [] : _ref$auth$serviceProf;
  return serviceProfiles;
});
/** */

exports.getAuthProfiles = getAuthProfiles;

var getAccessTokens = function getAccessTokens(state) {
  return (0, _utils.miradorSlice)(state).accessTokens || {};
};
/** */


exports.getAccessTokens = getAccessTokens;

var getAuth = function getAuth(state) {
  return (0, _utils.miradorSlice)(state).auth || {};
};

exports.getAuth = getAuth;
var selectCurrentAuthServices = (0, _reselect.createSelector)([_canvases.getVisibleCanvases, _canvases.selectInfoResponses, getAuthProfiles, getAuth, function (state, _ref2) {
  var iiifResources = _ref2.iiifResources;
  return iiifResources;
}], function (canvases) {
  var infoResponses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var serviceProfiles = arguments.length > 2 ? arguments[2] : undefined;
  var auth = arguments.length > 3 ? arguments[3] : undefined;
  var iiifResources = arguments.length > 4 ? arguments[4] : undefined;
  var currentAuthResources = iiifResources;

  if (!currentAuthResources && canvases) {
    currentAuthResources = (0, _flatten["default"])(canvases.map(function (c) {
      var miradorCanvas = new _MiradorCanvas["default"](c);
      var images = miradorCanvas.iiifImageResources;
      return images.map(function (i) {
        var iiifImageService = i.getServices()[0];
        var infoResponse = infoResponses[iiifImageService.id];

        if (infoResponse && infoResponse.json) {
          return _objectSpread(_objectSpread({}, infoResponse.json), {}, {
            options: {}
          });
        }

        return iiifImageService;
      });
    }));
  }

  if (!currentAuthResources) return [];
  if (currentAuthResources.length === 0) return [];
  var currentAuthServices = currentAuthResources.map(function (resource) {
    var lastAttemptedService;

    var services = _Utils.Utils.getServices(resource);

    var _iterator = _createForOfIteratorHelper(serviceProfiles),
        _step;

    try {
      var _loop = function _loop() {
        var authProfile = _step.value;
        var profiledAuthServices = services.filter(function (p) {
          return authProfile.profile === p.getProfile();
        });

        var _iterator2 = _createForOfIteratorHelper(profiledAuthServices),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var service = _step2.value;
            lastAttemptedService = service;

            if (!auth[service.id] || auth[service.id].isFetching || auth[service.id].ok) {
              return {
                v: service
              };
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ret = _loop();

        if (typeof _ret === "object") return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return lastAttemptedService;
  });
  return Object.values(currentAuthServices.reduce(function (h, service) {
    if (service && !h[service.id]) {
      h[service.id] = service; // eslint-disable-line no-param-reassign
    }

    return h;
  }, {}));
});
exports.selectCurrentAuthServices = selectCurrentAuthServices;