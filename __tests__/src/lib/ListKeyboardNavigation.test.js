import React from 'react';
import { shallow } from 'enzyme';
import { List, ListItem } from '@material-ui/core';
import { ListKeyboardNavigation } from '../../../src/lib/ListKeyboardNavigation';

const onChangeMock = jest.fn();
const mockEvent = { preventDefault: () => {} };
const onClickMock = jest.fn();
/**
 * Helper function to create a shallow wrapper around LanguageSettings
 */
function createWrapper(props, childProps) {
  return shallow(
    <ListKeyboardNavigation
      onChange={onChangeMock}
      selected="listItem01"
      {...props}
    >
      <ListItem value="listItem01" {...childProps} />
      <ListItem value="listItem02" {...childProps} />
      <ListItem value="listItem03" {...childProps} />
    </ListKeyboardNavigation>,
  );
}

describe('ListKeyboardNavigation', () => {
  it('renders properly', () => {
    const wrapper = createWrapper();
    expect(wrapper.matchesElement(
      <List />,
    ));
    expect(wrapper.find('WithStyles(ListItem)').length).toBe(3);
  });

  it('the second item is selected, when passing its value as `selected`', () => {
    const wrapper = createWrapper({ selected: 'listItem02' });
    expect(wrapper.find('WithStyles(ListItem)[value="listItem02"]').first().prop('selected')).toBe(true);
  });

  it('pressing ArrowDown selects the next list item', () => {
    const wrapper = createWrapper({ selected: 'listItem02' });
    wrapper.simulate('keyDown', { key: 'ArrowDown', ...mockEvent });
    expect(wrapper.find('WithStyles(ListItem)').last().prop('selected')).toBe(true);
  });

  it('pressing ArrowDown selects the first list item, when the last one is selected', () => {
    const wrapper = createWrapper({ selected: 'listItem03' });
    wrapper.simulate('keyDown', { key: 'ArrowDown', ...mockEvent });
    expect(wrapper.find('WithStyles(ListItem)').first().prop('selected')).toBe(true);
  });

  it('pressing ArrowUp selects the previous list item', () => {
    const wrapper = createWrapper({ selected: 'listItem02' });
    wrapper.simulate('keyDown', { key: 'ArrowUp', ...mockEvent });
    expect(wrapper.find('WithStyles(ListItem)').first().prop('selected')).toBe(true);
  });

  it('pressing ArrowUp selects the last list item, when the first one is selected', () => {
    const wrapper = createWrapper({ selected: 'listItem01' });
    wrapper.simulate('keyDown', { key: 'ArrowUp', ...mockEvent });
    expect(wrapper.find('WithStyles(ListItem)').last().prop('selected')).toBe(true);
  });

  it('onChange handler is called when enter key is pressed', () => {
    const wrapper = createWrapper();
    wrapper.find('WithStyles(List)').first().simulate('keyDown', { key: 'Enter', ...mockEvent });
    expect(onChangeMock).toBeCalledWith('listItem01');
  });

  it('onChange handler is called when clicking a list item', () => {
    const wrapper = createWrapper();
    wrapper.find('WithStyles(ListItem)').first().simulate('click');
    expect(onChangeMock).toBeCalledWith('listItem01');
  });

  it('onClickHandler of list items is called besides onChange', () => {
    const wrapper = createWrapper(undefined, { onClick: onClickMock });
    wrapper.find('WithStyles(ListItem)').first().simulate('click');
    expect(onClickMock).toBeCalledTimes(1);
  });
});
