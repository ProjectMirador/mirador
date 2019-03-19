import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import { getWindowManifest, getManifestTitle } from '../state/selectors';
import { MosaicRenderPreview } from '../components/MosaicRenderPreview';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    title: getManifestTitle(getWindowManifest(state, windowId)),
  }
);

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  preview: {
    ...theme.typography.h4,
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('MosaicRenderPreview'),
);

export default enhance(MosaicRenderPreview);
