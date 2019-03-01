import { withStyles } from '@material-ui/core/styles';
import { WorkspaceControlPanel } from '../components/WorkspaceControlPanel';

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)},
 * drawer: {overflowX: string, height: string}}}
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
  drawer: {
    overflowX: 'hidden',
  },
});

export default withStyles(styles)(WorkspaceControlPanel);
