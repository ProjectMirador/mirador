import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import * as actions from '../state/actions';
import { ManifestForm } from '../components/ManifestForm';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = { fetchManifest: actions.fetchManifest };

const enhance = compose(
  withTranslation(),
  connect(null, mapDispatchToProps),
);

export default enhance(ManifestForm);
