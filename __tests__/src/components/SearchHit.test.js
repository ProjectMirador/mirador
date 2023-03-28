import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';
import { SearchHit } from '../../../src/components/SearchHit';

/** Stub the ScrollTo so we can easily make sure it'll work */
const ScrollToMock = ({ children }) => (<div data-testid="scrollto">{children}</div>);
ScrollToMock.propTypes = {
  children: PropTypes.node.isRequired,
};

jest.mock(
  '../../../src/components/ScrollTo',
  () => ({
    ScrollTo: ScrollToMock,
  }),
);

/**
 * Helper function to create a shallow wrapper around SearchResults
 */
const Subject = (props) => (
  <SearchHit
    announcer={() => {}}
    annotation={{ targetId: 'x' }}
    annotationId="foo"
    classes={{ windowSelected: 'windowSelected' }}
    hit={{
      after: ', and start the chainsaw',
      annotations: ['foo'],
      before: 'Light up the',
      match: 'moose',
    }}
    windowId="window"
    selected
    index={0}
    windowSelected
    {...props}
  />
);

describe('SearchHit', () => {
  it('renders a ListItem for each hit', async () => {
    const user = userEvent.setup();
    const selectAnnotation = jest.fn();
    render(<Subject selectAnnotation={selectAnnotation} />);

    expect(screen.getByRole('listitem')).toHaveClass('Mui-selected');
    expect(screen.getByRole('listitem')).toHaveClass('windowSelected');
    expect(screen.getByRole('listitem')).toHaveTextContent('1Light up the moose , and start the chai more');

    await user.click(screen.getByRole('button'));
    expect(selectAnnotation).toHaveBeenCalledWith('foo');
  });

  it('renders the annotation char if the hit is not available', () => {
    render(<Subject annotation={{ chars: 'xyz' }} hit={undefined} />);

    expect(screen.getByRole('listitem')).toHaveTextContent('1xyz');
  });

  it('renders a ScrollTo', () => {
    render(<Subject containerRef="ref" />);

    expect(screen.getByTestId('scrollto')).toBeInTheDocument();
  });

  describe('Annotation Labels', () => {
    it('renders the annotationLabel if present', () => {
      render(<Subject annotationLabel="The Anno Label" />);

      expect(screen.getAllByRole('heading', { level: 6 })).toHaveLength(2);
      expect(screen.getByRole('heading', { level: 6, name: 'The Anno Label' })).toHaveClass('MuiTypography-subtitle2');
    });

    it('does not render the typography if no annotation label is present', () => {
      render(<Subject />);

      expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
    });
  });

  describe('announcer', () => {
    it('sends information about the annotation when selected', () => {
      const announcer = jest.fn();
      const props = {
        annotationLabel: 'The Annotation Label',
        announcer,
        canvasLabel: 'The Canvas Label',
        selected: false,
        total: 9,
      };

      const { rerender } = render(<Subject {...props} />);
      expect(announcer).not.toHaveBeenCalled();

      rerender(<Subject {...props} selected />);
      expect(announcer).toHaveBeenCalledWith(
        'pagination The Canvas Label The Annotation Label Light up the moose , and start the chai',
        'polite',
      );
    });

    it('calls the announcer when initially rendered as selected', () => {
      const announcer = jest.fn();
      render(<Subject announcer={announcer} selected />);

      expect(announcer).toHaveBeenCalled();
    });

    it('does not call the announcer when initially rendered as unselected', () => {
      const announcer = jest.fn();
      render(<Subject announcer={announcer} selected={false} />);

      expect(announcer).not.toHaveBeenCalled();
    });

    it('does not send information about annotations that are not being deselected', () => {
      const announcer = jest.fn();
      const { rerender } = render(<Subject announcer={announcer} selected />);

      announcer.mockClear();

      rerender(<Subject announcer={announcer} selected={false} />);
      expect(announcer).not.toHaveBeenCalled();
    });
  });
});
