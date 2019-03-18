import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import { WorkspaceAddButton } from '../components/WorkspaceAddButton';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
  }
);

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
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      marginLeft: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2,
    },

    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceAddButton'),
);

export default enhance(WorkspaceAddButton);
