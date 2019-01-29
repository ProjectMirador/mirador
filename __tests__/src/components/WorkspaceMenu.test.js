import React from 'react';
import { shallow } from 'enzyme';
import { WorkspaceMenu } from '../../../src/components/WorkspaceMenu';

describe('WorkspaceMenu', () => {
  let wrapper;
  let handleClose;
  beforeEach(() => {
    handleClose = jest.fn();
    wrapper = shallow(<WorkspaceMenu handleClose={handleClose} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Menu)').length).toBe(1);
  });
});
