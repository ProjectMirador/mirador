import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { getManifestTitle } from '../state/selectors';
import { MosaicRenderPreview } from '../components/MosaicRenderPreview';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    title: getManifestTitle(state, { windowId }),
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('MosaicRenderPreview'),
);

export default enhance(MosaicRenderPreview);
