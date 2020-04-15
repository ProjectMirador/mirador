import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';

import {
  getCurrentCanvas,
  selectAuthStatus,
  selectCanvasAuthService,
  selectLogoutAuthService,
} from '../state/selectors';
import * as actions from '../state/actions';
import { AuthenticationLogout } from '../components/AuthenticationLogout';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = (state, { windowId }) => {
  const canvasId = (getCurrentCanvas(state, { windowId }) || {}).id;
  const service = selectCanvasAuthService(state, { canvasId, windowId });
  const logoutService = selectLogoutAuthService(state, { canvasId, windowId });
  return {
    authServiceId: service && service.id,
    label: logoutService && logoutService.getLabel()[0].value,
    logoutServiceId: logoutService && logoutService.id,
    status: service && selectAuthStatus(state, service),
  };
};

const mapDispatchToProps = {
  resetAuthenticationState: actions.resetAuthenticationState,
};

const styles = {};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('AuthenticationLogout'),
);

export default enhance(AuthenticationLogout);
