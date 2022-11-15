describe('Companion Windows', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/blank.html');
    await expect(page).toClick('#addBtn');
    await expect(page).toClick('.mirador-add-resource-button');
    await expect(page).toFill('#manifestURL', 'http://127.0.0.1:4488/__tests__/fixtures/version-2/001.json');
    await expect(page).toClick('#fetchBtn');
    await expect(page).toClick('[data-manifestid="http://127.0.0.1:4488/__tests__/fixtures/version-2/001.json"] button');
    await page.waitForTimeout(300);
    await expect(page).toMatchElement('.mirador-window');
  });

  it('allows the sidebar panel to be popped out into a companion window', async () => {
    await expect(page).toClick('button[aria-label="Toggle sidebar"]');

    await expect(page).toMatchElement('.mirador-companion-window-left.mirador-window-sidebar-info-panel');
    await expect(page).toMatchElement('button[aria-label="Information"][aria-selected="true"]');

    await expect(page).not.toMatchElement('.mirador-companion-window-right.mirador-window-sidebar-info-panel');

    await expect(page).toClick('button[aria-label="Open in separate panel"]');

    await expect(page).toMatchElement('.mirador-companion-window-right.mirador-window-sidebar-info-panel');

    await expect(page).toClick('button[aria-label="Close panel"]');

    // TODO: Write something like the assertion below that verifies the sidebar is no longer visible
    // await expect(page).not.toMatchElement(
    //   '.mirador-companion-window-right .mirador-window-sidebar-info-panel',
    // );
  });
});
