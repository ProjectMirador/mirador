import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { SidebarIndexCompact } from '../../../src/components/SidebarIndexCompact';

/** */
function createWrapper(props) {
  return shallow(
    <SidebarIndexCompact
      canvas={{ label: 'yolo' }}
      classes={{}}
      {...props}
    />,
  );
}

describe('SidebarIndexCompact', () => {
  it('creates Typography with a canvas label', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Typography).length).toBe(1);
    expect(wrapper.text()).toBe('yolo');
  });
});
