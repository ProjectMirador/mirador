import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { ThumbnailNavigation } from '../components/ThumbnailNavigation';
import {
  getCompanionWindow, getWindow,
  getNextCanvasGrouping, getPreviousCanvasGrouping,
  getCanvasGroupings, getCanvasIndex, getWindowViewType,
  getSequenceViewingDirection, getConfig,
} from '../state/selectors';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  canvasGroupings: getCanvasGroupings(state, { windowId }),
  canvasIndex: getCanvasIndex(state, { windowId }),
  hasNextCanvas: !!getNextCanvasGrouping(state, { windowId }),
  hasPreviousCanvas: !!getPreviousCanvasGrouping(state, { windowId }),
  position: getCompanionWindow(state, {
    companionWindowId: getWindow(state, { windowId }).thumbnailNavigationId,
  }).position,
  thumbnailNavigation: getConfig(state).thumbnailNavigation,
  view: getWindowViewType(state, { windowId }),
  viewingDirection: getSequenceViewingDirection(state, { windowId }),
});

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
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ThumbnailNavigation'),
);

export default enhance(ThumbnailNavigation);
