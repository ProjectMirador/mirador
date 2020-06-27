import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { getWindows, getWorkspace } from '../state/selectors';
import * as actions from '../state/actions';
import { WorkspaceMosaic } from '../components/WorkspaceMosaic';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    layout: getWorkspace(state).layout,
    windowIds: Object.entries(getWindows(state))
      .sort((a, b) => a[1].layoutOrder - b[1].layoutOrder)
      .map(val => val[0]),
    workspaceId: getWorkspace(state).id,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { updateWorkspaceMosaicLayout: actions.updateWorkspaceMosaicLayout };

const styles = {
  root: {
    '& .mosaic-preview': {
      boxShadow: 'none',
    },
    '& .mosaic-tile': {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .2), 0 2px 1px -1px rgba(0, 0, 0, .2)',
    },
    '& .mosaic-window': {
      boxShadow: 'none',
    },
    '& .mosaic-window-toolbar': {
      display: 'none !important',
    },
  },
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceMosaic'),
  // further HOC go here
);

export default enhance(WorkspaceMosaic);
