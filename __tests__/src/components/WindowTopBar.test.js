import React from 'react';
import { shallow } from 'enzyme';
import WindowTopBar from '../../../src/components/WindowTopBar';

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
    ).dive();
  });

  it('renders without an error', () => {
    expect(topBar.find('.mirador-window-top-bar').length).toBe(1);
  });
});
