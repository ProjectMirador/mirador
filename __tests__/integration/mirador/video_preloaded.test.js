describe('Basic end to end Mirador with preloaded video content', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4488/__tests__/integration/mirador/video.html');
  });
  it('load multiples audio/video manifests', async () => {
    await page.waitForSelector('h2');
    await page.waitForSelector('audio');
    await page.waitForSelector('video');
    await expect(page).toMatchElement('h2', { text: /Video Example 3/ });
    await expect(page).toMatchElement('h2', { text: /Partial audio recording of Gustav Mahler's _Symphony No. 3_/ });
    await expect(page).toMatchElement('h2', { text: /L'Elisir D'Amore/ });
    await expect(page).toMatchElement('h2', { text: /Lunchroom Manners/ });
  });
  it('can add an image manifest', async () => {
    await page.waitForSelector('#addBtn');
    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'https://iiif.harvardartmuseums.org/manifests/object/299843');

    await expect(page).toClick('#fetchBtn');

    await page.waitForSelector('[data-manifestid="https://iiif.harvardartmuseums.org/manifests/object/299843"] button');
    await expect(page).toMatchElement('[data-manifestid="https://iiif.harvardartmuseums.org/manifests/object/299843"] button');
    await expect(page).toClick('[data-manifestid="https://iiif.harvardartmuseums.org/manifests/object/299843"] button');

    await page.waitForSelector('.mirador-osd-container');
    await expect(page).toMatchElement('.mirador-osd-container');
  });
});
