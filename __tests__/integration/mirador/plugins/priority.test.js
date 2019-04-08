
describe('try to apply 2 add plugins and 2 wrap plugins to <WorkspaceControlPanelButtons>', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/priority.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('only apply the first wrap plugin', async () => {
    await expect(page).toMatchElement('#wrap-plugin-component-a');
    await expect(page).not.toMatchElement('#wrap-plugin-component-b');
    await expect(page).not.toMatchElement('#add-plugin-component-a');
    await expect(page).not.toMatchElement('#add-plugin-component-b');
  });
});
