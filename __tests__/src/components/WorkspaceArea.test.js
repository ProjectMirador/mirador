import { render, screen, within } from '@tests/utils/test-utils';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';

import { WorkspaceArea } from '../../../src/components/WorkspaceArea';

/** */
function createWrapper(props) {
  return render(
    <DndProvider backend={TestBackend}>
      <WorkspaceArea
        isWorkspaceControlPanelVisible
        classes={{}}
        lang="en"
        t={k => k}
        {...props}
      />
    </DndProvider>,
  );
}

describe('WorkspaceArea', () => {
  it('should render outer element correctly', () => {
    createWrapper();

    expect(screen.getByRole('main')).toHaveClass('mirador-viewer');
    expect(screen.getByRole('main')).toHaveAttribute('lang', 'en');
  });

  it('should render all needed elements', () => {
    const { container } = createWrapper();

    expect(screen.getByRole('button', { name: 'listAllOpenWindows' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'workspaceMenu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'workspaceOptions' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('miradorViewer');
    expect(screen.getByRole('main')).toHaveTextContent('welcome');

    expect(container.querySelector('.mirador-background-plugin-area')).toBeInTheDocument(); // eslint-disable-line testing-library/no-node-access, testing-library/no-container
  });

  it('should not render WorkspaceControlPanel when isWorkspaceControlPanelVisible is false', () => {
    createWrapper({ isWorkspaceControlPanelVisible: false });

    expect(screen.queryByRole('button', { name: 'listAllOpenWindows' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'workspaceMenu' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'workspaceOptions' })).not.toBeInTheDocument();
  });

  describe('with isWorkspaceAddVisible', () => {
    it('should render WorkspaceAdd when isWorkspaceAddVisible is true', () => {
      createWrapper({ isWorkspaceAddVisible: true });

      expect(screen.queryByRole('heading', { level: 1, name: 'miradorViewer' })).not.toBeInTheDocument();
      expect(screen.getByRole('main')).toHaveTextContent('emptyResourceList');
      expect(within(screen.getByRole('main')).getByRole('button', { name: 'addResource' })).toBeInTheDocument();
    });
  });
});
