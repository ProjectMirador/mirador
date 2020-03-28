import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SidebarIndexTableOfContents } from '../components/SidebarIndexTableOfContents';
import {
  getManifestTreeStructure,
  getVisibleNodeIds,
  getExpandedNodeIds,
  getNodeIdToScrollTo,
} from '../state/selectors';
import * as actions from '../state/actions';


/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { id, windowId }) => ({
  expandedNodeIds: getExpandedNodeIds(state, { companionWindowId: id, windowId }),
  nodeIdToScrollTo: getNodeIdToScrollTo(state, { companionWindowId: id, windowId }),
  treeStructure: getManifestTreeStructure(state, { windowId }),
  visibleNodeIds: getVisibleNodeIds(state, { companionWindowId: id, windowId }),
});

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SidebarIndexTableOfContents
 * @private
 */
const mapDispatchToProps = (dispatch, { id, windowId }) => ({
  setCanvas: (...args) => dispatch(actions.setCanvas(...args)),
  toggleNode: nodeId => dispatch(actions.toggleNode(windowId, id, nodeId)),
});

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  content: {
    alignItems: 'flex-start',
    padding: '8px 8px 8px 0',
    width: 'auto',
  },
  group: {
    borderLeft: `1px solid ${theme.palette.grey[400]}`,
    marginLeft: 12,
  },
  iconContainer: {
    marginRight: 2,
  },
  root: {
    flexGrow: 1,
  },
  treeItemRoot: {
    '&:focus > $content, &$selected > $content': {
      borderLeft: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  visibleNode: {
    fontWeight: 500,
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('SidebarIndexTableOfContents'),
);

export default enhance(SidebarIndexTableOfContents);
