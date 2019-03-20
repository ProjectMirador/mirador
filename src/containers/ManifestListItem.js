import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend';
import {
  getManifestTitle, getManifestThumbnail, getManifestCanvases, getManifestLogo, getManifestProvider,
} from '../state/selectors';
import * as actions from '../state/actions';
import { ManifestListItem } from '../components/ManifestListItem';

/** */
const mapStateToProps = (state, { manifestId }) => {
  const manifest = state.manifests[manifestId];

  return {
    ready: !!manifest.manifestation,
    error: manifest.error,
    isFetching: manifest.isFetching,
    title: getManifestTitle(manifest),
    thumbnail: getManifestThumbnail(manifest),
    provider: getManifestProvider(manifest),
    size: getManifestCanvases(manifest).length,
    manifestLogo: getManifestLogo(state, { manifestId }),
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { addWindow: actions.addWindow, fetchManifest: actions.fetchManifest };

/**
 *
 * @param theme
 * @returns {{root: {}, label: {textAlign: string, textTransform: string}}}
 */
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
  },
  label: {
    textTransform: 'initial',
    textAlign: 'left',
  },
  logo: {
    height: '2.5rem',
    paddingRight: 8,
  },
  placeholder: {
    backgroundColor: theme.palette.grey[300],
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ManifestListItem'),
);

export default enhance(ManifestListItem);
