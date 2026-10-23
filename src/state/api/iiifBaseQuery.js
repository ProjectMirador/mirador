import { getRequestsConfig } from '../selectors';

/**
 * Shared RTK Query baseQuery for plain (non-auth) IIIF resource fetches --
 * applies the plugin-configurable config.requests.preprocessors, then fetches
 * and parses JSON. Mirrors fetchWrapper/fetchIiifResource's handling: a 401
 * has no retry path here (that's fetchIiifResourceWithAuth's job, for
 * resources that actually need auth), so it's treated as a successful
 * response with whatever body came back.
 */
export default function iiifBaseQuery() {
  return async (url, { getState }) => {
    const { preprocessors = [] } = getRequestsConfig(getState());
    const reqOptions = preprocessors.reduce((acc, f) => f(url, acc) || acc, {});

    let response;
    try {
      response = await fetch(url, reqOptions);
    } catch (error) {
      return { error: { data: String(error) } };
    }

    let json;
    try {
      json = await response.json();
    } catch (error) {
      if (!response.ok) {
        return { error: { data: `${response.status} ${response.statusText}: ${url}` } };
      }
      return { error: { data: String(error) } };
    }

    if (!response.ok && response.status !== 401) {
      return { error: { data: response.statusText } };
    }

    return { data: json };
  };
}
