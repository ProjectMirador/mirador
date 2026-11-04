import { createApi } from '@reduxjs/toolkit/query';
import iiifBaseQuery from './iiifBaseQuery';

/**
 * RTK Query layer for IIIF resource fetches. Starts with just annotations
 * (the "clean fetch" case -- no auth/retry logic needed); other resources
 * (manifests, search) can move here later, reusing the same baseQuery.
 */
export const iiifApi = createApi({
  reducerPath: 'iiifApi',
  baseQuery: iiifBaseQuery(),
  endpoints: (builder) => ({
    getAnnotation: builder.query({
      query: ({ annotationId }) => annotationId,
    }),
  }),
});
