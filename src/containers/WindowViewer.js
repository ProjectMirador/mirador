import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { WindowViewer } from '../components/WindowViewer';
import { getVisibleCanvases, getCurrentCanvas, getWindowViewType } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    currentCanvases: getVisibleCanvases(state, { windowId }) || [],
    currentCanvasId: (getCurrentCanvas(state, { windowId }) || {}).id,
    infoResponses: state.infoResponses,
    view: getWindowViewType(state, { windowId }),
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = {
  fetchAnnotation: actions.fetchAnnotation,
  fetchInfoResponse: actions.fetchInfoResponse,
  receiveAnnotation: actions.receiveAnnotation,
};


const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowViewer'),
  // further HOC go here
);

export default enhance(WindowViewer);
