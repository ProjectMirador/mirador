import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'manifesto.js/dist-esmodule/Utils';
import compact from 'lodash/compact';
import { WindowSideBarCanvasPanel } from '../../../src/components/WindowSideBarCanvasPanel';
import SidebarIndexList from '../../../src/containers/SidebarIndexList';
import SidebarSequenceList from '../../../src/containers/SidebarSequenceList';
import CompanionWindow from '../../../src/containers/CompanionWindow';
import manifestJson from '../../fixtures/version-2/019.json';

/**
 * Helper function to create a shallow wrapper around WindowSideBarCanvasPanel
 */
function createWrapper(props) {
  const canvases = Utils.parseManifest(manifestJson).getSequences()[0].getCanvases();
  const { multipleSequences } = props;
  let sequences;

  if (multipleSequences) {
    sequences = [{ id: 'a', label: 'seq1' },
      { id: 'b', label: 'seq2' }];
  } else {
    sequences = Utils.parseManifest(manifestJson).getSequences();
  }

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
      sequences={sequences}
      variant="item"
      {...props}
    />,
  );
}

describe('WindowSideBarCanvasPanel', () => {
  it('renders SidebarIndexList', () => {
    const wrapper = createWrapper({ multipleSequences: false });
    expect(wrapper.find(CompanionWindow).props().title).toBe('canvasIndex');
    expect(wrapper.find(SidebarIndexList).length).toBe(1);
  });

  it('without a treeStructure will not render the table of contents tab', () => {
    const wrapper = createWrapper({ multipleSequences: false });
    expect(
      compact(wrapper.find(CompanionWindow).props().titleControls.props.children)
        .length,
    ).toBe(2);
  });

  describe('handleVariantChange', () => {
    it('updates the variant', () => {
      const updateVariant = jest.fn();
      const wrapper = createWrapper({ multipleSequences: false, updateVariant });
      wrapper.instance().handleVariantChange({}, 'item');
      expect(updateVariant).toHaveBeenCalledWith('item');
    });
  });

  describe('MultipleSequencesDisplay', () => {
    it('renders canvases (SidebarIndexList) in sidebar when manifest contains one sequence', () => {
      const wrapper = createWrapper({ multipleSequences: false });
      expect(wrapper.exists(SidebarIndexList)).toBe(true);
    });

    it('renders sequence list in sidebar when manifest contains multiple sequences', () => {
      const wrapper = createWrapper({ multipleSequences: true });
      expect(wrapper.exists(SidebarSequenceList)).toBe(true);
    });
  });
});
