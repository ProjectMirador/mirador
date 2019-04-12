import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { WorkspaceMosaic } from '../components/WorkspaceMosaic';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    layout: state.workspace.layout,
    windows: state.windows,
    workspaceId: state.workspace.id,
  }
);


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { updateWorkspaceMosaicLayout: actions.updateWorkspaceMosaicLayout };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceMosaic'),
  // further HOC go here
);

export default enhance(WorkspaceMosaic);
