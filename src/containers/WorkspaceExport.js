import { compose } from 'redux';
import { connect } from 'react-redux';
import WorkspaceExport from '../components/WorkspaceExport';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({ state });

const enhance = compose(
  connect(mapStateToProps, {}),
  // further HOC go here
);

export default enhance(WorkspaceExport);
