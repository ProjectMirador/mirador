import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '@material-ui/core/MenuItem';
import { WindowList } from '../../../src/components/WindowList';

describe('WindowList', () => {
  let wrapper;
  let handleClose;
  let focusWindow;
  let manifests;
  let windows;
  beforeEach(() => {
    handleClose = jest.fn();
    focusWindow = jest.fn();
    manifests = {};
    windows = {};

    wrapper = shallow(
      <WindowList
        containerId="mirador"
        anchorEl={{}}
        manifests={manifests}
        windows={windows}
        handleClose={handleClose}
        focusWindow={focusWindow}
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Menu)').length).toBe(1);
  });

  describe('with a window without a matching manifest', () => {
    beforeEach(() => {
      windows = { xyz: { id: 'xyz', manifestId: 'abc' } };

      wrapper = shallow(
        <WindowList
          containerId="mirador"
          anchorEl={{}}
          manifests={manifests}
          windows={windows}
          handleClose={handleClose}
          focusWindow={focusWindow}
        />,
      );
    });

    it('renders without an error', () => {
      expect(wrapper.find('WithStyles(MenuItem)').length).toBe(1);
      expect(wrapper.find('WithStyles(MenuItem)').key()).toBe('xyz');
      expect(
        wrapper.find('WithStyles(MenuItem)').matchesElement(<MenuItem>untitled</MenuItem>),
      ).toBe(true);
      wrapper.find('WithStyles(MenuItem)').simulate('click', {});
      expect(handleClose).toBeCalled();
      expect(focusWindow).toBeCalledWith('xyz');
    });
  });

  describe('with a window with a matching manifest', () => {
    beforeEach(() => {
      windows = { xyz: { id: 'xyz', manifestId: 'abc' } };
      manifests = { abc: { manifestation: { getLabel: jest.fn(() => [{ value: 'Some title' }]) } } };

      wrapper = shallow(
        <WindowList
          containerId="mirador"
          anchorEl={{}}
          manifests={manifests}
          windows={windows}
          handleClose={handleClose}
          focusWindow={focusWindow}
        />,
      );
    });

    it('renders without an error', () => {
      expect(wrapper.find('WithStyles(MenuItem)').length).toBe(1);
      expect(wrapper.find('WithStyles(MenuItem)').key()).toBe('xyz');
      expect(
        wrapper.find('WithStyles(MenuItem)').matchesElement(<MenuItem>Some title</MenuItem>),
      ).toBe(true);
    });
  });
});
