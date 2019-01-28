import React from 'react';
import { shallow } from 'enzyme';
import { WindowTopBar } from '../../../src/components/WindowTopBar';

const manifestFixture = {
  manifestation: {
    getLabel: () => [{ value: 'Fixture Label' }],
  },
};

describe('WindowTopBar', () => {
  let topBar;
  let mockRemoveWindow;
  beforeEach(() => {
    mockRemoveWindow = jest.fn();
    topBar = shallow(
      <WindowTopBar
        manifest={manifestFixture}
        windowId="foo"
        removeWindow={mockRemoveWindow}
        classes={{}}
      />,
    );
  });

  it('renders without an error', () => {
    expect(topBar.dive().find('WithStyles(Toolbar)')
      .dive()
      .find('WithStyles(Typography)')
      .dive()
      .dive()
      .text()).toBe('Fixture Label');
    expect(topBar.find('WithStyles(Button).mirador-window-close'));
  });

  it('calls the removeWindow prop when the close button is clicked', () => {
    topBar.find('WithStyles(Button)').simulate('click');
    expect(mockRemoveWindow).toHaveBeenCalledTimes(1);
    expect(mockRemoveWindow).toHaveBeenCalledWith('foo');
  });
});
