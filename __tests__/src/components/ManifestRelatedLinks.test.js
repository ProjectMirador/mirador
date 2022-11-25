import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CollapsibleSection from '../../../src/containers/CollapsibleSection';
import { ManifestRelatedLinks } from '../../../src/components/ManifestRelatedLinks';

describe('ManifestRelatedLinks', () => {
  let wrapper;

  describe('when metadata is present', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ManifestRelatedLinks
          classes={{}}
          id="xyz"
          homepage={[
            {
              label: 'Home page',
              value: 'http://example.com/',
            },
          ]}
          manifestUrl="http://example.com/"
          related={[
            {
              value: 'http://example.com/related',
            },
            {
              format: 'video/ogg',
              label: 'Video',
              value: 'http://example.com/video',
            },
          ]}
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

    it('renders the content in a CollapsibleSection', () => {
      expect(wrapper.find(CollapsibleSection).length).toBe(1);
    });

    it('renders manifest homepage information', () => {
      expect(
        wrapper.find(Typography).at(1)
          .matchesElement(
            <Typography component="dt">iiif_homepage</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(2)
          .matchesElement(
            <Typography component="dd"><Link href="http://example.com/">Home page</Link></Typography>,
          ),
      ).toBe(true);
    });

    it('renders manifest renderings information', () => {
      expect(
        wrapper.find(Typography).at(3)
          .matchesElement(
            <Typography component="dt">iiif_renderings</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(4)
          .matchesElement(
            <Typography component="dd">
              <Link href="http://example.com/pdf">PDF Version</Link>
            </Typography>,
          ),
      ).toBe(true);
    });

    it('renders related information', () => {
      expect(
        wrapper.find(Typography).at(5)
          .matchesElement(
            <Typography component="dt">iiif_related</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(6)
          .matchesElement(
            <Typography component="dd"><Link href="http://example.com/related">http://example.com/related</Link></Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(7)
          .matchesElement(
            <Typography component="dd">
              <Link href="http://example.com/video">Video</Link>
              <Typography>(video/ogg)</Typography>
            </Typography>,
          ),
      ).toBe(true);
    });

    it('renders manifest seeAlso information', () => {
      expect(
        wrapper.find(Typography).at(9)
          .matchesElement(
            <Typography component="dt">iiif_seeAlso</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(10)
          .matchesElement(
            <Typography component="dd">
              <Link href="http://example.com/a">A</Link>
              <Typography>(text/html)</Typography>
            </Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(12)
          .matchesElement(
            <Typography component="dd"><Link href="http://example.com/b">http://example.com/b</Link></Typography>,
          ),
      ).toBe(true);
    });

    it('renders manifest links', () => {
      expect(
        wrapper.find(Typography).at(13)
          .matchesElement(
            <Typography component="dt">iiif_manifest</Typography>,
          ),
      ).toBe(true);

      expect(
        wrapper.find(Typography).at(14)
          .matchesElement(
            <Typography component="dd"><Link href="http://example.com/">http://example.com/</Link></Typography>,
          ),
      ).toBe(true);
    });
  });
});
