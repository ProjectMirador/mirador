import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { MiradorMenuButton } from '../components/MiradorMenuButton';
import { withWorkspaceContext } from '../contexts/WorkspaceContext';

const enhance = compose(
  withWorkspaceContext,
  withPlugins('MiradorMenuButton'),
);

export default enhance(MiradorMenuButton);
