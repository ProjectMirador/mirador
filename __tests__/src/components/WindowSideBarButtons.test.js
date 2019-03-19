import React from 'react';
import { shallow } from 'enzyme';
import { WindowSideBarButtons } from '../../../src/components/WindowSideBarButtons';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowSideBarButtons
      addCompanionWindow={() => {}}
      {...props}
    />,
  );
}

describe('WindowSideBarButtons', () => {
  const windowId = 'test123';
  let wrapper;

  beforeEach(() => {
    document.body.innerHTML = `<div id="${windowId}-sidebar-buttons" >`
    + '<button role="tab" aria-selected="true" />'
    + '</div>';
    wrapper = createWrapper({ windowId });
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Tabs)').length).toBe(1);
  });

  it('triggers the addCompanionWindow prop on click', () => {
    const addCompanionWindow = jest.fn();
    wrapper = createWrapper({ addCompanionWindow, windowId });

    wrapper.find('WithStyles(Tabs)').simulate('change', { target: { removeAttribute: () => {}, setAttribute: () => {} } }, 'info');
    expect(addCompanionWindow).toHaveBeenCalledTimes(1);
    expect(addCompanionWindow).toHaveBeenCalledWith('info');
  });

  it('has a badge indicating if the annotations panel has annotations', () => {
    let tab;
    wrapper = createWrapper({ hasAnnotations: true, windowId });
    tab = wrapper.find('WithStyles(Tab)[aria-label="openAnnotationCompanionWindow"]').dive().dive();
    expect(tab.find('WithStyles(Badge)').props().invisible).toBe(false);

    wrapper = createWrapper({ hasAnnotations: false, windowId });
    tab = wrapper.find('WithStyles(Tab)[aria-label="openAnnotationCompanionWindow"]').dive().dive();

    expect(tab.find('WithStyles(Badge)').props().invisible).toBe(true);
  });
});
