/* global miradorInstance */

describe('Window Sidebar Sequence Dropdown v3', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/blank.html');

    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'http://localhost:4488/__tests__/fixtures/version-3/multipleSequences.json');
    await expect(page).toClick('#fetchBtn');

    await expect(page).toMatchElement('[data-manifestid="http://localhost:4488/__tests__/fixtures/version-3/multipleSequences.json"] button');
    await expect(page).toClick('[data-manifestid="http://localhost:4488/__tests__/fixtures/version-3/multipleSequences.json"] button');
  });

  it('allows the user to switch the v3 ranges (behavior sequences)', async () => {
    const windows = await page.evaluate(() => (
      miradorInstance.store.getState().windows
    ));

    const windowId = Object.values(windows)
      .find(window => window.manifestId === 'http://localhost:4488/__tests__/fixtures/version-3/multipleSequences.json')
      .id;

    await expect(page).toMatchElement(`#${windowId} button[aria-label="Toggle sidebar"]`);
    await expect(page).toClick(`#${windowId} button[aria-label="Toggle sidebar"]`);
    await expect(page).toMatchElement(`#${windowId} button[aria-label="Index"]`);
    await expect(page).toClick(`#${windowId} button[aria-label="Index"]`);
    await expect(page).toClick('#mui-component-select-sequenceId');
    await expect(page).toMatchElement('[data-value="http://foo.test/1/range/second"]');
    await expect(page).toClick('[data-value="http://foo.test/1/range/second"]');
    await expect(page).toMatchElement('p', { text: 'Test Canvas 2' });
  });
});
