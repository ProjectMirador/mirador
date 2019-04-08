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
          homepage={[
            {
              label: 'Home page',
              value: 'http://example.com/',
            },
          ]}
          manifestUrl="http://example.com/"
          renderings={[
            {
              label: 'PDF Version',
              value: 'http://example.com/pdf',
            },
          ]}
          seeAlso={[
            {
              format: 'text/html',
              label: 'A',
              value: 'http://example.com/a',
            },
            {
              label: null,
              value: 'http://example.com/b',
            },
          ]}
          t={str => str}
        />,
      );
    });

    it('renders manifest homepage information', () => {
      expect(
        wrapper.find(Typography).at(2)
          .matchesElement(
            <Typography component="dt">iiif_homepage</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(3)
          .matchesElement(
            <Typography component="dd"><a href="http://example.com/">Home page</a></Typography>,
          ),
      ).toBe(true);
    });

    it('renders manifest renderings information', () => {
      expect(
        wrapper.find(Typography).at(4)
          .matchesElement(
            <Typography component="dt">iiif_renderings</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(5)
          .matchesElement(
            <Typography component="dd">
              <a href="http://example.com/pdf">PDF Version</a>
            </Typography>,
          ),
      ).toBe(true);
    });

    it('renders manifest seeAlso information', () => {
      expect(
        wrapper.find(Typography).at(6)
          .matchesElement(
            <Typography component="dt">iiif_seeAlso</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(7)
          .matchesElement(
            <Typography component="dd">
              <a href="http://example.com/a">A</a>
              <Typography>(text/html)</Typography>
            </Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(9)
          .matchesElement(
            <Typography component="dd"><a href="http://example.com/b">http://example.com/b</a></Typography>,
          ),
      ).toBe(true);
    });

    it('renders manifest links', () => {
      expect(
        wrapper.find(Typography).at(10)
          .matchesElement(
            <Typography component="dt">iiif_manifest</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(11)
          .matchesElement(
            <Typography component="dd"><a href="http://example.com/">http://example.com/</a></Typography>,
          ),
      ).toBe(true);
    });
  });
});
