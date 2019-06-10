import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { WorkspaceAddButton } from '../components/WorkspaceAddButton';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = (state, { width }) => {
  const { isWorkspaceAddVisible } = state.workspace;
  return {
    isWorkspaceAddVisible,
    useExtendedFab: (
      (width !== 'xs')
        && !isWorkspaceAddVisible
        && Object.keys(state.windows).length === 0
    ),
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility };

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  fabPrimary: {
    '&:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  fabSecondary: {
    '&:focus': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceAddButton'),
);

export default enhance(WorkspaceAddButton);
