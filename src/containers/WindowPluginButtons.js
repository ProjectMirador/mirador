import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import { WindowPluginButtons } from '../components/WindowPluginButtons';

export default compose(
  withTranslation(),
  withPlugins('WindowPluginButtons'),
)(WindowPluginButtons);
