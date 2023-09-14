import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { LocalePicker } from '../components/LocalePicker';

const enhance = compose(
  withTranslation(),
);

export default enhance(LocalePicker);
