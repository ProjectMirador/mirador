import { Component } from 'react';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import clsx from 'clsx';
import { ScrollTo } from './ScrollTo';

/** */
function getStartCanvasId(node) {
  const jsonld = node.data.__jsonld; // eslint-disable-line no-underscore-dangle
  if (jsonld.startCanvas && typeof jsonld.startCanvas === 'string') {
    return jsonld.startCanvas;
  }
  if (jsonld.start) {
    if (jsonld.start.type === 'Canvas' && typeof jsonld.start.id === 'string') {
      return jsonld.start.id;
    }
    if (jsonld.start.type === 'SpecificResource' && typeof jsonld.start.source === 'string') {
      return jsonld.start.source;
    }
  }
  return node.data.getCanvasIds()[0];
}

/** Traverse through the manifesto tree to find a node with a given id */
function deepFind(treeNode, id) {
  if (treeNode.id === id) {
    return treeNode;
  }

  let result = null;

  if (treeNode.nodes) {
    for (let i = 0; result == null && i < treeNode.nodes.length; i += 1) {
      result = deepFind(treeNode.nodes[i], id);
    }
  }

  return result;
}

/** Wrap <ScrollTo> to remove the nodeId prop required for MUI's TreeView */
const ScrollToForTreeItem = ({ children, nodeId, ...props }) => (
  <ScrollTo
    {...props}
  >
    { children }
  </ScrollTo>
);

ScrollToForTreeItem.propTypes = {
  children: PropTypes.node.isRequired,
  nodeId: PropTypes.string.isRequired,
};

/** */
export class SidebarIndexTableOfContents extends Component {
  /** */
  constructor(props) {
    super(props);
    this.handleNodeSelect = this.handleNodeSelect.bind(this);
    this.handleNodeToggle = this.handleNodeToggle.bind(this);
  }

  /** */
  handleKeyPressed(event, nodeId) {
    const { toggleNode } = this.props;

    if (event.key === 'Enter') {
      this.selectTreeItem(nodeId);
    }

    if (event.key === ' ' || event.key === 'Spacebar') {
      toggleNode(nodeId);
    }
  }

  /** */
  handleNodeSelect(_event, nodeId) {
    this.selectTreeItem(nodeId);
  }

  /** */
  handleNodeToggle(_event, nodeIds) {
    const { expandNodes } = this.props;

    expandNodes(nodeIds);
  }

  /** */
  selectTreeItem(nodeId) {
    const { setCanvas, treeStructure, windowId } = this.props;

    const node = deepFind(treeStructure, nodeId);

    // Do not select if there are no canvases listed or it has children
    if (!node.data.getCanvasIds()
        || node.data.getCanvasIds().length === 0
        || node.nodes.length > 0) {
      return;
    }
    const target = getStartCanvasId(node);
    const canvasId = target.indexOf('#') === -1 ? target : target.substr(0, target.indexOf('#'));
    setCanvas(windowId, canvasId);
  }

  /** */
  render() {
    const {
      classes, treeStructure, visibleNodeIds, expandedNodeIds, containerRef, nodeIdToScrollTo,
    } = this.props;

    if (!treeStructure) {
      return null;
    }

    /** Render the tree structure recursively */
    const renderTree = (node) => (
      <ScrollToForTreeItem
        containerRef={containerRef}
        key={node.id}
        nodeId={node.id}
        offsetTop={96} // offset for the height of the form above
        scrollTo={nodeIdToScrollTo === node.id}
      >
        <TreeItem
          nodeId={node.id}
          classes={{
            content: classes.content,
            group: classes.group,
            label: classes.label,
            root: classes.treeItemRoot,
            selected: classes.selected,
          }}
          onKeyDown={e => this.handleKeyPressed(e, node.id)}
          label={(
            <div
              className={clsx({
                [classes.visibleNode]: visibleNodeIds.indexOf(node.id) !== -1,
              })}
            >
              {node.label}
            </div>
        )}
        >
          {Array.isArray(node.nodes) ? node.nodes.map((n) => renderTree(n)) : null}
        </TreeItem>
      </ScrollToForTreeItem>
    );

    return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon color="action" />}
        defaultExpandIcon={<ChevronRightIcon color="action" />}
        defaultEndIcon={null}
        onNodeSelect={this.handleNodeSelect}
        onNodeToggle={this.handleNodeToggle}
        expanded={expandedNodeIds}
      >
        { Array.isArray(treeStructure.nodes) ? treeStructure.nodes.map(n => renderTree(n)) : null }
      </TreeView>
    );
  }
}

SidebarIndexTableOfContents.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  expandedNodeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  expandNodes: PropTypes.func.isRequired,
  nodeIdToScrollTo: PropTypes.func.isRequired,
  setCanvas: PropTypes.func.isRequired,
  toggleNode: PropTypes.func.isRequired,
  treeStructure: PropTypes.objectOf().isRequired,
  visibleNodeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  windowId: PropTypes.string.isRequired,
};
