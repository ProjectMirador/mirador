import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { getWorkspace } from '../state/selectors';
import WorkspaceGrid from '../components/WorkspaceGrid';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    gridTemplate: state.gridLayout,
    windowIds: getWorkspace(state).windowIds,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = {};

const styles = {};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceGrid'),
  // further HOC go here
);

export default enhance(WorkspaceGrid);
