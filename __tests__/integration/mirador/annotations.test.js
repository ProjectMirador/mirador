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
});
