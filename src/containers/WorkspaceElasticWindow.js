import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import WorkspaceElasticWindow from '../components/WorkspaceElasticWindow';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    focused: state.workspace.focusedWindowId === windowId,
    layout: state.elasticLayout[windowId],
    workspace: state.workspace,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = (dispatch, props) => ({
  updateElasticWindowLayout: (windowId, position) => {
    dispatch(
      actions.updateElasticWindowLayout(windowId, position),
    );
  },
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(WorkspaceElasticWindow);
