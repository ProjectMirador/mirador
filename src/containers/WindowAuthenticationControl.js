import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { selectAuthStatus, selectInfoResponse, selectCanvasAuthService } from '../state/selectors';
import { WindowAuthenticationControl } from '../components/WindowAuthenticationControl';


/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = (state, { windowId }) => {
  const service = selectCanvasAuthService(state, { canvasIndex: 'selected', windowId });
  const infoResponse = selectInfoResponse(state, { canvasIndex: 'selected', windowId }) || {};

  return {
    confirmLabel: service && service.getConfirmLabel(),
    degraded: infoResponse.degraded,
    description: service && service.getDescription(),
    failureDescription: service && service.getFailureDescription(),
    failureHeader: service && service.getFailureHeader(),
    header: service && service.getHeader(),
    infoId: infoResponse.id,
    label: service && service.getLabel()[0].value,
    profile: service && service.getProfile(),
    serviceId: service && service.id,
    status: service && selectAuthStatus(state, service),
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  handleAuthInteraction: actions.addAuthenticationRequest,
};
/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
const styles = theme => ({
  failure: {
    backgroundColor: theme.palette.error.dark,
  },
  snackbar: {
    position: 'absolute',
  },
});
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('WindowAuthenticationControl'),
);

export default enhance(WindowAuthenticationControl);
