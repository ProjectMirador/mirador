import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getManifestViewingDirection,
  getNextCanvasGrouping,
  getPreviousCanvasGrouping,
} from '../state/selectors';
import { ViewerNavigation } from '../components/ViewerNavigation';

/** */
const mapStateToProps = (state, { windowId }) => ({
  hasNextCanvas: !!getNextCanvasGrouping(state, { windowId }),
  hasPreviousCanvas: !!getPreviousCanvasGrouping(state, { windowId }),
  viewingDirection: getManifestViewingDirection(state, { windowId }),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  setNextCanvas: (...args) => dispatch(actions.setNextCanvas(windowId)),
  setPreviousCanvas: (...args) => dispatch(actions.setPreviousCanvas(windowId)),
});

const styles = {
  osdNavigation: {
    order: 1,
  },
};

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ViewerNavigation'),
  // further HOC go here
);

export default enhance(ViewerNavigation);
