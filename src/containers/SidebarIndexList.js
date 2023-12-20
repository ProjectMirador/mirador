import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import {
  getCompanionWindow,
  getCanvases,
  getVisibleCanvasIds,
} from '../state/selectors';
import { SidebarIndexList } from '../components/SidebarIndexList';
import { withWindowContext } from '../contexts/WindowContext';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { id, windowId }) => ({
  canvases: getCanvases(state, { windowId }),
  selectedCanvasIds: getVisibleCanvasIds(state, { windowId }),
  variant: getCompanionWindow(state, { companionWindowId: id, windowId }).variant,
});

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SidebarIndexList
 * @private
 */
const mapDispatchToProps = (dispatch, { id, windowId }) => ({
  setCanvas: (...args) => dispatch(actions.setCanvas(...args)),
});

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  label: {
    paddingLeft: theme.spacing(1),
  },
  listItem: {
    borderBottom: `0.5px solid ${theme.palette.divider}`,
    paddingRight: theme.spacing(1),
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  withWindowContext,
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('SidebarIndexList'),
);

export default enhance(SidebarIndexList);
