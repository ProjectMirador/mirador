import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { LocalePicker } from '../components/LocalePicker';
/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */

var styles = function styles(theme) {
  return {
    select: {
      '&:focus': {
        backgroundColor: theme.palette.background.paper
      }
    },
    selectEmpty: {
      backgroundColor: theme.palette.background.paper
    }
  };
};

var enhance = compose(withTranslation(), withStyles(styles));
export default enhance(LocalePicker);