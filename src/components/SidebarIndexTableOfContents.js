import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TreeItem from '@material-ui/lab/TreeItem';

/** */
export class SidebarIndexTableOfContents extends Component {
  /** */
  selectTreeItem(node) {
    const { setCanvas, toggleRangeNode, windowId } = this.props;
    toggleRangeNode(node.id);
    // Do not select if there are child nodes
    if (node.nodes.length > 0) {
      return;
    }
    const canvas = node.data.getCanvasIds()[0];
    setCanvas(windowId, canvas);
  }

  /** */
  buildTreeItems(nodes, canvasIds, visibleRangeIds) {
    return (
      nodes.map(node => (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={(
            <>
              {visibleRangeIds.indexOf(node.id) !== -1 && <VisibilityIcon />}
              {node.label}
            </>
          )}
          onClick={() => this.selectTreeItem(node)}
        >
          {node.nodes.length > 0 ? this.buildTreeItems(node.nodes, canvasIds, visibleRangeIds) : null}
        </TreeItem>
      ))
    );
  }

  /** */
  render() {
    const {
      canvases, classes, treeStructure, visibleRangeIds, expandedRangeIds,
    } = this.props;

    if (!treeStructure) {
      return <></>;
    }

    const canvasIds = canvases.map(canvas => canvas.id);

    return (
      <>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultEndIcon={<></>}
          expanded={expandedRangeIds}
        >
          {this.buildTreeItems(treeStructure.nodes, canvasIds, visibleRangeIds)}
        </TreeView>
      </>
    );
  }
}

SidebarIndexTableOfContents.propTypes = {
  canvases: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  expandedRangeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCanvas: PropTypes.func.isRequired,
  toggleRangeNode: PropTypes.func.isRequired,
  treeStructure: PropTypes.objectOf().isRequired,
  visibleRangeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  windowId: PropTypes.string.isRequired,
};
