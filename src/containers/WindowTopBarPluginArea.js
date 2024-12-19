import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { WindowTopBarPluginArea } from '../components/WindowTopBarPluginArea';
import { withWindowContext } from '../contexts/WindowContext';

const enhance = compose(
  withWindowContext,
  withPlugins('WindowTopBarPluginArea'),
);

export default enhance(WindowTopBarPluginArea);
