import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/store';
import { WorkspaceControlPanelButtons } from '../../../src/components/WorkspaceControlPanelButtons';

describe('WorkspaceControlPanelButtons', () => {
  beforeEach(() => {
    renderWithProviders(<WorkspaceControlPanelButtons />);
  });

  it('render all needed elements', () => {
    expect(screen.getByRole('button', { name: 'listAllOpenWindows' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'workspaceMenu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'workspaceOptions' })).toBeInTheDocument();
  });
});
