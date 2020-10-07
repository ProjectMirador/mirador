import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { getManifestoInstance } from '../state/selectors';
import { PrimaryWindow } from '../components/PrimaryWindow';

/** */
const mapStateToProps = (state, { windowId }) => {
  const manifestoInstance = getManifestoInstance(state, { windowId });
  return {
    isCollection: manifestoInstance && manifestoInstance.isCollection(),
  };
};

const styles = {
  primaryWindow: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
  withPlugins('PrimaryWindow'),
);

export default enhance(PrimaryWindow);
