import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowTopMenuButton from '../components/WindowTopMenuButton';

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
  withNamespaces(),
  withStyles(styles),
  miradorWithPlugins,
);

export default enhance(WindowTopMenuButton);
