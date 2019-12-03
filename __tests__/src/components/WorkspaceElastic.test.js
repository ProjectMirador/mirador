import React from 'react';
import { shallow } from 'enzyme';
import { Rnd } from 'react-rnd';
import ResizeObserver from 'react-resize-observer';
import WorkspaceElastic from '../../../src/components/WorkspaceElastic';
import WorkspaceElasticWindow from '../../../src/containers/WorkspaceElasticWindow';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WorkspaceElastic
      classes={{}}
      elasticLayout={{}}
      workspace={{
        focusedWindowId: '2',
        height: 5000,
        viewportPosition: {
          x: 20,
          y: 20,
        },
        width: 5000,
      }}
      setWorkspaceViewportDimensions={() => {}}
      setWorkspaceViewportPosition={() => {}}
      updateElasticWindowLayout={() => {}}
      {...props}
    />,
  );
}

describe('WorkspaceElastic', () => {
  const elasticLayout = {
    1: {
      height: 200,
      width: 200,
      windowId: '1',
      x: 20,
      y: 20,
    },
    2: {
      height: 400,
      width: 300,
      windowId: '2',
      x: 25,
      y: 25,
    },
  };
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper({ elasticLayout });
  });
  it('should render properly with an initialValue', () => {
    expect(wrapper.find(WorkspaceElasticWindow).length).toBe(2);
  });
  describe('workspace behaviour', () => {
    it('when workspace itself is dragged', () => {
      const mockDragStop = jest.fn();
      wrapper = createWrapper({
        elasticLayout,
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
        x: -2700,
        y: -2700,
      });
    });

    it('when workspace itself is resized', () => {
      const mockResize = jest.fn();
      wrapper = createWrapper({
        elasticLayout,
        setWorkspaceViewportDimensions: mockResize,
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
