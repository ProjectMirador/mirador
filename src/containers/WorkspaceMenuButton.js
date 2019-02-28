import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { WorkspaceMenuButton } from '../components/WorkspaceMenuButton';

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  miradorWithPlugins,
  // further HOC
);

export default enhance(WorkspaceMenuButton);
