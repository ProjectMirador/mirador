
describe('add plugins for companion windows', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/companionWindow.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('added a plugin to the window sidebar and companion window', async () => {
    await expect(page).toClick('button[aria-label="Toggle sidebar"]');

    await page.waitFor(1000);
    await expect(page).toMatchElement('.mirador-companion-window-left.mirador-window-sidebar-info-panel');
    await expect(page).toMatchElement('#add-plugin-companion-window-button');

    await expect(page).toClick('#add-plugin-companion-window-button');
    await expect(page).toMatchElement('#add-plugin-companion-window');
  });
});
