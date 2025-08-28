import { expect, it } from 'vitest';
import { screen, fireEvent, within } from '@testing-library/react';
import { setupIntegrationTestViewer, safeFindByRole } from '@tests/utils/test-utils';
import config from '../mirador-configs/single-van-gogh';

// TODO: sometimes this is failing with
// TypeError: Cannot read properties of null (reading 'translate')
//  ❯ OpenSeadragonCanvasOverlay.canvasUpdate src/lib/OpenSeadragonCanvasOverlay.js:95:20
//      93|
//      94|     if (this.clearBeforeRedraw) this.clear();
//      95|     this.context2d.translate(x, y);
describe('Annotations in Mirador', () => {
  setupIntegrationTestViewer(config);

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
    const annotationCount = annoCountSubtitle.innerText.match(/\d+/)[0];

    // use safeFindByRole here. This specific test is consistently hard to interpret on failure,
    // since another async operation has happened after setupIntegrationTestViewer
    const annotationPanel = await safeFindByRole('complementary', { name: /annotations/i });
    expect(annotationPanel).toBeInTheDocument();

    const listItems = await within(annotationPanel).findAllByRole('menuitem');
    expect(listItems).toHaveLength(annotationCount);
  });
});
