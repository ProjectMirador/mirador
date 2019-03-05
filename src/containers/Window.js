import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { Window } from '../components/Window';


/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ manifests, windows, config }, props) => ({
  manifest: manifests[props.window.manifestId],
  window: windows[props.window.id],
  workspaceType: config.workspace.type,
});

const styles = {
  window: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    minHeight: 0,
  },
  middle: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1',
    minHeight: 0,
  },
  middleLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    minHeight: 0,
  },
  primaryWindow: {
    display: 'flex',
    flex: '1',
    position: 'relative',
    height: '300px',
    minHeight: 0,
  },
  companionAreaRight: {
    display: 'flex',
    flex: '0',
    minHeight: 0,
  },
  companionAreaBottom: {
    display: 'flex',
    flex: '0',
    minHeight: 0,
  },
  thumbnailArea: {
    flex: '0',
  },
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
);

export default enhance(Window);
