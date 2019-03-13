import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getSelectedCanvas,
} from '../state/selectors';
import { WindowViewer } from '../components/WindowViewer';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { window }) => (
  {
    canvasLabel: getCanvasLabel(
      getSelectedCanvas(state, window.id),
      state.windows[window.id].canvasIndex,
    ),
    infoResponses: state.infoResponses,
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
};


const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(WindowViewer);
