import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { WindowTopMenuButton } from '../components/WindowTopMenuButton';

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  badge: {
    backgroundColor: theme.palette.notification.main,
  },
  ctrlBtnSelected: {
    backgroundColor: theme.palette.action.selected,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withPlugins('WindowTopMenuButton'),
);

export default enhance(WindowTopMenuButton);
