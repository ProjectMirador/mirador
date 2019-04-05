import React from 'react';
import { shallow } from 'enzyme';
import { Window } from '../../../../src/components/window/Window';
import WindowTopBar from '../../../../src/containers/window/WindowTopBar';
import PrimaryWindow from '../../../../src/containers/window/PrimaryWindow';

/** create wrapper */
function createWrapper(props, context) {
  return shallow(
    <Window
      window={window}
      classes={{}}
      t={k => k}
      fetchManifest={() => {}}
      {...props}
    />,
    { context },
  );
}

describe('Window', () => {
  let wrapper;
  const window = {
    height: 400,
    id: 123,
    manifestId: 'foo',
    maximized: false,
    width: 400,
    x: 2700,
    y: 2700,
  };
  it('should render nothing, if provided with no window data', () => {
    wrapper = createWrapper({ window: null });
    expect(wrapper.find('.mirador-window')).toHaveLength(0);
  });
  it('should render outer element', () => {
    wrapper = createWrapper({ window });
    expect(wrapper.find('.mirador-window')).toHaveLength(1);
  });
  it('should render <WindowTopBar>', () => {
    wrapper = createWrapper({ window });
    expect(wrapper.find(WindowTopBar)).toHaveLength(1);
  });
  it('should render <PrimaryWindow>', () => {
    wrapper = createWrapper({ window });
    expect(wrapper.find(PrimaryWindow)).toHaveLength(1);
  });
  it('should dispatch fetchManifest when component mounts but manifest is not preset', () => {
    const mockFetchManifest = jest.fn();
    wrapper = createWrapper({ fetchManifest: mockFetchManifest, window });
    expect(mockFetchManifest).toHaveBeenCalled();
  });
  describe('when workspaceType is mosaic', () => {
    it('calls the context mosaicWindowActions connectDragSource method to make WindowTopBar draggable', () => {
      const connectDragSource = jest.fn(component => component);
      wrapper = createWrapper(
        { window, windowDraggable: true, workspaceType: 'mosaic' }, { mosaicWindowActions: { connectDragSource } },
      );
      expect(wrapper.find(WindowTopBar)).toHaveLength(1);
      expect(connectDragSource).toHaveBeenCalled();
    });

    it('does not call the context mosaicWindowActions connectDragSource when the windowDraggable is set to false', () => {
      const connectDragSource = jest.fn(component => component);
      wrapper = createWrapper(
        { window, windowDraggable: false, workspaceType: 'mosaic' }, { mosaicWindowActions: { connectDragSource } },
      );
      expect(wrapper.find(WindowTopBar)).toHaveLength(1);
      expect(connectDragSource).not.toHaveBeenCalled();
    });
  });
});
