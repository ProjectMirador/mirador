import React from 'react';
import { shallow } from 'enzyme';
import { LocalePicker } from '../../../src/components/LocalePicker';

/**
 * Helper function to create a shallow wrapper around LanguageSettings
 */
function createWrapper(props) {
  return shallow(
    <LocalePicker
      availableLocales={[]}
      locale={undefined}
      setLocale={() => {}}
      {...props}
    />,
  );
}

describe('LocalePicker', () => {
  let wrapper;

  it('hides the control if there are not locales to switch to', () => {
    wrapper = createWrapper({ availableLocales: ['en'] });

    expect(wrapper.find('WithStyles(WithFormControlContext(Select))').length).toBe(0);
  });

  it('renders a select with the current value', () => {
    wrapper = createWrapper({ availableLocales: ['en', 'de'], locale: 'en' });

    expect(wrapper.find('WithStyles(WithFormControlContext(Select))').length).toBe(1);
    expect(wrapper.find('WithStyles(WithFormControlContext(Select))').props().value).toBe('en');
  });

  it('renders a select with a list item for each language passed in props', () => {
    wrapper = createWrapper({ availableLocales: ['en', 'de'] });

    expect(wrapper.find('WithStyles(MenuItem)').length).toBe(2);
  });


  it('triggers setLocale prop when clicking a list item', () => {
    const setLocale = jest.fn();

    wrapper = createWrapper({
      availableLocales: ['en', 'de'],
      setLocale,
    });
    wrapper.find('WithStyles(WithFormControlContext(Select))').simulate('change', { target: { value: 'de' } });

    expect(setLocale).toHaveBeenCalledTimes(1);
    expect(setLocale).toHaveBeenCalledWith('de');
  });
});
