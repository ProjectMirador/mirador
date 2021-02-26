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

var mapStateToProps = function mapStateToProps(state) {
  return {
    createGenerateClassNameOptions: getConfig(state).createGenerateClassNameOptions,
    isFullscreenEnabled: getFullScreenEnabled(state),
    language: getConfig(state).language,
    theme: getTheme(state),
    translations: getConfig(state).translations
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */


var mapDispatchToProps = {
  setWorkspaceFullscreen: actions.setWorkspaceFullscreen
};
var enhance = compose(connect(mapStateToProps, mapDispatchToProps), withPlugins('AppProviders'));
export default enhance(AppProviders);