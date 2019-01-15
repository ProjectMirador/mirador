/* global miradorInstance */

describe('Mirador plugin use', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins.html');
    await expect(page).toFill(
      '#manifestURL',
      'https://purl.stanford.edu/sn904cj3429/iiif/manifest'
    );
    await expect(page).toClick('#fetchBtn');
    // TODO: Refactor the app so we get rid of the wait
    await page.waitFor(1000);
    await expect(page).toClick('li button');
  });
  it('displays "Share Button" plugin', async () => {
    await expect(page).toMatchElement('button', { text: 'Share' });
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Share this stuff');
      await dialog.dismiss();
    });
    await expect(page).toClick('button.share');
  });
  it('displays "Ruler" plugin', async () => {
    await expect(page).toMatchElement('.mirador-ruler');
    // await page.waitFor(1000);
    // Test that composed reducer and actions are working.
    const zooming = await page.evaluate(() => miradorInstance.store.getState().zooming);
    await expect(zooming).toBe(false);
  });
});
