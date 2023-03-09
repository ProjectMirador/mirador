import { render, screen } from '@testing-library/react';
import { ManifestInfo } from '../../../src/components/ManifestInfo';

describe('ManifestInfo', () => {
  const metadata = [{ label: 'some label', values: ['some value'] }];

  describe('when metadata is present', () => {
    beforeEach(() => {
      render(
        <ManifestInfo
          id="xyz"
          manifestLabel="The Manifest Label"
          manifestDescription="The Manifest Description"
          manifestMetadata={metadata}
          manifestSummary="The Manifest Summary"
          t={str => str}
        />,
      );
    });

    it('renders the content in a CollapsibleSection', () => {
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('resource');
    });

    it('renders manifest label', () => {
      expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('The Manifest Label');
    });

    it('renders manifest description in SanitizedHtml component', () => {
      expect(screen.getByText('The Manifest Description')).toBeInTheDocument();
    });

    it('renders manifest summary in SanitizedHtml component', () => {
      expect(screen.getByText('The Manifest Summary')).toBeInTheDocument();
    });

    it('renders manifest metadata in LabelValueMetadata component', () => {
      expect(screen.getByText('some label')).toBeInTheDocument();
      expect(screen.getByText('some value')).toBeInTheDocument();
    });
  });

  describe('when metadata is not present', () => {
    beforeEach(() => {
      render(
        <ManifestInfo id="xyz" />,
      );
    });

    it('does not render empty elements elements', () => {
      expect(screen.queryByRole('heading', { level: 5 })).not.toBeInTheDocument();
    });
  });
});
