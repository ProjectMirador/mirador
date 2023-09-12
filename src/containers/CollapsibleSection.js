import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { CollapsibleSection } from '../components/CollapsibleSection';

const enhance = compose(
  withTranslation(),
);

export default enhance(CollapsibleSection);
