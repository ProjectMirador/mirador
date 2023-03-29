import { render, screen } from 'test-utils';
import { ScrollIndicatedDialogContent } from '../../../src/components/ScrollIndicatedDialogContent';

/** Utility function to wrap  */
function createWrapper(props) {
  return render(
    <ScrollIndicatedDialogContent
      data-testid="subject"
      classes={{ shadowScrollDialog: 'shadowScrollDialog' }}
      {...props}
    />,
  );
}

describe('ScrollIndicatedDialogContent', () => {
  it('renders a DialogContnet component passing props', () => {
    createWrapper({ randomprop: 'randomPropValue' });

    expect(screen.getByTestId('subject')).toHaveAttribute('randomprop', 'randomPropValue');
  });

  it('provides a className to the DialogContent prop to style it', () => {
    createWrapper();

    expect(screen.getByTestId('subject')).toHaveClass('shadowScrollDialog');
  });

  it('joins an incoming className prop with our className', () => {
    createWrapper({ className: 'upstreamClassName' });

    expect(screen.getByTestId('subject')).toHaveClass('shadowScrollDialog');
    expect(screen.getByTestId('subject')).toHaveClass('upstreamClassName');
  });
});
