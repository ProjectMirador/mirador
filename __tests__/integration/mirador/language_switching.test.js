describe('Language Switching', () => {
  describe('Application Language', () => {
    it('allows the user to switch the application language', async () => {
      await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');

      await expect(page).toClick('#menuBtn');
      await expect(page).toMatchElement('ul[role="menu"]');
      await expect(page).toMatchElement('li', { text: 'Language' });

      await expect(page).not.toMatchElement('li', { text: 'Deutsch' });
      await expect(page).not.toMatchElement('li', { text: 'English' });
      await expect(page).toClick('li', { text: 'Language' });
      await expect(page).toMatchElement('li', { text: 'Deutsch' });
      await expect(page).toMatchElement('li', { text: 'English' });

      await expect(page).toMatchElement('[aria-label="Toggle sidebar"]');
      await expect(page).not.toMatchElement('[aria-label="Seitenleiste umschalten"]');
      await expect(page).toClick('li', { text: 'Deutsch' });
      await page.waitFor(1000);
      await expect(page).not.toMatchElement('[aria-label="Toggle sidebar"]');
      await expect(page).toMatchElement('[aria-label="Seitenleiste umschalten"]');
    });
  });
});
