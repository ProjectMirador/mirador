import { compose } from 'redux';
import { connect } from 'react-redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WindowMiddleContent from '../components/WindowMiddleContent';

const enhance = compose(
  connect(null, null),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(WindowMiddleContent);
