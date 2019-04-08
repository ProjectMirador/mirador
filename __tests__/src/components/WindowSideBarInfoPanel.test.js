import React from 'react';
import { shallow } from 'enzyme';
import { WindowSideBarInfoPanel } from '../../../src/components/WindowSideBarInfoPanel';
import CanvasInfo from '../../../src/containers/CanvasInfo';
import ManifestInfo from '../../../src/containers/ManifestInfo';
import ManifestRelatedLinks from '../../../src/containers/ManifestRelatedLinks';

describe('WindowSideBarInfoPanel', () => {
  let wrapper;

  describe('when metadata is present', () => {
    beforeEach(() => {
      wrapper = shallow(
        <WindowSideBarInfoPanel
          id="asdf"
          windowId="zxcv"
          t={str => str}
        />,
      );
    });

    it('renders headers', () => {
      expect(
        wrapper.props().title,
      ).toBe('aboutThisItem');
    });

    it('renders the elemeents', () => {
      expect(wrapper.find(CanvasInfo).length).toBe(1);
      expect(wrapper.find(ManifestInfo).length).toBe(1);
      expect(wrapper.find(ManifestRelatedLinks).length).toBe(1);
    });
  });
});
