import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import App from '../components/App';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    theme: state.config.theme,
    translations: state.config.translations,
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
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

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(App);
