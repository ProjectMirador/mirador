import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import TruncatedHit from '@src/lib/TruncatedHit';
import { SearchHitItem } from '@src/components/SearchPanel/SearchHitItem';

vi.mock('@src/components/ScrollTo', () => ({
  // eslint-disable-next-line react/prop-types
  ScrollTo: ({ children }) => <div data-testid="scrollto">{children}</div>,
}));

const defaultHit = {
  after: ', and start the chainsaw',
  annotations: ['foo'],
  before: 'Light up the',
  match: 'moose',
};
const defaultAnnotation = { targetId: 'x' };

/** */
const Subject = (props) => (
  <SearchHitItem
    annotation={defaultAnnotation}
    hit={defaultHit}
    renderedHit={new TruncatedHit(defaultHit, defaultAnnotation)}
    index={0}
    windowSelected
    {...props}
  />
);

describe('SearchHitItem', () => {
  it('renders a ListItem for each hit and calls onSelect on click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Subject onSelect={onSelect} />);

    expect(screen.getByRole('listitem')).toHaveClass('windowSelected');
    expect(screen.getByRole('listitem')).toHaveTextContent('1Light up the moose , and start the chai more');

    await user.click(screen.getByRole('button', { name: '1 Light up the moose , and start the chai more...' }));
    expect(onSelect).toHaveBeenCalled();
  });

  it('renders a ListItem without a button wrapper when selected', () => {
    render(<Subject selected />);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Light up the moose/ })).not.toBeInTheDocument();
  });

  it('renders the annotation chars if the hit is not available', () => {
    render(<Subject annotation={{ chars: 'xyz' }} hit={undefined} renderedHit={undefined} />);

    expect(screen.getByRole('listitem')).toHaveTextContent('1xyz');
  });

  it('renders a ScrollTo wrapper', () => {
    render(<Subject containerRef="ref" />);

    expect(screen.getByTestId('scrollto')).toBeInTheDocument();
  });

  describe('Annotation Labels', () => {
    it('renders the annotationLabel if present', () => {
      render(<Subject annotationLabel="The Anno Label" />);

      expect(screen.getByRole('heading', { level: 4, name: 'The Anno Label' })).toBeInTheDocument();
    });

    it('does not render the typography if no annotation label is present', () => {
      render(<Subject />);

      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });
  });
});
