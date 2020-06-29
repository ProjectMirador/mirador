describe('Minimalist configuration to Mirador', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/minimalist.html');
  });
  it('loads a manifest and displays it without some of the default controls', async () => {
    await expect(page).toMatchElement(
      'h2',
      { text: /Self-Portrait/ },
    );
    await expect(page).toMatchElement('button[aria-label="Information"]');
    await expect(page).toMatchElement('button[aria-label="Rights"]');
    await expect(page).not.toMatchElement('#addBtn');
    await expect(page).not.toMatchElement('button[aria-label="Toggle sidebar"]');
    await expect(page).not.toMatchElement('button[aria-label="Close window"]');
  });
});
