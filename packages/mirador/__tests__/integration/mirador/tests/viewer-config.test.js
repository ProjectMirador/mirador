import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { setupIntegrationTestViewer } from '@tests/utils/test-utils';
import config from '../mirador-configs/initial-viewer-config';

describe('initialViewerConfig', () => {
  setupIntegrationTestViewer(config);

  it('allows initialViewerConfig to be passed', async (context) => {
    expect(await screen.findByRole('region', { name: /Window: Self-Portrait Dedicated to Paul Gauguin/i })).toBeInTheDocument();

    const { viewers } = context.miradorInstance.store.getState();
    const viewerObject = viewers[Object.keys(viewers)[0]];
    // You can see these values passed in initial-viewer-config.js
    expect(viewerObject.x).toBe(934);
    expect(viewerObject.y).toBe(782);
    expect(viewerObject.zoom).toBe(0.0007);
  });
});
