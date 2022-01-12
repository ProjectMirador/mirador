import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import {
  getManifestHomepage,
  getManifestRelatedContent,
  getManifestRenderings,
  getManifestUrl,
  getCompanionWindowLanguages,
} from '../state/selectors';
import { ManifestRelatedLinks } from '../components/ManifestRelatedLinks';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => {
  const langs = getCompanionWindowLanguages(state, { companionWindowId: id });
  return {
    homepage: getManifestHomepage(state, { windowId }, langs),
    manifestUrl: getManifestUrl(state, { windowId }),
    renderings: getManifestRenderings(state, { windowId }, langs),
    seeAlso: getManifestRelatedContent(state, { windowId }, langs),
  };
};

const styles = {
  labelValueMetadata: {
    '& dd': {
      marginBottom: '.5em',
      marginLeft: '0',
    },
  },
};

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('ManifestRelatedLinks'),
);

export default enhance(ManifestRelatedLinks);
