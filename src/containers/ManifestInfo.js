import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import {
  getManifestDescription,
  getManifestTitle,
  getManifestMetadata,
  getCompanionWindowLanguages,
} from '../state/selectors';
import { ManifestInfo } from '../components/ManifestInfo';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, manifestId, windowId }) => {
  const langs = getCompanionWindowLanguages(state, { companionWindowId: id });
  return {
    manifestDescription: getManifestDescription(state, {
      manifestId, windowId,
    }, langs),
    manifestLabel: getManifestTitle(state, { manifestId, windowId }, langs),
    manifestMetadata: getManifestMetadata(state, { manifestId, windowId }, langs),
  };
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('ManifestInfo'),
);

export default enhance(ManifestInfo);
