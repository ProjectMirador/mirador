import { withStyles } from '@material-ui/core/styles';
import { SanitizedHtml } from '../components/SanitizedHtml';
/**
 * Styles for withStyles HOC
 */

var styles = function styles(theme) {
  return {
    root: {
      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'underline'
      }
    }
  };
};

export default withStyles(styles)(SanitizedHtml);