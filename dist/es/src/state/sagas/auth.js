import _regeneratorRuntime from "@babel/runtime/regenerator";

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(refetchInfoResponsesOnLogout),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(refetchInfoResponses),
    _marked3 = /*#__PURE__*/_regeneratorRuntime.mark(doAuthWorkflow),
    _marked4 = /*#__PURE__*/_regeneratorRuntime.mark(rerequestOnAccessTokenFailure),
    _marked5 = /*#__PURE__*/_regeneratorRuntime.mark(invalidateInvalidAuth),
    _marked6 = /*#__PURE__*/_regeneratorRuntime.mark(authSaga);

import { all, call, put, select, takeEvery, delay } from 'redux-saga/effects';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import flatten from 'lodash/flatten';
import ActionTypes from '../actions/action-types';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { addAuthenticationRequest, resolveAuthenticationRequest, requestAccessToken, resetAuthenticationState } from '../actions';
import { selectInfoResponses, getVisibleCanvases, getWindows, getConfig, getAuth, getAccessTokens } from '../selectors';
import { fetchInfoResponse } from './iiif';
/** */

export function refetchInfoResponsesOnLogout(_ref) {
  var tokenServiceId;
  return _regeneratorRuntime.wrap(function refetchInfoResponsesOnLogout$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          tokenServiceId = _ref.tokenServiceId;
          _context.next = 3;
          return delay(2000);

        case 3:
          _context.next = 5;
          return call(refetchInfoResponses, {
            serviceId: tokenServiceId
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Figure out what info responses could have used the access token service and:
 *   - refetch, if they are currently visible
 *   - throw them out (and lazy re-fetch) otherwise
 */

export function refetchInfoResponses(_ref2) {
  var serviceId, windows, canvases, visibleImageApiIds, infoResponses, haveThisTokenService, obsoleteInfoResponses;
  return _regeneratorRuntime.wrap(function refetchInfoResponses$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          serviceId = _ref2.serviceId;
          _context2.next = 3;
          return select(getWindows);

        case 3:
          windows = _context2.sent;
          _context2.next = 6;
          return all(Object.keys(windows).map(function (windowId) {
            return select(getVisibleCanvases, {
              windowId: windowId
            });
          }));

        case 6:
          canvases = _context2.sent;
          visibleImageApiIds = flatten(flatten(canvases).map(function (canvas) {
            var miradorCanvas = new MiradorCanvas(canvas);
            return miradorCanvas.imageServiceIds;
          }));
          _context2.next = 10;
          return select(selectInfoResponses);

        case 10:
          infoResponses = _context2.sent;

          /** */
          haveThisTokenService = function haveThisTokenService(infoResponse) {
            var services = Utils.getServices(infoResponse);
            return services.some(function (e) {
              var infoTokenService = Utils.getService(e, 'http://iiif.io/api/auth/1/token') || Utils.getService(e, 'http://iiif.io/api/auth/0/token');
              return infoTokenService && infoTokenService.id === serviceId;
            });
          };

          obsoleteInfoResponses = Object.values(infoResponses).filter(function (i) {
            return i.json && haveThisTokenService(i.json);
          });
          _context2.next = 15;
          return all(obsoleteInfoResponses.map(function (_ref3) {
            var infoId = _ref3.id;

            if (visibleImageApiIds.includes(infoId)) {
              return call(fetchInfoResponse, {
                infoId: infoId
              });
            }

            return put({
              infoId: infoId,
              type: ActionTypes.REMOVE_INFO_RESPONSE
            });
          }));

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/** try to start any non-interactive auth flows */

export function doAuthWorkflow(_ref4) {
  var infoJson, windowId, auths, _yield$select, _yield$select$auth, _yield$select$auth$se, serviceProfiles, nonInteractiveAuthFlowProfiles, authService, profileConfig, tokenService;

  return _regeneratorRuntime.wrap(function doAuthWorkflow$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          infoJson = _ref4.infoJson, windowId = _ref4.windowId;
          _context3.next = 3;
          return select(getAuth);

        case 3:
          auths = _context3.sent;
          _context3.next = 6;
          return select(getConfig);

        case 6:
          _yield$select = _context3.sent;
          _yield$select$auth = _yield$select.auth;
          _yield$select$auth = _yield$select$auth === void 0 ? {} : _yield$select$auth;
          _yield$select$auth$se = _yield$select$auth.serviceProfiles, serviceProfiles = _yield$select$auth$se === void 0 ? [] : _yield$select$auth$se;
          nonInteractiveAuthFlowProfiles = serviceProfiles.filter(function (p) {
            return p.external || p.kiosk;
          }); // try to get an untried, non-interactive auth service

          authService = Utils.getServices(infoJson).filter(function (s) {
            return !auths[s.id];
          }).find(function (e) {
            return nonInteractiveAuthFlowProfiles.some(function (p) {
              return p.profile === e.getProfile();
            });
          });

          if (authService) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return");

        case 14:
          profileConfig = nonInteractiveAuthFlowProfiles.find(function (p) {
            return p.profile === authService.getProfile();
          });

          if (!profileConfig.kiosk) {
            _context3.next = 20;
            break;
          }

          _context3.next = 18;
          return put(addAuthenticationRequest(windowId, authService.id, authService.getProfile()));

        case 18:
          _context3.next = 28;
          break;

        case 20:
          if (!profileConfig.external) {
            _context3.next = 28;
            break;
          }

          tokenService = Utils.getService(authService, 'http://iiif.io/api/auth/1/token') || Utils.getService(authService, 'http://iiif.io/api/auth/0/token');

          if (tokenService) {
            _context3.next = 24;
            break;
          }

          return _context3.abrupt("return");

        case 24:
          _context3.next = 26;
          return put(resolveAuthenticationRequest(authService.id, tokenService.id));

        case 26:
          _context3.next = 28;
          return put(requestAccessToken(tokenService.id, authService.id));

        case 28:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/** */

export function rerequestOnAccessTokenFailure(_ref5) {
  var infoJson, windowId, tokenServiceId, authService, accessTokenServices, service;
  return _regeneratorRuntime.wrap(function rerequestOnAccessTokenFailure$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          infoJson = _ref5.infoJson, windowId = _ref5.windowId, tokenServiceId = _ref5.tokenServiceId;

          if (tokenServiceId) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return");

        case 3:
          // make sure we have an auth service to try
          authService = Utils.getServices(infoJson).find(function (service) {
            var tokenService = Utils.getService(service, 'http://iiif.io/api/auth/1/token') || Utils.getService(service, 'http://iiif.io/api/auth/0/token');
            return tokenService && tokenService.id === tokenServiceId;
          });

          if (authService) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return");

        case 6:
          _context4.next = 8;
          return select(getAccessTokens);

        case 8:
          accessTokenServices = _context4.sent;
          service = accessTokenServices[tokenServiceId];

          if (service && service.success) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return");

        case 12:
          _context4.next = 14;
          return put(requestAccessToken(tokenServiceId, authService.id));

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}
/** */

export function invalidateInvalidAuth(_ref6) {
  var serviceId, accessTokenServices, authServices, accessTokenService, authService;
  return _regeneratorRuntime.wrap(function invalidateInvalidAuth$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          serviceId = _ref6.serviceId;
          _context5.next = 3;
          return select(getAccessTokens);

        case 3:
          accessTokenServices = _context5.sent;
          _context5.next = 6;
          return select(getAuth);

        case 6:
          authServices = _context5.sent;
          accessTokenService = accessTokenServices[serviceId];

          if (accessTokenService) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return");

        case 10:
          authService = authServices[accessTokenService.authId];

          if (authService) {
            _context5.next = 13;
            break;
          }

          return _context5.abrupt("return");

        case 13:
          if (!accessTokenService.success) {
            _context5.next = 18;
            break;
          }

          _context5.next = 16;
          return put(resetAuthenticationState({
            authServiceId: authService.id,
            tokenServiceId: accessTokenService.id
          }));

        case 16:
          _context5.next = 20;
          break;

        case 18:
          _context5.next = 20;
          return put(resolveAuthenticationRequest(authService.id, accessTokenService.id, {
            ok: false
          }));

        case 20:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}
/** */

export default function authSaga() {
  return _regeneratorRuntime.wrap(function authSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return all([takeEvery(ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE, rerequestOnAccessTokenFailure), takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE, invalidateInvalidAuth), takeEvery(ActionTypes.RECEIVE_DEGRADED_INFO_RESPONSE, doAuthWorkflow), takeEvery(ActionTypes.RECEIVE_ACCESS_TOKEN, refetchInfoResponses), takeEvery(ActionTypes.RESET_AUTHENTICATION_STATE, refetchInfoResponsesOnLogout)]);

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}