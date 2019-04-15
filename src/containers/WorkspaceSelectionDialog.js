import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceSelectionDialog } from '../components/WorkspaceSelectionDialog';
import * as actions from '../state/actions';
import { getWorkspaceType } from '../state/selectors';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  updateConfig: actions.updateConfig,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({ workspaceType: getWorkspaceType(state) });

/** */
const styles = theme => ({
  dialog: {
    width: '400px',
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: 'pointer',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceSelectionDialog'),
);

export default enhance(WorkspaceSelectionDialog);
