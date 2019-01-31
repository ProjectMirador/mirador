import React from 'react';
import { shallow } from 'enzyme';
import WindowTopMenu from '../../../src/components/WindowTopMenu';

describe('WindowTopMenu', () => {
  let wrapper;
  let handleClose;
  beforeEach(() => {
    handleClose = jest.fn();
    wrapper = shallow(<WindowTopMenu windowId="xyz" handleClose={handleClose} />).dive();
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Menu)').length).toBe(1);
    expect(wrapper.find('Connect(WindowThumbnailSettings)').length).toBe(1);
  });
});
