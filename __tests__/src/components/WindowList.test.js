import React from 'react';
import { shallow } from 'enzyme';
import Menu from '@material-ui/core/Menu';
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
    expect(wrapper.find(Menu).length).toBe(1);
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
      expect(wrapper.find(MenuItem).length).toBe(1);
      expect(wrapper.find(MenuItem).key()).toBe('xyz');
      expect(
        wrapper.find(MenuItem)
          .matchesElement(<MenuItem><ListItemText>untitled</ListItemText></MenuItem>),
      ).toBe(true);
      wrapper.find(MenuItem).simulate('click', {});
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
      expect(wrapper.find(MenuItem).length).toBe(1);
      expect(wrapper.find(MenuItem).key()).toBe('xyz');
      expect(
        wrapper.find(MenuItem)
          .matchesElement(<MenuItem><ListItemText>Some title</ListItemText></MenuItem>),
      ).toBe(true);
    });
  });

  describe('focus2ndListIitem', () => {
    const mockListItem = jest.fn();
    /** */
    const mockSingleItemMenu = { querySelectorAll: () => [{ focus: mockListItem }] };
    /** */
    const mockMultiItemMenu = { querySelectorAll: () => ['Header', { focus: mockListItem }] };

    it('does not set focus if there is only one list item (the header)', () => {
      WindowList.focus2ndListIitem(mockSingleItemMenu);
      expect(mockListItem).not.toHaveBeenCalled();
    });

    it('sets focus on the 2nd list item', () => {
      WindowList.focus2ndListIitem(mockMultiItemMenu);
      expect(mockListItem).toHaveBeenCalled();
    });
  });
});
