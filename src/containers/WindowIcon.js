import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { getWindowManifest, getManifestLogo } from '../state/selectors';
import WindowIcon from '../components/WindowIcon';

/** */
const mapStateToProps = (state, { windowId }) => ({
  manifestLogo: getManifestLogo(getWindowManifest(state, windowId)),
});

const styles = {
  logo: {
    height: '2.5rem',
    paddingRight: 8,
  },
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
);

export default enhance(WindowIcon);
