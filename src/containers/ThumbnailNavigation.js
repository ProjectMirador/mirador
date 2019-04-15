import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import CanvasGroupings from '../lib/CanvasGroupings';
import * as actions from '../state/actions';
import { ThumbnailNavigation } from '../components/ThumbnailNavigation';
import { getManifestCanvases, getCanvasIndex, getWindowViewType } from '../state/selectors';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  canvasGroupings: new CanvasGroupings(
    getManifestCanvases(state, { windowId }),
    state.windows[windowId].view,
  ),
  canvasIndex: getCanvasIndex(state, { windowId }),
  config: state.config,
  position: state.companionWindows[state.windows[windowId].thumbnailNavigationId].position,
  view: getWindowViewType(state, { windowId }),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailNavigation
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setCanvas: (...args) => dispatch(actions.setCanvas(windowId, ...args)),
});

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  thumbNavigation: {
    '&:focus': {
      boxShadow: 0,
      outline: 0,
    },
  },
});


const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ThumbnailNavigation'),
);

export default enhance(ThumbnailNavigation);
