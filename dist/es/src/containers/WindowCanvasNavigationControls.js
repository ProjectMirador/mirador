import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSize } from 'react-sizeme';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withPlugins } from '../extend/withPlugins';
import { getWorkspace } from '../state/selectors';
import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';
/** */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    visible: getWorkspace(state).focusedWindowId === windowId
  };
};
/**
 *
 * @param theme
 */


var styles = function styles(theme) {
  return {
    canvasNav: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      textAlign: 'center'
    },
    canvasNavStacked: {
      flexDirection: 'column'
    },
    controls: {
      backgroundColor: fade(theme.palette.background.paper, 0.5),
      bottom: 0,
      position: 'absolute',
      width: '100%',
      zIndex: 50
    }
  };
};

var enhance = compose(connect(mapStateToProps), withStyles(styles), withSize(), withPlugins('WindowCanvasNavigationControls'));
export default enhance(WindowCanvasNavigationControls);