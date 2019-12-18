import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

/** */
export class SidebarIndexTableOfContents extends Component {
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
  buildTreeItems(nodes) {
    return (
      nodes.map(node => (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={node.label}
          onClick={() => this.selectTreeItem(node)}
        >
          {node.nodes.length > 0 ? this.buildTreeItems(node.nodes) : null}
        </TreeItem>
      ))
    );
  }

  /** */
  render() {
    const {
      classes, treeStructure,
    } = this.props;

    if (!treeStructure) {
      return <></>;
    }

    return (
      <>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {this.buildTreeItems(treeStructure.nodes)}
        </TreeView>
      </>
    );
  }
}

SidebarIndexTableOfContents.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  setCanvas: PropTypes.func.isRequired,
  treeStructure: PropTypes.objectOf().isRequired,
  windowId: PropTypes.string.isRequired,
};
