import { compose } from 'redux';
import { withPlugins } from '../../extend';
import { PrimaryWindow } from '../../components/window/PrimaryWindow';


const enhance = compose(
  withPlugins('PrimaryWindow'),
);

export default enhance(PrimaryWindow);
