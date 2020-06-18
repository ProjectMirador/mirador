import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { WindowSideBarCanvasPanel } from '../components/WindowSideBarCanvasPanel';
import {
  getCompanionWindow,
  getDefaultSidebarVariant,
  getCanvases,
  getVisibleCanvases,
  getSequenceTreeStructure,
} from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { id, windowId }) => {
  const canvases = getCanvases(state, { windowId });
  const treeStructure = getSequenceTreeStructure(state, { windowId });
  const { config } = state;
  return {
    canvases,
    config,
    selectedCanvases: getVisibleCanvases(state, { windowId }),
    showToc: treeStructure && treeStructure.nodes && treeStructure.nodes.length > 0,
    variant: getCompanionWindow(state, { companionWindowId: id, windowId }).variant
      || getDefaultSidebarVariant(state, { windowId }),
  };
};

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideBarCanvasPanel
 * @private
 */
const mapDispatchToProps = (dispatch, { id, windowId }) => ({
  setCanvas: (...args) => dispatch(actions.setCanvas(...args)),
  toggleDraggingEnabled: () => dispatch(actions.toggleDraggingEnabled()),
  updateVariant: variant => dispatch(
    actions.updateCompanionWindow(windowId, id, { variant }),
  ),
});

/**
 *
 * @param theme
 */
const styles = theme => ({
  label: {
    paddingLeft: theme.spacing(1),
  },
  select: {
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  selectEmpty: {
    backgroundColor: theme.palette.background.paper,
  },
  variantTab: {
    minWidth: 'auto',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarCanvasPanel'),
);

export default enhance(WindowSideBarCanvasPanel);
