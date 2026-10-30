import { createApi } from '@reduxjs/toolkit/query';
import iiifBaseQuery from './iiifBaseQuery';

/**
 * RTK Query layer for IIIF resource fetches.
 *
 * `targetId` is in the query arg purely so getAnnotations
 * (selectors/annotations.js) can regroup the cache by canvas; it's not used
 * for the fetch itself.
 */
export const iiifApi = createApi({
  reducerPath: 'iiifApi',
  baseQuery: iiifBaseQuery(),
  endpoints: (builder) => ({
    getAnnotation: builder.query({
      query: ({ annotationId }) => annotationId,
    }),
    getSearchResponse: builder.query({
      query: ({searchId}) => searchId
    })
  }),
});
