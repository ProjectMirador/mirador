import React from 'react';
import { shallow } from 'enzyme';
import { Window } from '../../../src/components/Window';
import WindowTopBar from '../../../src/containers/WindowTopBar';
import WindowMiddleContent from '../../../src/containers/WindowMiddleContent';

/** create wrapper */
function createWrapper(props, context) {
  return shallow(
    <Window
      window={window}
      {...props}
    />,
    { context },
  );
}

describe('Window', () => {
  let wrapper;
  const window = { id: 123, xywh: [0, 0, 400, 500] };
  it('should render nothing, if provided with no window data', () => {
    wrapper = shallow(<Window />);
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
  it('should render <WindowMiddleContent>', () => {
    wrapper = createWrapper({ window });
    expect(wrapper.find(WindowMiddleContent)).toHaveLength(1);
  });
  it('should render bottom companions window areas', () => {
    wrapper = createWrapper({ window });
    expect(wrapper.find('.mirador-companion-bottom')).toHaveLength(1);
  });
  describe('when workspaceType is mosaic', () => {
    it('calls the context mosaicWindowActions connectDragSource method to make WindowTopBar draggable', () => {
      const connectDragSource = jest.fn(component => component);
      wrapper = createWrapper({ window, workspaceType: 'mosaic' }, { mosaicWindowActions: { connectDragSource } });
      expect(wrapper.find(WindowTopBar)).toHaveLength(1);
      expect(connectDragSource).toHaveBeenCalled();
    });
  });
});
