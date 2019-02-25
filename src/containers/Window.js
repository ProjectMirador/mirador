import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { Window } from '../components/Window';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ manifests, windows }, props) => ({
  manifest: manifests[props.window.manifestId],
  window: windows[props.window.id],
});

const styles = {
  window: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  middle: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1',
  },
  middleLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  primaryWindow: {
    display: 'flex',
    flex: '1',
    position: 'relative',
  },
  companionAreaRight: {
    flex: '0',
  },
  companionAreaBottom: {
    flex: '0',
  },
  thumbnailArea: {
    flex: '0',
  },
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
  // further HOC go here
);

export default enhance(Window);
