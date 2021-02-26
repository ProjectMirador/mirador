import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getShowZoomControlsConfig, getViewer } from '../state/selectors';
import { ZoomControls } from '../components/ZoomControls';
/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    showZoomControls: getShowZoomControlsConfig(state),
    viewer: getViewer(state, {
      windowId: windowId
    })
  };
};
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */


var mapDispatchToProps = {
  updateViewport: actions.updateViewport
};
/**
 *
 * @param theme
 * @returns {{zoom_controls: {position: string, right: number},
 * ListItem: {paddingBottom: number, paddingTop: number}}}
 */

var styles = function styles(theme) {
  return {
    divider: {
      borderRight: '1px solid #808080',
      display: 'inline-block',
      height: '24px',
      margin: '12px 6px'
    },
    ListItem: {
      paddingBottom: 0,
      paddingTop: 0
    },
    zoom_controls: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('ZoomControls'));
export default enhance(ZoomControls);