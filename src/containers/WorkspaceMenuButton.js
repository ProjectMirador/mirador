import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceMenuButton } from '../components/WorkspaceMenuButton';

const enhance = compose(
  withTranslation(),
  withPlugins('WorkspaceMenuButton'),
  // further HOC
);

export default enhance(WorkspaceMenuButton);
