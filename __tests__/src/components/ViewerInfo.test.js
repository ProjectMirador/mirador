import { render, screen } from '@testing-library/react';
import { ViewerInfo } from '../../../src/components/ViewerInfo';

/** create wrapper */
function createWrapper(props) {
  return render(
    <ViewerInfo
      classes={{}}
      canvasCount={8}
      canvasIndex={2}
      canvasLabel="testLabel"
      t={k => k}
      {...props}
    />,
  );
}

describe('ViewerNavigation', () => {
  it('renders the component', () => {
    createWrapper();
    expect(screen.getByText('pagination', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText(/testLabel/i, { selector: 'span' })).toBeInTheDocument();
  });
});
