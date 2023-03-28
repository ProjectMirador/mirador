import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { WindowViewer } from '../components/WindowViewer';
import { withWindowContext } from '../contexts/WindowContext';

const enhance = compose(
  withWindowContext,
  withPlugins('WindowViewer'),
  // further HOC go here
);

export default enhance(WindowViewer);
