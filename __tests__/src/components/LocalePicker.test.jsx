import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { LocalePicker } from '../../../src/components/LocalePicker';

/**
 * Helper function to create a shallow wrapper around LocalePicker
 */
function createWrapper(props) {
  return render(<LocalePicker availableLocales={[]} locale={undefined} setLocale={() => {}} {...props} />);
}

describe('LocalePicker', () => {
  it('hides the control if there are not locales to switch to', () => {
    const { container } = createWrapper({ availableLocales: ['en'] });

    expect(container).toBeEmptyDOMElement();
  });

  it('renders a select with the current value', () => {
    createWrapper({ availableLocales: ['en', 'de'], locale: 'de' });
    // The option to expand the dropdown menu is rendered by a CompanionWindow titleControls prop in WindowSideBarInfoPanel, which is a combobox
    const dropdownTitle = screen.getByRole('combobox');
    expect(dropdownTitle).toHaveTextContent('Deutsch');
  });

  it('renders a select with both options and sets the current value', async () => {
    const user = userEvent.setup();
    createWrapper({ availableLocales: ['en', 'de'], locale: 'de' });
    const dropdownTitle = screen.getByRole('combobox');
    // Open the menu
    await user.click(dropdownTitle);
    // The dropddown menu is not nested within the combobox, it is a sibling in the DOM, an MuiMenu
    const menu = screen.getByRole('listbox');
    // Assert that the menu element has 2 children (2 options)
    // eslint-disable-next-line testing-library/no-node-access
    expect(menu.children).toHaveLength(2);
    // Verify that the select element has the correct value ('de')
    const deOption = screen.getByRole('option', { name: 'Deutsch' });
    expect(deOption).toHaveAttribute('aria-selected', 'true');
    // Verify en is also an option
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
  });

  it('renders a human-readable label for locale codes not in the configured language list', async () => {
    const user = userEvent.setup();
    // 'fi' (Finnish) is not in Mirador's availableLanguages config
    createWrapper({ availableLocales: ['en', 'fi'], locale: 'en' });
    const dropdownTitle = screen.getByRole('combobox');
    await user.click(dropdownTitle);
    const menu = screen.getByRole('listbox');
    // 'fi' should be resolved to a display name (e.g. "Finnish"), not shown as the raw code
    expect(menu).not.toHaveTextContent('fi');
    expect(screen.getByRole('option', { name: /finnish/i })).toBeInTheDocument();
  });

  it('falls back to the raw locale code when Intl.DisplayNames is unavailable', async () => {
    const user = userEvent.setup();
    // Intl.DisplayNames could error in older browser environments
    // Fallback to the raw locale code in those cases.
    vi.spyOn(Intl, 'DisplayNames').mockImplementation(() => {
      throw new Error('not supported');
    });
    // 'fi' is not in availableLanguages; DisplayNames unavailable, so raw code is shown
    createWrapper({ availableLocales: ['en', 'fi'], locale: 'en' });
    const dropdownTitle = screen.getByRole('combobox');
    await user.click(dropdownTitle);
    expect(screen.getByRole('option', { name: 'fi' })).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it('triggers setLocale prop when clicking a list item', async () => {
    const user = userEvent.setup();
    const setLocale = vi.fn();
    createWrapper({
      availableLocales: ['en', 'de'],
      locale: 'en',
      setLocale,
    });
    const dropdownTitle = screen.getByRole('combobox');
    // Open the Select component
    await user.click(dropdownTitle);
    // Change the locale to 'de'
    await user.click(screen.getByRole('option', { name: 'Deutsch' }));
    expect(setLocale).toHaveBeenCalledTimes(1);
    expect(setLocale).toHaveBeenCalledWith('de');
  });
});
