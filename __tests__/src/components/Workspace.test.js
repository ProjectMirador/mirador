import React from 'react';
import { shallow } from 'enzyme';
import Workspace from '../../../src/components/Workspace';
import Window from '../../../src/containers/Window';

describe('Workspace', () => {
  const windows = { 1: { id: 1 }, 2: { id: 2 } };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Workspace
        windows={windows}
        config={{ workspace: { type: 'mosaic' } }}
      />,
    );
  });
  it('should render properly', () => {
    expect(wrapper.find('.mirador-workspace').length).toBe(1);
    expect(wrapper.find('Connect(WorkspaceMosaic)').length).toBe(1);
  });
  describe('workspaceByType', () => {
    it('when mosaic', () => {
      expect(wrapper.find('Connect(WorkspaceMosaic)').length).toBe(1);
    });
    it('anything else', () => {
      wrapper = shallow(
        <Workspace
          windows={windows}
          config={{ workspace: { type: 'foo' } }}
        />,
      );
      expect(wrapper.matchesElement(
        <div className="mirador-workspace">
          <Window window={{ id: 1 }} />
          <Window window={{ id: 2 }} />
        </div>,
      )).toBe(true);
    });
  });
});
