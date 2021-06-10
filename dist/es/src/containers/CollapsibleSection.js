import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { CollapsibleSection } from '../components/CollapsibleSection';
var styles = {
  button: {
    padding: 0
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  heading: {
    cursor: 'pointer'
  }
};
var enhance = compose(withTranslation(), withStyles(styles));
export default enhance(CollapsibleSection);