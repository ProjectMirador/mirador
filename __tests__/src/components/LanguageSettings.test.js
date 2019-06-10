import React from 'react';
import { shallow } from 'enzyme';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { LanguageSettings } from '../../../src/components/LanguageSettings';

/**
 * Helper function to create a shallow wrapper around LanguageSettings
 */
function createWrapper(props) {
  return shallow(
    <LanguageSettings
      handleClick={() => {}}
      languages={{}}
      {...props}
    />,
  );
}

describe('LanguageSettings', () => {
  let wrapper;
  const languages = [
    {
      current: true,
      label: 'Deutsch',
      locale: 'de',
    },
    {
      current: false,
      label: 'English',
      locale: 'en',
    },
  ];


  it('renders a list with a list item for each language passed in props', () => {
    wrapper = createWrapper({ languages });

    expect(wrapper.find(MenuItem).length).toBe(2);
  });

  it('non-active list items are buttons (and active are not)', () => {
    wrapper = createWrapper({ languages });

    expect(
      wrapper
        .find(MenuItem)
        .first() // The German / active button
        .prop('button'),
    ).toBe(false);

    expect(
      wrapper
        .find(MenuItem)
        .last() // The English / non-active button
        .prop('button'),
    ).toBe(true);
  });

  it('renders the check icon when the active prop returns true', () => {
    wrapper = createWrapper({ languages });

    expect(
      wrapper
        .find(MenuItem)
        .first()
        .find('CheckSharpIcon')
        .length,
    ).toBe(1);
  });

  it('renders the language value in an Typography element wrapped in a ListItemText', () => {
    wrapper = createWrapper({ languages });

    const firstListText = wrapper
      .find(MenuItem)
      .first()
      .find(ListItemText)
      .children()
      .text();

    expect(firstListText).toEqual('Deutsch');
  });

  it('triggers the handleClick prop when clicking a list item', () => {
    const mockHandleClick = jest.fn();
    wrapper = createWrapper({
      handleClick: mockHandleClick,
      languages,
    });

    wrapper.find(MenuItem).last().simulate('click');

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
    expect(mockHandleClick).toHaveBeenCalledWith('en');
  });
});
