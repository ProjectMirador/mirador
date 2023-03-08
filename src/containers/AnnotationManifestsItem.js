import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { AnnotationManifestsItem } from '../components/AnnotationManifestsItem';
import {
  getManifest, getManifestLogo,
  getManifestProvider, getManifestThumbnail, getManifestTitle,
  getWindowManifests,
} from '../state/selectors';

/** For connect */
const mapStateToProps = (state, { manifestId }) => {
  const manifest = getManifest(state, { manifestId }) || {};

  return {
    active: getWindowManifests(state).includes(manifestId),
    error: manifest.error,
    isFetching: manifest.isFetching,
    manifestLogo: getManifestLogo(state, { manifestId }),
    provider: getManifestProvider(state, { manifestId }),
    ready: !!manifest.json,
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
  fetchManifest: actions.fetchManifest,
};

/** For withStyles */
const styles = theme => ({
  logo: {
    height: '2.5rem',
    maxWidth: '100%',
    objectFit: 'contain',
    paddingRight: 8,
  },
  thumbnail: {
    maxWidth: '100%',
    objectFit: 'contain',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationManifestsItem'),
);

export default enhance(AnnotationManifestsItem);
