import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { WindowSideBarInfoPanel } from '../../../src/components/WindowSideBarInfoPanel';
import { LabelValueMetadata } from '../../../src/components/LabelValueMetadata';
import { SanitizedHtml } from '../../../src/components/SanitizedHtml';

describe('WindowSideBarInfoPanel', () => {
  const metadata = [{ label: {}, value: {} }];
  let wrapper;

  describe('when metadata is present', () => {
    beforeEach(() => {
      wrapper = shallow(
        <WindowSideBarInfoPanel
          id="asdf"
          windowId="zxcv"
          canvasLabel="The Canvas Label"
          canvasDescription="The Canvas Description"
          canvasMetadata={metadata}
          manifestLabel="The Manifest Label"
          manifestDescription="The Manifest Description"
          manifestMetadata={metadata}
        />,
      );
    });

    it('renders header', () => {
      expect(
        wrapper.props().title,
      ).toBe('aboutThisItem');
    });

    it('renders canvas label', () => {
      expect(
        wrapper.find(Typography).at(0).matchesElement(
          <Typography>The Canvas Label</Typography>,
        ),
      ).toBe(true);
    });

    it('renders canvas description in SanitizedHtml component', () => {
      expect(
        wrapper.find(Typography).at(1).matchesElement(
          <Typography>
            <SanitizedHtml htmlString="The Canvas Description" ruleSet="iiif" />
          </Typography>,
        ),
      ).toBe(true);
    });

    it('renders canvas metadata in LabelValueMetadata component', () => {
      expect(
        wrapper.find(LabelValueMetadata).at(0).matchesElement(
          <LabelValueMetadata labelValuePairs={metadata} />,
        ),
      ).toBe(true);
    });

    it('renders manifest label', () => {
      expect(
        wrapper.find(Typography).at(2).matchesElement(
          <Typography>The Manifest Label</Typography>,
        ),
      ).toBe(true);
    });

    it('renders manifest description in SanitizedHtml component', () => {
      expect(
        wrapper.find(Typography).at(3).matchesElement(
          <Typography>
            <SanitizedHtml htmlString="The Manifest Description" ruleSet="iiif" />
          </Typography>,
        ),
      ).toBe(true);
    });

    it('renders manifest metadata in LabelValueMetadata component', () => {
      expect(
        wrapper.find(LabelValueMetadata).at(1).matchesElement(
          <LabelValueMetadata labelValuePairs={metadata} />,
        ),
      ).toBe(true);
    });
  });

  describe('when metadata is not present', () => {
    beforeEach(() => {
      wrapper = shallow(
        <WindowSideBarInfoPanel windowId="xyz" id="abc" />,
      );
    });

    it('does not render empty elements elements', () => {
      expect(wrapper.find(Typography).length).toBe(0);
      expect(wrapper.find(LabelValueMetadata).length).toBe(0);
    });
  });
});
