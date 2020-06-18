import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import compact from 'lodash/compact';
import { WindowSideBarCanvasPanel } from '../../../src/components/WindowSideBarCanvasPanel';
import SidebarIndexList from '../../../src/containers/SidebarIndexList';
import CompanionWindow from '../../../src/containers/CompanionWindow';
import manifestJson from '../../fixtures/version-2/019.json';

/**
 * Helper function to create a shallow wrapper around WindowSideBarCanvasPanel
 */
function createWrapper(props) {
  const canvases = Utils.parseManifest(manifestJson).getSequences()[0].getCanvases();

  return shallow(
    <WindowSideBarCanvasPanel
      id="asdf"
      canvases={canvases}
      classes={{}}
      t={key => key}
      windowId="xyz"
      setCanvas={() => {}}
      config={{ canvasNavigation: { height: 100 } }}
      updateVariant={() => {}}
      selectedCanvases={[canvases[1]]}
      variant="item"
      {...props}
    />,
  );
}

describe('WindowSideBarCanvasPanel', () => {
  it('renders SidebarIndexList', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(CompanionWindow).props().title).toBe('canvasIndex');
    expect(wrapper.find(SidebarIndexList).length).toBe(1);
  });

  it('without a treeStructure will not render the table of contents tab', () => {
    const wrapper = createWrapper();
    expect(
      compact(wrapper.find(CompanionWindow).props().titleControls.props.children)
        .length,
    ).toBe(2);
  });

  describe('handleVariantChange', () => {
    it('updates the variant', () => {
      const updateVariant = jest.fn();
      const wrapper = createWrapper({ updateVariant });
      wrapper.instance().handleVariantChange({}, 'item');
      expect(updateVariant).toHaveBeenCalledWith('item');
    });
  });
});
