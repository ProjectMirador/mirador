import React from 'react';
import { shallow } from 'enzyme';
import { Window } from '../../../src/components/Window';
import WindowTopBar from '../../../src/containers/WindowTopBar';
import PrimaryWindow from '../../../src/containers/PrimaryWindow';

/** create wrapper */
function createWrapper(props, context) {
  return shallow(
    <Window
      window={window}
      classes={{}}
      t={k => k}
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
    maximized: false,
    width: 400,
    x: 2700,
    y: 2700,
  };
  it('should render nothing, if provided with no window data', () => {
    wrapper = shallow(<Window t={k => k} />);
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
