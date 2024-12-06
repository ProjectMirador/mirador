import { render, screen } from 'test-utils';
import { WindowCanvasNavigationControls } from '../../../src/components/WindowCanvasNavigationControls';

/**
 * create a simple wrapper for rendering our component
 */
function Subject({ ...props }) {
  return (
    <WindowCanvasNavigationControls
      canvases={[]}
      canvasLabel="label"
      windowId="abc"
      zoomToWorld={jest.fn()}
      {...props}
    />
  );
}

describe('WindowCanvasNavigationControls', () => {
  it('renders properly', async () => {
    const { container } = render(<Subject />);
    expect(screen.getByLabelText('previousCanvas', { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByLabelText('nextCanvas', { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByText('pagination')).toBeInTheDocument();
    expect(container.firstChild).not.toHaveClass('mirador-canvas-nav-stacked'); // eslint-disable-line testing-library/no-node-access
  });

  it('renders only a screen-reader accessibile version when visible=false', () => {
    const { container } = render(<Subject visible={false} />);
    expect(container.firstChild).toHaveStyle({ height: '1px', margin: '-1px', width: '1px' }); // eslint-disable-line testing-library/no-node-access
  });

  it.skip('stacks the nav controls on small width screens', () => {
    const { container } = render(<div style={{ position: 'relative', width: 252 }}><Subject /></div>);
    expect(container.firstChild).toHaveClass('mirador-canvas-nav-stacked'); // eslint-disable-line testing-library/no-node-access
  });

  it('shows the zoom control component when specified', () => {
    render(<Subject showZoomControls />);
    expect(screen.getByRole('button', { name: 'zoomIn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'zoomOut' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'zoomReset' })).toBeInTheDocument();
  });
});
