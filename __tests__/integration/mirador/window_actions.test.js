describe('Window actions', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });
  it('opens a window and closes it', async () => {
    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/api/sn904cj3439');
    await expect(page).toClick('#fetchBtn');

    await expect(page).toMatchElement('[data-manifestid="http://localhost:5000/api/sn904cj3439"] button');
    await expect(page).toClick('[data-manifestid="http://localhost:5000/api/sn904cj3439"] button');

    await expect(page).toMatchElement('.mirador-window');
    await page.waitFor(1000);
    await expect(page).toClick('button[aria-label="Close window"]');
    const numWindows = await page.evaluate(page => (
      document.querySelectorAll('.mirador-window').length
    )); // only default configed windows found
    await page.waitFor(1000);
    await expect(numWindows).toBe(2);
  });
});
