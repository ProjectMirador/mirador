import React from 'react';
import { shallow } from 'enzyme';
import { WindowSideBarInfoPanel } from '../../../src/components/WindowSideBarInfoPanel';
import CanvasInfo from '../../../src/containers/CanvasInfo';
import ManifestInfo from '../../../src/containers/ManifestInfo';
import ManifestRelatedLinks from '../../../src/containers/ManifestRelatedLinks';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowSideBarInfoPanel
      id="asdf"
      windowId="zxcv"
      t={str => str}
      {...props}
    />,
  );
}
describe('WindowSideBarInfoPanel', () => {
  let wrapper;

  describe('when metadata is present', () => {
    it('renders headers', () => {
      wrapper = createWrapper();
      expect(
        wrapper.props().title,
      ).toBe('aboutThisItem');
    });

    it('renders the manifest elements', () => {
      wrapper = createWrapper();
      expect(wrapper.find(ManifestInfo).length).toBe(1);
      expect(wrapper.find(ManifestRelatedLinks).length).toBe(1);
    });

    it('renders the canvas elements', () => {
      wrapper = createWrapper({ selectedCanvases: [{ id: '1' }, { id: '2' }] });
      expect(wrapper.find(CanvasInfo).length).toBe(2);
      let canvasInfo = wrapper.find(CanvasInfo).at(0);

      expect(canvasInfo.props().canvasId).toEqual('1');
      expect(canvasInfo.props().index).toEqual(0);
      expect(canvasInfo.props().totalSize).toEqual(2);

      canvasInfo = wrapper.find(CanvasInfo).at(1);
      expect(canvasInfo.props().canvasId).toEqual('2');
      expect(canvasInfo.props().index).toEqual(1);
      expect(canvasInfo.props().totalSize).toEqual(2);
    });
  });
});
