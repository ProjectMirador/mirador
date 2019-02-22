import React from 'react';
import { shallow } from 'enzyme';
import { WindowSideBarButtons } from '../../../src/components/WindowSideBarButtons';

describe('WindowSideBarButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WindowSideBarButtons />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('Fragment').length).toBe(1);
  });

  it('triggers the toggleWindowSideBarPanel prop on click', () => {
    const toggleWindowSideBarPanel = jest.fn();
    wrapper = shallow(
      <WindowSideBarButtons toggleWindowSideBarPanel={toggleWindowSideBarPanel} />,
    );

    const iconButton = wrapper.find('WithStyles(IconButton)[aria-label="openInfoCompanionWindow"]');
    expect(iconButton.simulate('click'));
    expect(toggleWindowSideBarPanel).toHaveBeenCalledTimes(1);
    expect(toggleWindowSideBarPanel).toHaveBeenCalledWith('info');
  });
});
