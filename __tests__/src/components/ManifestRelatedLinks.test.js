import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { ManifestRelatedLinks } from '../../../src/components/ManifestRelatedLinks';

describe('ManifestRelatedLinks', () => {
  let wrapper;

  describe('when metadata is present', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ManifestRelatedLinks
          id="xyz"
          manifestUrl="http://example.com/"
          t={str => str}
        />,
      );
    });

    it('renders manifest links', () => {
      expect(
        wrapper.find(Typography).at(2)
          .matchesElement(
            <Typography component="dt">iiif_manifest</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(3)
          .matchesElement(
            <Typography component="dd"><a href="http://example.com/">http://example.com/</a></Typography>,
          ),
      ).toBe(true);
    });
  });
});
