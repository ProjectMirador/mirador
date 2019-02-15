import React from 'react';
import { shallow } from 'enzyme';
import WindowSideBarPanel from '../../../src/components/WindowSideBarPanel';
import WindowSideBarInfoPanel from '../../../src/containers/WindowSideBarInfoPanel';

describe('WindowSideBarPanel', () => {
  let wrapper;

  describe('when the sideBarPanel is set to "info"', () => {
    beforeEach(() => {
      wrapper = shallow(<WindowSideBarPanel windowId="abc123" sideBarPanel="info" />);
    });

    it('renders the WindowSideBarInfoPanel', () => {
      expect(wrapper.find(WindowSideBarInfoPanel).length).toBe(1);
    });
  });

  describe('when the sideBarPanel is set to "closed" (or any other unknown value)', () => {
    beforeEach(() => {
      wrapper = shallow(<WindowSideBarPanel windowId="abc123" sideBarPanel="closed" />);
    });

    it('does not render any panel component', () => {
      expect(wrapper.find(WindowSideBarInfoPanel).length).toBe(0);
    });
  });

  describe('when the pop out companion window button is clicked', () => {
    it('triggers the popOutCompanionWindow prop with the appropriate args', () => {
      const popOutCompanionWindowEvent = jest.fn();
      wrapper = shallow(
        <WindowSideBarPanel
          windowId="abc123"
          sideBarPanel="info"
          popOutCompanionWindow={popOutCompanionWindowEvent}
        />,
      );

      const popOutButton = wrapper.find('WithStyles(IconButton)');
      popOutButton.simulate('click');
      expect(popOutCompanionWindowEvent).toHaveBeenCalledTimes(1);
      expect(popOutCompanionWindowEvent).toHaveBeenCalledWith('abc123', 'info', 'right');
    });
  });
});
