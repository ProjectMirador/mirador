
describe('"add" mode plugins', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/add.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('adds to <WorkspaceControlPanelButtons />', async () => {
    await expect(page).toMatchElement('.mirador-workspace-control-panel-buttons #add-plugin-component-a');
    await expect(page).toMatchElement('.mirador-workspace-control-panel-buttons #add-plugin-component-b');
  });
});
