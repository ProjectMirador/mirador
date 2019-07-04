import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getCurrentCanvas,
  selectAuthStatus,
  selectInfoResponse,
  selectCanvasAuthService,
} from '../state/selectors';
import { WindowAuthenticationControl } from '../components/WindowAuthenticationControl';


/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = (state, { windowId }) => {
  const canvasId = (getCurrentCanvas(state, { windowId }) || {}).id;
  const service = selectCanvasAuthService(state, { canvasId, windowId });
  const infoResponse = selectInfoResponse(state, { canvasId, windowId }) || {};

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
  buttonInvert: {
    '&:hover': {
      backgroundColor: fade(
        theme.palette.secondary.contrastText, 1 - theme.palette.action.hoverOpacity,
      ),
    },
    backgroundColor: theme.palette.secondary.contrastText,
  },
  expanded: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
  },
  failure: {
    backgroundColor: theme.palette.error.dark,
  },
  fauxButton: {
    marginLeft: theme.spacing(2.5),
  },
  icon: {
    marginRight: theme.spacing(1.5),
    verticalAlign: 'text-bottom',
  },
  label: {
    lineHeight: 2.25,
  },
  paper: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    cursor: 'pointer',
  },
  topBar: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    justifyContent: 'inherit',
    textTransform: 'none',
  },
});
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
  withPlugins('WindowAuthenticationControl'),
);

export default enhance(WindowAuthenticationControl);
