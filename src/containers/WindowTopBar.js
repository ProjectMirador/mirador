import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowTopBar from '../components/WindowTopBar';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { removeWindow: actions.removeWindow };

const enhance = compose(
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(WindowTopBar);
