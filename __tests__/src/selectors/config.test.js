import {
  getLanguagesFromConfigWithCurrent,
  getShowZoomControlsConfig,
  getTheme,
  getWorkspaceType,
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
  it('returns the workspace configuration for showing zoom controls', () => {
    const state = { workspace: { showZoomControls: true } };
    expect(getShowZoomControlsConfig(state)).toEqual(true);
  });
});

describe('getTheme', () => {
  it('returns the theme', () => {
    const state = { config: { theme: 'dark' } };
    expect(getTheme(state)).toEqual('dark');
  });
});

describe('getWorkspaceType', () => {
  it('returns the workspace type', () => {
    const state = { config: { workspace: { type: 'elastic' } } };
    expect(getWorkspaceType(state)).toEqual('elastic');
  });
});

describe('getContainerId', () => {
  it('returns the container id', () => {
    const state = { config: { id: 'mirador' } };
    expect(getContainerId(state)).toEqual('mirador');
  });
});
