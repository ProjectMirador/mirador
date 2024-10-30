describe('Window actions', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/blank.html');
  });
  it('opens a window and closes it', async () => {
    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'http://127.0.0.1:4488/__tests__/fixtures/version-2/sn904cj3429.json');
    await expect(page).toClick('#fetchBtn');

    await expect(page).toMatchElement('[data-manifestid="http://127.0.0.1:4488/__tests__/fixtures/version-2/sn904cj3429.json"] button');
    await expect(page).toClick('[data-manifestid="http://127.0.0.1:4488/__tests__/fixtures/version-2/sn904cj3429.json"] button');

    await expect(page).toMatchElement('.mirador-window');
    await expect(page).toClick('.mirador-window-close');
    const numWindows = await page.evaluate(() => (
      document.querySelectorAll('.mirador-window').length
    )); // only default configed windows found
    await expect(numWindows).toBe(0);
  });
});
