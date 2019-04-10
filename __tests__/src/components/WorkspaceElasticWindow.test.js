import React from 'react';
import { shallow } from 'enzyme';
import { Rnd } from 'react-rnd';
import WorkspaceElasticWindow from '../../../src/components/WorkspaceElasticWindow';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceElasticWindow
      layout={{}}
      workspace={{
        focusedWindowId: '2',
        height: 5000,
        viewportPosition: {
          x: 20,
          y: 20,
        },
        width: 5000,
      }}
      updateElasticWindowLayout={() => {}}
      {...props}
    />,
  );
}

describe('WorkspaceElasticWindow', () => {
  const layout = {
    height: 200,
    width: 200,
    windowId: '1',
    x: 20,
    y: 20,
  };

  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper({ layout });
  });
  it('should render properly with an initialValue', () => {
    expect(wrapper
      .find(Rnd)
      .prop('size'))
      .toEqual({
        height: 200,
        width: 200,
      });
    expect(wrapper
      .find(Rnd)
      .prop('position'))
      .toEqual({
        x: 2520,
        y: 2520,
      });
  });
  describe('focused window', () => {
    it('adds a class to the focused window', () => {
      wrapper = createWrapper({ focused: true, layout });
      expect(wrapper.find(Rnd).hasClass('mirador-workspace-focused-window'));
    });
  });
  describe('window behaviour', () => {
    it('when windows are dragged', () => {
      const mockDragStop = jest.fn();
      wrapper = createWrapper({
        layout,
        updateElasticWindowLayout: mockDragStop,
      });
      wrapper
        .find(Rnd)
        .props()
        .onDragStop('myevent', {
          x: 200,
          y: 200,
        });
      expect(mockDragStop).toHaveBeenCalledWith('1', {
        x: -2300,
        y: -2300,
      });
    });
    it('when windows are resized', () => {
      const mockOnResize = jest.fn();
      wrapper = createWrapper({
        layout,
        updateElasticWindowLayout: mockOnResize,
      });
      wrapper
        .find(Rnd)
        .props()
        .onResize('myevent', 'direction', {
          style: {
            height: 200,
            width: 400,
          },
        }, {}, { x: 0, y: 0 });
      expect(mockOnResize).toHaveBeenCalledWith('1', {
        height: 200,
        width: 400,
        x: -2500,
        y: -2500,
      });
    });
  });
});
