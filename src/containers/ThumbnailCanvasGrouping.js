import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getCurrentCanvas } from '../state/selectors';
import { ThumbnailCanvasGrouping } from '../components/ThumbnailCanvasGrouping';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailCanvasGrouping
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setCanvas: (...args) => dispatch(actions.setCanvas(windowId, ...args)),
});

/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailCanvasGrouping
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  currentCanvasId: (getCurrentCanvas(state, { windowId }) || {}).id,
});

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  canvas: {
    '&$currentCanvas': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '3px',
    },
    '&:hover': {
      outline: `9px solid ${theme.palette.action.hover}`,
      outlineOffset: '-2px',
    },
    boxSizing: 'border-box',
    color: theme.palette.common.white,
    cursor: 'pointer',
    display: 'inline-block',
    outline: 0,
    whiteSpace: 'nowrap',
  },
  currentCanvas: {
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ThumbnailCanvasGrouping'),
);

export default enhance(ThumbnailCanvasGrouping);
