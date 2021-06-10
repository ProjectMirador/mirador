"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactI18next = require("react-i18next");

var _Utils = require("manifesto.js/dist-esmodule/Utils");

var _withPlugins = require("../extend/withPlugins");

var actions = _interopRequireWildcard(require("../state/actions"));

var _selectors = require("../state/selectors");

var _IIIFAuthentication = require("../components/IIIFAuthentication");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * mapStateToProps - to hook up connect
 * @memberof FullScreenButton
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var services = (0, _selectors.selectCurrentAuthServices)(state, {
    windowId: windowId
  }); // TODO: get the most actionable auth service...

  var service = services[0];

  var accessTokenService = service && (_Utils.Utils.getService(service, 'http://iiif.io/api/auth/1/token') || _Utils.Utils.getService(service, 'http://iiif.io/api/auth/0/token'));

  var logoutService = service && (_Utils.Utils.getService(service, 'http://iiif.io/api/auth/1/logout') || _Utils.Utils.getService(service, 'http://iiif.io/api/auth/0/logout'));

  var authStatuses = (0, _selectors.getAuth)(state);
  var authStatus = service && authStatuses[service.id];
  var accessTokens = (0, _selectors.getAccessTokens)(state);
  var accessTokenStatus = accessTokenService && accessTokens[accessTokenService.id];
  var status = null;

  if (!authStatus) {
    status = null;
  } else if (authStatus.isFetching) {
    if (authStatus.windowId === windowId) status = 'cookie';
  } else if (accessTokenStatus && accessTokenStatus.isFetching) {
    if (authStatus.windowId === windowId) status = 'token';
  } else if (authStatus.ok) {
    status = 'ok';
  } else if (authStatus.ok === false) {
    status = 'failed';
  }

  var authProfiles = (0, _selectors.getAuthProfiles)(state);
  var profile = service && service.getProfile();
  var isInteractive = authProfiles.some(function (config) {
    return config.profile === profile && !(config.external || config.kiosk);
  });
  return {
    accessTokenServiceId: accessTokenService && accessTokenService.id,
    authServiceId: service && service.id,
    confirm: service && service.getConfirmLabel(),
    description: service && service.getDescription(),
    failureDescription: service && service.getFailureDescription(),
    failureHeader: service && service.getFailureHeader(),
    header: service && service.getHeader(),
    isInteractive: isInteractive,
    label: service && service.getLabel()[0].value,
    logoutConfirm: logoutService && logoutService.getLabel()[0] && logoutService.getLabel()[0].value,
    logoutServiceId: logoutService && logoutService.id,
    profile: profile,
    status: status
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */


var mapDispatchToProps = {
  handleAuthInteraction: actions.addAuthenticationRequest,
  resetAuthenticationState: actions.resetAuthenticationState,
  resolveAccessTokenRequest: actions.resolveAccessTokenRequest,
  resolveAuthenticationRequest: actions.resolveAuthenticationRequest
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('IIIFAuthentication'));

var _default = enhance(_IIIFAuthentication.IIIFAuthentication);

exports["default"] = _default;