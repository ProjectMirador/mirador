
describe('wrap <WorkspaceControlPanelButtons> by a plugin', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/wrap.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('wraps <WorkspaceControlPanelButtons>', async () => {
    await expect(page).toMatchElement('#wrap-plugin-component .mirador-workspace-control-panel-buttons');
  });
});
