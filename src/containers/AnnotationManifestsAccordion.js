import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { AnnotationManifestsAccordion } from '../components/AnnotationManifestsAccordion';
import * as actions from '../state/actions';
import {
  getConfig, getManifest,
  getManifestTitle, getManifestThumbnail, getCanvases,
  getManifestLogo, getManifestProvider, getWindowManifests,
  getManifestoInstance, getSequenceBehaviors, getManifestDescription,
} from '../state/selectors';

/** Search if the annotation is a manifest. URL must be resolvable for the annotation. So the manifest url is added at the end of the id */
function searchManifestInID(id) {
  const match = id.match(
    /((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)#((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)/gi,
  );

  return match ? match[0].split('#').slice(-1) : null;
}

/** For connect */
const mapStateToProps = (state, { annotation }) => {
  const manifestId = searchManifestInID(annotation.id);

  return {
    htmlSanitizationRuleSet: getConfig(state).annotations.htmlSanitizationRuleSet,
    manifests: new Array(manifestId),
    thumbnail: getManifestThumbnail(state, { manifestId }),
    title: getManifestTitle(state, { manifestId }),
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapDispatchToProps = {
  addResource: actions.addResource,
  addWindow: actions.addWindow,

};

/** For withStyles */
const styles = theme => ({
  manifestContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: '10px',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationManifestsAccordion'),
);

export default enhance(AnnotationManifestsAccordion);
