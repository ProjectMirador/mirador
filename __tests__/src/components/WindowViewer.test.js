import React from 'react';
import { shallow } from 'enzyme';
import { WindowViewer } from '../../../src/components/WindowViewer';
import WindowCanvasNavigationControls from '../../../src/containers/WindowCanvasNavigationControls';

/** create wrapper */
function createWrapper(props, suspenseFallback) {
  return shallow(
    <WindowViewer
      windowId="xyz"
      {...props}
    />,
    { suspenseFallback },
  );
}

describe('WindowViewer', () => {
  let wrapper;
  describe('when lazy imorts have not loaded', () => {
    it('renders fallback', () => {
      wrapper = createWrapper({}, true);
      expect(wrapper.find('div').length).toBe(1);
    });
  });
  describe('when lazy imorts have loaded', () => {
    it('renders expected components', () => {
      wrapper = createWrapper({}, false);
      expect(wrapper.find('lazy').props().windowId).toBe('xyz');
      expect(wrapper.find(WindowCanvasNavigationControls).props().windowId).toBe('xyz');
    });
  });
});
