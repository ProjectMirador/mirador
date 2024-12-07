import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { WindowAuthenticationBar } from '../components/WindowAuthenticationBar';

const enhance = compose(
  withTranslation(),
  withPlugins('WindowAuthenticationBar'),
);

export default enhance(WindowAuthenticationBar);
