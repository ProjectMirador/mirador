import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/store';
import { LayersPanel } from '../../../src/components/LayersPanel';

/**
 * Helper function to create a shallow wrapper around AttributionPanel
 */
function createWrapper(props) {
  return renderWithProviders(
    <LayersPanel
      id="xyz"
      t={str => str}
      windowId="window"
      {...props}
    />,
    { preloadedState: { companionWindows: { xyz: { content: 'layers' } } } },
  );
}

describe('LayersPanel', () => {
  it('renders layers for each canvas', () => {
    const canvasIds = ['a', 'b'];
    createWrapper({ canvasIds });

    expect(screen.getAllByText('annotationCanvasLabel').length).toBe(2);
    expect(screen.getAllByRole('list').length).toBe(2);
  });
});
