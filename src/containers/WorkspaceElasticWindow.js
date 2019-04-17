import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import * as actions from '../state/actions';
import WorkspaceElasticWindow from '../components/WorkspaceElasticWindow';
import { selectCompanionWindowDimensions } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    companionWindowDimensions: selectCompanionWindowDimensions(state, { windowId }),
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

/**
 * @param theme
 */
const styles = theme => ({
  focused: {
    zIndex: theme.zIndex.modal - 1,
  },
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(WorkspaceElasticWindow);
