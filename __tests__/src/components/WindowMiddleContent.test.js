import React from 'react';
import { shallow } from 'enzyme';
import WindowMiddleContent from '../../../src/components/WindowMiddleContent';
import CompanionWindow from '../../../src/containers/CompanionWindow';
import WindowSideBar from '../../../src/containers/WindowSideBar';
import ConnectedWindowViewer from '../../../src/components/WindowViewer';

describe('WindowMiddleContent', () => {
  let wrapper;
  let manifest;
  it('should render outer element', () => {
    wrapper = shallow(<WindowMiddleContent window={window} />);
    expect(wrapper.find('.mirador-window-middle-content')).toHaveLength(1);
  });
  it('should render <ConnectedCompanionWindow>', () => {
    wrapper = shallow(<WindowMiddleContent window={window} />);
    expect(wrapper.find(CompanionWindow)).toHaveLength(2);
  });
  it('should render <ConnectedWindowSideBar>', () => {
    wrapper = shallow(<WindowMiddleContent window={window} />);
    expect(wrapper.find(WindowSideBar)).toHaveLength(1);
  });
  it('should render <WindowViewer> if manifest is present', () => {
    manifest = { id: 456, isFetching: false };
    wrapper = shallow(<WindowMiddleContent window={window} manifest={manifest} />);
    expect(wrapper.find(ConnectedWindowViewer)).toHaveLength(1);
  });
});
