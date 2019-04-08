
describe('pass valid and invalid plugins to <WorkspaceControlPanelButtons>', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/validate.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('valid plugins will be applied <WorkspaceControlPanelButtons>', async () => {
    await expect(page).toMatchElement('#valid-plugin-a');
    await expect(page).toMatchElement('#valid-plugin-b');
  });

  it('invalid plugins will not be applied <WorkspaceControlPanelButtons>', async () => {
    await expect(page).not.toMatchElement('#invalid-plugin-a');
    await expect(page).not.toMatchElement('#invalid-plugin-b');
    await expect(page).not.toMatchElement('#invalid-plugin-c');
    await expect(page).not.toMatchElement('#invalid-plugin-d');
    await expect(page).not.toMatchElement('#invalid-plugin-e');
    await expect(page).not.toMatchElement('#invalid-plugin-f');
  });
});
