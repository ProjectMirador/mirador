import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend';
import { WorkspaceControlPanel } from '../components/WorkspaceControlPanel';

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)},
 * drawer: {overflowX: string, height: string}}}
 */
const styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      left: 0,
      right: 'auto',
      width: 64,
      height: '100%',
    },
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
  drawer: {
    overflowX: 'hidden',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withPlugins('WorkspaceControlPanel'),
  // further HOC go here
);

export default enhance(WorkspaceControlPanel);
