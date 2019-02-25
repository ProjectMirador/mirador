import React from 'react';
import { shallow } from 'enzyme';
import { Window } from '../../../src/components/Window';
import WindowTopBar from '../../../src/containers/WindowTopBar';
import PrimaryWindow from '../../../src/containers/PrimaryWindow';
import ThumbnailNavigation from '../../../src/containers/ThumbnailNavigation';
import CompanionArea from '../../../src/containers/CompanionArea';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <Window
      manifest={{}}
      window={{}}
      classes={{}}
      {...props}
    />,
  );
}

describe('Window', () => {
  it('should render nothing, if provided with no window data', () => {
    const wrapper = createWrapper({ window: null });
    expect(wrapper.find('.mirador-window')).toHaveLength(0);
  });
  it('should render outer element', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.mirador-window')).toHaveLength(1);
  });
  it('should render <WindowTopBar>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(WindowTopBar)).toHaveLength(1);
  });
  it('should render <PrimaryWindow>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(PrimaryWindow)).toHaveLength(1);
  });
  it('should render <ThumbnailNavigation>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(ThumbnailNavigation)).toHaveLength(1);
  });
  it('should render right <CompanionArea>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(CompanionArea).at(1).props().position).toBe('right');
  });
  it('should render bottom <CompanionArea>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(CompanionArea).at(0).props().position).toBe('bottom');
  });
});
