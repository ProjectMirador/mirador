describe('Mirador plugin use', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins.html');
  });
  it('displays "Share Button" plugin by replace', async () => {
    await expect(page).toMatchElement('button', { text: 'Share' });
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Share this stuff');
      await dialog.dismiss();
    });
    await expect(page).toClick('button.share');
  });
});
