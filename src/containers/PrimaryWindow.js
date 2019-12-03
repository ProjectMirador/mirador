import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { PrimaryWindow } from '../components/PrimaryWindow';

const styles = {
  primaryWindow: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
};

const enhance = compose(
  withStyles(styles),
  withPlugins('PrimaryWindow'),
);

export default enhance(PrimaryWindow);
