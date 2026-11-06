export default {
  catalog: [
    { manifestId: 'https://damsssl.llgc.org.uk/iiif/2.0/4566425/manifest.json', provider: 'LLGC' },
    {
      manifestId: 'https://wellcomelibrary.org/iiif/b18035723/manifest',
      provider: 'Wellcome Library',
    },
    { manifestId: 'https://scta.info/iiif/graciliscommentary/lon/manifest', provider: 'SCTA' },
    { manifestId: 'https://purl.stanford.edu/zx429wp8334/iiif/manifest', provider: 'SUL' },
  ],
  id: 'mirador',
  windows: [
    {
      manifestId: 'https://iiif.wellcomecollection.org/presentation/v2/b18035723',
      // defaultSearchQuery: 'NSF',
      suggestedSearches: ['Form'],
    },
    {
      manifestId: 'https://iiif.wellcomecollection.org/presentation/v2/b18035723',
      suggestedSearches: ['Form'],
    },
  ],
};
