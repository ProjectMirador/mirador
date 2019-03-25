/* global miradorInstance */

describe('how plugins relate to state', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:4488/__tests__/integration/mirador/plugins/state.html');
    await expect(page).toMatchElement('.mirador-viewer');
    await page.waitFor(1000);
  });

  it('plugin can read from state', async () => {
    const text = 'Plugin:https://iiif.harvardartmuseums.org/manifests/object/299843';
    await expect(page).toMatch(text);
  });

  it('plugin reducers should be included to state', async () => {
    const pluginState = await page.evaluate(() => (
      miradorInstance.store.getState().pluginState
    ));
    await expect(pluginState).toBeDefined();
  });

  it('plugin can dispatch custom action to write to its reducer', async () => {
    /** */
    const getSomeNumber = async () => (
      page.evaluate(() => miradorInstance.store.getState().pluginState.someNumber)
    );

    let someNumber;

    someNumber = await getSomeNumber();
    await expect(someNumber).toBe(0);
    await expect(page).toClick('#plugin-button');
    someNumber = await getSomeNumber();
    await expect(someNumber).toBe(1);
  });

  it('plugin can catch core action in its reducer', async () => {
    /** */
    const getCanvasChangeCount = async () => (
      page.evaluate(() => miradorInstance.store.getState().pluginState.canvasChangeCount)
    );

    let canvasChangeCount;

    canvasChangeCount = await getCanvasChangeCount();
    await expect(canvasChangeCount).toBe(0);
    await expect(page).toClick('.mirador-thumbnail-nav-canvas');
    canvasChangeCount = await getCanvasChangeCount();
    await expect(canvasChangeCount).toBe(1);
  });
});
