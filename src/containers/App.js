import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { App } from '../components/App';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    language: state.config.language,
    theme: state.config.theme,
    translations: state.config.translations,
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  setWorkspaceFullscreen: actions.setWorkspaceFullscreen,
};

/**
 *
 * @param theme
 * @returns {{background: {background: string}}}
 */
const styles = theme => ({
  background: {
    background: theme.palette.background.default,
  },
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(App);
