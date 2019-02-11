import React from 'react';
import { shallow } from 'enzyme';
import WindowTopBar from '../../../src/components/WindowTopBar';
import WindowIcon from '../../../src/containers/WindowIcon';

const manifestFixture = {
  manifestation: {
    getLabel: () => [{ value: 'Fixture Label' }],
  },
};

describe('WindowTopBar', () => {
  let topBar;
  let mockRemoveWindow;
  let mockToggleWindowSideBar;

  beforeEach(() => {
    mockRemoveWindow = jest.fn();
    mockToggleWindowSideBar = jest.fn();
    topBar = shallow(
      <WindowTopBar
        manifest={manifestFixture}
        windowId="foo"
        removeWindow={mockRemoveWindow}
        toggleWindowSideBar={mockToggleWindowSideBar}
        classes={{}}
        t={key => key}
      />,
    ).dive();
  });

  it('renders wrapping element', () => {
    expect(topBar.find('.mirador-window-top-bar').length).toBe(1);
  });

  it('provides removeWindow() function to the close button component', () => {
    expect(topBar.find('.mirador-window-close').prop('onClick'))
      .toBe(mockRemoveWindow);
  });

  it('renders a window icon', () => {
    expect(topBar.find(WindowIcon).length).toBe(1);
  });

  it('calls the toggleWindowSideBar prop when the menu IconButton is clicked', () => {
    topBar.find('WithStyles(IconButton)').simulate('click');
    expect(mockToggleWindowSideBar).toHaveBeenCalledTimes(1);
    expect(mockToggleWindowSideBar).toHaveBeenCalledWith('foo');
  });
});
