import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '../state/actions';
import WindowList from '../components/WindowList';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  focusWindow: actions.focusWindow,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
    windows: state.windows,
    manifests: state.manifests,
  }
);

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces(),
  // further HOC
);

export default enhance(WindowList);
