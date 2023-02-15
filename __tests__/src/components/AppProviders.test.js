import { shallow } from 'enzyme';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { DndContext, DndProvider } from 'react-dnd';
import { AppProviders } from '../../../src/components/AppProviders';
import settings from '../../../src/config/settings';

jest.unmock('react-i18next');

/** */
function createWrapper(props) {
  return shallow(
    <AppProviders
      language="en"
      isFullscreenEnabled={false}
      theme={settings.theme}
      translations={{}}
      t={k => k}
      {...props}
    />,
  );
}

describe('AppProviders', () => {
  it('should render all needed elements ', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(ThemeProvider).length).toBe(1);
    expect(wrapper.find(StylesProvider).length).toBe(1);
  });

  it('sets up a theme based on the config passed in merged w/ MaterialUI', () => {
    const wrapper = createWrapper();
    const { theme } = wrapper.find(ThemeProvider).props();
    expect(theme.palette.type).toEqual('light');
    expect(theme.typography.useNextVariants).toBe(true);
    expect(Object.keys(theme).length).toBeGreaterThan(10);
  });

  it('sets up translations based on the config passed in', () => {
    const wrapper = createWrapper({ translations: { en: { off: 'on' } } });
    expect(wrapper.instance().i18n.t('off')).toEqual('on');
  });

  describe('componentDidUpdate()', () => {
    it('changes the i18n language if the language prop has been updated', () => {
      const wrapper = createWrapper();

      expect(wrapper.instance().i18n.language).toEqual('en');
      wrapper.setProps({ language: 'de' });
      expect(wrapper.instance().i18n.language).toEqual('de');
    });
  });

  it('provides a drag and drop context', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('MaybeDndProvider').dive().find(DndProvider).length).toBe(1);
  });

  it('allows apps to opt-out of the drag and drop provider', () => {
    const wrapper = createWrapper({ dndManager: false });
    expect(wrapper.find('MaybeDndProvider').dive().find(DndProvider).length).toBe(0);
  });

  it('allows apps to provide an existing drag and drop context', () => {
    const wrapper = createWrapper({ dndManager: 'whatever' });
    expect(wrapper.find('MaybeDndProvider').dive().find(DndContext.Provider).prop('value')).toBe('whatever');
  });
});
