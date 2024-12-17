import { expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { setupIntegrationTestViewer } from '@tests/utils/test-utils';
import config from '../mirador-configs/initial-viewer-config';

describe('initialViewerConfig', () => {
  setupIntegrationTestViewer(config);

  describe('initialViewerConfig', () => {
    it('allows initialViewerConfig to be passed', async (context) => {
      expect(await screen.findByRole('region', { name: /Window: Self-Portrait Dedicated to Paul Gauguin/i })).toBeInTheDocument();

      let viewers;
      await waitFor(() => {
        viewers = context.miradorInstance.store.getState().viewers;
        expect(Object.keys(viewers).length).toBeGreaterThan(0); // Ensure viewers are populated
      });

      const viewerObject = viewers[Object.keys(viewers)[0]];

      setTimeout(() => {
        console.log('This will run after 3 seconds');
      }, 3000); // 3 seconds. Not ideal but fixes a flaky test in CI.

      expect(viewerObject.x).toBe(934);
      expect(viewerObject.y).toBe(782);
      expect(viewerObject.zoom).toBe(0.0007);
    });
  });
});
