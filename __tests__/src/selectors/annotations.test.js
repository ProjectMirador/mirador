import { configureStore } from '@reduxjs/toolkit';
import {
  getAnnotationResourcesByMotivation,
  getAnnotationResourcesByMotivationForCanvas,
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

describe('getAnnotationResourcesByMotivationForCanvas', () => {
  it('returns an array of annotation resources on a given canvas (filtered by the passed in array of motiviations)', async () => {
    const expected = [['oa:commenting'], ['sc:something-else', 'oa:commenting']];

    const state = {
      iiifApi: await buildIiifApiState([
        { annotationId: 'annoId1', json: { resources: [{ '@id': 'annoId1', motivation: 'oa:commenting' }] }, targetId: 'cid1' },
        {
          annotationId: 'annoId2',
          json: {
            resources: [
              { '@id': 'annoId1', motivation: 'oa:commenting' },
              { '@id': 'annoId2', motivation: 'oa:not-commenting' },
              { '@id': 'annoId3', motivation: ['sc:something-else', 'oa:commenting'] },
            ],
          },
          targetId: 'cid2',
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
                canvases: [{ '@id': 'cid1' }, { '@id': 'cid2' }],
              },
            ],
          },
        },
      },
      windows: {
        abc123: {
          manifestId: 'mid',
        },
      },
    };

    expect(
      getAnnotationResourcesByMotivationForCanvas(state, {
        canvasId: 'cid2',
        motivations: ['something', 'oa:commenting'],
        windowId: 'abc123',
      }).map((r) => r.motivations),
    ).toEqual(expected);
  });
});

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

it('getSelectedAnnotationId returns the selected annotation ID from state', () => {
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
        canvasId: 'canvas1',
        manifestId: 'mid',
        selectedAnnotationId: 'aid1',
        visibleCanvases: ['tid1'],
      },
    },
  };

  expect(getSelectedAnnotationId(state, { windowId: 'wid' })).toEqual('aid1');
});

it('returns all annotation resources when no motivations are passed and config.filteredMotivations is empty', async () => {
  const state = {
    config: {
      annotations: {
        filteredMotivations: [], // Empty array
        htmlSanitizationRuleSet: 'iiif',
      },
    },
    iiifApi: await buildIiifApiState([
      {
        annotationId: 'annoId1',
        json: {
          resources: [
            { '@id': 'annoId1', motivations: ['oa:commenting'] },
            { '@id': 'annoId2', motivations: ['oa:not-commenting'] },
            { '@id': 'annoId3', motivations: ['sc:something-else', 'oa:commenting'] },
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
              canvases: [{ '@id': 'cid1' }],
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

  // Ask for resources with no motivations provided
  const result = getAnnotationResourcesByMotivation(state, { windowId: 'abc123' });

  // Returns all three resources
  expect(result).toHaveLength(3);
  const resourceIds = result.map((r) => r.resource['@id']);
  expect(resourceIds).toEqual(['annoId1', 'annoId2', 'annoId3']);
});
