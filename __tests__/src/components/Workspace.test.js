import React from 'react';
import { shallow } from 'enzyme';
import Workspace from '../../../src/components/Workspace';
import ConnectedWindow from '../../../src/components/Window';

describe('Workspace', () => {
  const windows = { 1: { id: 1 }, 2: { id: 2 } };
  it('should render properly', () => {
    const wrapper = shallow(<Workspace windows={windows} />);
    expect(wrapper.matchesElement(
      <div className="mirador-workspace">
        <ConnectedWindow window={{ id: 1 }} />
        <ConnectedWindow window={{ id: 2 }} />
      </div>,
    )).toBe(true);
  });
});
