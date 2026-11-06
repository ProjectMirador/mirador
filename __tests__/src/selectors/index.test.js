import { configureStore } from '@reduxjs/toolkit';
import {
  getAnnotationResourcesByMotivation,
  getLanguagesFromConfigWithCurrent,
  getSelectedAnnotationId,
} from '../../../src/state/selectors';
import { iiifApi } from '../../../src/state/api/iiifApi';

/** Seeds iiifApi's own cache (via upsertQueryData) and returns its state slice, for building test fixtures. */
async function buildIiifApiState(entries) {
  const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(iiifApi.middleware),
    reducer: { [iiifApi.reducerPath]: iiifApi.reducer },
  });

  await Promise.all(
    entries.map(({ annotationId, targetId, json }) =>
      store.dispatch(iiifApi.util.upsertQueryData('getAnnotation', { annotationId, targetId }, json)),
    ),
  );

  return store.getState()[iiifApi.reducerPath];
}

describe('getAnnotationResourcesByMotivation', () => {
  it('returns an array of annotation resources (filtered by the passed in array of motiviations)', async () => {
    const expected = [['oa:commenting'], ['sc:something-else', 'oa:commenting']];

    const state = {
      iiifApi: await buildIiifApiState([
        {
          annotationId: 'annoId1',
          json: {
            resources: [
              { '@id': 'annoId1', motivation: 'oa:commenting' },
              { '@id': 'annoId2', motivation: 'oa:not-commenting' },
              { '@id': 'annoId3', motivation: ['sc:something-else', 'oa:commenting'] },
            ],
          },
          targetId: 'cid1',
        },
      ]),
      manifests: {
        mid: {
          json: {
            '@context': 'http://iiif.io/api/presentation/2/context.json',
            '@id': 'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
            '@type': 'sc:Manifest',
            sequences: [
              {
                canvases: [
                  {
                    '@id': 'cid1',
                  },
                ],
              },
            ],
          },
        },
      },
      windows: {
        abc123: {
          manifestId: 'mid',
          visibleCanvases: ['cid1'],
        },
      },
    };

    expect(
      getAnnotationResourcesByMotivation(state, {
        motivations: ['something', 'oa:commenting'],
        windowId: 'abc123',
      }).map((r) => r.motivations),
    ).toEqual(expected);
  });
});

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

it('getSelectedAnnotationId returns an array of selected annotation IDs from state', () => {
  const state = {
    manifests: {
      mid: {
        json: {
          '@context': 'http://iiif.io/api/presentation/2/context.json',
          '@id': 'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
          '@type': 'sc:Manifest',
          sequences: [
            {
              canvases: [
                {
                  '@id': 'tid1',
                },
              ],
            },
          ],
        },
      },
    },
    windows: {
      wid: {
        manifestId: 'mid',
        selectedAnnotationId: 'aid1',
        visibleCanvases: ['tid1'],
      },
    },
  };

  expect(getSelectedAnnotationId(state, { windowId: 'wid' })).toEqual('aid1');
});
