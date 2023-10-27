/* global miradorInstance */

describe('Thumbnail navigation', () => {
  beforeEach(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
    await expect(page).toMatchElement('.mirador-window', { polling: 'mutation', timeout: 5000 });
  });

  //TODO: pick a new url; this Harvard one is 404
  xit('navigates a manifest using thumbnail navigation', async () => {
    await expect(page).toMatchElement('.mirador-thumb-navigation');
    let windows = await page.evaluate(() => (
      miradorInstance.store.getState().windows
    ));
    expect(Object.values(windows)[0].canvasId).toBe('https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174892'); // test harness in index.html starts at 2
    await page.waitForTimeout(1000);
    await expect(page).toClick('.mirador-thumbnail-nav-canvas-1 img');
    await expect(page).toMatchElement('.mirador-thumbnail-nav-canvas-1.mirador-current-canvas-grouping', { timeout: 1500 });
    windows = await page.evaluate(() => (
      miradorInstance.store.getState().windows
    ));
    expect(Object.values(windows)[0].canvasId).toBe('https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-18737483'); // canvas @ index 1
  });
  xit('displays on right side', async () => {
    await expect(page).toMatchElement('.mirador-thumb-navigation');
    await expect(page).toMatchElement('.mirador-companion-area-far-bottom .mirador-thumb-navigation');
    const windowId = await page.evaluate(() => {
      const { windows } = miradorInstance.store.getState();
      return Object.keys(windows)[0];
    });

    await expect(page).toClick(`#${windowId} button[aria-label="Window views & thumbnail display"]`);
    await expect(page).toClick('li', { text: 'Right' });
    await expect(page).toMatchElement('.mirador-companion-area-far-right .mirador-thumb-navigation');
  });
});
