describe('Mirador Invalid API Response Handler Test', () => {
  /** */
  async function fetchManifest(uri) {
    await page.evaluate(() => {
      document.querySelector('#addBtn').click();
    });

    await page.evaluate(() => {
      document.querySelector('.mirador-add-resource-button').click();
    });
    await page.waitForTimeout(50);
    await expect(page).toFill('#manifestURL', uri);

    await expect(page).toClick('#fetchBtn');
  }

  beforeEach(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/blank.html');
  });
  it('breaks Mirador', async () => {
    await fetchManifest('http://127.0.0.1:4488/invalid');
    await expect(page).toMatchElement('li', { text: 'http://127.0.0.1:4488/invalid', timeout: 2000 });
  }, 10000);

  it('renders an error message when a manifest cannot be loaded (and allows it to be dismissed)', async () => {
    await fetchManifest('http://127.0.0.1:4488/__tests__/fixtures/version-2/broken');

    await expect(page).toMatchElement('p', { text: 'The resource cannot be added:', timeout: 2000 });
    await expect(page).toMatchElement('p', { text: 'http://127.0.0.1:4488/__tests__/fixtures/version-2/broken' });

    await expect(page).toClick('button', { text: 'Dismiss' });

    await page.waitForFunction(() => !document.querySelector('li[data-manifestid="http://127.0.0.1:4488/__tests__/fixtures/version-2/broken"]'));

    await expect(page).not.toMatchElement(
      'p',
      { text: 'The resource cannot be added:', timeout: 2000 },
    );
  }, 10000);
});
