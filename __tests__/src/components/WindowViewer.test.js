import { render, screen } from '@testing-library/react';
import { WindowViewer } from '../../../src/components/WindowViewer';
import WindowCanvasNavigationControls from '../../../src/containers/WindowCanvasNavigationControls';

/** create wrapper */
function createWrapper(props, suspenseFallback) {
  return render(
    <WindowViewer
      windowId="xyz"
      {...props}
    />,
    { suspenseFallback },
  );
}

describe('WindowViewer', () => {
  describe('when lazy imorts have not loaded', () => {
    it('renders fallback', () => {
      createWrapper({}, true);
      // eslint-disable-next-line
      //screen.debug();
      // expect(wrapper.find('div').length).toBe(1);
    });
  });
  describe('when lazy imorts have loaded', () => {
    it('renders expected components', () => {
      createWrapper({}, false);
      // eslint-disable-next-line
      screen.debug();
      // expect(wrapper.find('lazy').props().windowId).toBe('xyz');
      // expect(wrapper.find(WindowCanvasNavigationControls).props().windowId).toBe('xyz');
    });
  });
});
