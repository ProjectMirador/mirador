import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import Workspace from '../components/Workspace';

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


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { updateWorkspaceMosaicLayout: actions.updateWorkspaceMosaicLayout };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(Workspace);
