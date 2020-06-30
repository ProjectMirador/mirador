import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import WorkspaceElastic from '../components/WorkspaceElastic';
import {
  getElasticLayout,
  getWorkspace,
} from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    elasticLayout: getElasticLayout(state),
    workspace: getWorkspace(state),
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = (dispatch, props) => ({
  setWorkspaceViewportDimensions: (position) => {
    dispatch(
      actions.setWorkspaceViewportDimensions(position),
    );
  },
  setWorkspaceViewportPosition: (position) => {
    dispatch(
      actions.setWorkspaceViewportPosition(position),
    );
  },
  updateElasticWindowLayout: (windowId, position) => {
    dispatch(
      actions.updateElasticWindowLayout(windowId, position),
    );
  },
});

const styles = {
  workspace: {
    boxSizing: 'border-box',
    margin: 0,
    position: 'absolute',
    transitionDuration: '.7s',
    // order matters
    // eslint-disable-next-line sort-keys
    '& .react-draggable-dragging': {
      transitionDuration: 'unset',
    },
  },
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceElastic'),
  // further HOC go here
);

export default enhance(WorkspaceElastic);
