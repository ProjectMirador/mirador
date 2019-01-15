/* global miradorInstance */

describe('Config updating from instance', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
  });
  it('can modify the config via api', async () => {
    await page.evaluate(() => {
      const a = miradorInstance.actions.updateConfig({ foo: 'bat' });
      miradorInstance.store.dispatch(a);
    });
    const config = await page.evaluate(() => miradorInstance.store.getState().config);
    await expect(config.foo).toBe('bat');
  });
});
