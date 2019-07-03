describe('Mirador Invalid API Response Handler Test', () => {
  /** */
  async function fetchManifest(uri) {
    await page.evaluate(() => {
      document.querySelector('#addBtn').click();
    });
    await page.evaluate(() => {
      document.querySelector('.mirador-add-resource-button').click();
    });
    await expect(page).toFill('#manifestURL', uri);
    await expect(page).toClick('#fetchBtn');
  }

  beforeEach(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });
  it('breaks Mirador', async () => {
    fetchManifest('http://localhost:5000/invalid');
    await expect(page).toMatchElement('li', { text: 'http://localhost:5000/invalid', timeout: 2000 });
  }, 10000);

  it('renders an error message when a manifest cannot be loaded (and allows it to be dismissed)', async () => {
    fetchManifest('http://localhost:5000/api/broken');

    await expect(page).toMatchElement(
      'p', { text: 'The resource cannot be added:', timeout: 2000 },
    );
    await expect(page).toMatchElement(
      'p', { text: 'http://localhost:5000/api/broken' },
    );
    await expect(page).toClick('button', { text: 'Dismiss' });

    await page.waitFor(() => !document.querySelector('li[data-manifestid="http://localhost:5000/api/broken"]'));

    await expect(page).not.toMatchElement(
      'p',
      { text: 'The resource cannot be added:', timeout: 2000 },
    );
  }, 10000);
});
