import { compose } from 'redux';
import { connect } from 'react-redux';
import { withSize } from 'react-sizeme';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { WindowViewer } from '../components/WindowViewer';
import {
  getSelectedCanvases,
  getCanvasIndex,
  getWindowHeight,
  getWindowViewType,
} from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    canvasIndex: getCanvasIndex(state, { windowId }),
    currentCanvases: getSelectedCanvases(state, { windowId }),
    height: getWindowHeight(state, { windowId }),
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
  setWindowHeight: actions.setWindowHeight,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({ monitorHeight: true, refreshMode: 'debounce' }),
  withPlugins('WindowViewer'),
  // further HOC go here
);

export default enhance(WindowViewer);
