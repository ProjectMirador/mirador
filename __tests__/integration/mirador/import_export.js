/* global miradorInstance */

describe('Import/Export state', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/');
    await expect(page).toMatchElement('.mirador-window');
  });
  it('persists a viewer state after importing', async () => {
    const windowOne = await page.evaluate(() => {
      const state = miradorInstance.store.getState();
      const windows = Object.keys(state.viewers);
      state.viewers[windows[0]] = {
        x: 1000,
        y: 1000,
        zoom: 0.001,
      };
      const f = miradorInstance.actions.importMiradorState(state);
      miradorInstance.store.dispatch(f);
      return windows[0];
    });
    const mirador = await page.evaluate(() => miradorInstance.store.getState());
    await expect(mirador.viewers[windowOne]).toEqual(
      { x: 1000, y: 1000, zoom: 0.001 },
    );
  });
});
