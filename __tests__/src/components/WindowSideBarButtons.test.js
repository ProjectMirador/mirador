import React from 'react';
import { mount } from 'enzyme';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { WindowSideBarButtons } from '../../../src/components/WindowSideBarButtons';

/** create wrapper */
function createWrapper(props) {
  return mount(
    <WindowSideBarButtons
      addCompanionWindow={() => {}}
      {...props}
      panels={{
        annotations: true,
        attribution: true,
        canvas: true,
        info: true,
        search: false,
        ...props.panels,
      }}
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
    expect(wrapper.find(Tabs).length).toBe(1);
  });

  it('triggers the addCompanionWindow prop on click', () => {
    const addCompanionWindow = jest.fn();
    wrapper = createWrapper({ addCompanionWindow, windowId });

    wrapper.find(Tabs).props().onChange({ target: { removeAttribute: () => {}, setAttribute: () => {} } }, 'info');
    expect(addCompanionWindow).toHaveBeenCalledTimes(1);
    expect(addCompanionWindow).toHaveBeenCalledWith('info');
  });

  it('has a badge indicating if the annotations panel has annotations', () => {
    let tab;
    wrapper = createWrapper({ hasAnnotations: true, windowId });
    tab = wrapper.find(Tab).find('[value="annotations"]');
    expect(tab.find(Badge).props().invisible).toBe(false);

    wrapper = createWrapper({ hasAnnotations: false, windowId });
    tab = wrapper.find(Tab).find('[value="annotations"]');

    expect(tab.find(Badge).props().invisible).toBe(true);
  });

  it('can hide annotation panel when configured to do so', () => {
    wrapper = createWrapper({ hasAnnotations: true, panels: { annotations: false }, windowId });
    expect(wrapper.find('WithStyles(Tab)[value="annotations"]').length).toEqual(0);
  });

  describe('search', () => {
    it('by default is off', () => {
      expect(wrapper.find('WithStyles(Tab)[value="search"]').length).toEqual(0);
    });
    it('can be configured to be on', () => {
      wrapper = createWrapper({ hasSearchService: true, panels: { search: true }, windowId });
      expect(wrapper.find('WithStyles(ForwardRef(Tab))[value="search"]').length).toEqual(1);
    });

    it('has a badge indicating if the search panel has active annotations', () => {
      let tab;
      wrapper = createWrapper({
        hasSearchResults: true,
        hasSearchService: true,
        panels: {
          search: true,
        },
        windowId,
      });
      tab = wrapper.find(Tab).find('[value="search"]');
      expect(tab.find(Badge).props().invisible).toBe(false);

      wrapper = createWrapper({
        hasSearchResults: false,
        hasSearchService: true,
        panels: {
          search: true,
        },
        windowId,
      });
      tab = wrapper.find(Tab).find('[value="search"]');

      expect(tab.find(Badge).props().invisible).toBe(true);
    });
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
      const tabs = wrapper.find('button[role="tab"]');
      wrapper.find('button[role="tab"]').first().simulate('keyUp', { key: 'ArrowUp' });
      assertTabFocused(wrapper, tabs.length - 1); // Assuming 3 tabs
    });
  });
});
