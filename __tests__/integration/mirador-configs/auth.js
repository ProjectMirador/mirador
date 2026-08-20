export default {
  id: 'mirador',
  windows: [
    {
      manifestId: 'https://purl.stanford.edu/ds199xg9454/iiif/manifest',
    },
    {
      // Wellcome Collection exercises the same auth mechanism as a real login form,
      // with a live clickthrough service instead of credentials-based auth.
      // This works best for a public demo as it is institution agnostic.
      manifestId: 'https://iiif.wellcomecollection.org/presentation/b19319174',
    },
    // TODO: find a public replacement manifest for the degraded flow
    // Wellcome Collections provides a manifest that can demo the standard auth flow (described above)
    // but we need to search for a comparable public degraded image example.
    // For now, use a Stanford image to at least demonstrate the degraded state,
    // even if non-Stanford public can't complete the flow.
    {
      manifestId: 'https://purl.stanford.edu/bb000cr7262/iiif/manifest',
    },
  ],
};
