import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { Window } from '../components/Window';
import { getWindowManifest, getManifestTitle, getThumbnailNavigationPosition } from '../state/selectors';


/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, props) => ({
  manifest: state.manifests[props.window.manifestId],
  window: state.windows[props.window.id],
  workspaceType: state.config.workspace.type,
  label: getManifestTitle(getWindowManifest(state, props.window.id)),
  thumbnailNavigationPosition: getThumbnailNavigationPosition(state, props.window.id),
});

/**
 * @param theme
 */
const styles = theme => ({
  window: {
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    minHeight: 0,
    overflow: 'hidden',
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
    flexBasis: 'auto',
  },
  thumbnailArea: {
    backgroundColor: theme.palette.primary.dark,
  },
  thumbnailAreaBottom: {
  },
  thumbnailAreaRight: {
    minWidth: 100,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
);

export default enhance(Window);
