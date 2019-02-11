import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WorkspaceAddButton from '../components/WorkspaceAddButton';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
    manifests: state.manifests,
  }
);

const enhance = compose(
  connect(mapStateToProps),
  withNamespaces(),
  miradorWithPlugins,
);

export default enhance(WorkspaceAddButton);
