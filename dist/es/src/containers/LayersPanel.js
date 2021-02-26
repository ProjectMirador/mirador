import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { LayersPanel } from '../components/LayersPanel';
import { getVisibleCanvasIds } from '../state/selectors';
/**
 * mapStateToProps - to hook up connect
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  return {
    canvasIds: getVisibleCanvasIds(state, {
      windowId: windowId
    })
  };
};
/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */


var styles = function styles(theme) {
  return {};
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps), withPlugins('LayersPanel'));
export default enhance(LayersPanel);