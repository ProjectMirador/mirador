import { createApi } from '@reduxjs/toolkit/query/react';
import { Utils } from 'manifesto.js';
import fetchWithReauth from './fetchInfoResponseWithReauth';

/**
 * manifesto.js's Utils.getServices mutates its resource's .service array in place
 * at every nested/recursive level.
 * RTK Query's Immer-backed slice deep-freezes anything reachable from a cache entry.
 * This was causing a conflict in development (NODE_ENV=production does not have this behavior).
 * This method creates a fresh clone of the whole thing.
 */
function toMutableIiifResource(resource) {
  if (resource.__jsonld) {
    const parentResource = resource.options && resource.options.resource;
    const options =
      parentResource && parentResource !== resource
        ? { ...resource.options, resource: toMutableIiifResource(parentResource) }
        : resource.options;
    return { ...resource, __jsonld: structuredClone(resource.__jsonld), options };
  }
  return { ...structuredClone(resource), options: {} };
}

/** Returns every token service id a resource (or a degraded response's json) names, for tagging. */
export function tokenServiceIds(resource) {
  if (!resource) return [];
  return Utils.getServices(toMutableIiifResource(resource))
    .map((s) => Utils.getService(s, 'http://iiif.io/api/auth/1/token') || Utils.getService(s, 'http://iiif.io/api/auth/0/token'))
    .filter(Boolean)
    .map((s) => s.id);
}

/**
 * This minimal demo never has a cached token to offer -- no getAccessToken
 * endpoint, no login UI. fetchWithReauth still needs *a* findAccessToken
 * function (it's how it discovers which token service a 401 names, for
 * tagging), it just never finds a usable one, so every auth-gated resource
 * comes back as a tagged "degraded" error instead of actually retrying
 * with a token.
 */
function findAccessToken() {
  return undefined;
}

/**
 * RTK Query layer for IIIF resource fetches -- getInfoResponse only, for
 * this demo. See fetchInfoResponseWithReauth.js for the retry/degraded
 * logic. Imports createApi from the /react entrypoint so endpoints get
 * auto-generated hooks (useGetInfoResponseQuery) for use directly from
 * hooks-based containers.
 */
export const iiifApi = createApi({
  reducerPath: 'iiifApi',
  tagTypes: ['TokenService'],
  endpoints: (builder) => ({
    getInfoResponse: builder.query({
      serializeQueryArgs: ({ queryArgs }) => queryArgs.infoId,
      async queryFn({ infoId, imageResource }, { getState }) {
        const iiifResourceHint = imageResource ?? iiifApi.endpoints.getInfoResponse.select({ infoId })(getState())?.data;
        const url = `${infoId.replace(/\/$/, '')}/info.json`;
        return fetchWithReauth(url, iiifResourceHint, findAccessToken);
      },
      providesTags: (result, error) =>
        (error ? [error.tokenServiceId] : tokenServiceIds(result)).filter(Boolean).map((id) => ({ type: 'TokenService', id })),
    }),
  }),
});

export const { useGetInfoResponseQuery } = iiifApi;
