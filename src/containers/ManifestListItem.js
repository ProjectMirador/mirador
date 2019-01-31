import { connect } from 'react-redux';
import * as actions from '../state/actions';
import ManifestListItem from '../components/ManifestListItem';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { addWindow: actions.addWindow };

export default connect(null, mapDispatchToProps)(ManifestListItem);
