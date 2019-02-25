import { compose } from 'redux';
import { connect } from 'react-redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { PrimaryWindow } from '../components/PrimaryWindow';

const enhance = compose(
  connect(null, null),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(PrimaryWindow);
