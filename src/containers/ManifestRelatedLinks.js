import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import {
  getManifestUrl,
} from '../state/selectors';
import { ManifestRelatedLinks } from '../components/ManifestRelatedLinks';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => ({
  manifestUrl: getManifestUrl(state, { windowId }),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('ManifestRelatedLinks'),
);

export default enhance(ManifestRelatedLinks);
