import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceMosaic from '../../../src/containers/WorkspaceMosaic';
import Window from '../../../src/containers/Window';
import Workspace from '../../../src/components/Workspace';

const windows = { 1: { id: 1 }, 2: { id: 2 } };

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
      {...props}
    />,
  );
}

describe('Workspace', () => {
  describe('if workspace type is mosaic', () => {
    it('should render <WorkspaceMosaic/> properly', () => {
      const wrapper = createWrapper();

      expect(wrapper.matchesElement(
        <div className="mirador-workspace-viewport mirador-workspace-with-control-panel">
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
          <Window window={{ id: 1 }} />
          <Window window={{ id: 2 }} />
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
