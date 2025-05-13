import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/test-utils';
import { ViewerNavigation } from '../../../src/components/ViewerNavigation';

/** create wrapper */
function createWrapper(props) {
  return render(<ViewerNavigation classes={{}} canvases={[1, 2]} {...props} />);
}

describe('ViewerNavigation', () => {
  let setNextCanvas;
  let setPreviousCanvas;
  beforeEach(() => {
    setNextCanvas = vi.fn();
    setPreviousCanvas = vi.fn();
  });
  it('renders the component', () => {
    createWrapper({
      hasNextCanvas: true,
      hasPreviousCanvas: false,
      setNextCanvas,
      setPreviousCanvas,
    });
    const buttons = screen.queryAllByRole('button');
    expect(buttons[0].closest('div')).toBeInTheDocument();
  });
  describe('when next canvases are present', () => {
    it('nextCanvas button is not disabled', () => {
      createWrapper({
        hasNextCanvas: true,
        hasPreviousCanvas: false,
        setNextCanvas,
        setPreviousCanvas,
      });
      expect(
        screen.getByRole('button', { name: 'Next item' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next item' })).toBeEnabled();
    });
    it('setNextCanvas function is called after click', async () => {
      createWrapper({
        hasNextCanvas: true,
        hasPreviousCanvas: false,
        setNextCanvas,
        setPreviousCanvas,
      });
      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: 'Next item' }));
      expect(setNextCanvas).toHaveBeenCalled();
    });
  });
  describe('when next canvases are not present', () => {
    it('nextCanvas button is disabled', async () => {
      createWrapper({
        hasNextCanvas: false,
        hasPreviousCanvas: true,
        setNextCanvas,
        setPreviousCanvas,
      });
      expect(screen.getByRole('button', { name: 'Next item' })).toBeDisabled();
    });
  });
  describe('when previous canvases are present', () => {
    it('previousCanvas button is not disabled', () => {
      createWrapper({
        hasNextCanvas: false,
        hasPreviousCanvas: true,
        setNextCanvas,
        setPreviousCanvas,
      });
      expect(
        screen.getByRole('button', { name: 'Previous item' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Previous item' }),
      ).toBeEnabled();
    });
    it('setPreviousCanvas function is called after click', async () => {
      createWrapper({
        hasNextCanvas: false,
        hasPreviousCanvas: true,
        setNextCanvas,
        setPreviousCanvas,
      });
      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: 'Previous item' }));
      expect(setPreviousCanvas).toHaveBeenCalled();
    });
  });
  describe('when previous canvases are not present', () => {
    it('disabled on previousCanvas button', () => {
      createWrapper({
        hasNextCanvas: true,
        hasPreviousCanvas: false,
        setNextCanvas,
        setPreviousCanvas,
      });
      expect(
        screen.getByRole('button', { name: 'Previous item' }),
      ).toBeDisabled();
    });
  });
  describe('when viewingDirection is right-to-left', () => {
    it('changes the arrow styles', () => {
      createWrapper({
        hasNextCanvas: true,
        hasPreviousCanvas: true,
        setNextCanvas,
        setPreviousCanvas,
        viewingDirection: 'right-to-left',
      });
      expect(
        screen
          .getByRole('button', { name: 'Previous item' })
          .querySelector('svg'),
      ).not.toHaveStyle('transform: rotate(180deg);');
      expect(
        screen.getByRole('button', { name: 'Next item' }).querySelector('svg'),
      ).toHaveStyle('transform: rotate(180deg);');
    });

    it('sets the dir="rtl"', () => {
      createWrapper({
        hasNextCanvas: true,
        hasPreviousCanvas: true,
        setNextCanvas,
        setPreviousCanvas,
        viewingDirection: 'right-to-left',
      });
      const buttons = screen.queryAllByRole('button');
      expect(buttons[0].closest('div')).toHaveAttribute('dir', 'rtl');
    });
  });

  describe('when viewingDirection is top-to-bottom', () => {
    it('changes the arrow styles', () => {
      createWrapper({
        hasNextCanvas: true,
        hasPreviousCanvas: true,
        setNextCanvas,
        setPreviousCanvas,
        viewingDirection: 'top-to-bottom',
      });
      expect(
        screen
          .getByRole('button', { name: 'Previous item' })
          .querySelector('svg'),
      ).toHaveStyle('transform: rotate(270deg);');
      expect(
        screen.getByRole('button', { name: 'Next item' }).querySelector('svg'),
      ).toHaveStyle('transform: rotate(90deg);');
    });
  });
  describe('when viewingDirection is bottom-to-top', () => {
    it('changes the arrow styles', () => {
      createWrapper({
        hasNextCanvas: true,
        hasPreviousCanvas: true,
        setNextCanvas,
        setPreviousCanvas,
        viewingDirection: 'bottom-to-top',
      });
      expect(
        screen
          .getByRole('button', { name: 'Previous item' })
          .querySelector('svg'),
      ).toHaveStyle('transform: rotate(90deg);');
      expect(
        screen.getByRole('button', { name: 'Next item' }).querySelector('svg'),
      ).toHaveStyle('transform: rotate(270deg);');
    });
  });
});
