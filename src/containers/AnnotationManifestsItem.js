import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { AnnotationManifestsItem } from '../components/AnnotationManifestsItem';
import {
  getManifest, getManifestDescription, getManifestLogo,
  getManifestProviderName, getManifestThumbnail, getManifestTitle,
  getWindowManifests,
} from '../state/selectors';

/** For connect */
const mapStateToProps = (state, { manifestId }) => {
  const manifest = getManifest(state, { manifestId }) || {};

  return {
    active: getWindowManifests(state)
      .includes(manifestId),
    description: getManifestDescription(state, { manifestId }),
    error: manifest.error,
    isFetching: manifest.isFetching,
    manifestLogo: getManifestLogo(state, { manifestId }),
    provider: getManifestProviderName(state, { manifestId }),
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

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationManifestsItem'),
);

export default enhance(AnnotationManifestsItem);
