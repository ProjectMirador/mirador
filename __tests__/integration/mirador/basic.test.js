describe('Basic end to end Mirador', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });
  it('has the correct page title', async () => {
    const title = await page.title();
    expect(title).toBe('Mirador');
  });
  it('loads a manifest and displays it', async () => {
    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/api/sn904cj3439');
    await expect(page).toClick('#fetchBtn');
    await expect(page).toMatchElement('[data-manifestid="http://localhost:5000/api/sn904cj3439"] button');
    await expect(page).toClick('[data-manifestid="http://localhost:5000/api/sn904cj3439"] button');
    await expect(page).toMatchElement(
      'h2',
      { text: /Peter's San Francisco Locator/ },
    );
  });
});
