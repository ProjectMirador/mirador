import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Img from 'react-image';
import { AttributionPanel } from '../../../src/components/AttributionPanel';
import { LabelValueMetadata } from '../../../src/components/LabelValueMetadata';

/**
 * Helper function to create a shallow wrapper around AttributionPanel
 */
function createWrapper(props) {
  return shallow(
    <AttributionPanel
      id="xyz"
      t={str => str}
      windowId="window"
      {...props}
    />,
  );
}

describe('AttributionPanel', () => {
  it('renders the required statement', () => {
    const requiredStatement = [
      { label: 'x', value: 'y' },
    ];
    const wrapper = createWrapper({ requiredStatement });
    expect(wrapper.find(LabelValueMetadata).length).toBe(1);
  });

  it('renders the rights statement', () => {
    const wrapper = createWrapper({ rights: ['http://example.com', 'http://stanford.edu'] });
    expect(
      wrapper.find(Typography).at(0).matchesElement(
        <Typography>rights</Typography>,
      ),
    ).toBe(true);
    expect(
      wrapper.find(Typography).at(1).matchesElement(
        <Typography>
          <Link href="http://example.com">http://example.com</Link>
        </Typography>,
      ),
    ).toBe(true);
    expect(
      wrapper.find(Typography).at(2).matchesElement(
        <Typography>
          <Link href="http://stanford.edu">http://stanford.edu</Link>
        </Typography>,
      ),
    ).toBe(true);
  });

  it('renders the rights statement', () => {
    const wrapper = createWrapper({ rights: [] });
    expect(
      wrapper.find(Typography).length,
    ).toBe(0);
  });

  it('renders the manifest logo', () => {
    const manifestLogo = 'http://example.com';
    const wrapper = createWrapper({ manifestLogo });
    expect(wrapper.find(Img).length).toBe(1);
    expect(wrapper.find(Img).props().src).toEqual([manifestLogo]);
  });

  describe('when metadata is not present', () => {
    it('does not render empty elements elements', () => {
      const wrapper = createWrapper({});
      expect(wrapper.find(LabelValueMetadata).length).toBe(0);
      expect(wrapper.find(Typography).length).toBe(0);
      expect(wrapper.find(Img).length).toBe(0);
    });
  });
});
