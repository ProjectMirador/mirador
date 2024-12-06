import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { WorkspaceOptionsMenu } from '../components/WorkspaceOptionsMenu';

const enhance = compose(
  withTranslation(),
);

export default enhance(WorkspaceOptionsMenu);
