import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getTheme } from '../state/selectors';
import { AppProviders } from '../components/AppProviders';


/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    classPrefix: state.config.classPrefix,
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
    language: state.config.language,
    theme: getTheme(state),
    translations: state.config.translations,
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
  withPlugins('AppProviders'),
);

export default enhance(AppProviders);
