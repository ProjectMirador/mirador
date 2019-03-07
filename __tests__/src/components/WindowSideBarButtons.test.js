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
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Tabs)').length).toBe(1);
  });

  it('triggers the addCompanionWindow prop on click', () => {
    const addCompanionWindow = jest.fn();
    wrapper = createWrapper({ addCompanionWindow });

    wrapper.find('WithStyles(Tabs)').simulate('change', {}, 'info');
    expect(addCompanionWindow).toHaveBeenCalledTimes(1);
    expect(addCompanionWindow).toHaveBeenCalledWith('info');
  });

  it('has a badge indicating if the annotations panel has annotations', () => {
    let tab;
    wrapper = createWrapper({ hasAnnotations: true });
    tab = wrapper.find('WithStyles(Tab)[aria-label="openAnnotationCompanionWindow"]').dive().dive();
    expect(tab.find('WithStyles(Badge)').props().invisible).toBe(false);

    wrapper = createWrapper({ hasAnnotations: false });
    tab = wrapper.find('WithStyles(Tab)[aria-label="openAnnotationCompanionWindow"]').dive().dive();

    expect(tab.find('WithStyles(Badge)').props().invisible).toBe(true);
  });
});
