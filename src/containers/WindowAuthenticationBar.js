import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { WindowAuthenticationBar } from '../components/WindowAuthenticationBar';
import { withWindowContext } from '../contexts/WindowContext';

const enhance = compose(
  withWindowContext,
  withPlugins('WindowAuthenticationBar'),
);

export default enhance(WindowAuthenticationBar);
