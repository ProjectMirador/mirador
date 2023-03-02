import { screen } from '@testing-library/react';
import { WindowViewer } from '../../../src/components/WindowViewer';
import { renderWithProviders } from '../../utils/store';

/** create wrapper */
function createWrapper(props) {
  return renderWithProviders(
    <WindowViewer
      {...props}
    />,
  );
}

describe('WindowViewer', () => {
  describe('when lazy imports have loaded', () => {
    it('renders openseadragon', async () => {
      createWrapper({});
      await screen.findByRole('img', { selector: 'canvas' });
    });
  });
});
