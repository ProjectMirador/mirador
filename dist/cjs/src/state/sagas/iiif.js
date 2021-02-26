"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchManifest = fetchManifest;
exports.fetchInfoResponse = fetchInfoResponse;
exports.fetchSearchResponse = fetchSearchResponse;
exports.fetchAnnotation = fetchAnnotation;
exports.fetchResourceManifest = fetchResourceManifest;
exports.fetchManifests = fetchManifests;
exports["default"] = iiifSaga;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _isomorphicUnfetch = _interopRequireDefault(require("isomorphic-unfetch"));

var _Utils = require("manifesto.js/dist-esmodule/Utils");

var _normalizeUrl = _interopRequireDefault(require("normalize-url"));

var _actionTypes = _interopRequireDefault(require("../actions/action-types"));

var _actions = require("../actions");

var _selectors = require("../selectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _marked = /*#__PURE__*/_regenerator["default"].mark(fetchIiifResource),
    _marked2 = /*#__PURE__*/_regenerator["default"].mark(fetchIiifResourceWithAuth),
    _marked3 = /*#__PURE__*/_regenerator["default"].mark(fetchManifest),
    _marked4 = /*#__PURE__*/_regenerator["default"].mark(getAccessTokenService),
    _marked5 = /*#__PURE__*/_regenerator["default"].mark(fetchInfoResponse),
    _marked6 = /*#__PURE__*/_regenerator["default"].mark(fetchSearchResponse),
    _marked7 = /*#__PURE__*/_regenerator["default"].mark(fetchAnnotation),
    _marked8 = /*#__PURE__*/_regenerator["default"].mark(fetchResourceManifest),
    _marked9 = /*#__PURE__*/_regenerator["default"].mark(fetchManifests),
    _marked10 = /*#__PURE__*/_regenerator["default"].mark(iiifSaga);

/** */
function fetchWrapper(url, options, _ref) {
  var success = _ref.success,
      degraded = _ref.degraded,
      failure = _ref.failure;
  return (0, _isomorphicUnfetch["default"])(url, options).then(function (response) {
    return response.json().then(function (json) {
      if (response.status === 401) return (degraded || success)({
        json: json,
        response: response
      });
      if (response.ok) return success({
        json: json,
        response: response
      });
      return failure({
        error: response.statusText,
        json: json,
        response: response
      });
    })["catch"](function (error) {
      return failure({
        error: error,
        response: response
      });
    });
  })["catch"](function (error) {
    return failure({
      error: error
    });
  });
}
/** */


function fetchIiifResource(url, options, _ref2) {
  var success, degraded, failure, _yield$select, _yield$select$preproc, preprocessors, _yield$select$postpro, postprocessors, reqOptions, action;

  return _regenerator["default"].wrap(function fetchIiifResource$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          success = _ref2.success, degraded = _ref2.degraded, failure = _ref2.failure;
          _context.next = 3;
          return (0, _effects.select)(_selectors.getRequestsConfig);

        case 3:
          _yield$select = _context.sent;
          _yield$select$preproc = _yield$select.preprocessors;
          preprocessors = _yield$select$preproc === void 0 ? [] : _yield$select$preproc;
          _yield$select$postpro = _yield$select.postprocessors;
          postprocessors = _yield$select$postpro === void 0 ? [] : _yield$select$postpro;
          _context.prev = 8;
          reqOptions = preprocessors.reduce(function (acc, f) {
            return f(url, acc) || acc;
          }, options);
          _context.next = 12;
          return (0, _effects.call)(fetchWrapper, url, reqOptions, {
            degraded: degraded,
            failure: failure,
            success: success
          });

        case 12:
          action = _context.sent;
          action = postprocessors.reduce(function (acc, f) {
            return f(url, acc) || acc;
          }, action);
          return _context.abrupt("return", action);

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](8);
          return _context.abrupt("return", failure({
            error: _context.t0
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[8, 17]]);
}
/** */


function fetchIiifResourceWithAuth(url, iiifResource, options, _ref3) {
  var degraded, failure, success, urlOptions, tokenServiceId, tokenService, _yield$call, error, json, response, id, authoritativeTokenService;

  return _regenerator["default"].wrap(function fetchIiifResourceWithAuth$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          degraded = _ref3.degraded, failure = _ref3.failure, success = _ref3.success;
          urlOptions = _objectSpread({}, options);

          if (!iiifResource) {
            _context2.next = 8;
            break;
          }

          _context2.next = 5;
          return (0, _effects.call)(getAccessTokenService, iiifResource);

        case 5:
          tokenService = _context2.sent;
          tokenServiceId = tokenService && tokenService.id;

          if (tokenService && tokenService.json) {
            urlOptions.headers = _objectSpread({
              Authorization: "Bearer ".concat(tokenService.json.accessToken)
            }, options.headers);
          }

        case 8:
          _context2.next = 10;
          return (0, _effects.call)(fetchIiifResource, url, urlOptions, {
            failure: function failure(arg) {
              return arg;
            },
            success: function success(arg) {
              return arg;
            }
          });

        case 10:
          _yield$call = _context2.sent;
          error = _yield$call.error;
          json = _yield$call.json;
          response = _yield$call.response;

          if (!error) {
            _context2.next = 18;
            break;
          }

          _context2.next = 17;
          return (0, _effects.put)(failure({
            error: error,
            json: json,
            response: response,
            tokenServiceId: tokenServiceId
          }));

        case 17:
          return _context2.abrupt("return");

        case 18:
          id = json['@id'] || json.id;

          if (!response.ok) {
            _context2.next = 26;
            break;
          }

          if (!((0, _normalizeUrl["default"])(id, {
            stripAuthentication: false
          }) === (0, _normalizeUrl["default"])(url.replace(/info\.json$/, ''), {
            stripAuthentication: false
          }))) {
            _context2.next = 24;
            break;
          }

          _context2.next = 23;
          return (0, _effects.put)(success({
            json: json,
            response: response,
            tokenServiceId: tokenServiceId
          }));

        case 23:
          return _context2.abrupt("return");

        case 24:
          _context2.next = 30;
          break;

        case 26:
          if (!(response.status !== 401)) {
            _context2.next = 30;
            break;
          }

          _context2.next = 29;
          return (0, _effects.put)(failure({
            error: error,
            json: json,
            response: response,
            tokenServiceId: tokenServiceId
          }));

        case 29:
          return _context2.abrupt("return");

        case 30:
          _context2.next = 32;
          return (0, _effects.call)(getAccessTokenService, json);

        case 32:
          authoritativeTokenService = _context2.sent;

          if (!(authoritativeTokenService && authoritativeTokenService.id !== tokenServiceId)) {
            _context2.next = 37;
            break;
          }

          _context2.next = 36;
          return (0, _effects.call)(fetchIiifResourceWithAuth, url, json, options, {
            degraded: degraded,
            failure: failure,
            success: success
          });

        case 36:
          return _context2.abrupt("return");

        case 37:
          _context2.next = 39;
          return (0, _effects.put)((degraded || success)({
            json: json,
            response: response,
            tokenServiceId: tokenServiceId
          }));

        case 39:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/** */


function fetchManifest(_ref4) {
  var manifestId, callbacks, dispatch;
  return _regenerator["default"].wrap(function fetchManifest$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          manifestId = _ref4.manifestId;
          callbacks = {
            failure: function failure(_ref5) {
              var error = _ref5.error,
                  json = _ref5.json,
                  response = _ref5.response;
              return (0, _actions.receiveManifestFailure)(manifestId, typeof error === 'object' ? String(error) : error);
            },
            success: function success(_ref6) {
              var json = _ref6.json,
                  response = _ref6.response;
              return (0, _actions.receiveManifest)(manifestId, json);
            }
          };
          _context3.next = 4;
          return (0, _effects.call)(fetchIiifResource, manifestId, {}, callbacks);

        case 4:
          dispatch = _context3.sent;
          _context3.next = 7;
          return (0, _effects.put)(dispatch);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/** @private */


function getAccessTokenService(resource) {
  var manifestoCompatibleResource, services, accessTokens, i, authService, accessTokenService, token;
  return _regenerator["default"].wrap(function getAccessTokenService$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          manifestoCompatibleResource = resource && resource.__jsonld ? resource : _objectSpread(_objectSpread({}, resource), {}, {
            options: {}
          });
          services = _Utils.Utils.getServices(manifestoCompatibleResource).filter(function (s) {
            return s.getProfile().match(/http:\/\/iiif.io\/api\/auth\//);
          });

          if (!(services.length === 0)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", undefined);

        case 4:
          _context4.next = 6;
          return (0, _effects.select)(_selectors.getAccessTokens);

        case 6:
          accessTokens = _context4.sent;

          if (accessTokens) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", undefined);

        case 9:
          i = 0;

        case 10:
          if (!(i < services.length)) {
            _context4.next = 19;
            break;
          }

          authService = services[i];
          accessTokenService = _Utils.Utils.getService(authService, 'http://iiif.io/api/auth/1/token') || _Utils.Utils.getService(authService, 'http://iiif.io/api/auth/0/token');
          token = accessTokenService && accessTokens[accessTokenService.id];

          if (!(token && token.json)) {
            _context4.next = 16;
            break;
          }

          return _context4.abrupt("return", token);

        case 16:
          i += 1;
          _context4.next = 10;
          break;

        case 19:
          return _context4.abrupt("return", undefined);

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}
/** @private */


function fetchInfoResponse(_ref7) {
  var imageResource, infoId, windowId, iiifResource, callbacks;
  return _regenerator["default"].wrap(function fetchInfoResponse$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          imageResource = _ref7.imageResource, infoId = _ref7.infoId, windowId = _ref7.windowId;
          iiifResource = imageResource;

          if (iiifResource) {
            _context5.next = 6;
            break;
          }

          _context5.next = 5;
          return (0, _effects.select)(_selectors.selectInfoResponse, {
            infoId: infoId
          });

        case 5:
          iiifResource = _context5.sent;

        case 6:
          callbacks = {
            degraded: function degraded(_ref8) {
              var json = _ref8.json,
                  response = _ref8.response,
                  tokenServiceId = _ref8.tokenServiceId;
              return (0, _actions.receiveDegradedInfoResponse)(infoId, json, response.ok, tokenServiceId, windowId);
            },
            failure: function failure(_ref9) {
              var error = _ref9.error,
                  json = _ref9.json,
                  response = _ref9.response,
                  tokenServiceId = _ref9.tokenServiceId;
              return (0, _actions.receiveInfoResponseFailure)(infoId, error, tokenServiceId);
            },
            success: function success(_ref10) {
              var json = _ref10.json,
                  response = _ref10.response,
                  tokenServiceId = _ref10.tokenServiceId;
              return (0, _actions.receiveInfoResponse)(infoId, json, response.ok, tokenServiceId);
            }
          };
          _context5.next = 9;
          return (0, _effects.call)(fetchIiifResourceWithAuth, "".concat(infoId.replace(/\/$/, ''), "/info.json"), iiifResource, {}, callbacks);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}
/** @private */


function fetchSearchResponse(_ref11) {
  var windowId, companionWindowId, query, searchId, callbacks, dispatch;
  return _regenerator["default"].wrap(function fetchSearchResponse$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          windowId = _ref11.windowId, companionWindowId = _ref11.companionWindowId, query = _ref11.query, searchId = _ref11.searchId;
          callbacks = {
            failure: function failure(_ref12) {
              var error = _ref12.error,
                  json = _ref12.json,
                  response = _ref12.response;
              return (0, _actions.receiveSearchFailure)(windowId, companionWindowId, searchId, error);
            },
            success: function success(_ref13) {
              var json = _ref13.json,
                  response = _ref13.response;
              return (0, _actions.receiveSearch)(windowId, companionWindowId, searchId, json);
            }
          };
          _context6.next = 4;
          return (0, _effects.call)(fetchIiifResource, searchId, {}, callbacks);

        case 4:
          dispatch = _context6.sent;
          _context6.next = 7;
          return (0, _effects.put)(dispatch);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}
/** @private */


function fetchAnnotation(_ref14) {
  var targetId, annotationId, callbacks, dispatch;
  return _regenerator["default"].wrap(function fetchAnnotation$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          targetId = _ref14.targetId, annotationId = _ref14.annotationId;
          callbacks = {
            failure: function failure(_ref15) {
              var error = _ref15.error,
                  json = _ref15.json,
                  response = _ref15.response;
              return (0, _actions.receiveAnnotationFailure)(targetId, annotationId, error);
            },
            success: function success(_ref16) {
              var json = _ref16.json,
                  response = _ref16.response;
              return (0, _actions.receiveAnnotation)(targetId, annotationId, json);
            }
          };
          _context7.next = 4;
          return (0, _effects.call)(fetchIiifResource, annotationId, {}, callbacks);

        case 4:
          dispatch = _context7.sent;
          _context7.next = 7;
          return (0, _effects.put)(dispatch);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}
/** */


function fetchResourceManifest(_ref17) {
  var manifestId, manifestJson, manifests;
  return _regenerator["default"].wrap(function fetchResourceManifest$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          manifestId = _ref17.manifestId, manifestJson = _ref17.manifestJson;

          if (!manifestJson) {
            _context8.next = 5;
            break;
          }

          _context8.next = 4;
          return (0, _effects.put)((0, _actions.receiveManifest)(manifestId, manifestJson));

        case 4:
          return _context8.abrupt("return");

        case 5:
          if (manifestId) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return");

        case 7:
          _context8.next = 9;
          return (0, _effects.select)(_selectors.getManifests) || {};

        case 9:
          manifests = _context8.sent;

          if (manifests[manifestId]) {
            _context8.next = 12;
            break;
          }

          return _context8.delegateYield(fetchManifest({
            manifestId: manifestId
          }), "t0", 12);

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}
/** */


function fetchManifests() {
  var manifests,
      i,
      manifestId,
      _args9 = arguments;
  return _regenerator["default"].wrap(function fetchManifests$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _effects.select)(_selectors.getManifests);

        case 2:
          manifests = _context9.sent;
          i = 0;

        case 4:
          if (!(i < _args9.length)) {
            _context9.next = 12;
            break;
          }

          manifestId = i < 0 || _args9.length <= i ? undefined : _args9[i];

          if (manifests[manifestId]) {
            _context9.next = 9;
            break;
          }

          _context9.next = 9;
          return (0, _effects.call)(fetchManifest, {
            manifestId: manifestId
          });

        case 9:
          i += 1;
          _context9.next = 4;
          break;

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}
/** */


function iiifSaga() {
  return _regenerator["default"].wrap(function iiifSaga$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _effects.all)([(0, _effects.takeEvery)(_actionTypes["default"].REQUEST_MANIFEST, fetchManifest), (0, _effects.takeEvery)(_actionTypes["default"].REQUEST_INFO_RESPONSE, fetchInfoResponse), (0, _effects.takeEvery)(_actionTypes["default"].REQUEST_SEARCH, fetchSearchResponse), (0, _effects.takeEvery)(_actionTypes["default"].REQUEST_ANNOTATION, fetchAnnotation), (0, _effects.takeEvery)(_actionTypes["default"].ADD_RESOURCE, fetchResourceManifest)]);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}