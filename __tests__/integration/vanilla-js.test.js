describe('Plain JavaScript example', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/vanilla-js/');
  });
  it('has the correct page title', async () => {
    const title = await page.title();
    expect(title).toBe('Examples');
  });
  it('loads a manifest and displays it', async () => {
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/api/sn904cj3429');
    await expect(page).toClick('#fetchBtn');
    // TODO: Refactor the app so we get rid of the wait
    await page.waitFor(1000);
    const manifest = await page.$eval('#exampleManifest', e => e.innerHTML);
    await expect(manifest).toMatch(/http:\/\/iiif\.io\/api\/presentation\/2\/context\.json/);
  });
});
