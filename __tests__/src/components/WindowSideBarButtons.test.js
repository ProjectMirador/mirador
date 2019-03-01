import React from 'react';
import { shallow } from 'enzyme';
import { WindowSideBarButtons } from '../../../src/components/WindowSideBarButtons';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowSideBarButtons
      addCompanionWindow={() => {}}
      closeCompanionWindow={() => {}}
      {...props}
    />,
  );
}

describe('WindowSideBarButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders without an error', () => {
    expect(wrapper.find('Fragment').length).toBe(1);
  });

  it('triggers the addCompanionWindow prop on click', () => {
    const addCompanionWindow = jest.fn();
    wrapper = createWrapper({ addCompanionWindow });

    const iconButton = wrapper.find('WithStyles(IconButton)[aria-label="openInfoCompanionWindow"]');
    expect(iconButton.simulate('click'));
    expect(addCompanionWindow).toHaveBeenCalledTimes(1);
    expect(addCompanionWindow).toHaveBeenCalledWith('info');
  });

  it('triggers the closeCompanionWindow prop when clicking on the current window', () => {
    const closeCompanionWindow = jest.fn();
    wrapper = createWrapper({ closeCompanionWindow, sideBarPanelId: 'asdf', sideBarPanel: 'info' });

    const iconButton = wrapper.find('WithStyles(IconButton)[aria-label="closeInfoCompanionWindow"]');
    expect(iconButton.simulate('click'));
    expect(closeCompanionWindow).toHaveBeenCalledTimes(1);
    expect(closeCompanionWindow).toHaveBeenCalledWith('asdf');
  });

  it('has a badge indicating if the annotations panel has annotations', () => {
    wrapper = createWrapper({ hasAnnotations: true });

    expect(wrapper.find('WithStyles(Badge)').props().invisible).toBe(false);

    wrapper = createWrapper({ hasAnnotations: false });

    expect(wrapper.find('WithStyles(Badge)').props().invisible).toBe(true);
  });
});
