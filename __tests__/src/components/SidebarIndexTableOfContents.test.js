import React from 'react';
import { shallow } from 'enzyme';
import manifesto from 'manifesto.js';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import { SidebarIndexTableOfContents } from '../../../src/components/SidebarIndexTableOfContents';
import manifestJson from '../../fixtures/version-2/structures.json';

/**
 * Create shallow enzyme wrapper for SidebarIndexTableOfContents component
 * @param {*} props
 */
function createWrapper(props) {
  const manifest = manifesto.create(manifestJson);
  return shallow(
    <SidebarIndexTableOfContents
      id="something"
      classes={{}}
      treeStructure={props.treeStructure ? props.treeStructure : manifest.getDefaultTree()}
      visibleNodeIds={props.visibleNodeIds ? props.visibleNodeIds : []}
      expandedNodeIds={props.expandedNodeIds ? props.expandedNodeIds : []}
      containerRef={props.containerRef}
      nodeIdToScrollTo={props.nodeIdToScrollTo}
      {...props}
    />,
  );
}

/**
 * Create necessary props to simulate keydown event with specific key
 */
function createKeydownProps(key) {
  return [
    'keydown',
    {
      key,
    },
  ];
}

describe('SidebarIndexTableOfContents', () => {
  let toggleNode;
  let setCanvas;

  beforeEach(() => {
    toggleNode = jest.fn();
    setCanvas = jest.fn();
  });


  it('renders a tree item for every node', () => {
    const structuresWrapper = createWrapper({});
    expect(structuresWrapper.find(TreeItem)).toHaveLength(10);
    const simpleTreeWrapper = createWrapper({
      treeStructure: {
        nodes: [
          {
            id: '0',
            nodes: [
              {
                id: '0-0',
                nodes: [],
              },
              {
                id: '0-1',
                nodes: [],
              },
            ],
          },
        ],
      },
    });
    expect(simpleTreeWrapper.find(TreeItem)).toHaveLength(3);
  });

  it('accepts missing nodes property for tress structure and tree nodes', () => {
    const noNodesWrapper = createWrapper({
      treeStructure: { nodes: undefined },
    });
    expect(noNodesWrapper.find(TreeItem)).toHaveLength(0);
    const noChildNodesWrapper = createWrapper({
      treeStructure: {
        nodes: [{ id: '0' }],
      },
    });
    expect(noChildNodesWrapper.find(TreeItem)).toHaveLength(1);
  });

  it('toggles branch nodes on click, but not leaf nodes', () => {
    const wrapper = createWrapper({ setCanvas, toggleNode });
    const treeView = wrapper.children(TreeView).at(0);

    const node0 = treeView.childAt(0);
    expect(node0.prop('nodeId')).toBe('0-0');
    node0.simulate('click');
    node0.simulate('click');
    expect(toggleNode).toHaveBeenCalledTimes(2);

    const node00 = node0.children().at(0);
    expect(node00.prop('nodeId')).toBe('0-0-0');
    node00.simulate('click');
    node00.simulate('click');
    expect(toggleNode).toHaveBeenCalledTimes(2);

    const node1 = treeView.childAt(1);
    expect(node1.prop('nodeId')).toBe('0-1');
    node1.simulate('click');
    expect(toggleNode).toHaveBeenCalledTimes(3);
  });

  it('collapses branch nodes (i.e. toggles open branch nodes) with left arrow key', () => {
    const wrapper = createWrapper({
      expandedNodeIds: ['0-0'],
      setCanvas,
      toggleNode,
    });
    const treeView = wrapper.children(TreeView).at(0);

    const node0 = treeView.childAt(0);
    expect(node0.prop('nodeId')).toBe('0-0');
    node0.simulate(...createKeydownProps('ArrowLeft'));
    expect(toggleNode).toHaveBeenCalledTimes(1);

    const node00 = node0.children().at(0);
    expect(node00.prop('nodeId')).toBe('0-0-0');
    const node1 = treeView.childAt(1);
    expect(node1.prop('nodeId')).toBe('0-1');

    node00.simulate(...createKeydownProps('ArrowLeft'));
    node1.simulate(...createKeydownProps('ArrowLeft'));
    expect(toggleNode).toHaveBeenCalledTimes(1);
  });

  it('expands branch nodes (i.e. toggles closed branch nodes) with right arrow key', () => {
    const wrapper = createWrapper({
      expandedNodeIds: ['0-0'],
      setCanvas,
      toggleNode,
    });
    const treeView = wrapper.children(TreeView).at(0);
    const node0 = treeView.childAt(0);
    expect(node0.prop('nodeId')).toBe('0-0');
    const node00 = node0.children().at(0);
    expect(node00.prop('nodeId')).toBe('0-0-0');

    node0.simulate(...createKeydownProps('ArrowRight'));
    node00.simulate(...createKeydownProps('ArrowRight'));
    expect(toggleNode).toHaveBeenCalledTimes(0);

    const node1 = treeView.childAt(1);
    expect(node1.prop('nodeId')).toBe('0-1');
    node1.simulate(...createKeydownProps('ArrowRight'));
    expect(toggleNode).toHaveBeenCalledTimes(1);
  });

  it('toggles branch nodes (but not leaf nodes) with Space or Enter key', () => {
    const wrapper = createWrapper({ setCanvas, toggleNode });
    const treeView = wrapper.children(TreeView).at(0);
    const node0 = treeView.childAt(0);
    node0.simulate(...createKeydownProps('Enter'));
    expect(toggleNode).toHaveBeenCalledTimes(1);
    node0.simulate(...createKeydownProps(' '));
    expect(toggleNode).toHaveBeenCalledTimes(2);
    node0.simulate(...createKeydownProps('Spacebar'));
    expect(toggleNode).toHaveBeenCalledTimes(3);
    node0.simulate(...createKeydownProps('Tab'));
    node0.children().at(0).simulate(...createKeydownProps('Enter'));
    node0.children().at(0).simulate(...createKeydownProps(' '));
    expect(toggleNode).toHaveBeenCalledTimes(3);
    treeView.childAt(1).simulate(...createKeydownProps('Enter'));
    treeView.childAt(1).simulate(...createKeydownProps(' '));
    expect(toggleNode).toHaveBeenCalledTimes(5);
  });

  it('calls setCanvas only on click for ranges with canvases', () => {
    const wrapper = createWrapper({ setCanvas, toggleNode });
    const treeView = wrapper.children(TreeView).at(0);
    const node0 = treeView.childAt(0);
    expect(node0.prop('nodeId')).toBe('0-0');
    node0.simulate('click');
    expect(setCanvas).toHaveBeenCalledTimes(1);
    node0.childAt(0).simulate('click');
    expect(setCanvas).toHaveBeenCalledTimes(2);
    node0.childAt(1).simulate('click');
    expect(setCanvas).toHaveBeenCalledTimes(3);
    node0.childAt(2).simulate('click');
    expect(setCanvas).toHaveBeenCalledTimes(4);

    const node1 = treeView.childAt(1);
    expect(node1.prop('nodeId')).toBe('0-1');
    node1.simulate(...createKeydownProps('ArrowRight'));
    expect(setCanvas).toHaveBeenCalledTimes(4);
  });
});
