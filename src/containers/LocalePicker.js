import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@mui/styles/withStyles';
import { LocalePicker } from '../components/LocalePicker';

/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */
const styles = theme => ({
  select: {
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  selectEmpty: {
    backgroundColor: theme.palette.background.paper,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
);

export default enhance(LocalePicker);
