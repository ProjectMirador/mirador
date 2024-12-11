import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { WorkspaceAddButton } from '../../../src/components/WorkspaceAddButton';

/** create wrapper */
function createWrapper(props) {
  return render(
    <WorkspaceAddButton
      classes={{}}
      setWorkspaceAddVisibility={() => {}}
      t={str => str}
      useExtendedFab
      {...props}
    />,
  );
}

jest.mock('@mui/material/useMediaQuery', () => jest.fn().mockReturnValue(true));

describe('WorkspaceAddButton', () => {
  it('renders a button to open the load window area', async () => {
    const user = userEvent.setup();
    const setWorkspaceAddVisibility = jest.fn();
    createWrapper({ isWorkspaceAddVisible: false, setWorkspaceAddVisibility });

    await user.click(screen.getByRole('button', { name: 'startHere' }));

    expect(setWorkspaceAddVisibility).toHaveBeenCalledWith(true);
  });

  it('renders a button to close the load window area', async () => {
    const user = userEvent.setup();
    const setWorkspaceAddVisibility = jest.fn();
    createWrapper({ isWorkspaceAddVisible: true, setWorkspaceAddVisibility });

    await user.click(screen.getByRole('button', { name: 'closeAddResourceMenu' }));
    expect(setWorkspaceAddVisibility).toHaveBeenCalledWith(false);
  });

  describe('when the useExtendedFab prop is set', () => {
    it('is styled using the extended variant', () => {
      createWrapper({ useExtendedFab: true });

      expect(screen.getByRole('button', { name: 'startHere' })).toHaveClass('MuiFab-extended');
    });
  });
});
