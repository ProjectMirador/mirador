import { createApi } from '@reduxjs/toolkit/query/react';

/**
 * Minimal RTK Query API for this demo: just enough to fetch and cache
 * IIIF content search responses by resource identity (the search URL
 * itself), independent of which window/companion window is displaying
 * them. Search has no auth-retry concerns today, so this is a plain fetch
 * (unlike the info-response endpoint on the other demo branch).
 */
export const iiifApi = createApi({
  baseQuery: async (searchId) => {
    try {
      const response = await fetch(searchId);
      const json = await response.json();

      if (!response.ok) return { error: { data: json, status: response.status } };
      return { data: json };
    } catch (error) {
      return { error: { error: String(error), status: 'FETCH_ERROR' } };
    }
  },
  endpoints: (builder) => ({
    getSearchResponse: builder.query({
      query: (searchId) => searchId,
    }),
  }),
  reducerPath: 'iiifApi',
});

export const { useGetSearchResponseQuery } = iiifApi;
