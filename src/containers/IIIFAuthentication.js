import { connect } from 'react-redux';
import { compose } from 'redux';
import { Utils } from 'manifesto.js';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getAuth, getAuthProfiles, selectCurrentAuthServices, getAccessTokens, getConfig } from '../state/selectors';
import { IIIFAuthentication } from '../components/IIIFAuthentication';
import { auth2Text, getAuth2RelatedService } from '../lib/auth2';

/**
 * mapStateToProps - to hook up connect
 * @memberof FullScreenButton
 * @private
 */
// eslint-disable-next-line complexity
const mapStateToProps = (state, { windowId }) => {
  const services = selectCurrentAuthServices(state, { windowId });

  // TODO: get the most actionable auth service...
  const service = services[0];
  const auth2Service = service && service.auth2Service;
  const auth2Json = auth2Service && auth2Service.__jsonld;
  const locale = getConfig(state).language;

  const accessTokenService =
    service &&
    ((auth2Service && getAuth2RelatedService(auth2Service, 'AuthAccessTokenService2')) ||
      Utils.getService(service, 'http://iiif.io/api/auth/1/token') ||
      Utils.getService(service, 'http://iiif.io/api/auth/0/token'));
  const logoutService =
    service &&
    ((auth2Service && getAuth2RelatedService(auth2Service, 'AuthLogoutService2')) ||
      Utils.getService(service, 'http://iiif.io/api/auth/1/logout') ||
      Utils.getService(service, 'http://iiif.io/api/auth/0/logout'));

  const authStatuses = getAuth(state);
  const authStatus = service && authStatuses[service.id];
  const accessTokens = getAccessTokens(state);
  const accessTokenStatus = accessTokenService && accessTokens[accessTokenService.id];

  let status = null;

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

  const authProfiles = getAuthProfiles(state);

  const profile = service && service.getProfile();

  const isInteractive = authProfiles.some((config) => config.profile === profile && !(config.external || config.kiosk));

  return {
    accessTokenServiceId: accessTokenService && accessTokenService.id,
    authServiceId: service && service.id,
    confirm: auth2Service ? auth2Text(auth2Json.confirmLabel, locale) : service && service.getConfirmLabel(),
    description: auth2Service ? auth2Text(auth2Json.note, locale) : service && service.getDescription(),
    failureDescription: auth2Service
      ? auth2Text(service.auth2ProbeResult?.note || accessTokenService?.__jsonld.errorNote, locale)
      : service && service.getFailureDescription(),
    failureHeader: auth2Service
      ? auth2Text(service.auth2ProbeResult?.heading || accessTokenService?.__jsonld.errorHeading, locale)
      : service && service.getFailureHeader(),
    header: auth2Service ? auth2Text(auth2Json.heading, locale) : service && service.getHeader(),
    isInteractive,
    label: auth2Service ? auth2Text(auth2Json.label, locale) || 'Access required' : service && service.getLabel()[0].value,
    logoutConfirm: auth2Service
      ? auth2Text(logoutService?.__jsonld.label, locale)
      : logoutService && logoutService.getLabel()[0] && logoutService.getLabel()[0].value,
    logoutServiceId: logoutService && logoutService.id,
    loginServiceId: auth2Service && auth2Service.id,
    profile,
    status,
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  handleAuthInteraction: actions.addAuthenticationRequest,
  resetAuthenticationState: actions.resetAuthenticationState,
  resolveAccessTokenRequest: actions.resolveAccessTokenRequest,
  resolveAuthenticationRequest: actions.resolveAuthenticationRequest,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withPlugins('IIIFAuthentication'));

export default enhance(IIIFAuthentication);
