describe('Mirador Invalid API Response Handler Test', () => {
  beforeAll(async () => {
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
});
