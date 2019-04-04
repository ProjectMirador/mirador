import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { selectInfoResponse, selectInteractiveAuthServices } from '../state/selectors';
import { WindowAuthenticationControl } from '../components/WindowAuthenticationControl';


/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = (state, { windowId }) => {
  const interactiveAuthService = selectInteractiveAuthServices(state, { canvasIndex: 'selected', windowId });
  const infoResponse = selectInfoResponse(state, { canvasIndex: 'selected', windowId }) || {};

  return {
    confirmLabel: interactiveAuthService && interactiveAuthService.getConfirmLabel(),
    degraded: infoResponse.degraded,
    description: interactiveAuthService && interactiveAuthService.getDescription(),
    header: interactiveAuthService && interactiveAuthService.getHeader(),
    infoId: infoResponse.id,
    label: interactiveAuthService && interactiveAuthService.getLabel()[0].value,
    profile: interactiveAuthService && interactiveAuthService.getProfile(),
    serviceId: interactiveAuthService && interactiveAuthService.id,
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
