import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import WindowSideBarInfoPanel from '../../../src/components/WindowSideBarInfoPanel';
import LabelValueMetadata from '../../../src/components/LabelValueMetadata';

describe('WindowSideBarInfoPanel', () => {
  let wrapper;

  describe('when metadata is present', () => {
    beforeEach(() => {
      wrapper = shallow(
        <WindowSideBarInfoPanel
          canvasLabel="The Canvas Label"
          canvasDescription="The Canvas Description"
          canvasMetadata={[{ label: {}, value: {} }]}
          manifestLabel="The Manifest Label"
          manifestDescription="The Manifest Description"
        />,
      ).dive();
    });

    it('renders canvas level label, description, and metadata', () => {
      expect(
        wrapper.find('WithStyles(Typography)[variant="h3"]').first().matchesElement(
          <Typography>The Canvas Label</Typography>,
        ),
      ).toBe(true);

      expect(
        wrapper.find('WithStyles(Typography)[variant="body2"]').first().matchesElement(
          <Typography>The Canvas Description</Typography>,
        ),
      ).toBe(true);

      expect(wrapper.find(LabelValueMetadata).length).toBe(2); // one for canvas one for manifest
    });

    it('renders manifest level label, description, and metadata', () => {
      expect(
        wrapper.find('WithStyles(Typography)[variant="h3"]').last().matchesElement(
          <Typography>The Manifest Label</Typography>,
        ),
      ).toBe(true);

      expect(
        wrapper.find('WithStyles(Typography)[variant="body2"]').last().matchesElement(
          <Typography>The Manifest Description</Typography>,
        ),
      ).toBe(true);

      expect(wrapper.find(LabelValueMetadata).length).toBe(2); // one for canvas one for manifest
    });
  });

  describe('when metadata is not present', () => {
    beforeEach(() => {
      wrapper = shallow(
        <WindowSideBarInfoPanel />,
      ).dive();
    });

    it('does not render empty elements', () => {
      expect(
        wrapper.find('WithStyles(Typography)[variant="h2"]').first().matchesElement(
          <Typography>aboutThisItem</Typography>,
        ),
      ).toBe(true);

      expect(wrapper.find('WithStyles(Typography)[variant="h3"]').length).toEqual(0);
      expect(wrapper.find('WithStyles(Typography)[variant="body2"]').length).toEqual(0);
    });
  });
});
