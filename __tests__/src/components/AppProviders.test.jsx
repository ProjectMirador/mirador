import Button from '@mui/material/Button';
import { render, screen } from '@tests/utils/test-utils';
import { useTranslation } from 'react-i18next';
import { useDrop } from 'react-dnd';
import { AppProviders } from '../../../src/components/AppProviders';
import settings from '../../../src/config/settings';

/** */
function MockTranslationComponent() {
  const { t } = useTranslation();
  return <div data-testid="test-translation">{t('aboutMirador')}</div>;
}

/** */
function MockDnDComponent() {
  let drop = null;

  try {
    const [_props, dropRef] = useDrop(() => ({
      accept: 'box',
      drop: () => ({ name: 'Mirador Test' }),
    }));

    drop = dropRef;
  } catch (e) {
    // do nothing
  }

  if (!drop) {
    return <div data-testid="failed-dnd" />;
  }

  return (
    <div ref={drop} data-testid="test-dnd">
      Test DnD
    </div>
  );
}

/** */
function createWrapper(props = {}) {
  return render(
    <AppProviders
      isFullscreenEnabled={false}
      theme={settings.theme}
      translations={{
        de: { aboutMirador: 'Über Mirador' },
        en: { aboutMirador: 'About Project Mirador' },
      }}
      {...props}
    >
      <Button color="primary" data-testid="test-button">
        Test
      </Button>
      <MockTranslationComponent />
      <MockDnDComponent />
    </AppProviders>,
    {
      preloadedState: {
        config: {
          availableLanguages: { de: 'Deutsch', en: 'English' },
          themes: { a: {} },
        },
      },
    },
  );
}

describe('AppProviders', () => {
  it('sets up the configured theme', () => {
    createWrapper();
    // #1967d2 is the set as the primary text color in our settings.theme
    expect(screen.getByTestId('test-button')).toHaveStyle('color: #1967d2');
  });
  it('provides a drag and drop context', async () => {
    createWrapper();
    // AppProvider provides a default dndManager if it is undefined in props
    // This component will not render without a drag drop context
    expect(screen.getByTestId('test-dnd')).toBeInTheDocument();
  });
  it('allows apps to opt-out of the drag and drop provider', () => {
    createWrapper({ dndManager: false });
    expect(screen.getByTestId('failed-dnd')).toBeInTheDocument();
  });
  it('displays the default language if none set', () => {
    createWrapper();
    expect(screen.getByTestId('test-translation')).toHaveTextContent('About Project Mirador');
  });
  it('displays the specified language translations', async () => {
    createWrapper({ language: 'de' });
    expect(await screen.findByTestId('test-translation')).toHaveTextContent('Über Mirador');
  });
});
