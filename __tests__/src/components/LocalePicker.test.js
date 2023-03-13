import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocalePicker } from '../../../src/components/LocalePicker';

/**
 * Helper function to create a shallow wrapper around LanguageSettings
 */
function createWrapper(props) {
  return render(
    <LocalePicker
      availableLocales={[]}
      locale={undefined}
      setLocale={() => {}}
      {...props}
    />,
  );
}

describe('LocalePicker', () => {
  it('hides the control if there are not locales to switch to', () => {
    const { container } = createWrapper({ availableLocales: ['en'] });

    expect(container).toBeEmptyDOMElement(); // eslint-disable-line testing-library/no-container
  });

  it('renders a select with the current value', () => {
    createWrapper({ availableLocales: ['en', 'de'], locale: 'en' });

    expect(screen.getByRole('button')).toHaveTextContent('en');
  });

  it('renders a select with a list item for each language passed in props', async () => {
    const user = userEvent.setup();

    createWrapper({ availableLocales: ['en', 'de'], locale: 'en' });

    await user.click(screen.getByRole('button'));

    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(screen.getByRole('option', { name: 'en' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'de' })).toBeInTheDocument();
  });

  it('triggers setLocale prop when clicking a list item', async () => {
    const user = userEvent.setup();
    const setLocale = jest.fn();

    createWrapper({
      availableLocales: ['en', 'de'],
      locale: 'en',
      setLocale,
    });

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'de' }));

    expect(setLocale).toHaveBeenCalledTimes(1);
    expect(setLocale).toHaveBeenCalledWith('de');
  });
});
