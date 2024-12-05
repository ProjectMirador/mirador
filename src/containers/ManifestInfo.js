import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import {
  getManifestDescription,
  getManifestSummary,
  getManifestTitle,
  getManifestMetadata,
} from '../state/selectors';
import { ManifestInfo } from '../components/ManifestInfo';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, manifestId, windowId }) => ({
  manifestDescription: getManifestDescription(state, {
    companionWindowId: id, manifestId, windowId,
  }),
  manifestLabel: getManifestTitle(state, { companionWindowId: id, manifestId, windowId }),
  manifestMetadata: getManifestMetadata(state, { companionWindowId: id, manifestId, windowId }),
  manifestSummary: getManifestSummary(state, {
    companionWindowId: id, manifestId, windowId,
  }),
});

const enhance = compose(
  connect(mapStateToProps),
  withPlugins('ManifestInfo'),
);

export default enhance(ManifestInfo);
