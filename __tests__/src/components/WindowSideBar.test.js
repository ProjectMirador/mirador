import React from 'react';
import { mount } from 'enzyme';
import { WindowSideBarButtons } from '../../../src/components/WindowSideBarButtons';

/** create wrapper */
function createWrapper(props) {
  return mount(
    <WindowSideBarButtons
      addCompanionWindow={() => {}}
      {...props}
    />,
  );
}

/**
 * Assert which tab is focussed
 */
function assertTabFocused(wrapper, tabIndex) {
  const tabs = wrapper.find('button[role="tab"]');

  tabs.forEach((tab, index) => {
    if (index === tabIndex) {
      expect(tab.find('button').instance()).toEqual(document.activeElement);
    }
  });
}

describe('WindowSideBarButtons (shallow)', () => {
  const windowId = 'test123';
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({ windowId });
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Tabs)').length).toBe(1);
  });

  it('triggers the addCompanionWindow prop on click', () => {
    const addCompanionWindow = jest.fn();
    wrapper = createWrapper({ addCompanionWindow, windowId });

    wrapper.find('WithStyles(Tabs)').props().onChange({ target: { removeAttribute: () => {}, setAttribute: () => {} } }, 'info');
    expect(addCompanionWindow).toHaveBeenCalledTimes(1);
    expect(addCompanionWindow).toHaveBeenCalledWith('info');
  });

  it('has a badge indicating if the annotations panel has annotations', () => {
    let tab;
    wrapper = createWrapper({ hasAnnotations: true, windowId });
    tab = wrapper.find('WithStyles(Tab)[value="annotations"]');
    expect(tab.find('WithStyles(Badge)').props().invisible).toBe(false);

    wrapper = createWrapper({ hasAnnotations: false, windowId });
    tab = wrapper.find('WithStyles(Tab)[value="annotations"]');

    expect(tab.find('WithStyles(Badge)').props().invisible).toBe(true);
  });

  describe('handleKeyUp', () => {
    it('the first tab is focussed by default', () => {
      assertTabFocused(wrapper, 0);
    });

    it('the focuses on the next tab when pressing the down arrow', () => {
      wrapper.find('button[role="tab"]').at(0).simulate('keyUp', { key: 'ArrowDown' });
      assertTabFocused(wrapper, 1);
    });

    it('the focuses on the previous tab when pressing the up arrow', () => {
      wrapper.find('button[role="tab"]').at(1).simulate('keyUp', { key: 'ArrowUp' });
      assertTabFocused(wrapper, 0);
    });

    it('the focuses on the first tab when pressing the down arrow from the last tab', () => {
      wrapper.find('button[role="tab"]').last().simulate('keyUp', { key: 'ArrowDown' });
      assertTabFocused(wrapper, 0);
    });

    it('the focuses on the last tab when pressing the up arrow from the first tab', () => {
      wrapper.find('button[role="tab"]').first().simulate('keyUp', { key: 'ArrowUp' });
      assertTabFocused(wrapper, 2); // Assuming 3 tabs
    });
  });
});
