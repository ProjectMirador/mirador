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
import { server, useMsw } from '../../mocks/server';

describe('IIIF sagas', () => {
  useMsw();
  describe('fetchManifest', () => {
    it('fetches a IIIF manifest', () => {
      server.use(http.get('http://server/prefix/manifestId', () => HttpResponse.json({ data: '12345' }), { once: true }));
      const action = {
        manifestId: 'http://server/prefix/manifestId',
      };

      return expectSaga(fetchManifest, action)
        .provide([[select(getConfig), {}]])
        .put({
          manifestId: 'http://server/prefix/manifestId',
          manifestJson: { data: '12345' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });

    it('handles failures', () => {
      server.use(http.get('http://server/prefix/manifestId', () => HttpResponse.html('<h1>Not Json</h1>'), { once: true }));
      const action = {
        manifestId: 'http://server/prefix/manifestId',
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
          'http://server/prefix/manifestId',
          () =>
            HttpResponse.text('404 Not Found\n\nFailed to resolve jpeg/333026 to /jp2/jpeg/333026.jp2', {
              status: 404,
              statusText: 'Not Found',
            }),
          { once: true },
        ),
      );

      const action = {
        manifestId: 'http://server/prefix/manifestId',
      };

      return expectSaga(fetchManifest, action)
        .provide([[select(getConfig), {}]])
        .put({
          error: '404 Not Found: http://server/prefix/manifestId',
          manifestId: 'http://server/prefix/manifestId',
          type: 'mirador/RECEIVE_MANIFEST_FAILURE',
        })
        .run();
    });

    it('supports request configuration preprocessors', () => {
      server.use(
        http.get(
          'http://server/prefix/manifestId',
          ({ request }) => HttpResponse.json({ data: request.headers.get('customheader') }),
          { once: true },
        ),
      );
      const action = {
        manifestId: 'http://server/prefix/manifestId',
      };

      return expectSaga(fetchManifest, action)
        .provide([
          [
            select(getRequestsConfig),
            {
              preprocessors: [(url, options) => ({ ...options, headers: { CustomHeader: 'config injected' } })],
            },
          ],
        ])
        .put({
          manifestId: 'http://server/prefix/manifestId',
          manifestJson: { data: 'config injected' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });

    it('supports response postprocessors', () => {
      server.use(
        http.get(
          'http://server/prefix/manifestId',
          ({ request }) => HttpResponse.json({ data: request.headers.get('customheader') }),
          { once: true },
        ),
      );
      const action = {
        manifestId: 'http://server/prefix/manifestId',
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
          manifestId: 'http://server/prefix/manifestId',
          manifestJson: { foo: 'modified!' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });
  });

  describe('fetchInfoResponse', () => {
    it('fetches a IIIF info response', () => {
      server.use(
        http.get('http://server/prefix/infoId/info.json', () => HttpResponse.json({ id: 'http://server/prefix/infoId' }), {
          once: true,
        }),
      );

      const action = {
        imageResource: {},
        infoId: 'http://server/prefix/infoId',
      };

      return expectSaga(fetchInfoResponse, action)
        .put({
          infoId: 'http://server/prefix/infoId',
          infoJson: { id: 'http://server/prefix/infoId' },
          ok: true,
          tokenServiceId: undefined,
          type: 'mirador/RECEIVE_INFO_RESPONSE',
        })
        .run();
    });

    it('retrieves any previous IIIF info response to try any applicable access tokens', () => {
      server.use(
        http.get('http://server/prefix/infoId/info.json', () => HttpResponse.json({ id: 'http://server/prefix/infoId' }), {
          once: true,
        }),
      );

      const action = {
        infoId: 'http://server/prefix/infoId',
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
          [select(selectInfoResponse, { infoId: 'http://server/prefix/infoId' }), infoResponse],
          [
            select(getAccessTokens),
            {
              'https://authentication.example.org/token': { id: 'x', json: { accessToken: '123' } },
            },
          ],
        ])
        .put({
          infoId: 'http://server/prefix/infoId',
          infoJson: { id: 'http://server/prefix/infoId' },
          ok: true,
          tokenServiceId: 'x',
          type: 'mirador/RECEIVE_INFO_RESPONSE',
        })
        .run();
    });

    it('ignores IIIF Auth 2.0 services (which may lack a profile) and uses the v1 access token', () => {
      server.use(
        http.get('http://server/prefix/infoId/info.json', () => HttpResponse.json({ id: 'http://server/prefix/infoId' }), {
          once: true,
        }),
      );

      const action = {
        infoId: 'http://server/prefix/infoId',
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
          [select(selectInfoResponse, { infoId: 'http://server/prefix/infoId' }), infoResponse],
          [
            select(getAccessTokens),
            {
              'https://authentication.example.org/token': { id: 'x', json: { accessToken: '123' } },
            },
          ],
        ])
        .put({
          infoId: 'http://server/prefix/infoId',
          infoJson: { id: 'http://server/prefix/infoId' },
          ok: true,
          tokenServiceId: 'x',
          type: 'mirador/RECEIVE_INFO_RESPONSE',
        })
        .run();
    });

    it('handles failed requests', () => {
      server.use(
        http.get('http://server/prefix/infoId/info.json', () => HttpResponse.html('<h1>Not Found</h1>'), { once: true }),
      );
      const action = {
        imageResource: {},
        infoId: 'http://server/prefix/infoId',
      };

      return expectSaga(fetchInfoResponse, action).put.actionType('mirador/RECEIVE_INFO_RESPONSE_FAILURE').run();
    });

    it('handles degraded requests', () => {
      server.use(
        http.get('http://server/prefix/infoId/info.json', () => HttpResponse.json({ id: 'http://server/prefix/otherInfoId' }), {
          once: true,
        }),
      );

      const action = {
        imageResource: {},
        infoId: 'http://server/prefix/infoId',
        windowId: 'window',
      };

      return expectSaga(fetchInfoResponse, action)
        .put({
          infoId: 'http://server/prefix/infoId',
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
        http.get('http://server/prefix/infoId/info.json', () => HttpResponse.json(degradedInfoResponse), { once: true }),
        http.get('http://server/prefix/infoId/info.json', () => HttpResponse.json({ id: 'http://server/prefix/infoId' }), {
          once: true,
        }),
      );
      const action = {
        imageResource: {},
        infoId: 'http://server/prefix/infoId',
      };

      return expectSaga(fetchInfoResponse, action)
        .provide([
          [select(selectInfoResponse, { infoId: 'http://server/prefix/infoId' }), undefined],
          [
            select(getAccessTokens),
            {
              'https://authentication.example.org/token': { id: 'x', json: { accessToken: '123' } },
            },
          ],
        ])
        .put({
          infoId: 'http://server/prefix/infoId',
          infoJson: { id: 'http://server/prefix/infoId' },
          ok: true,
          tokenServiceId: 'x',
          type: 'mirador/RECEIVE_INFO_RESPONSE',
        })
        .run();
    });
  });

  describe('fetchSearchResponse', () => {
    it('fetches a IIIF search', () => {
      server.use(http.get('http://server/prefix/searchId', () => HttpResponse.json({ data: '12345' }), { once: true }));

      const action = {
        companionWindowId: 'companionWindowId',
        query: 'q',
        searchId: 'http://server/prefix/searchId',
        windowId: 'windowId',
      };

      return expectSaga(fetchSearchResponse, action)
        .put({
          companionWindowId: 'companionWindowId',
          searchId: 'http://server/prefix/searchId',
          searchJson: { data: '12345' },
          type: 'mirador/RECEIVE_SEARCH',
          windowId: 'windowId',
        })
        .run();
    });

    it('handles failures', () => {
      server.use(http.get('http://server/prefix/searchId', () => HttpResponse.html('<h1>Not Json</h1>'), { once: true }));
      const action = {
        companionWindowId: 'companionWindowId',
        query: 'q',
        searchId: 'http://server/prefix/searchId',
        windowId: 'windowId',
      };

      return expectSaga(fetchSearchResponse, action).put.actionType('mirador/RECEIVE_SEARCH_FAILURE').run();
    });
  });

  describe('fetchAnnotation', () => {
    it('fetches a IIIF annotation page', () => {
      server.use(http.get('http://server/prefix/annotationId', () => HttpResponse.json({ data: '12345' }), { once: true }));
      const action = {
        annotationId: 'http://server/prefix/annotationId',
        targetId: 'targetId',
      };

      return expectSaga(fetchAnnotation, action)
        .put({
          annotationId: 'http://server/prefix/annotationId',
          annotationJson: { data: '12345' },
          targetId: 'targetId',
          type: 'mirador/RECEIVE_ANNOTATION',
        })
        .run();
    });

    it('handles failures', () => {
      server.use(http.get('http://server/prefix/annotationId', () => HttpResponse.html('<h1>Not Json</h1>'), { once: true }));
      const action = {
        annotationId: 'http://server/prefix/annotationId',
        targetId: 'targetId',
      };

      return expectSaga(fetchAnnotation, action).put.actionType('mirador/RECEIVE_ANNOTATION_FAILURE').run();
    });
  });

  describe('fetchResourceManifest', () => {
    it('eagerly fetches the manifest for a resource', () => {
      server.use(http.get('http://server/prefix/manifestId', () => HttpResponse.json({ data: '12345' }), { once: true }));
      const action = {
        manifestId: 'http://server/prefix/manifestId',
      };

      return expectSaga(fetchResourceManifest, action)
        .provide([
          [select(getConfig), {}],
          [select(getManifests), {}],
        ])
        .put({
          manifestId: 'http://server/prefix/manifestId',
          manifestJson: { data: '12345' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });

    it('receives existing manifest data from the action', () => {
      const manifestJson = { data: '12345' };

      const action = {
        manifestId: 'manifestId',
        manifestJson,
      };

      return expectSaga(fetchResourceManifest, action)
        .put({
          manifestId: 'manifestId',
          manifestJson: { data: '12345' },
          type: 'mirador/RECEIVE_MANIFEST',
        })
        .run();
    });

    it('does nothing if the manifest is already present', () => {
      const action = {
        manifestId: 'manifestId',
      };

      return expectSaga(fetchResourceManifest, action)
        .provide([
          [select(getConfig), {}],
          [select(getManifests), { manifestId: {} }],
        ])
        .run()
        .then(({ allEffects }) => allEffects.length === 0);
    });
  });
});
