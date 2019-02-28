import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { getManifestLogo } from '../state/selectors';
import WindowIcon from '../components/WindowIcon';

/** */
const mapStateToProps = (state, { manifestId }) => ({
  manifestLogo: getManifestLogo(state.manifests[manifestId]),
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
