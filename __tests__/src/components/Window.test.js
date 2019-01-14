import React from 'react';
import { shallow } from 'enzyme';
import Window from '../../../src/components/Window';
import WindowTopBar from '../../../src/containers/WindowTopBar';
import ConnectedWindowMiddleContent from '../../../src/components/WindowMiddleContent';

describe('Window', () => {
  let wrapper;
  const window = { id: 123, xywh: [0, 0, 400, 500] };
  it('should render outer element', () => {
    wrapper = shallow(<Window window={window} />);
    expect(wrapper.find('.mirador-window')).toHaveLength(1);
  });
  it('should render <ConnectedWindowTopBar>', () => {
    wrapper = shallow(<Window window={window} />);
    expect(wrapper.find(WindowTopBar)).toHaveLength(1);
  });
  it('should render <ConnectedWindowMiddleContent>', () => {
    wrapper = shallow(<Window window={window} />);
    expect(wrapper.find(ConnectedWindowMiddleContent)).toHaveLength(1);
  });
  it('should render bottom companions window areas', () => {
    wrapper = shallow(<Window window={window} />);
    expect(wrapper.find('.mirador-companion-bottom')).toHaveLength(1);
  });
});
