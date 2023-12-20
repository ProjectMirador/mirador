import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { WindowTopMenuButton } from '../components/WindowTopMenuButton';
import { withWindowContext } from '../contexts/WindowContext';

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  ctrlBtnSelected: {
    backgroundColor: theme.palette.action.selected,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWindowContext,
  withPlugins('WindowTopMenuButton'),
);

export default enhance(WindowTopMenuButton);
