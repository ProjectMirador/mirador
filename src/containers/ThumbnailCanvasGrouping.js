import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getWindow, getCanvasIndex } from '../state/selectors';
import { ThumbnailCanvasGrouping } from '../components/ThumbnailCanvasGrouping';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailCanvasGrouping
 * @private
 */
const mapDispatchToProps = (dispatch, { data }) => ({
  setCanvas: (...args) => dispatch(actions.setCanvas(data.windowId, ...args)),
});

/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailCanvasGrouping
 * @private
 */
const mapStateToProps = (state, { data }) => ({
  canvasIndex: getCanvasIndex(state, { windowId: data.windowId }),
  window: getWindow(state, { windowId: data.windowId }),
});

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  canvas: {
    '&$currentCanvas': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    border: '2px solid transparent',
    boxSizing: 'border-box',
    color: theme.palette.common.white,
    cursor: 'pointer',
  },
  currentCanvas: {
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ThumbnailCanvasGrouping'),
);

export default enhance(ThumbnailCanvasGrouping);
