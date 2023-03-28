import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { WindowTopMenuButton } from '../components/WindowTopMenuButton';
import { withWindowContext } from '../contexts/WindowContext';

const enhance = compose(
  withWindowContext,
  withPlugins('WindowTopMenuButton'),
);

export default enhance(WindowTopMenuButton);
