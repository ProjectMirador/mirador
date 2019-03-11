/* global miradorInstance */

describe('Window Sidebars', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');

    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/api/001');
    await expect(page).toClick('#fetchBtn');

    await expect(page).toMatchElement('[data-manifestid="http://localhost:5000/api/001"] button');
    await expect(page).toClick('[data-manifestid="http://localhost:5000/api/001"] button');
  });

  it('renders and updates canvas level metadata', async () => {
    await expect(page).toMatchElement(
      'h2',
      { text: 'Bodleian Library Human Freaks 2 (33)' },
    );

    const windows = await page.evaluate(() => (
      miradorInstance.store.getState().windows
    ));

    const windowId = Object.values(windows)
      .find(window => window.manifestId === 'http://localhost:5000/api/001')
      .id;

    await expect(page).toMatchElement(`#${windowId} button[aria-label="Toggle window sidebar"]`);
    await expect(page).toClick(`#${windowId} button[aria-label="Toggle window sidebar"]`);

    await expect(page).toMatchElement(`#${windowId} button[aria-label="Open information companion window"]`);
  });

  it('renders canvas navigation and updates canvas after clicking a navigation item', async () => {
    const windows = await page.evaluate(() => (
      miradorInstance.store.getState().windows
    ));

    const windowId = Object.values(windows)
      .find(window => window.manifestId === 'http://localhost:5000/api/001')
      .id;

    await expect(page).toMatchElement(`#${windowId} button[aria-label="Toggle window sidebar"]`);
    await expect(page).toClick(`#${windowId} button[aria-label="Toggle window sidebar"]`);

    await expect(page).toMatchElement(`#${windowId} button[aria-label="Open canvas navigation companion window"]`);
  });
});
