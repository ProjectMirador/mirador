import React from 'react';
import { shallow } from 'enzyme';
import { SearchPanelNavigation } from '../../../src/components/SearchPanelNavigation';


/**
 * Helper function to create a shallow wrapper around SearchPanelNavigation
 */
function createWrapper(props) {
  return shallow(
    <SearchPanelNavigation
      companionWindowId="cw"
      windowId="window"
      {...props}
    />,
  );
}

describe('SearchPanelNavigation', () => {
  describe('when searchHits are available', () => {
    it('renders text with buttons', () => {
      const selectContentSearchAnnotation = jest.fn();
      const wrapper = createWrapper({
        searchHits: [{ annotations: ['1'] }, { annotations: ['2'] }, { annotations: ['3'] }],
        selectContentSearchAnnotation,
        selectedContentSearchAnnotation: ['2'],
      });
      expect(wrapper.find('WithStyles(ForwardRef(Typography))').text()).toEqual('pagination');
      expect(wrapper.find('Connect(WithPlugins(MiradorMenuButton))[disabled=false]').length).toEqual(2);
      wrapper.find('Connect(WithPlugins(MiradorMenuButton))[disabled=false]').first().props().onClick();
      expect(selectContentSearchAnnotation).toHaveBeenCalledWith(['1']);
      wrapper.find('Connect(WithPlugins(MiradorMenuButton))[disabled=false]').last().props().onClick();
      expect(selectContentSearchAnnotation).toHaveBeenCalledWith(['3']);
    });
    it('buttons disabled when no next/prev', () => {
      const wrapper = createWrapper({
        searchHits: [{ annotations: ['1'] }],
        selectedContentSearchAnnotation: ['1'],
      });
      expect(wrapper.find('Connect(WithPlugins(MiradorMenuButton))[disabled=true]').length).toEqual(2);
    });
  });
});
