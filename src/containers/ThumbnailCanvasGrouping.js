import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getCurrentCanvas, getConfig } from '../state/selectors';
import { ThumbnailCanvasGrouping } from '../components/ThumbnailCanvasGrouping';

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
  showThumbnailLabels: getConfig(state).thumbnailNavigation.showThumbnailLabels,
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withPlugins('ThumbnailCanvasGrouping'));

export default enhance(ThumbnailCanvasGrouping);
