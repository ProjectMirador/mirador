import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceControlPanelButtons }
  from '../components/WorkspaceControlPanelButtons';

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing(1),
  },
});

const enhance = compose(
  withStyles(styles),
  withPlugins('WorkspaceControlPanelButtons'),
);

export default enhance(WorkspaceControlPanelButtons);
