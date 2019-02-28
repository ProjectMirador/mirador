import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import { App } from '../components/App';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    errors: state.errors,
    language: state.config.language,
    theme: state.config.theme,
    translations: state.config.translations,
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  removeError: actions.removeError,
  setWorkspaceFullscreen: actions.setWorkspaceFullscreen,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(App);
