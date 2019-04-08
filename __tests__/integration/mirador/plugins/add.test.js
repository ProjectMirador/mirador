
describe('add two plugins to <WorkspaceControlPanelButtons>', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/add.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('all add plugins will be added to <WorkspaceControlPanelButtons>', async () => {
    await expect(page).toMatchElement('#add-plugin-component-a');
    await expect(page).toMatchElement('#add-plugin-component-b');
  });
});
