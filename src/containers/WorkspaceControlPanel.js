import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
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
      width: 96,
      height: '100%',
    },
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
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
  // further HOC go here
);

export default enhance(WorkspaceControlPanel);
