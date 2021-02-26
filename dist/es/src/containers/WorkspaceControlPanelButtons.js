import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceControlPanelButtons } from '../components/WorkspaceControlPanelButtons';
/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */

var styles = function styles(theme) {
  return {
    ctrlBtn: {
      margin: theme.spacing(1)
    }
  };
};

var enhance = compose(withStyles(styles), withPlugins('WorkspaceControlPanelButtons'));
export default enhance(WorkspaceControlPanelButtons);