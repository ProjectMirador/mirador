describe('Basic end to end Mirador with video content', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4488/__tests__/integration/mirador/blank.html');
  });
  it('loads a manifest and displays it', async () => {
    await page.waitForSelector('#addBtn');
    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'http://localhost:4488/__tests__/fixtures/version-3/video.json');
    await expect(page).toClick('#fetchBtn');
    await expect(page).toMatchElement('[data-manifestid="http://localhost:4488/__tests__/fixtures/version-3/video.json"] button');
    await expect(page).toClick('[data-manifestid="http://localhost:4488/__tests__/fixtures/version-3/video.json"] button');
    await expect(page).toMatchElement(
      'h2',
      { text: /Video Example 3/ },
    );
  });
  it('render subtitles', async () => {
    await page.waitForSelector('#addBtn');
    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'https://preview.iiif.io/cookbook/0219-using-caption-file/recipe/0219-using-caption-file/manifest.json');

    await expect(page).toClick('#fetchBtn');
    await expect(page).toMatchElement('[data-manifestid="https://preview.iiif.io/cookbook/0219-using-caption-file/recipe/0219-using-caption-file/manifest.json"] button');
    await expect(page).toClick('[data-manifestid="https://preview.iiif.io/cookbook/0219-using-caption-file/recipe/0219-using-caption-file/manifest.json"] button');
    await expect(page).toMatchElement('track[src="https://fixtures.iiif.io/video/indiana/lunchroom_manners/lunchroom_manners.vtt"]');
  });
});
