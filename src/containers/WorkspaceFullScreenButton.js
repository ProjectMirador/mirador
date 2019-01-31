import { connect } from 'react-redux';
import * as actions from '../state/actions';
import WorkspaceFullScreenButton
  from '../components/WorkspaceFullScreenButton';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { fullscreenWorkspace: actions.fullscreenWorkspace };

export default connect(null, mapDispatchToProps)(WorkspaceFullScreenButton);
