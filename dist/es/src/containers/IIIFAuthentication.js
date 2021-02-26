import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getAuth, getAuthProfiles, selectCurrentAuthServices, getAccessTokens } from '../state/selectors';
import { IIIFAuthentication } from '../components/IIIFAuthentication';
/**
 * mapStateToProps - to hook up connect
 * @memberof FullScreenButton
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var services = selectCurrentAuthServices(state, {
    windowId: windowId
  }); // TODO: get the most actionable auth service...

  var service = services[0];
  var accessTokenService = service && (Utils.getService(service, 'http://iiif.io/api/auth/1/token') || Utils.getService(service, 'http://iiif.io/api/auth/0/token'));
  var logoutService = service && (Utils.getService(service, 'http://iiif.io/api/auth/1/logout') || Utils.getService(service, 'http://iiif.io/api/auth/0/logout'));
  var authStatuses = getAuth(state);
  var authStatus = service && authStatuses[service.id];
  var accessTokens = getAccessTokens(state);
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

  var authProfiles = getAuthProfiles(state);
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
var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('IIIFAuthentication'));
export default enhance(IIIFAuthentication);