import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import {
  getManifest,
  getManifestTitle, getManifestThumbnail, getCanvases,
  getManifestLogo, getManifestProvider, getWindowManifests,
  getManifestoInstance, getSequenceBehaviors,
} from '../state/selectors';
import * as actions from '../state/actions';
import { ManifestListItem } from '../components/ManifestListItem';

/** */
const mapStateToProps = (state, { manifestId, provider }) => {
  const manifest = getManifest(state, { manifestId }) || {};
  const manifesto = getManifestoInstance(state, { manifestId });
  const isCollection = (
    manifesto || { isCollection: () => false }
  ).isCollection();

  const size = isCollection
    ? manifesto.getTotalItems()
    : getCanvases(state, { manifestId }).length;
  return {
    active: getWindowManifests(state).includes(manifestId),
    error: manifest.error,
    isCollection,
    isFetching: manifest.isFetching,
    isMultipart: isCollection
      && getSequenceBehaviors(state, { manifestId }).includes('multi-part'),
    manifestLogo: getManifestLogo(state, { manifestId }),
    provider: provider
      || getManifestProvider(state, { manifestId }),
    ready: !!manifest.json,
    size,
    thumbnail: getManifestThumbnail(state, { manifestId }),
    title: getManifestTitle(state, { manifestId }),
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  addWindow: actions.addWindow,
  fetchManifest: actions.fetchManifest,
};

/**
 *
 * @param theme
 * @returns {{root: {}, label: {textAlign: string, textTransform: string}}}
 */
const styles = theme => ({
  active: {},
  buttonGrid: {
  },
  label: {
    textAlign: 'left',
    textTransform: 'initial',
  },
  logo: {
    height: '2.5rem',
    maxWidth: '100%',
    objectFit: 'contain',
    paddingRight: 8,
  },
  placeholder: {
    backgroundColor: theme.palette.grey[300],
  },
  root: {
    ...theme.mixins.gutters(),
    '&$active': {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
    },
    '&:hover,&:focus-within': {
      '&$active': {
        borderLeft: `4px solid ${theme.palette.primary.main}`,
      },
      backgroundColor: theme.palette.action.hover,
      borderLeft: `4px solid ${theme.palette.action.hover}`,
    },
    borderLeft: '4px solid transparent',
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
  withPlugins('ManifestListItem'),
);

export default enhance(ManifestListItem);
