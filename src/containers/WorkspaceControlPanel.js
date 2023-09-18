import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceControlPanel } from '../components/WorkspaceControlPanel';

const enhance = compose(
  withTranslation(),
  withPlugins('WorkspaceControlPanel'),
  // further HOC go here
);

export default enhance(WorkspaceControlPanel);
