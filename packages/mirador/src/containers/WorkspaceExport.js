import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceExport } from '../components/WorkspaceExport';
import {
  getExportableState,
} from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({
  exportableState: getExportableState(state),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, {}),
  withPlugins('WorkspaceExport'),
);

export default enhance(WorkspaceExport);
