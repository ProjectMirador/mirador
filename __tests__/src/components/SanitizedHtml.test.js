import { render, screen } from '@tests/utils/test-utils';
import { SanitizedHtml } from '../../../src/components/SanitizedHtml';

describe('SanitizedHtml', () => {
  beforeEach(() => {
    render(
      <SanitizedHtml
        data-testid="subject"
        htmlString="
          <b>Don't worry!</b>
          <a>Some link</a>
          <script data-testid='script' type='module'></script>"
        ruleSet="iiif"
      />,
    );
  });

  it('should render needed elements', () => {
    expect(screen.getByTestId('subject')).toHaveProperty('tagName', 'SPAN');
  });

  it('should pass correct class name to root element', () => {
    expect(screen.getByTestId('subject')).toHaveClass(
      'mirador-third-party-html',
    );
  });

  it('should pass sanitized html string to dangerouslySetInnerHTML attribute', () => {
    expect(
      screen.queryByTestId('subject').querySelector('script'),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Don't worry!")).toBeInTheDocument();
    expect(screen.getByText('Some link')).toHaveAttribute('target', '_blank');
    expect(screen.getByText('Some link')).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
  });

  it('removes script tags', () => {
    expect(screen.queryByTestId('script')).not.toBeInTheDocument();
  });
});
