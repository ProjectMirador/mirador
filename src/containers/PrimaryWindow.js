import { compose } from 'redux';
import { PrimaryWindow } from '../components/PrimaryWindow';


const enhance = compose(
  // further HOC go here
);

export default enhance(PrimaryWindow);
