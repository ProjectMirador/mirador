import React from 'react';
import { shallow } from 'enzyme';
import WorkspaceMosaic from '../../../src/containers/WorkspaceMosaic';
import Window from '../../../src/containers/Window';
import Workspace from '../../../src/components/Workspace';

const windows = { w1: { id: 'w1' }, w2: { id: 'w2' } };

describe('Workspace', () => {
  describe('if workspace type is mosaic', () => {
    it('should render <WorkspaceMosaic/> properly', () => {
      const wrapper = shallow(
        <Workspace windows={windows} workspaceType="mosaic" />,
      );

      expect(wrapper.matchesElement(
        <div className="mirador-workspace">
          <WorkspaceMosaic windows={windows} />
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
          <Window window={{ id: 'w1' }} />
          <Window window={{ id: 'w2' }} />
        </div>,
      )).toBe(true);
    });
  });
});
