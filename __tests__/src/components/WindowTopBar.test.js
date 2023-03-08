import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WindowTopBar } from '../../../src/components/WindowTopBar';
import { renderWithProviders } from '../../utils/store';
import FullscreenContext from '../../../src/contexts/FullScreenContext';

/** create wrapper */
function Subject({ ...props }) {
  return (
    <FullscreenContext.Provider value={jest.fn()}>
      <WindowTopBar
        windowId="xyz"
        classes={{}}
        t={str => str}
        focusWindow={() => {}}
        maximized={false}
        maximizeWindow={() => {}}
        minimizeWindow={() => {}}
        removeWindow={() => {}}
        {...props}
      />
    </FullscreenContext.Provider>
  );
}

describe('WindowTopBar', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders all default components', () => {
    renderWithProviders(<Subject />);
    expect(screen.getByRole('navigation', { name: 'windowNavigation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'toggleWindowSideBar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'windowMenu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'maximizeWindow' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'closeWindow' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'allowFullscreen' })).not.toBeInTheDocument();
  });

  it('uses allow flags to override defaults', () => {
    renderWithProviders(<Subject
      allowWindowSideBar={false}
      allowClose={false}
      allowMaximize={false}
      allowTopMenuButton={false}
      allowFullscreen
    />);
    expect(screen.queryByRole('button', { name: 'toggleWindowSideBar' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'windowMenu' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'maximizeWindow' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'closeWindow' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'workspaceFullScreen' })).toBeInTheDocument();
  });

  it('triggers window focus when clicked', () => {
    const focusWindow = jest.fn();
    renderWithProviders(<Subject focusWindow={focusWindow} />);
    const toolbar = screen.getByRole('navigation', { name: 'windowNavigation' }).firstChild; // eslint-disable-line testing-library/no-node-access
    expect(toolbar).toBeInTheDocument();
    // we specifically need mouseDown not click for MUI Toolbar here
    fireEvent.mouseDown(toolbar);
    expect(focusWindow).toHaveBeenCalledTimes(1);
  });

  it('passes correct callback to toggleWindowSideBar button', async () => {
    const toggleWindowSideBar = jest.fn();
    renderWithProviders(
      <Subject allowWindowSideBar toggleWindowSideBar={toggleWindowSideBar} />,
      { preloadedState: { windows: { xyz: { sideBarOpen: false } } } },
    );
    const button = screen.getByRole('button', { name: 'toggleWindowSideBar' });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(toggleWindowSideBar).toHaveBeenCalledTimes(1);
  });

  it('passes correct callback to closeWindow button', async () => {
    const removeWindow = jest.fn();
    renderWithProviders(<Subject allowClose removeWindow={removeWindow} />);
    const button = screen.getByRole('button', { name: 'closeWindow' });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(removeWindow).toHaveBeenCalledTimes(1);
  });

  it('passes correct callback to maximizeWindow button', async () => {
    const maximizeWindow = jest.fn();
    renderWithProviders(<Subject allowMaximize maximizeWindow={maximizeWindow} />);
    const button = screen.getByRole('button', { name: 'maximizeWindow' });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(maximizeWindow).toHaveBeenCalledTimes(1);
  });

  it('close button is configurable', () => {
    renderWithProviders(<Subject allowClose={false} />);
    const button = screen.queryByRole('button', { name: 'closeWindow' });
    expect(button).not.toBeInTheDocument();
  });

  it('maximize button is configurable', () => {
    renderWithProviders(<Subject allowMaximize={false} />);
    const button = screen.queryByRole('button', { name: 'maximizeWindow' });
    expect(button).not.toBeInTheDocument();
  });
});
