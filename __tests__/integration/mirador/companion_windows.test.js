describe('Companion Windows', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });

  it('allows the sidebar panel to be popped out into a companion window', async () => {
    await page.waitFor(1000);
    await expect(page).toClick('button[aria-label="Toggle window sidebar"]');

    await page.waitFor(1000);
    await expect(page).toClick('button[aria-label="Open information companion window"]');

    await expect(page).not.toMatchElement('.mirador-companion-window-right.mirador-window-sidebar-info-panel');

    await page.waitFor(1000);
    await expect(page).toClick('button[aria-label="Open in companion window"]');

    await expect(page).toMatchElement('.mirador-companion-window-right.mirador-window-sidebar-info-panel');

    await expect(page).toClick('button[aria-label="Close this companion window"]');

    // TODO: Write something like the assertion below that verifies the sidebar is no longer visible
    // await expect(page).not.toMatchElement(
    //   '.mirador-companion-window-right .mirador-window-sidebar-info-panel',
    // );
  });
});
