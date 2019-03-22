
describe('"replace" mode plugin', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/replace.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('replaces <WorkspaceControlPanelButtons />', async () => {
    await expect(page).not.toMatchElement('.mirador-workspace-panel-buttons');
    await expect(page).toMatchElement('#replace-plugin-component');
  });
});
