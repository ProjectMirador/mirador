import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceMosaic from '../../../src/containers/WorkspaceMosaic';
import Window from '../../../src/containers/Window';
import Workspace from '../../../src/components/Workspace';
import { WorkspaceContext } from '../../../src/contexts';

const windows = { 1: { id: 1 }, 2: { id: 2 } };

describe('Workspace', () => {
  describe('if workspace type is mosaic', () => {
    it('should render <WorkspaceMosaic/> properly', () => {
      const wrapper = shallow(
        <Workspace windows={windows} workspaceType="mosaic" />,
      );

      expect(wrapper.matchesElement(
        <div className="mirador-workspace">
          <WorkspaceContext.Provider>
            <WorkspaceMosaic windows={windows} />
          </WorkspaceContext.Provider>
        </div>,
      )).toBe(true);
    });
  });
  describe('if workspace type is unknown', () => {
    it('should render <Window/> components as list', () => {
      const wrapper = shallow(
        <Workspace windows={windows} workspaceType="bubu" />,
      );

      expect(wrapper.matchesElement(
        <div className="mirador-workspace">
          <WorkspaceContext.Provider>
            <Window window={{ id: 1 }} />
            <Window window={{ id: 2 }} />
          </WorkspaceContext.Provider>
        </div>,
      )).toBe(true);
    });
  });
});
