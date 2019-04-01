
describe('pass valid and invalid plugins to <WorkspaceControlPanelButtons>', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/validate.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('valid plugins will be applied <WorkspaceControlPanelButtons>', async () => {
    await expect(page).toMatchElement('.mirador-workspace-control-panel-buttons #valid-plugin-a');
    await expect(page).toMatchElement('.mirador-workspace-control-panel-buttons #valid-plugin-b');
  });

  it('invalid plugins will not be applied <WorkspaceControlPanelButtons>', async () => {
    await expect(page).not.toMatchElement('.mirador-workspace-control-panel-buttons #invalid-plugin-a');
    await expect(page).not.toMatchElement('.mirador-workspace-control-panel-buttons #invalid-plugin-b');
    await expect(page).not.toMatchElement('.mirador-workspace-control-panel-buttons #invalid-plugin-c');
    await expect(page).not.toMatchElement('.mirador-workspace-control-panel-buttons #invalid-plugin-d');
    await expect(page).not.toMatchElement('.mirador-workspace-control-panel-buttons #invalid-plugin-e');
    await expect(page).not.toMatchElement('.mirador-workspace-control-panel-buttons #invalid-plugin-f');
  });
});
