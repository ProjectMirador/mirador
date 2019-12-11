import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import CanvasGroupings from '../lib/CanvasGroupings';
import * as actions from '../state/actions';
import { ThumbnailNavigation } from '../components/ThumbnailNavigation';
import {
  getNextCanvasGrouping, getPreviousCanvasGrouping,
  getManifestCanvases, getCanvasIndex, getWindowViewType,
  getManifestViewingDirection,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */
const mapStateToProps = (state, { windowId }) => {
  const viewType = getWindowViewType(state, { windowId });
  return {
    canvasGroupings: new CanvasGroupings(
      getManifestCanvases(state, { windowId }),
      viewType,
    ),
    canvasIndex: getCanvasIndex(state, { windowId }),
    config: state.config,
    hasNextCanvas: !!getNextCanvasGrouping(state, { windowId }),
    hasPreviousCanvas: !!getPreviousCanvasGrouping(state, { windowId }),
    position: state.companionWindows[state.windows[windowId].thumbnailNavigationId].position,
    view: viewType,
    viewingDirection: getManifestViewingDirection(state, { windowId }),
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailNavigation
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setNextCanvas: (...args) => dispatch(actions.setNextCanvas(windowId)),
  setPreviousCanvas: (...args) => dispatch(actions.setPreviousCanvas(windowId)),
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
