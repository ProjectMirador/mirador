import { screen } from '@testing-library/react';
import { Utils } from 'manifesto.js';
import { renderWithProviders } from '../../utils/store';
import manifestJson from '../../fixtures/version-2/019.json';
import { GalleryView } from '../../../src/components/GalleryView';

/** create wrapper */
function createWrapper(props) {
  return renderWithProviders(
    <GalleryView
      canvases={Utils.parseManifest(manifestJson).getSequences()[0].getCanvases()}
      windowId="1234"
      selectedCanvasIndex={0}
      {...props}
    />,
  );
}

describe('GalleryView', () => {
  let setCanvas;
  beforeEach(() => {
    setCanvas = jest.fn();
  });
  it('renders the component', () => {
    createWrapper({ setCanvas });
    const buttons = screen.queryAllByRole('button');
    expect(buttons[0].closest('section')).toBeInTheDocument(); // eslint-disable-line testing-library/no-node-access
  });
  it('renders gallery items for all canvases', () => {
    createWrapper({ setCanvas });
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(3);
  });

  describe('when viewingDirection="right-to-left"', () => {
    it('sets up Paper to be rtl', () => {
      createWrapper({
        viewingDirection: 'right-to-left',
      });
      const buttons = screen.queryAllByRole('button');
      expect(buttons[0].closest('section')).toHaveAttribute('dir', 'rtl'); // eslint-disable-line testing-library/no-node-access
    });
  });
});
