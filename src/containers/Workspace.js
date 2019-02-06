import { compose } from 'redux';
import { connect } from 'react-redux';
import Workspace from '../components/Workspace';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    workspaceType: state.config.workspace.type,
    windows: state.windows,
  }
);

const enhance = compose(
  connect(mapStateToProps),
  // further HOC go here
);

export default enhance(Workspace);
