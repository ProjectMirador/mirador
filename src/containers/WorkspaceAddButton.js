import { connect } from 'react-redux';
import WorkspaceAddButton from '../components/WorkspaceAddButton';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
    manifests: state.manifests,
  }
);

export default connect(mapStateToProps)(WorkspaceAddButton);
