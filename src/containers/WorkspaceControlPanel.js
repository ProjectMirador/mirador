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
  branding: {
    display: 'flex',
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      bottom: 0,
      display: 'block',
      float: 'none',
      right: 'auto',
      width: '100%',
    },
    right: 0,
  },
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
  drawer: {
    overflowX: 'hidden',
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      height: '100%',
      left: 0,
      right: 'auto',
      width: 'auto',
    },
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
    },
  },
  wide: {
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withPlugins('WorkspaceControlPanel'),
  // further HOC go here
);

export default enhance(WorkspaceControlPanel);
