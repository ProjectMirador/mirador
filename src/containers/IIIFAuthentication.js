import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropertyValue } from 'manifesto.js';
import { withPlugins } from '../extend/withPlugins';
import { getLogoutService, getTokenService } from '../lib/getServices';
import * as actions from '../state/actions';
import { getAuth, getAuthProfiles, selectCurrentAuthServices, getAccessTokens } from '../state/selectors';
import { IIIFAuthentication } from '../components/IIIFAuthentication';

/**
 * mapStateToProps - to hook up connect
 * @memberof FullScreenButton
 * @private
 */
// eslint-disable-next-line complexity
const mapStateToProps = (state, { windowId }) => {
    // Debug: log all current auth services and probe responses
    const services = selectCurrentAuthServices(state, { windowId });
    console.log('[IIIFAuthentication] Auth services for window', windowId, services);

    const probeResponses = state.mirador?.probeResponses || {};
    if (services && services.length) {
      services.forEach(svc => {
        const probe = probeResponses[svc.id];
        console.log('[IIIFAuthentication] Service:', svc.id, 'Type:', svc.getProfile && svc.getProfile(), 'Probe:', probe);
      });
    }
  // const services = selectCurrentAuthServices(state, { windowId });

  // TODO: get the most actionable auth service...
  const service = services[0];

  const accessTokenService = getTokenService(service);
  const logoutService = getLogoutService(service);

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

  // Helper to convert IIIF i18n values to strings
  const getI18nValue = (value) => {
    if (!value) return undefined;
    if (typeof value === 'string') return value;
    if (value.getValue) return value.getValue();
    // Handle Auth2 probe response i18n format {en: ["text"]}
    if (typeof value === 'object' && !Array.isArray(value)) {
      const propertyValue = new PropertyValue(value);
      return propertyValue.getValue();
    }
    return undefined;
  };

  return {
    accessTokenServiceId: accessTokenService && accessTokenService.id,
    authServiceId: service && service.id,
    confirm: getI18nValue(service && service.getConfirmLabel && service.getConfirmLabel()),
    description: getI18nValue(service && service.getDescription && service.getDescription()),
    failureDescription: getI18nValue(service && service.getFailureDescription && service.getFailureDescription()),
    failureHeader: getI18nValue(service && service.getFailureHeader && service.getFailureHeader()),
    header: getI18nValue(service && service.getHeader && service.getHeader()),
    isInteractive,
    label: getI18nValue(service && service.getLabel && service.getLabel()),
    logoutConfirm: getI18nValue(logoutService
      && logoutService.getLabel
      && logoutService.getLabel()),
    logoutServiceId: logoutService && logoutService.id,
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
