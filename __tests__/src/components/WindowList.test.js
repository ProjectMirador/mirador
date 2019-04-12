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
  beforeEach(() => {
    handleClose = jest.fn();
    focusWindow = jest.fn();
    titles = {};

    wrapper = shallow(
      <WindowList
        containerId="mirador"
        anchorEl={{}}
        titles={titles}
        windowIds={[]}
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
      wrapper = shallow(
        <WindowList
          containerId="mirador"
          anchorEl={{}}
          titles={titles}
          windowIds={['xyz']}
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
      titles = { xyz: 'Some title' };

      wrapper = shallow(
        <WindowList
          containerId="mirador"
          anchorEl={{}}
          titles={titles}
          windowIds={['xyz']}
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
      titles = { xyz: 'Some title' };

      wrapper = shallow(
        <WindowList
          containerId="mirador"
          anchorEl={{}}
          titles={titles}
          windowIds={['xyz', 'zyx']}
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
