describe('Mirador Invalid API Response Handler Test', () => {
  beforeEach(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });
  it('breaks Mirador', async () => {
    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/invalid');
    await expect(page).toClick('#fetchBtn');
    try {
      await expect(page).toMatchElement('li', { text: 'http://localhost:5000/invalid', timeout: 2000 });
    } catch (e) {
      expect(e.message.toString()).toMatch('Element li (text: "http://localhost:5000/invalid") not found\nwaiting for function failed: timeout 500ms exceeded');
      expect(e.name).toMatch('TimeoutError');
    }
  }, 10000);

  it('renders an error message when a manifest cannot be loaded (and allows it to be dismissed)', async () => {
    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/api/broken');
    await expect(page).toClick('#fetchBtn');

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
