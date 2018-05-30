describe('React example', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4444/__tests__/integration/react-example/');
  });
  it('has the correct page title', async () => {
    const title = await page.title();
    expect(title).toBe('React App');
  });
  it('loads a manifest and displays it', async () => {
    await expect(page).toFill('#manifestURL', 'https://purl.stanford.edu/sn904cj3429/iiif/manifest');
    await expect(page).toClick('#fetchBtn');
    // TODO: Refactor the app so we get rid of the wait
    await page.waitFor(1000);
    const manifest = await page.$eval('#exampleManifest', e => e.innerHTML);
    expect(manifest).toMatch(/http:\/\/iiif\.io\/api\/presentation\/2\/context\.json/);
  });
});
