import React from 'react';
import { shallow } from 'enzyme';
import CanvasLayers from '../../../src/containers/CanvasLayers';
import { LayersPanel } from '../../../src/components/LayersPanel';

/**
 * Helper function to create a shallow wrapper around AttributionPanel
 */
function createWrapper(props) {
  return shallow(
    <LayersPanel
      id="xyz"
      t={str => str}
      windowId="window"
      {...props}
    />,
  );
}

describe('LayersPanel', () => {
  it('renders layers for each canvas', () => {
    const canvases = [
      { id: 'a' },
      { id: 'b' },
    ];
    const wrapper = createWrapper({ canvases });
    expect(wrapper.find(CanvasLayers).length).toBe(2);

    expect(wrapper.find(CanvasLayers).at(0).props()).toMatchObject({
      canvasId: 'a',
      index: 0,
      totalSize: 2,
      windowId: 'window',
    });

    expect(wrapper.find(CanvasLayers).at(1).props()).toMatchObject({
      canvasId: 'b',
      index: 1,
      totalSize: 2,
      windowId: 'window',
    });
  });
});
