import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { fetchManifest, removeManifest } from '../state/actions/manifest';
import ManifestListItemError from '../components/ManifestListItemError';

/** */
const mapDispatchToProps = {
  onDismissClick: removeManifest,
  onTryAgainClick: fetchManifest,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
  withNamespaces(),
  // further HOC
);

export default enhance(ManifestListItemError);
