import React from 'react';
import { shallow } from 'enzyme';
import Workspace from '../../../src/components/Workspace';
import Window from '../../../src/containers/Window';

describe('Workspace', () => {
  const windows = { 1: { id: 1 }, 2: { id: 2 } };
  it('should render properly', () => {
    const wrapper = shallow(<Workspace windows={windows} />);
    expect(wrapper.matchesElement(
      <div className="mirador-workspace">
        <Window window={{ id: 1 }} />
        <Window window={{ id: 2 }} />
      </div>,
    )).toBe(true);
  });
});
