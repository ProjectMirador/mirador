import React from 'react';
import { shallow } from 'enzyme';
import { Window } from '../../../src/components/Window';
import ConnectedWindowTopBar from '../../../src/components/WindowTopBar';
import WindowBackground from '../../../src/components/WindowBackground';
import ConnectedWindowViewer from '../../../src/components/WindowViewer';

describe('Window', () => {
  let wrapper;
  let manifest;
  const window = { id: 123, xywh: [0, 0, 400, 500] };
  it('should render outer element', () => {
    wrapper = shallow(<Window window={window} />);
    expect(wrapper.find('.mirador-window')).toHaveLength(1);
    expect(wrapper.instance().styleAttributes())
      .toEqual({ width: '400px', height: '500px' });
  });
  it('should render <ConnectedWindowTopBar>', () => {
    wrapper = shallow(<Window window={window} />);
    expect(wrapper.find(ConnectedWindowTopBar)).toHaveLength(1);
  });
  it('should render <WindowBackground> if no manifest given', () => {
    wrapper = shallow(<Window window={window} />);
    expect(wrapper.find(WindowBackground)).toHaveLength(1);
  });
  it('should render <WindowBackground> if manifest is fetching', () => {
    manifest = { id: 456, isFetching: true };
    wrapper = shallow(<Window window={window} manifest={manifest} />);
    expect(wrapper.find(WindowBackground)).toHaveLength(1);
  });
  it('should render <WindowViewer> if manifest is present', () => {
    manifest = { id: 456, isFetching: false };
    wrapper = shallow(<Window window={window} manifest={manifest} />);
    expect(wrapper.find(ConnectedWindowViewer)).toHaveLength(1);
  });
});
