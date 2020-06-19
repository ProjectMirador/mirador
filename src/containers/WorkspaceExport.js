import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceExport } from '../components/WorkspaceExport';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({
  exportableState: state.config.export.state.reduce(
    (acc, stem) => { acc[stem] = state[stem]; return acc; }, {},
  ),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, {}),
  withPlugins('WorkspaceExport'),
);

export default enhance(WorkspaceExport);
