import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import {
  getManifestDescription,
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
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('ManifestInfo'),
);

export default enhance(ManifestInfo);
