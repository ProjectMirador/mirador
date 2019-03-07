import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import WorkspaceMosaic from '../../../src/containers/WorkspaceMosaic';
import WorkspaceElastic from '../../../src/containers/WorkspaceElastic';
import Window from '../../../src/containers/Window';
import { Workspace } from '../../../src/components/Workspace';

const windows = { 1: { id: 1 }, 2: { id: 2 } };
const maximizedWindows = { 1: { id: 1, maximized: true }, 2: { id: 2, maximized: false } };

/**
 * Utility function to create a Worksapce
 * component with all required props set
*/
function createWrapper(props) {
  return shallow(
    <Workspace
      isWorkspaceControlPanelVisible
      windows={windows}
      workspaceType="mosaic"
      t={k => k}
      {...props}
    />,
  );
}

describe('Workspace', () => {
  describe('if workspace type is elastic', () => {
    it('should render <WorkspaceElastic/> properly', () => {
      const wrapper = createWrapper({ workspaceType: 'elastic' });

      expect(wrapper.matchesElement(
        <div className="mirador-workspace-viewport mirador-workspace-with-control-panel">
          <Typography>miradorViewer</Typography>
          <WorkspaceElastic />
        </div>,
      )).toBe(true);
    });
  });
  describe('if workspace type is mosaic', () => {
    it('should render <WorkspaceMosaic/> properly', () => {
      const wrapper = createWrapper();

      expect(wrapper.matchesElement(
        <div className="mirador-workspace-viewport mirador-workspace-with-control-panel">
          <Typography>miradorViewer</Typography>
          <WorkspaceMosaic windows={windows} />
        </div>,
      )).toBe(true);
    });
  });
  describe('if workspace type is unknown', () => {
    it('should render <Window/> components as list', () => {
      const wrapper = createWrapper({ workspaceType: 'bubu' });
      expect(wrapper.matchesElement(
        <div className="mirador-workspace-viewport mirador-workspace-with-control-panel">
          <Typography>miradorViewer</Typography>
          <Window window={{ id: 1 }} />
          <Window window={{ id: 2 }} />
        </div>,
      )).toBe(true);
    });
  });
  describe('if any windows are maximized', () => {
    it('should render only maximized <Window/> components', () => {
      const wrapper = createWrapper({ windows: maximizedWindows });
      expect(wrapper.matchesElement(
        <div className="mirador-workspace-viewport mirador-workspace-with-control-panel">
          <Typography>miradorViewer</Typography>
          <Window window={{ id: 1, maximized: true }} className="mirador-workspace-maximized-window" />
        </div>,
      )).toBe(true);
    });
  });

  describe('when the workspace control panel is displayed', () => {
    it('has the *-with-control-panel class applied', () => {
      const wrapper = createWrapper();

      expect(wrapper.find('.mirador-workspace-with-control-panel').length).toBe(1);
    });
  });

  describe('when the workspace control panel is not displayed', () => {
    it('does not have the *-with-control-panel class applied', () => {
      const wrapper = createWrapper({ isWorkspaceControlPanelVisible: false });

      expect(wrapper.find('.mirador-workspace-with-control-panel').length).toBe(0);
    });
  });
});
