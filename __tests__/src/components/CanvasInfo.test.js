import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { CanvasInfo } from '../../../src/components/CanvasInfo';
import { LabelValueMetadata } from '../../../src/components/LabelValueMetadata';
import { SanitizedHtml } from '../../../src/components/SanitizedHtml';

describe('CanvasInfo', () => {
  const metadata = [{ label: {}, value: {} }];
  let wrapper;

  describe('when metadata is present', () => {
    beforeEach(() => {
      wrapper = shallow(
        <CanvasInfo
          canvasLabel="The Canvas Label"
          canvasDescription="The Canvas Description"
          canvasMetadata={metadata}
          id="xyz"
          t={str => str}
        />,
      );
    });

    it('renders canvas label', () => {
      expect(
        wrapper.find(Typography).at(1).matchesElement(
          <Typography>The Canvas Label</Typography>,
        ),
      ).toBe(true);
    });

    it('renders canvas description in SanitizedHtml component', () => {
      expect(
        wrapper.find(Typography).at(2).matchesElement(
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
  });

  describe('when metadata is not present', () => {
    beforeEach(() => {
      wrapper = shallow(
        <CanvasInfo id="xyz" />,
      );
    });

    it('does not render empty elements elements', () => {
      expect(wrapper.find(LabelValueMetadata).length).toBe(0);
    });
  });
});
