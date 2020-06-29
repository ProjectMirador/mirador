import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getConfig, getTheme, getFullScreenEnabled } from '../state/selectors';
import { AppProviders } from '../components/AppProviders';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    classPrefix: getConfig(state).classPrefix,
    isFullscreenEnabled: getFullScreenEnabled(state),
    language: getConfig(state).language,
    theme: getTheme(state),
    translations: getConfig(state).translations,
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
