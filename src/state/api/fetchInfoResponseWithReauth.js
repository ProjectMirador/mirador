import normalizeUrl from 'normalize-url';

/**
 * TODO: investigate why is this needed
 * IIIF Image API identifiers are allowed to contain a percent-encoded
 * slash (e.g. Stanford's "nb647fd0133%2F640_001_R_TC_46"). normalize-url
 * doesn't decode that, but servers canonically return it decoded in their
 * own @id -- so without this, every such identifier's @id would never
 * string-match the URL we requested, and get misread as a failed request.
 */
function canonicalize(url) {
  return decodeURIComponent(normalizeUrl(url, { stripAuthentication: false }));
}

/**
 * Fetches a IIIF resource that may require Auth 1.0, attaching an optimistic
 * token if we already have one, and retrying once with a different token
 * service if the response names a different one. If no retry
 * resolves it, returns a 401 error -- the caller (iiifApi.js's queryFn) is
 * responsible for deciding what a 401 means for its own resource; this
 * function only knows how to fetch-with-reauth, not what a degraded
 * response should trigger downstream.
 *
 * `iiifResourceHint` is inspected for service links.
 */
export default async function fetchWithReauth(url, iiifResourceHint, findAccessToken, previousTokenServiceId = undefined) {
  let tokenServiceId = previousTokenServiceId;
  const headers = {};

  if (iiifResourceHint) {
    const tokenService = findAccessToken(iiifResourceHint);
    if (tokenService) {
      tokenServiceId = tokenService.id;
      headers.Authorization = `Bearer ${tokenService.accessToken}`;
    }
  }

  let response;
  let json;
  try {
    response = await fetch(url, { headers });
    json = await response.json();
  } catch (error) {
    return { error: { data: String(error), status: response?.status } };
  }

  const id = json['@id'] || json.id;
  if (response.ok && canonicalize(id) === canonicalize(url.replace(/info\.json$/, ''))) {
    return { data: json };
  }

  if (response.status !== 401) {
    return { error: { data: json, status: response.status } };
  }

  // The resource itself may name a different, more authoritative token
  // service than the one we guessed -- try that once
  const authoritativeTokenService = findAccessToken(json);
  if (authoritativeTokenService && authoritativeTokenService.id !== tokenServiceId) {
    return fetchWithReauth(url, json, findAccessToken, authoritativeTokenService.id);
  }

  // Exhausted what we can try automatically -- this is the "degraded"
  // outcome: a signal that interactive/kiosk auth
  // may be needed. Encoded as a 401 error so callers can distinguish it
  // from a real failure without a third RTK Query state to invent.
  return { error: { data: json, status: 401, tokenServiceId } };
}
