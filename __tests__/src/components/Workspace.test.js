import React from 'react';
import { shallow } from 'enzyme';
import Workspace from '../../../src/components/Workspace';
import Window from '../../../src/containers/Window';

describe('Workspace', () => {
  const windows = { 1: { id: 1 }, 2: { id: 2 } };
  it('should render properly', () => {
    const wrapper = shallow(<Workspace windows={windows} />);
    expect(wrapper.containsAllMatchingElements([
      <div
        data-grid={{
          x: 0, y: 0, w: 6, h: 3,
        }}
      >
        <Window window={{ id: 1 }} />
      </div>,
      <div
        data-grid={{
          x: 6, y: 0, w: 6, h: 3,
        }}
      >
        <Window window={{ id: 2 }} />
      </div>,
    ])).toBe(true);
    expect(wrapper.find('WidthProvider').length).toBe(1);
    expect(wrapper.find('.mirador-workspace').length).toBe(1);
  });
});
