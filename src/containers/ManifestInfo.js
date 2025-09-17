import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend/withPlugins';
import {
  getManifestDescription,
  getManifestSummary,
  getManifestTitle,
  getManifestMetadata,
  getConfig,
} from '../state/selectors';
import { ManifestInfo } from '../components/ManifestInfo';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { companionWindowId, manifestId, windowId }) => ({
  labelValueJoiner: getConfig(state).labelValueJoiner,
  manifestDescription: getManifestDescription(state, {
    companionWindowId, manifestId, windowId,
  }),
  manifestLabel: getManifestTitle(state, { companionWindowId, manifestId, windowId }),
  manifestMetadata: getManifestMetadata(state, { companionWindowId, manifestId, windowId }),
  manifestSummary: getManifestSummary(state, {
    companionWindowId, manifestId, windowId,
  }),
});

const enhance = compose(
  connect(mapStateToProps),
  withPlugins('ManifestInfo'),
);

export default enhance(ManifestInfo);
