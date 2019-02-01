import { connect } from 'react-redux';
import * as actions from '../state/actions';
import ManifestForm from '../components/ManifestForm';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = { fetchManifest: actions.fetchManifest };


export default connect(null, mapDispatchToProps)(ManifestForm);
