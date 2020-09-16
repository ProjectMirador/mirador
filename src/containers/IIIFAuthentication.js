import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getCurrentCanvas,
  getAuth,
  selectCanvasAuthService,
  getAccessTokens,
} from '../state/selectors';
import { IIIFAuthentication } from '../components/IIIFAuthentication';

/**
 * mapStateToProps - to hook up connect
 * @memberof FullScreenButton
 * @private
 */
const mapStateToProps = (state, { windowId }) => {
  const canvasId = (getCurrentCanvas(state, { windowId }) || {}).id;
  const service = selectCanvasAuthService(state, { canvasId, windowId });

  const accessTokenService = service && (
    Utils.getService(service, 'http://iiif.io/api/auth/1/token')
    || Utils.getService(service, 'http://iiif.io/api/auth/0/token')
  );
  const logoutService = service && (
    Utils.getService(service, 'http://iiif.io/api/auth/1/logout')
    || Utils.getService(service, 'http://iiif.io/api/auth/0/logout')
  );

  const authStatuses = getAuth(state) || {};
  const authStatus = service && authStatuses[service.id];
  const accessTokens = authStatus && accessTokenService && getAccessTokens(state);
  const accessTokenStatus = accessTokens && Object.values(accessTokens).find(
    e => e.id === accessTokenService.id,
  );

  const profile = service && service.getProfile();

  let status;

  if (!authStatus) {
    status = null;
  } else if (authStatus.ok) {
    status = 'ok';
  } else if (authStatus.isFetching) {
    if (authStatus.windowId === windowId) {
      status = 'cookie';
    }
  } else if (accessTokenStatus && accessTokenStatus.isFetching) {
    if (authStatus.windowId === windowId) {
      status = 'token';
    }
  } else {
    status = 'failed';
  }

  const isInteractive = profile !== 'http://iiif.io/api/auth/1/external' && profile !== 'http://iiif.io/api/auth/1/kiosk';

  return {
    accessTokenServiceId: accessTokenService && accessTokenService.id,
    authServiceId: service && service.id,
    confirm: service && service.getConfirmLabel(),
    description: service && service.getDescription(),
    failureDescription: service && service.getFailureDescription(),
    failureHeader: service && service.getFailureHeader(),
    header: service && service.getHeader(),
    isInteractive,
    label: service && service.getLabel()[0].value,
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

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('IIIFAuthentication'),
);

export default enhance(IIIFAuthentication);
