/* global miradorInstance */

describe('Thumbnail navigation', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
    await expect(page).toClick('#addBtn');
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/api/019');
    await expect(page).toClick('#fetchBtn');
    // TODO: Refactor the app so we get rid of the wait
    await page.waitFor(1000);
    await expect(page).toClick('li button');
    await page.waitFor(1000);
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
