import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import {
  fetchAnnotation,
  fetchManifest,
  fetchSearchResponse,
  fetchInfoResponse,
  fetchResourceManifest,
} from '../../../src/state/sagas/iiif';
import { getConfig, getManifests, selectInfoResponse, getAccessTokens, getRequestsConfig } from '../../../src/state/selectors';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';

describe('IIIF sagas', () => {
  const manifestId = 'http://server/prefix/manifestId';
  const searchId = 'http://server/prefix/searchId';
  const annotationId = 'http://server/prefix/annotationId';
  const infoId = 'http://server/prefix/infoId';
  const infoUrl = `${infoId}/info.json`;

  describe('fetchManifest', () => {
    it('fetches a IIIF manifest', () => {
      server.use(http.get(manifestId, () => HttpResponse.json({ data: '12345' }), { once: true }));
      const action = {
        manifestId,
      };

      return expectSaga(fetchManifest, action)
        .provide([[select(getConfig), {}]])
        .put({
          manifestId,
          manifestJson: { data: '12345' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });

    it('handles failures', () => {
      server.use(http.get(manifestId, () => HttpResponse.html('<h1>Not Json</h1>'), { once: true }));
      const action = {
        manifestId,
      };

      return expectSaga(fetchManifest, action)
        .provide([[select(getConfig), {}]])
        .put.actionType('mirador/RECEIVE_MANIFEST_FAILURE')
        .run();
    });

    it('uses the HTTP status instead of a JSON parsing error for a non-JSON error response body', () => {
      // e.g. a Cantaloupe 404 page, which is plain text, not JSON
      server.use(
        http.get(
          manifestId,
          () =>
            HttpResponse.text('404 Not Found\n\nFailed to resolve jpeg/333026 to /jp2/jpeg/333026.jp2', {
              status: 404,
              statusText: 'Not Found',
            }),
          { once: true },
        ),
      );

      const action = {
        manifestId,
      };

      return expectSaga(fetchManifest, action)
        .provide([[select(getConfig), {}]])
        .put({
          error: `404 Not Found: ${manifestId}`,
          manifestId,
          type: 'mirador/RECEIVE_MANIFEST_FAILURE',
        })
        .run();
    });

    it('supports request configuration preprocessors', async () => {
      let capturedHeaders;

      server.use(
        http.get(
          manifestId,
          ({ request }) => {
            capturedHeaders = request.headers;
            return HttpResponse.json({ data: 'manifest content' });
          },
          { once: true },
        ),
      );

      const action = {
        manifestId,
      };

      await expectSaga(fetchManifest, action)
        .provide([
          [
            select(getRequestsConfig),
            {
              preprocessors: [
                (url, options) => ({
                  ...options,
                  headers: { CustomHeader: 'config injected' },
                }),
              ],
            },
          ],
        ])
        .put({
          manifestId,
          manifestJson: { data: 'manifest content' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();

      expect(capturedHeaders?.get('customheader')).toBe('config injected');
    });

    it('supports response postprocessors', () => {
      server.use(http.get(manifestId, () => HttpResponse.json({ data: 'original content' }), { once: true }));

      const action = {
        manifestId,
      };

      return expectSaga(fetchManifest, action)
        .provide([
          [
            select(getRequestsConfig),
            {
              postprocessors: [
                (url, responseAction) => {
                  // eslint-disable-next-line no-param-reassign
                  responseAction.manifestJson = { foo: 'modified!' };
                },
              ],
            },
          ],
        ])
        .put({
          manifestId,
          manifestJson: { foo: 'modified!' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });
  });

  describe('fetchInfoResponse', () => {
    it('fetches a IIIF info response', () => {
      server.use(
        http.get(infoUrl, () => HttpResponse.json({ id: infoId }), {
          once: true,
        }),
      );

      const action = {
        imageResource: {},
        infoId,
      };

      return expectSaga(fetchInfoResponse, action)
        .put({
          infoId,
          infoJson: { id: infoId },
          ok: true,
          tokenServiceId: undefined,
          type: 'mirador/RECEIVE_INFO_RESPONSE',
        })
        .run();
    });

    it('retrieves any previous IIIF info response to try any applicable access tokens', () => {
      server.use(
        http.get(infoUrl, () => HttpResponse.json({ id: infoId }), {
          once: true,
        }),
      );

      const action = {
        infoId,
      };
      const infoResponse = {
        id: 'degradedInfoId',
        service: [
          {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': 'https://authentication.example.org/login',
            profile: 'http://iiif.io/api/auth/1/login',
            service: [
              {
                '@id': 'https://authentication.example.org/token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            ],
          },
        ],
      };

      return expectSaga(fetchInfoResponse, action)
        .provide([
          [select(selectInfoResponse, { infoId }), infoResponse],
          [
            select(getAccessTokens),
            {
              'https://authentication.example.org/token': { id: 'x', json: { accessToken: '123' } },
            },
          ],
        ])
        .put({
          infoId,
          infoJson: { id: infoId },
          ok: true,
          tokenServiceId: 'x',
          type: 'mirador/RECEIVE_INFO_RESPONSE',
        })
        .run();
    });

    it('ignores IIIF Auth 2.0 services (which may lack a profile) and uses the v1 access token', () => {
      server.use(
        http.get(infoUrl, () => HttpResponse.json({ id: infoId }), {
          once: true,
        }),
      );

      const action = {
        infoId,
      };
      const infoResponse = {
        id: 'degradedInfoId',
        service: [
          {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': 'https://authentication.example.org/login',
            profile: 'http://iiif.io/api/auth/1/login',
            service: [
              {
                '@id': 'https://authentication.example.org/token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            ],
          },
          {
            '@context': 'http://iiif.io/api/auth/2/context.json',
            id: 'https://authentication.example.org/probe',
            type: 'AuthProbeService2',
            service: [
              {
                id: 'https://authentication.example.org/login',
                type: 'AuthAccessService2',
                profile: 'active',
                service: [
                  {
                    id: 'https://authentication.example.org/v2/token',
                    type: 'AuthAccessTokenService2',
                  },
                ],
              },
            ],
          },
        ],
      };

      return expectSaga(fetchInfoResponse, action)
        .provide([
          [select(selectInfoResponse, { infoId }), infoResponse],
          [
            select(getAccessTokens),
            {
              'https://authentication.example.org/token': { id: 'x', json: { accessToken: '123' } },
            },
          ],
        ])
        .put({
          infoId,
          infoJson: { id: infoId },
          ok: true,
          tokenServiceId: 'x',
          type: 'mirador/RECEIVE_INFO_RESPONSE',
        })
        .run();
    });

    it('handles failed requests', () => {
      server.use(http.get(infoUrl, () => HttpResponse.html('<h1>Not Found</h1>'), { once: true }));
      const action = {
        imageResource: {},
        infoId,
      };

      return expectSaga(fetchInfoResponse, action).put.actionType('mirador/RECEIVE_INFO_RESPONSE_FAILURE').run();
    });

    it('handles degraded requests', () => {
      server.use(
        http.get(infoUrl, () => HttpResponse.json({ id: 'http://server/prefix/otherInfoId' }), {
          once: true,
        }),
      );

      const action = {
        imageResource: {},
        infoId,
        windowId: 'window',
      };

      return expectSaga(fetchInfoResponse, action)
        .put({
          infoId,
          infoJson: { id: 'http://server/prefix/otherInfoId' },
          ok: true,
          tokenServiceId: undefined,
          type: 'mirador/RECEIVE_DEGRADED_INFO_RESPONSE',
          windowId: 'window',
        })
        .run();
    });

    it('rerequests documents if the authoritative response suggests a different access token service', () => {
      const degradedInfoResponse = {
        id: 'http://server/prefix/degradedInfoId/info.json',
        service: [
          {
            '@context': 'http://iiif.io/api/auth/1/context.json',
            '@id': 'https://authentication.example.org/login',
            profile: 'http://iiif.io/api/auth/1/login',
            service: [
              {
                '@id': 'https://authentication.example.org/token',
                profile: 'http://iiif.io/api/auth/1/token',
              },
            ],
          },
        ],
      };

      server.use(
        http.get(infoUrl, () => HttpResponse.json(degradedInfoResponse), { once: true }),
        http.get(infoUrl, () => HttpResponse.json({ id: infoId }), {
          once: true,
        }),
      );
      const action = {
        imageResource: {},
        infoId,
      };

      return expectSaga(fetchInfoResponse, action)
        .provide([
          [select(selectInfoResponse, { infoId }), undefined],
          [
            select(getAccessTokens),
            {
              'https://authentication.example.org/token': { id: 'x', json: { accessToken: '123' } },
            },
          ],
        ])
        .put({
          infoId,
          infoJson: { id: infoId },
          ok: true,
          tokenServiceId: 'x',
          type: 'mirador/RECEIVE_INFO_RESPONSE',
        })
        .run();
    });
  });

  describe('fetchSearchResponse', () => {
    it('fetches a IIIF search', () => {
      server.use(http.get(searchId, () => HttpResponse.json({ data: '12345' }), { once: true }));

      const action = {
        companionWindowId: 'companionWindowId',
        query: 'q',
        searchId,
        windowId: 'windowId',
      };

      return expectSaga(fetchSearchResponse, action)
        .put({
          companionWindowId: 'companionWindowId',
          searchId,
          searchJson: { data: '12345' },
          type: 'mirador/RECEIVE_SEARCH',
          windowId: 'windowId',
        })
        .run();
    });

    it('handles failures', () => {
      server.use(http.get(searchId, () => HttpResponse.html('<h1>Not Json</h1>'), { once: true }));
      const action = {
        companionWindowId: 'companionWindowId',
        query: 'q',
        searchId,
        windowId: 'windowId',
      };

      return expectSaga(fetchSearchResponse, action).put.actionType('mirador/RECEIVE_SEARCH_FAILURE').run();
    });
  });

  describe('fetchAnnotation', () => {
    it('fetches a IIIF annotation page', () => {
      server.use(http.get(annotationId, () => HttpResponse.json({ data: '12345' }), { once: true }));
      const action = {
        annotationId,
        targetId: 'targetId',
      };

      return expectSaga(fetchAnnotation, action)
        .put({
          annotationId,
          annotationJson: { data: '12345' },
          targetId: 'targetId',
          type: 'mirador/RECEIVE_ANNOTATION',
        })
        .run();
    });

    it('handles failures', () => {
      server.use(http.get(annotationId, () => HttpResponse.html('<h1>Not Json</h1>'), { once: true }));
      const action = {
        annotationId,
        targetId: 'targetId',
      };

      return expectSaga(fetchAnnotation, action).put.actionType('mirador/RECEIVE_ANNOTATION_FAILURE').run();
    });
  });

  describe('fetchResourceManifest', () => {
    it('eagerly fetches the manifest for a resource', () => {
      server.use(http.get(manifestId, () => HttpResponse.json({ data: '12345' }), { once: true }));
      const action = {
        manifestId,
      };

      return expectSaga(fetchResourceManifest, action)
        .provide([
          [select(getConfig), {}],
          [select(getManifests), {}],
        ])
        .put({
          manifestId,
          manifestJson: { data: '12345' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });

    it('receives existing manifest data from the action', () => {
      const manifestJson = { data: '12345' };

      const action = {
        manifestId,
        manifestJson,
      };

      return expectSaga(fetchResourceManifest, action)
        .put({
          manifestId,
          manifestJson: { data: '12345' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });

    it('does nothing if the manifest is already present', () => {
      const action = {
        manifestId,
      };

      return expectSaga(fetchResourceManifest, action)
        .provide([
          [select(getConfig), {}],
          [select(getManifests), { [manifestId]: {} }],
        ])
        .run()
        .then(({ allEffects }) => allEffects.length === 0);
    });
  });
});
