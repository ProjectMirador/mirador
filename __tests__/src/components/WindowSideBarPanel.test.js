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
});
