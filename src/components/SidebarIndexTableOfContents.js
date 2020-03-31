import React, { Component } from 'react';
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

/** */
export class SidebarIndexTableOfContents extends Component {
  /** */
  selectTreeItem(node) {
    const { setCanvas, toggleNode, windowId } = this.props;
    if (node.nodes.length > 0) {
      toggleNode(node.id);
    }

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
  handleKeyPressed(event, node) {
    const { expandedNodeIds, toggleNode } = this.props;
    if (event.key === 'Enter'
      || event.key === ' '
      || event.key === 'Spacebar') {
      this.selectTreeItem(node);
    }
    if ((event.key === 'ArrowLeft' && expandedNodeIds.indexOf(node.id) !== -1)
      || (event.key === 'ArrowRight' && expandedNodeIds.indexOf(node.id) === -1 && node.nodes.length > 0)) {
      toggleNode(node.id);
    }
  }

  /** */
  buildTreeItems(nodes, visibleNodeIds, containerRef, nodeIdToScrollTo) {
    const { classes } = this.props;
    if (!nodes) {
      return null;
    }
    return (
      nodes.map(node => (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          classes={{
            content: classes.content,
            group: classes.group,
            label: classes.label,
            root: classes.treeItemRoot,
            selected: classes.selected,
          }}
          label={(
            <ScrollTo
              containerRef={containerRef}
              key={`${node.id}-scroll`}
              offsetTop={96} // offset for the height of the form above
              scrollTo={nodeIdToScrollTo === node.id}
            >
              <div
                className={clsx({
                  [classes.visibleNode]: visibleNodeIds.indexOf(node.id) !== -1,
                })}
              >
                {node.label}
              </div>
            </ScrollTo>
          )}
          onClick={() => this.selectTreeItem(node)}
          onKeyDown={e => this.handleKeyPressed(e, node)}
        >
          {node.nodes && node.nodes.length > 0 ? this.buildTreeItems(
            node.nodes,
            visibleNodeIds,
            containerRef,
            nodeIdToScrollTo,
          ) : null}
        </TreeItem>
      ))
    );
  }

  /** */
  render() {
    const {
      classes, treeStructure, visibleNodeIds, expandedNodeIds, containerRef, nodeIdToScrollTo,
    } = this.props;

    if (!treeStructure) {
      return <></>;
    }

    return (
      <>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon color="action" />}
          defaultExpandIcon={<ChevronRightIcon color="action" />}
          defaultEndIcon={<></>}
          expanded={expandedNodeIds}
        >
          {this.buildTreeItems(treeStructure.nodes, visibleNodeIds, containerRef, nodeIdToScrollTo)}
        </TreeView>
      </>
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
  nodeIdToScrollTo: PropTypes.func.isRequired,
  setCanvas: PropTypes.func.isRequired,
  toggleNode: PropTypes.func.isRequired,
  treeStructure: PropTypes.objectOf().isRequired,
  visibleNodeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  windowId: PropTypes.string.isRequired,
};
