import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getFullScreenEnabled } from '../state/selectors';
import { FullScreenButton } from '../components/FullScreenButton';
/**
 * mapStateToProps - to hook up connect
 * @memberof FullScreenButton
 * @private
 */

var mapStateToProps = function mapStateToProps(state) {
  return {
    isFullscreenEnabled: getFullScreenEnabled(state)
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */


var mapDispatchToProps = {
  setWorkspaceFullscreen: actions.setWorkspaceFullscreen
};
var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('FullScreenButton'));
export default enhance(FullScreenButton);