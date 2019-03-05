import { compose } from 'redux';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { PrimaryWindow } from '../components/PrimaryWindow';


const enhance = compose(
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(PrimaryWindow);
