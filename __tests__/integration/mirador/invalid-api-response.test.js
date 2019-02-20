describe('Mirador Invalid API Response Handler Test', () => {
  beforeEach(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });
  it('breaks Mirador', async () => {
    await expect(page).toClick('#addBtn');
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/invalid');
    await expect(page).toClick('#fetchBtn');
    await page.waitFor(1000);
    try {
      await expect(page).toMatchElement('li', { text: 'http://localhost:5000/invalid' });
    } catch (e) {
      expect(e.message.toString()).toMatch('Element li (text: "http://localhost:5000/invalid") not found\nwaiting for function failed: timeout 500ms exceeded');
      expect(e.name).toMatch('TimeoutError');
    }
  });

  it('renders an error message when a manifest cannot be loaded (and allows it to be dismissed)', async () => {
    await expect(page).toClick('#addBtn');
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/api/broken');
    await expect(page).toClick('#fetchBtn');

    await page.waitFor(1000);

    await expect(page).toMatchElement(
      'p', { text: 'The resource cannot be added:' },
    );
    await expect(page).toMatchElement(
      'p', { text: 'http://localhost:5000/api/broken' },
    );

    await expect(page).toClick('button', { text: 'Dismiss' });
    await expect(page).not.toMatchElement(
      'p',
      { text: 'The resource http://localhost:5000/api/broken cannot be added.' },
    );
  });
});
