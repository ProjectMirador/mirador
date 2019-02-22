import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import * as actions from '../state/actions';
import ZoomControls from '../components/ZoomControls';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    showZoomControls: state.workspace.showZoomControls,
    viewer: state.viewers[props.windowId],
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { updateViewport: actions.updateViewport };

/**
 *
 * @param theme
 * @returns {{zoom_controls: {position: string, right: number},
 * ListItem: {paddingBottom: number, paddingTop: number}}}
 */
const styles = theme => ({
  zoom_controls: {
    position: 'absolute',
    right: 0,
  },
  ListItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

const enhance = compose(
  withNamespaces(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(ZoomControls);
