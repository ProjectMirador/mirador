import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { WindowTopMenuButton } from '../components/WindowTopMenuButton';

const enhance = compose(
  withTranslation(),
  withPlugins('WindowTopMenuButton'),
);

export default enhance(WindowTopMenuButton);
