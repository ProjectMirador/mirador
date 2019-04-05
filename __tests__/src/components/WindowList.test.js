import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { WindowList } from '../../../src/components/WindowList';

describe('WindowList', () => {
  let wrapper;
  let handleClose;
  let focusWindow;
  let titles;
  let windows;
  beforeEach(() => {
    handleClose = jest.fn();
    focusWindow = jest.fn();
    titles = {};
    windows = {};

    wrapper = shallow(
      <WindowList
        containerId="mirador"
        anchorEl={{}}
        titles={titles}
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
          titles={titles}
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
        wrapper.find('WithStyles(MenuItem)').matchesElement(<MenuItem><ListItemText>untitled</ListItemText></MenuItem>),
      ).toBe(true);
      wrapper.find('WithStyles(MenuItem)').simulate('click', {});
      expect(handleClose).toBeCalled();
      expect(focusWindow).toBeCalledWith('xyz', true);
    });
  });

  describe('with a window with a matching manifest', () => {
    beforeEach(() => {
      windows = { xyz: { id: 'xyz', manifestId: 'abc' } };
      titles = { xyz: 'Some title' };

      wrapper = shallow(
        <WindowList
          containerId="mirador"
          anchorEl={{}}
          titles={titles}
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
        wrapper.find('WithStyles(MenuItem)').matchesElement(<MenuItem><ListItemText>Some title</ListItemText></MenuItem>),
      ).toBe(true);
    });
  });

  describe('with multiple windows', () => {
    beforeEach(() => {
      windows = {
        xyz: { id: 'xyz', manifestId: 'abc' },
        zyx: { id: 'zyx', manifestId: '123' },
      };
      titles = { xyz: 'Some title' };

      wrapper = shallow(
        <WindowList
          containerId="mirador"
          anchorEl={{}}
          titles={titles}
          windows={windows}
          handleClose={handleClose}
          focusWindow={focusWindow}
        />,
      );
    });

    it('has the first window in the list selected', () => {
      expect(wrapper.find('WithStyles(MenuItem)').first().props().selected).toBe(true);
      expect(wrapper.find('WithStyles(MenuItem)').last().props().selected).toBe(false);
    });
  });
});
