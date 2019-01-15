describe('Window actions', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });
  it('opens a window and closes it', async () => {
    await expect(page).toFill(
      '#manifestURL',
      'https://purl.stanford.edu/sn904cj3429/iiif/manifest'
    );
    await expect(page).toClick('#fetchBtn');
    // TODO: Refactor the app so we get rid of the wait
    await page.waitFor(1000);
    await expect(page).toClick('li button');
    await expect(page).toMatchElement('.mirador-window');
    await expect(page).toClick('.mirador-window-close');
    await expect(page).not.toMatchElement('.mirador-window');
  });
});
