import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropertyValue, Utils } from 'manifesto.js';
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
  console.log('[IIIFAuthentication] All probe responses:', Object.keys(probeResponses));

  if (services && services.length) {
    services.forEach((svc) => {
      // Look for probe response that corresponds to this auth service
      // Probe responses are keyed by probe service ID, not auth service ID
      let probeResponse = null;

      // Find probe response by checking if any probe service contains this auth service
      for (const [probeId, response] of Object.entries(probeResponses)) {
        if (response?.json) {
          // Check if this probe service contains our auth service
          const probeServices = Utils.getServices(response.json) || [];
          if (probeServices.some((s) => s.id === svc.id)) {
            probeResponse = response;
            break;
          }
        }
      }

      console.log('[IIIFAuthentication] Service:', svc.id, 'Type:', svc.getProfile && svc.getProfile(), 'Probe:', probeResponse);
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

  console.log('[IIIFAuthentication] Auth calculation for service:', service?.id);
  console.log('[IIIFAuthentication] authStatus:', authStatus);
  console.log('[IIIFAuthentication] accessTokenStatus:', accessTokenStatus);

  let status = null;

  if (!authStatus) {
    console.log('[IIIFAuthentication] No auth status - setting to null');
    status = null;
  } else if (authStatus.isFetching) {
    console.log('[IIIFAuthentication] Auth is fetching');
    if (authStatus.windowId === windowId) status = 'cookie';
  } else if (accessTokenStatus && accessTokenStatus.isFetching) {
    console.log('[IIIFAuthentication] Access token is fetching');
    if (authStatus.windowId === windowId) status = 'token';
  } else if (authStatus.ok) {
    console.log('[IIIFAuthentication] Auth status OK');
    status = 'ok';
  } else if (authStatus.ok === false) {
    // Only show retry if we've actually attempted authentication and have a token response
    // Otherwise show login to initiate the auth flow
    if (accessTokenStatus && (accessTokenStatus.success !== undefined || accessTokenStatus.error)) {
      console.log('[IIIFAuthentication] Auth status FAILED with token attempt - showing retry');
      status = 'failed';
    } else {
      console.log('[IIIFAuthentication] Auth status failed but no token attempt - showing login');
      status = null;
    }
  }

  console.log('[IIIFAuthentication] Final status:', status);

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
    logoutConfirm: getI18nValue(logoutService && logoutService.getLabel && logoutService.getLabel()),
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
