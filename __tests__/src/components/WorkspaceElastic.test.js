import React from 'react';
import { shallow } from 'enzyme';
import { Rnd } from 'react-rnd';
import WorkspaceElastic from '../../../src/components/WorkspaceElastic';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceElastic
      windows={{}}
      workspace={{
        focusedWindowId: 2,
        width: 5000,
        height: 5000,
        viewportPosition: {
          x: 20,
          y: 20,
        },
      }}
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
      id: 1,
      x: 20,
      y: 20,
      width: 200,
      height: 200,
    },
    2: {
      id: 2,
      x: 25,
      y: 25,
      width: 300,
      height: 400,
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
        width: 200,
        height: 200,
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
        width: 300,
        height: 400,
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
        windows,
        updateWindowPosition: mockDragStop,
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
        windows,
        setWindowSize: mockOnResize,
      });
      wrapper
        .find(Rnd)
        .at(1)
        .props()
        .onResize('myevent', 'direction', {
          style: {
            width: 400,
            height: 200,
          },
        }, {}, { x: 0, y: 0 });
      expect(mockOnResize).toHaveBeenCalledWith(1, {
        width: 400,
        height: 200,
        x: -2500,
        y: -2500,
      });
    });
  });

  describe('workspace behaviour', () => {
    it('when workspace itself is dragged', () => {
      const mockDragStop = jest.fn();
      wrapper = createWrapper({
        windows,
        setWorkspaceViewportPosition: mockDragStop,
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
        x: 2700,
        y: 2700,
      });
    });
  });
});
