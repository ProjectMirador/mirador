import { compose } from 'redux';
import { connect } from 'react-redux';
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

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowAuthenticationControl'),
);

export default enhance(WindowAuthenticationControl);
