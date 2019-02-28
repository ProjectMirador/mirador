import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { WorkspaceExport } from '../components/WorkspaceExport';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({ state });

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, {}),
  miradorWithPlugins,
);

export default enhance(WorkspaceExport);
