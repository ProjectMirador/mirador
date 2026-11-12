export const contentSearchMock = {
  '@context': ['http://iiif.io/api/presentation/2/context.json', 'http://iiif.io/api/search/1/context.json'],
  '@id': 'https://contentsearch.stanford.edu/fg165hz3589/search?q=dry+cleaning+%26+laundry',
  '@type': 'sc:AnnotationList',
  resources: [
    {
      '@id': 'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2/text/at/452,1505,68,39',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      resource: {
        '@type': 'cnt:ContentAsText',
        chars: 'Dry',
      },
      on: 'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2#xywh=452,1505,68,39',
    },
    {
      '@id': 'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2/text/at/552,1503,196,41',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      resource: {
        '@type': 'cnt:ContentAsText',
        chars: 'Cleaning',
      },
      on: 'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2#xywh=552,1503,196,41',
    },
    {
      '@id': 'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2/text/at/828,1503,170,41',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      resource: {
        '@type': 'cnt:ContentAsText',
        chars: 'Laundry',
      },
      on: 'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2#xywh=828,1503,170,41',
    },
    {
      '@id': 'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2/text/at/677,1604,171,44',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      resource: {
        '@type': 'cnt:ContentAsText',
        chars: 'Laundry',
      },
      on: 'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2#xywh=677,1604,171,44',
    },
  ],
  hits: [
    {
      '@type': 'search:Hit',
      annotations: [
        'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2/text/at/452,1505,68,39',
        'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2/text/at/552,1503,196,41',
      ],
      before:
        ". HOURS OF OPERATION OF BASE FACILITIES: Consolidated Officer's Mess (CLOSED) - (Officer's Club bar) Monday - Thursday 1600-1900 Friday 1600-0100 Saturday 2000-2400 Sunday Closed",
      after:
        "\u0026 Laundry - (Located at side of Medical Building) Taylor's Laundry Depot 0830-1600 (Mon-Fri) Navy Exchange \u0026 Barber Shop Monday - Friday 0900-1600 Navy Exchange Commissary Store Monday - Friday 0900-1300 Post Office - (U. S. Navy) Monday - Friday 0930-1130 1300-1500 Saturday 0930-1100 Note: Mail closes out Monday, Thursday, Friday and Saturday at 1000. Stateside mail arrives Monday, Wednesday, Thursday and Sunday.",
      match: 'Dry Cleaning',
    },
    {
      '@type': 'search:Hit',
      annotations: [
        'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2/text/at/828,1503,170,41',
      ],
      before:
        ". HOURS OF OPERATION OF BASE FACILITIES: Consolidated Officer's Mess (CLOSED) - (Officer's Club bar) Monday - Thursday 1600-1900 Friday 1600-0100 Saturday 2000-2400 Sunday Closed Dry Cleaning \u0026",
      after:
        "- (Located at side of Medical Building) Taylor's Laundry Depot 0830-1600 (Mon-Fri) Navy Exchange \u0026 Barber Shop Monday - Friday 0900-1600 Navy Exchange Commissary Store Monday - Friday 0900-1300 Post Office - (U. S. Navy) Monday - Friday 0930-1130 1300-1500 Saturday 0930-1100 Note: Mail closes out Monday, Thursday, Friday and Saturday at 1000. Stateside mail arrives Monday, Wednesday, Thursday and Sunday.",
      match: 'Laundry',
    },
    {
      '@type': 'search:Hit',
      annotations: [
        'https://purl.stanford.edu/fg165hz3589/iiif/canvas/cocina-fileSet-fg165hz3589-fg165hz3589_2/text/at/677,1604,171,44',
      ],
      before:
        ". HOURS OF OPERATION OF BASE FACILITIES: Consolidated Officer's Mess (CLOSED) - (Officer's Club bar) Monday - Thursday 1600-1900 Friday 1600-0100 Saturday 2000-2400 Sunday Closed Dry Cleaning \u0026 Laundry - (Located at side of Medical Building) Taylor's",
      after:
        'Depot 0830-1600 (Mon-Fri) Navy Exchange \u0026 Barber Shop Monday - Friday 0900-1600 Navy Exchange Commissary Store Monday - Friday 0900-1300 Post Office - (U. S. Navy) Monday - Friday 0930-1130 1300-1500 Saturday 0930-1100 Note: Mail closes out Monday, Thursday, Friday and Saturday at 1000. Stateside mail arrives Monday, Wednesday, Thursday and Sunday.',
      match: 'Laundry',
    },
  ],
  within: {
    '@type': 'sc:Layer',
    first: 'https://contentsearch.stanford.edu/fg165hz3589/search?start=0',
    last: 'https://contentsearch.stanford.edu/fg165hz3589/search?start=0',
    ignored: [],
  },
};
