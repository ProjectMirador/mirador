import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import Workspace from '../components/Workspace';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, props) => ({
  setWorkspaceViewportPosition: (position) => {
    dispatch(
      actions.setWorkspaceViewportPosition(position),
    );
  },
  toggleWorkspaceExposeMode: size => dispatch(
    actions.toggleWorkspaceExposeMode(),
  ),
});

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    windows: state.windows,
    workspace: state.workspace,
  }
);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(Workspace);
