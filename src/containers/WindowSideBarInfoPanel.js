import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowSideBarInfoPanel from '../components/WindowSideBarInfoPanel';

const enhance = compose(
  withNamespaces(),
  miradorWithPlugins,
  // further HOC
);

export default enhance(WindowSideBarInfoPanel);
