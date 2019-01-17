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
      />,
    );
  });

  it('renders without an error', () => {
    expect(topBar.find('div.mirador-window-top-bar h3')
      .text()).toBe('Fixture Label');
    expect(topBar.find('button.mirador-window-close'));
  });

  it('calls the removeWindow prop when the close button is clicked', () => {
    topBar.find('button').simulate('click');
    expect(mockRemoveWindow).toHaveBeenCalledTimes(1);
    expect(mockRemoveWindow).toHaveBeenCalledWith('foo');
  });
});
