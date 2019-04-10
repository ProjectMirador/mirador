import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { CollapsableSection } from '../components/CollapsableSection';

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

export default enhance(CollapsableSection);
