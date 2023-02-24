import { shallow } from 'enzyme';
import { SearchPanelNavigation } from '../../../src/components/SearchPanelNavigation';

/**
 * Helper function to create a shallow wrapper around SearchPanelNavigation
 */
function createWrapper(props) {
  return shallow(
    <SearchPanelNavigation
      companionWindowId="cw"
      direction="ltr"
      windowId="window"
      {...props}
    />,
  );
}

describe('SearchPanelNavigation', () => {
  describe('when searchHits are available', () => {
    it('renders text with buttons', () => {
      const selectAnnotation = jest.fn();
      const wrapper = createWrapper({
        searchHits: [{ annotations: ['1'] }, { annotations: ['2'] }, { annotations: ['3'] }],
        selectAnnotation,
        selectedContentSearchAnnotation: ['2'],
      });
      expect(wrapper.find('WithStyles(ForwardRef(Typography))').text()).toEqual('pagination');
      expect(wrapper.find('WithWorkspaceContext(WithPlugins(MiradorMenuButton))[disabled=false]').length).toEqual(2);
      wrapper.find('WithWorkspaceContext(WithPlugins(MiradorMenuButton))[disabled=false]').first().props().onClick();
      expect(selectAnnotation).toHaveBeenCalledWith('1');
      wrapper.find('WithWorkspaceContext(WithPlugins(MiradorMenuButton))[disabled=false]').last().props().onClick();
      expect(selectAnnotation).toHaveBeenCalledWith('3');
    });
    it('buttons disabled when no next/prev', () => {
      const wrapper = createWrapper({
        searchHits: [{ annotations: ['1'] }],
        selectedContentSearchAnnotation: ['1'],
      });
      expect(wrapper.find('WithWorkspaceContext(WithPlugins(MiradorMenuButton))[disabled=true]').length).toEqual(2);
    });
  });
});
