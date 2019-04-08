import React from 'react';
import { shallow } from 'enzyme';
import { Mosaic } from 'react-mosaic-component';
import MosaicRenderPreview from '../../../src/containers/MosaicRenderPreview';
import { WorkspaceMosaic } from '../../../src/components/WorkspaceMosaic';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceMosaic
      windows={{}}
      workspace={{}}
      updateWorkspaceMosaicLayout={() => {}}
      {...props}
    />,
  );
}

describe('WorkspaceMosaic', () => {
  const windows = { 1: { id: 1 }, 2: { id: 2 } };
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper({ windows });
  });
  it('should render properly with an initialValue', () => {
    expect(wrapper.matchesElement(
      <Mosaic initialValue={{ direction: 'row', first: '1', second: '2' }} />,
    )).toBe(true);
  });
  describe('componentDidUpdate', () => {
    it('updates the workspace layout when windows change', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        updateWorkspaceMosaicLayout,
        windows,
      });

      wrapper.setProps({ windows: { ...windows, 3: { id: 3 } } });

      expect(updateWorkspaceMosaicLayout).toHaveBeenCalled();
    });
    it('updates the workspace layout when windows are removed', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        updateWorkspaceMosaicLayout,
        windows,
        workspace: {
          layout: { first: 1, second: 2 },
        },
      });
      wrapper.instance().windowPaths = { 2: ['second'] };
      wrapper.setProps({ windows: { 1: { id: 1 } } });
      expect(updateWorkspaceMosaicLayout).toHaveBeenLastCalledWith(1);
    });
    it('when no windows remain', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        updateWorkspaceMosaicLayout,
        windows,
      });
      wrapper.setProps({ windows: {} });
      expect(updateWorkspaceMosaicLayout).toHaveBeenLastCalledWith(null);
    });
  });
  describe('bookkeepPath', () => {
    it('as windows are rendered keeps a reference to their path in binary tree', () => {
      wrapper.instance().tileRenderer('1', 'foo');
      expect(wrapper.instance().windowPaths).toEqual({ 1: 'foo' });
    });
  });
  describe('determineWorkspaceLayout', () => {
    it('when window ids do not match workspace layout', () => {
      wrapper = createWrapper({ windows, workspace: { layout: 'foo' } });
      expect(wrapper.instance().determineWorkspaceLayout()).toMatchObject({
        direction: 'row', first: '1', second: '2',
      });
    });
    it('by default use workspace.layout', () => {
      wrapper = createWrapper({ windows: { foo: 'bar' }, workspace: { layout: 'foo' } });
      expect(wrapper.instance().determineWorkspaceLayout()).toEqual('foo');
    });
    it('generates a new layout if windows do not match current layout', () => {
      wrapper = createWrapper({ windows: { foo: 'bar' }, workspace: { layout: { first: 'foo', second: 'bark' } } });
      expect(wrapper.instance().determineWorkspaceLayout()).toEqual('foo');
    });
    it('when window ids match workspace layout', () => {
      wrapper = createWrapper({ windows: { foo: { id: 'foo' } }, workspace: { layout: 'foo' } });
      expect(wrapper.instance().determineWorkspaceLayout()).toBe('foo');
    });
  });
  describe('tileRenderer', () => {
    it('when window is available', () => {
      const renderedTile = wrapper.instance().tileRenderer('1', 'foo');
      expect(renderedTile).not.toBeNull();
      expect(shallow(renderedTile).find('DropTarget(DragSource(InternalMosaicWindow))').length).toEqual(1);
      expect(shallow(renderedTile).props()).toEqual(expect.objectContaining({
        additionalControls: [],
        path: 'foo',
        toolbarControls: [],
      }));

      expect(shallow(shallow(renderedTile).props().renderPreview()).matchesElement(
        <div className="mosaic-preview">
          <MosaicRenderPreview windowId={1} />
        </div>,
      )).toBe(true);
    });
    it('when window is not available', () => {
      expect(wrapper.instance().tileRenderer('bar')).toBeNull();
    });
  });
  describe('mosaicChange', () => {
    it('calls the provided prop to update layout', () => {
      const updateWorkspaceMosaicLayout = jest.fn();
      wrapper = createWrapper({
        updateWorkspaceMosaicLayout,
        windows,
      });

      wrapper.instance().mosaicChange();
      expect(updateWorkspaceMosaicLayout).toBeCalled();
    });
  });
});
