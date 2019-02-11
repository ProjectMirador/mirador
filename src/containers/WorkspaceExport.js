import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WorkspaceExport from '../components/WorkspaceExport';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({ state });

const enhance = compose(
  connect(mapStateToProps, {}),
  miradorWithPlugins,
  withNamespaces(),
  // further HOC go here
);

export default enhance(WorkspaceExport);
