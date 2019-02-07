import { connect } from 'react-redux';
import { getWindowManifest, getManifestLogo } from '../state/selectors';
import WindowIcon from '../components/WindowIcon';

/** */
const mapStateToProps = (state, { windowId }) => ({
  manifestLogo: getManifestLogo(getWindowManifest(state, windowId)),
});

export default connect(mapStateToProps)(WindowIcon);
