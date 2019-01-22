describe('Basic end to end Mirador', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });
  it('has the correct page title', async () => {
    const title = await page.title();
    expect(title).toBe('Mirador');
  });
  it('loads a manifest and displays it', async () => {
    await expect(page).toFill('#manifestURL', 'http://localhost:5000/api/sn904cj3439');
    await expect(page).toClick('#fetchBtn');
    // TODO: Refactor the app so we get rid of the wait
    await page.waitFor(1000);
    await expect(page).toMatchElement('li', { text: 'http://localhost:5000/api/sn904cj3439' });
    await expect(page).toMatchElement(
      'h3',
      "Peter's San Francisco Locator. The Birds-Eye-View Map of the Exposition City. Published by Locator Publishing Co",
    );
    await expect(page).toMatchElement('div', /Color/);
  });
});
