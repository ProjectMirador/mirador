import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { CollapsibleSection } from '../components/CollapsibleSection';

const styles = {
  button: {
    float: 'right',
    padding: 0,
  },
  heading: {
    cursor: 'pointer',
  },
};

const enhance = compose(
  withTranslation(),
  withStyles(styles),
);

export default enhance(CollapsibleSection);
