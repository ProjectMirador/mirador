import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WorkspaceMenuButton from '../components/WorkspaceMenuButton';

/**
 * @private
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});

const enhance = compose(
  withNamespaces(),
  withStyles(styles),
  miradorWithPlugins,
  // further HOC
);

export default enhance(WorkspaceMenuButton);
