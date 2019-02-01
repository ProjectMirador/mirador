/* global miradorInstance */

describe('Thumbnail navigation', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });

  it('navigates a manifest using thumbnail navigation', async () => {
    await expect(page).toMatchElement('.mirador-thumb-navigation');
    let windows = await page.evaluate(() => (
      miradorInstance.store.getState().windows
    ));
    expect(Object.values(windows)[0].canvasIndex).toBe(0);
    await expect(page).toClick('.mirador-thumbnail-nav-canvas-1');
    windows = await page.evaluate(() => (
      miradorInstance.store.getState().windows
    ));
    expect(Object.values(windows)[0].canvasIndex).toBe(1);
  });
});
