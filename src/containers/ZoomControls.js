import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '../state/actions';
import ZoomControls from '../components/ZoomControls';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    showZoomControls: state.workspace.showZoomControls,
    viewer: state.viewers[props.windowId],
  }
);


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { updateViewport: actions.updateViewport };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces(),
  // further HOC go here
);

export default enhance(ZoomControls);
