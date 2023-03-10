import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/store';
import { CompanionArea } from '../../../src/components/CompanionArea';

/** */
function createWrapper(props) {
  return renderWithProviders(
    <CompanionArea
      classes={{ horizontal: 'horizontal' }}
      direction="ltr"
      windowId="abc123"
      position="right"
      companionAreaOpen
      companionWindowIds={['foo', 'baz']}
      t={key => key}
      {...props}
    />,
    { preloadedState: { companionWindows: { baz: { content: 'attribution' }, foo: { content: 'info' } } } },
  );
}

describe('CompanionArea', () => {
  it('should render all <CompanionWindow>', () => {
    createWrapper();

    expect(screen.getAllByRole('complementary')).toHaveLength(2);
  });

  it('should add the appropriate classes when the companion area fills the full width', () => {
    const { container } = createWrapper({ position: 'bottom' });

    expect(container.querySelector('.mirador-companion-area-bottom')).toHaveClass('horizontal'); // eslint-disable-line testing-library/no-node-access, testing-library/no-container
  });

  it('renders the appropriate <CompanionWindow> components', () => {
    createWrapper();

    expect(screen.getByRole('heading', { name: 'aboutThisItem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'attributionTitle' })).toBeInTheDocument();
  });

  it('has a toggle to show the companion area window in the left position', async () => {
    const setCompanionAreaOpen = jest.fn();
    const user = userEvent.setup();

    createWrapper({
      companionAreaOpen: false,
      position: 'left',
      setCompanionAreaOpen,
      sideBarOpen: true,
    });

    expect(screen.getByRole('button', { name: 'expandSidePanel' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'expandSidePanel' }));

    expect(setCompanionAreaOpen).toHaveBeenCalledWith('abc123', true);
  });

  it('has a toggle to hide the companion area window in the left position', async () => {
    const setCompanionAreaOpen = jest.fn();
    const user = userEvent.setup();

    createWrapper({
      companionAreaOpen: true,
      position: 'left',
      setCompanionAreaOpen,
      sideBarOpen: true,
    });

    expect(screen.getByRole('button', { name: 'collapseSidePanel' })).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('button', { name: 'collapseSidePanel' }));

    expect(setCompanionAreaOpen).toHaveBeenCalledWith('abc123', false);
  });

  it('does not show a toggle if the sidebar is collapsed', () => {
    createWrapper({
      companionAreaOpen: true,
      position: 'left',
      setCompanionAreaOpen: () => {},
      sideBarOpen: false,
    });

    expect(screen.queryByRole('button', { name: 'collapseSidePanel' })).not.toBeInTheDocument();
  });

  it('does not show a toggle in other positions', () => {
    createWrapper({
      companionAreaOpen: true,
      position: 'whatever',
      setCompanionAreaOpen: () => {},
      sideBarOpen: true,
    });

    expect(screen.queryByRole('button', { name: 'collapseSidePanel' })).not.toBeInTheDocument();
  });
});
