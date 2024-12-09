describe('initialViewerConfig', () => {
  beforeAll(async () => {
    // See this html file for where the initialViewerConfig is set
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/viewer_config.html');
    await expect(page).toMatchElement('.mirador-window');
  });

  it('allows initialViewerConfig to be passed', async () => {
    const viewers = await page.evaluate(() => window.miradorInstance.store.getState().viewers);
    // matches initialViewerConfig from the html file
    expect(viewers[Object.keys(viewers)[0]].x).toBe(934);
    expect(viewers[Object.keys(viewers)[0]].y).toBe(782);
    expect(viewers[Object.keys(viewers)[0]].zoom).toBe(0.0007);
  });
});
