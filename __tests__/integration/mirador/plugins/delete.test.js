
describe('"delete" mode plugin', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/delete.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('deletes <WorkspaceControlPanelButtons />', async () => {
    await expect(page).not.toMatchElement('.mirador-workspace-control-panel-buttons');
  });
});
