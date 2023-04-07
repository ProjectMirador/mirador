import { render, screen } from 'test-utils';

import { WorkspaceControlPanelButtons } from '../../../src/components/WorkspaceControlPanelButtons';

describe('WorkspaceControlPanelButtons', () => {
  beforeEach(() => {
    render(<WorkspaceControlPanelButtons />);
  });

  it('render all needed elements', () => {
    expect(screen.getByRole('button', { name: 'listAllOpenWindows' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'workspaceMenu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'workspaceOptions' })).toBeInTheDocument();
  });
});
