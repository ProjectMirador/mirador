import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { WindowViewer } from '../components/WindowViewer';
import { getManifestCanvases } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { window }) => (
  {
    canvases: getManifestCanvases(state, { windowId: window.id }),
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
  withPlugins('WindowViewer'),
  // further HOC go here
);

export default enhance(WindowViewer);
