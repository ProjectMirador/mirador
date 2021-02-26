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

var styles = function styles(theme) {
  return {
    ctrlBtnSelected: {
      backgroundColor: theme.palette.action.selected
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles), withPlugins('WindowTopMenuButtons'));
export default enhance(WindowTopMenuButton);