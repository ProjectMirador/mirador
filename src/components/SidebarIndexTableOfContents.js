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
  getAllSubTreeCanvasIds(node) {
    const canvasIds = node.data.getCanvasIds() || [];
    if (node.nodes) {
      canvasIds.push(
        ...node.nodes.reduce((acc, n) => acc.concat(...this.getAllSubTreeCanvasIds(n)), []),
      );
    }
    return canvasIds;
  }

  /** */
  selectTreeItem(node) {
    const { setCanvas, windowId } = this.props;
    // Do not select if there are child nodes
    if (node.nodes.length > 0) {
      return;
    }
    const canvas = node.data.getCanvasIds()[0];
    setCanvas(windowId, canvas);
  }

  /** */
  buildTreeItems(nodes, canvasIds) {
    return (
      nodes.map(node => (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={(
            <>
              {canvasIds.reduce(
                (acc, canvasId) => acc || (this.getAllSubTreeCanvasIds(node).indexOf(canvasId) !== -1),
                false,
              ) && <VisibilityIcon />}
              {node.label}
            </>
          )}
          onClick={() => this.selectTreeItem(node)}
        >
          {node.nodes.length > 0 ? this.buildTreeItems(node.nodes, canvasIds) : null}
        </TreeItem>
      ))
    );
  }

  /** */
  render() {
    const {
      canvases, classes, treeStructure,
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
        >
          {this.buildTreeItems(treeStructure.nodes, canvasIds)}
        </TreeView>
      </>
    );
  }
}

SidebarIndexTableOfContents.propTypes = {
  canvases: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  setCanvas: PropTypes.func.isRequired,
  treeStructure: PropTypes.objectOf().isRequired,
  windowId: PropTypes.string.isRequired,
};
