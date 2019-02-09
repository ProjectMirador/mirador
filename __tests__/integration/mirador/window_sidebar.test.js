/* global miradorInstance */

describe('Window Sidebars', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });

  it('renders and updates canvas level metadata', async () => {
    await expect(page).toClick('#addBtn');
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/api/001');
    await expect(page).toClick('#fetchBtn');
    // TODO: Refactor the app so we get rid of the wait
    await page.waitFor(1000);
    await expect(page).toMatchElement('li', { text: 'http://localhost:5000/api/001' });
    await expect(page).toClick('li button', { text: 'http://localhost:5000/api/001' });

    await expect(page).toMatchElement(
      'h3',
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
});
