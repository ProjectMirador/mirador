import { connect } from 'react-redux';
import * as actions from '../state/actions';
import WorkspaceFullScreenButton
  from '../components/WorkspaceFullScreenButton';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWorkspaceFullscreen: actions.setWorkspaceFullscreen };

export default connect(null, mapDispatchToProps)(WorkspaceFullScreenButton);
