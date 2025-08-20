import { expect, it } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { setupIntegrationTestViewer } from '@tests/utils/test-utils';
import config from '../mirador-configs/single-van-gogh';

// TODO: sometimes this is failing with
// TypeError: Cannot read properties of null (reading 'translate')
//  ❯ OpenSeadragonCanvasOverlay.canvasUpdate src/lib/OpenSeadragonCanvasOverlay.js:95:20
//      93|
//      94|     if (this.clearBeforeRedraw) this.clear();
//      95|     this.context2d.translate(x, y);
describe('Annotations in Mirador', () => {
  setupIntegrationTestViewer(config);

  it('Loads the manifest', async () => {
    const element = await screen.findByRole('region', { name: /Window: Self-Portrait Dedicated to Paul Gauguin/i });
    expect(element).toBeInTheDocument();
  });

  it('stores annotations in state by canvasId', async (context) => {
    // Open the sidebar
    const toggleButtons = await screen.findAllByLabelText(/toggle sidebar/i);
    fireEvent.click(toggleButtons[0]);

    // Go to annotations tab
    const annotationButtons = await screen.findAllByLabelText(/annotations/i);
    fireEvent.click(annotationButtons[0]);

    const { annotations } = context.miradorInstance.store.getState();
    expect(Object.keys(annotations).length).toEqual(1);
  });

  // Note that this test is tied to a specific record showing up by default (299843.json)
  it('renders annotation in a companion window/sidebar panel', async () => {
    // Open the sidebar
    const toggleButtons = await screen.findAllByLabelText(/toggle sidebar/i);
    fireEvent.click(toggleButtons[0]);

    // Go to annotations tab
    const annotationButtons = await screen.findAllByLabelText(/annotations/i);
    fireEvent.click(annotationButtons[0]);

    expect(await screen.findByRole('heading', { name: 'Annotations' })).toBeInTheDocument();

    // Re. this regex: be sure that the number of annotations starts with a non zero digit
    const annoCountSubtitle = await screen.findByText(/Showing [1-9]\d* annotations/);
    expect(annoCountSubtitle).toBeInTheDocument();
    const annotationCount = annoCountSubtitle.textContent.match(/\d+/)[0];

    // NOTE: findByRole was causing mysterious failures so we are using querySelector
    // for the rest of this test.
    /* eslint-disable testing-library/no-node-access */
    const annotationPanel = annoCountSubtitle.closest('aside');
    const menu = annotationPanel.querySelector('[role="menu"]');

    // Find all menu items
    const listItems = menu.querySelectorAll('[role="menuitem"]');
    /* eslint-enable testing-library/no-node-access */

    // Convert annotationCount (likely a string) to number
    const expectedCount = Number(annotationCount);
    expect(listItems.length).toBe(expectedCount);
  });
});
