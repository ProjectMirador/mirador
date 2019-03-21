import React from 'react';
import { shallow } from 'enzyme';
import { Rnd } from 'react-rnd';
import ResizeObserver from 'react-resize-observer';
import WorkspaceElastic from '../../../src/components/WorkspaceElastic';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceElastic
      windows={{}}
      workspace={{
        focusedWindowId: 2,
        height: 5000,
        viewportPosition: {
          x: 20,
          y: 20,
        },
        width: 5000,
      }}
      setWorkspaceViewportDimensions={() => {}}
      setWorkspaceViewportPosition={() => {}}
      setWindowSize={() => {}}
      updateWindowPosition={() => {}}
      {...props}
    />,
  );
}

describe('WorkspaceElastic', () => {
  const windows = {
    1: {
      height: 200,
      id: 1,
      width: 200,
      x: 20,
      y: 20,
    },
    2: {
      height: 400,
      id: 2,
      width: 300,
      x: 25,
      y: 25,
    },
  };
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper({ windows });
  });
  it('should render properly with an initialValue', () => {
    expect(wrapper.find(Rnd).length).toBe(3);
    expect(wrapper
      .find(Rnd)
      .at(1)
      .props().size)
      .toEqual({
        height: 200,
        width: 200,
      });
    expect(wrapper
      .find(Rnd)
      .at(2)
      .props().position)
      .toEqual({
        x: 2525,
        y: 2525,
      });
    expect(wrapper
      .find(Rnd)
      .at(2)
      .props().size)
      .toEqual({
        height: 400,
        width: 300,
      });
  });
  describe('focused window', () => {
    it('adds a class to the focused window', () => {
      expect(wrapper.find(Rnd).at(2).hasClass('mirador-workspace-focused-window'));
    });
  });
  describe('window behaviour', () => {
    it('when windows are dragged', () => {
      const mockDragStop = jest.fn();
      wrapper = createWrapper({
        updateWindowPosition: mockDragStop,
        windows,
      });
      wrapper
        .find(Rnd)
        .at(1)
        .props()
        .onDragStop('myevent', {
          x: 200,
          y: 200,
        });
      expect(mockDragStop).toHaveBeenCalledWith(1, {
        x: -2300,
        y: -2300,
      });
    });
    it('when windows are resized', () => {
      const mockOnResize = jest.fn();
      wrapper = createWrapper({
        setWindowSize: mockOnResize,
        windows,
      });
      wrapper
        .find(Rnd)
        .at(1)
        .props()
        .onResize('myevent', 'direction', {
          style: {
            height: 200,
            width: 400,
          },
        }, {}, { x: 0, y: 0 });
      expect(mockOnResize).toHaveBeenCalledWith(1, {
        height: 200,
        width: 400,
        x: -2500,
        y: -2500,
      });
    });
  });

  describe('workspace behaviour', () => {
    it('when workspace itself is dragged', () => {
      const mockDragStop = jest.fn();
      wrapper = createWrapper({
        setWorkspaceViewportPosition: mockDragStop,
        windows,
      });
      wrapper
        .find(Rnd)
        .at(0)
        .props()
        .onDragStop('myevent', {
          x: 200,
          y: 200,
        });
      expect(mockDragStop).toHaveBeenCalledWith({
        x: -2700,
        y: -2700,
      });
    });

    it('when workspace itself is resized', () => {
      const mockResize = jest.fn();
      wrapper = createWrapper({
        setWorkspaceViewportDimensions: mockResize,
        windows,
      });

      wrapper
        .find(ResizeObserver)
        .at(0)
        .props()
        .onResize({
          height: 500,
          width: 500,
        });
      expect(mockResize).toHaveBeenCalledWith({
        height: 500,
        width: 500,
      });
    });
  });
});
