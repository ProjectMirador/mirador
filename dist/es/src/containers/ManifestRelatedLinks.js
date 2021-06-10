import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { getManifestHomepage, getManifestRelatedContent, getManifestRenderings, getManifestUrl } from '../state/selectors';
import { ManifestRelatedLinks } from '../components/ManifestRelatedLinks';
/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */

var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
      windowId = _ref.windowId;
  return {
    homepage: getManifestHomepage(state, {
      windowId: windowId
    }),
    manifestUrl: getManifestUrl(state, {
      windowId: windowId
    }),
    renderings: getManifestRenderings(state, {
      windowId: windowId
    }),
    seeAlso: getManifestRelatedContent(state, {
      windowId: windowId
    })
  };
};

var styles = {
  labelValueMetadata: {
    '& dd': {
      marginBottom: '.5em',
      marginLeft: '0'
    }
  }
};
var enhance = compose(withStyles(styles), withTranslation(), connect(mapStateToProps), withPlugins('ManifestRelatedLinks'));
export default enhance(ManifestRelatedLinks);