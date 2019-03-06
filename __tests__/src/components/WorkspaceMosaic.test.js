import React from 'react';
import { shallow } from 'enzyme';
import { Mosaic } from 'react-mosaic-component';
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
      wrapper = createWrapper({ windows, updateWorkspaceMosaicLayout });

      wrapper.setProps({ windows: { ...windows, 3: { id: 3 } } });

      expect(updateWorkspaceMosaicLayout).toHaveBeenCalled();
    });
  });
  describe('determineWorkspaceLayout', () => {
    it('when window ids do not match workspace layout', () => {
      wrapper = createWrapper({ windows, workspace: { layout: 'foo' } });
      expect(wrapper.instance().determineWorkspaceLayout()).toMatchObject({
        direction: 'row', first: '1', second: '2',
      });
    });
    it('when window ids match workspace layout', () => {
      wrapper = createWrapper({ windows: { foo: { id: 'foo' } }, workspace: { layout: 'foo' } });
      expect(wrapper.instance().determineWorkspaceLayout()).toBeNull();
    });
  });
  describe('tileRenderer', () => {
    it('when window is available', () => {
      const renderedTile = wrapper.instance().tileRenderer('1', 'foo');
      expect(renderedTile).not.toBeNull();
      expect(shallow(renderedTile).find('DropTarget(DragSource(InternalMosaicWindow))').length).toEqual(1);
      expect(shallow(renderedTile).props()).toEqual(expect.objectContaining({
        toolbarControls: [],
        additionalControls: [],
        path: 'foo',
      }));
      expect(shallow(shallow(renderedTile).props().renderPreview()).matchesElement(
        <div className="mosaic-preview">
          <div className="mosaic-window-body">
            previewWindowTitle
          </div>
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
      wrapper = createWrapper({ windows, updateWorkspaceMosaicLayout });

      wrapper.instance().mosaicChange();
      expect(updateWorkspaceMosaicLayout).toBeCalled();
    });
  });
});
