import {
  getLanguagesFromConfigWithCurrent,
  getShowZoomControlsConfig,
  getTheme,
  getThemeIds,
  getContainerId,
} from '../../../src/state/selectors';

describe('getLanguagesFromConfigWithCurrent', () => {
  it('returns an array of objects with locale, label, and current properties', () => {
    const state = {
      config: {
        availableLanguages: {
          epo: 'Esparanto',
          tlh: 'Klingon',
        },
        language: 'epo',
      },
    };

    const expected = [
      {
        current: true,
        label: 'Esparanto',
        locale: 'epo',
      },
      {
        current: false,
        label: 'Klingon',
        locale: 'tlh',
      },
    ];

    expect(getLanguagesFromConfigWithCurrent(state)).toEqual(expected);
  });
});

describe('getShowZoomControlsConfig', () => {
  it('returns the settings config if it has not been set on the workspace', () => {
    const state = {
      config: { workspace: { showZoomControls: true } },
      workspace: {},
    };
    expect(getShowZoomControlsConfig(state)).toEqual(true);
  });

  it('returns the workspace configuration for showing zoom controls', () => {
    const state = {
      config: { workspace: { showZoomControls: true } },
      workspace: { showZoomControls: false },
    };
    expect(getShowZoomControlsConfig(state)).toEqual(false);
  });
});

describe('getTheme', () => {
  it('returns the theme', () => {
    const state = {
      config: {
        selectedTheme: 'custom',
        theme: {
          whatever: 'dark',
        },
        themes: {
          custom: {
            and_another_thing: true,
          },
        },
      },
    };

    expect(getTheme(state)).toEqual({ and_another_thing: true, whatever: 'dark' });
  });
});

describe('getThemeIds', () => {
  it('returns the available themes', () => {
    const state = {
      config: {
        themes: {
          a: {},
          b: {},
          c: {},
        },
      },
    };

    expect(getThemeIds(state)).toEqual(['a', 'b', 'c']);
  });
});

describe('getContainerId', () => {
  it('returns the container id', () => {
    const state = { config: { id: 'mirador' } };
    expect(getContainerId(state)).toEqual('mirador');
  });
});
