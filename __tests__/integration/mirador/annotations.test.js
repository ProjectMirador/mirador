/* global miradorInstance */

describe('Annotations in Mirador', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
    await expect(page).toMatchElement('.mirador-window');
    await page.waitFor(1000);
  });
  it('stores annotations in state by canvasId', async () => {
    const annotations = await page.evaluate(() => (
      miradorInstance.store.getState().annotations
    ));
    await expect(Object.keys(annotations).length).toEqual(1);
  });

  // Note that this test is tied to a specific record showing up by default (299843.json)
  it('renders annotation in a companion window/sidebar panel', async () => {
    const windowId = await page.evaluate(() => {
      const { windows } = miradorInstance.store.getState();

      return Object.values(windows)
        .find(w => w.manifestId === 'https://iiif.harvardartmuseums.org/manifests/object/299843').id;
    });

    await expect(page).toClick(`#${windowId} button[aria-label="Toggle window sidebar"]`);

    await page.waitFor(1000);
    await expect(page).toClick(`#${windowId} button[aria-label="Open annotation companion window"]`);

    await expect(page).toMatchElement(`#${windowId} h3`, { text: 'Annotations' });
    await expect(page).toMatchElement(`#${windowId} p`, { text: 'Showing 2 annotations' });
    await expect(page).toMatchElement(`#${windowId} .mirador-companion-window-left.mirador-window-sidebar-annotation-panel ul li`, { count: 2 });
  });
});
