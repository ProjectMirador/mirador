import { render, screen } from 'test-utils';
import { WindowSideBar } from '../../../src/components/WindowSideBar';

/** create wrapper */
function createWrapper({ ...props }) {
  return render(
    <WindowSideBar
      classes={{ drawer: 'test-drawer' }}
      t={k => k}
      {...props}
    />,
    {
      preloadedState: {
        windows: {
          xyz: {
            companionWindowIds: [],
            suggestedSearches: null,
          },
        },
      },
      windowId: 'xyz',
    },
  );
}

describe('WindowSideBar when closed', () => {
  it('renders without an error', () => {
    createWrapper({});
    expect(document.querySelector('.test-drawer')).toBeInTheDocument(); // eslint-disable-line testing-library/no-node-access
    expect(screen.queryByRole('navigation', { accessibleName: 'sidebarPanelsNavigation' })).not.toBeInTheDocument();
  });
});
describe('WindowSideBar when open', () => {
  it('renders in an open state', () => {
    createWrapper({ sideBarOpen: true });
    expect(screen.getByRole('navigation', { accessibleName: 'sidebarPanelsNavigation' })).toBeInTheDocument();
  });
  it('Renders drawer ltr by default', () => {
    createWrapper({ sideBarOpen: true });
    expect(screen.queryByRole('navigation', { accessibleName: 'sidebarPanelsNavigation' })).toHaveClass('MuiDrawer-paperAnchorLeft'); // eslint-disable-line testing-library/no-node-access
  });
  it('Renders drawer rtl when specified', () => {
    createWrapper({ direction: 'rtl', sideBarOpen: true });
    expect(screen.queryByRole('navigation', { accessibleName: 'sidebarPanelsNavigation' })).toHaveClass('MuiDrawer-paperAnchorRight'); // eslint-disable-line testing-library/no-node-access
  });
});
