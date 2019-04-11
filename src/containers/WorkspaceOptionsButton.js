import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import { WorkspaceOptionsButton } from '../components/WorkspaceOptionsButton';

const enhance = compose(
  withTranslation(),
  withPlugins('WorkspaceOptionsButton'),
);

export default enhance(WorkspaceOptionsButton);
