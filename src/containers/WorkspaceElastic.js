import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import WorkspaceElastic from '../components/WorkspaceElastic';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    workspace: state.workspace,
    windows: state.windows,
  }
);


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = (dispatch, props) => ({
  setWorkspaceViewportPosition: (x, y) => {
    dispatch(
      actions.setWorkspaceViewportPosition(x, y),
    );
  },
  toggleWorkspaceExposeMode: size => dispatch(
    actions.toggleWorkspaceExposeMode(),
  ),
  updateWindowPosition: (windowId, position) => {
    dispatch(
      actions.updateWindowPosition(windowId, position),
    );
  },
  setWindowSize: (windowId, size) => {
    dispatch(
      actions.setWindowSize(windowId, size),
    );
  },
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(WorkspaceElastic);
