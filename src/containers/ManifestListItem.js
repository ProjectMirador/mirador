import { connect } from 'react-redux';
import { getManifestTitle, getManifestLogo, getManifestThumbnail } from '../state/selectors';
import * as actions from '../state/actions';
import ManifestListItem from '../components/ManifestListItem';

/** */
const mapStateToProps = (state, { manifestId }) => ({
  title: getManifestTitle(state.manifests[manifestId]),
  logo: getManifestLogo(state.manifests[manifestId]),
  thumbnail: getManifestThumbnail(state.manifests[manifestId]),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { addWindow: actions.addWindow };

export default connect(mapStateToProps, mapDispatchToProps)(ManifestListItem);
