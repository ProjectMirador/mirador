import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { WindowTopBarPluginMenu } from '../components/WindowTopBarPluginMenu';
import { withWindowContext } from '../contexts/WindowContext';

const enhance = compose(
  withWindowContext,
  withPlugins('WindowTopBarPluginMenu'),
);

export default enhance(WindowTopBarPluginMenu);
