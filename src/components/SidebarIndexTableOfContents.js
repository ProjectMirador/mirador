import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TreeItem from '@material-ui/lab/TreeItem';
import { ScrollTo } from './ScrollTo';

/** */
export class SidebarIndexTableOfContents extends Component {
  /** */
  selectTreeItem(node) {
    const { setCanvas, toggleRange, windowId } = this.props;
    if (node.nodes.length > 0) {
      toggleRange(node.data.id);
    }
    // Do not select if there are no canvases listed
    if (!node.data.getCanvasIds() || node.data.getCanvasIds().length === 0) {
      return;
    }
    const target = node.data.getCanvasIds()[0];
    const canvasId = target.indexOf('#') === -1 ? target : target.substr(0, target.indexOf('#'));
    setCanvas(windowId, canvasId);
  }

  /** */
  handleKeyPressed(event, node) {
    if (event.key === 'Enter'
      || event.key === ' '
      || event.key === 'ArrowLeft' && this.props.expandedRangeIds.indexOf(node.data.id) !== -1
      || event.key === 'ArrowRight' && this.props.expandedRangeIds.indexOf(node.data.id) === -1) {
      this.selectTreeItem(node);
    }
  }

  /** */
  buildTreeItems(nodes, canvasIds, visibleRangeIds, containerRef) {
    return (
      nodes.map(node => (
        <TreeItem
          key={node.id}
          nodeId={node.data.id}
          label={(
              <ScrollTo
                containerRef={containerRef}
                key={`${node.id}-scroll`}
                offsetTop={96} // offset for the height of the form above
                scrollTo={visibleRangeIds.indexOf(node.data.id) !== - 1 && node.nodes.length === 0}
              >
                <>
                  {visibleRangeIds.indexOf(node.data.id) !== -1 && <VisibilityIcon fontSize='small' color='secondary'/>}
                  {node.label}
                </>
              </ScrollTo>
          )}
          onClick={() => this.selectTreeItem(node)}
          onKeyDown={e => this.handleKeyPressed(e, node)}
        >
          {node.nodes.length > 0 ? this.buildTreeItems(node.nodes, canvasIds, visibleRangeIds, containerRef) : null}
        </TreeItem>
      ))
    );
  }

  /** */
  render() {
    const {
      canvases, classes, treeStructure, visibleRangeIds, expandedRangeIds, containerRef,
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
          {this.buildTreeItems(treeStructure.nodes, canvasIds, visibleRangeIds, containerRef)}
        </TreeView>
      </>
    );
  }
}

SidebarIndexTableOfContents.propTypes = {
  canvases: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  containerRef:  PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  expandedRangeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCanvas: PropTypes.func.isRequired,
  toggleRangeNode: PropTypes.func.isRequired,
  treeStructure: PropTypes.objectOf().isRequired,
  visibleRangeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  windowId: PropTypes.string.isRequired,
};
