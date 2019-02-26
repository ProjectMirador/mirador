import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import {
  getDestructuredMetadata,
  getCanvasLabel,
  getManifestDescription,
  getManifestTitle,
  getSelectedCanvas,
  getWindowManifest,
  getCanvasDescription,
} from '../state/selectors';
import { WindowSideBarInfoPanel } from '../components/WindowSideBarInfoPanel';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  canvasLabel: getCanvasLabel(
    getSelectedCanvas(state, windowId),
    state.windows[windowId].canvasIndex,
  ),
  canvasDescription: getCanvasDescription(getSelectedCanvas(state, windowId)),
  canvasMetadata: getDestructuredMetadata(getSelectedCanvas(state, windowId)),
  manifestLabel: getManifestTitle(getWindowManifest(state, windowId)),
  manifestDescription: getManifestDescription(getWindowManifest(state, windowId)),
  manifestMetadata: getDestructuredMetadata(getWindowManifest(state, windowId).manifestation),
});

/**
 *
 * @param theme
 * @returns {{windowSideBarH2: *, windowSideBarH3: *}}
 */
const styles = theme => ({
  windowSideBarH2: theme.typography.h5,
  windowSideBarH3: theme.typography.h6,
});

const enhance = compose(
  withNamespaces(),
  withStyles(styles),
  connect(mapStateToProps, null),
  miradorWithPlugins,
);

export default enhance(WindowSideBarInfoPanel);
