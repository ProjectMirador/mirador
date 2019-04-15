import { compose } from 'redux';
import { withPlugins } from '../extend/withPlugins';
import { PrimaryWindow } from '../components/PrimaryWindow';


const enhance = compose(
  withPlugins('PrimaryWindow'),
);

export default enhance(PrimaryWindow);
