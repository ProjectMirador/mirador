import { responseToHits } from '../../../src/lib/ContentSearch';

/** a Content Search 1 hit */
function v1Hit(args = {}) {
  return {
    '@type': 'search:Hit',
    after: ' flew away',
    annotations: ['http://example.com/search/anno/1'],
    before: 'a ',
    match: 'bird',
    ...args,
  };
}

/** a Content Search 2 hit annotation */
function v2Hit(args = {}) {
  const { source = 'http://example.com/anno/1', ...selector } = args;

  return {
    id: 'http://example.com/search/anno/1',
    motivation: 'highlighting',
    target: {
      selector: [
        {
          exact: 'bird',
          prefix: 'a ',
          suffix: ' flew away',
          type: 'TextQuoteSelector',
          ...selector,
        },
      ],
      source,
      type: 'SpecificResource',
    },
    type: 'Annotation',
  };
}

describe('ContentSearch', () => {
  describe('responseToHits', () => {
    describe('with non-iiif responses', () => {
      it('returns an empty array for a missing response', () => {
        expect(responseToHits(undefined)).toEqual([]);
        expect(responseToHits(null)).toEqual([]);
      });

      it('returns an empty array while the response is still fetching', () => {
        expect(responseToHits({ hits: [v1Hit()], isFetching: true })).toEqual([]);
      });

      it('returns an empty array for a response with neither hits nor annotations', () => {
        expect(responseToHits({ resources: [] })).toEqual([]);
      });

      it('returns the same (stable) empty array every time', () => {
        expect(responseToHits(undefined)).toBe(responseToHits({}));
      });
    });

    describe('with a Content Search 1 response', () => {
      it('adds an annotationId from the first annotation of each hit', () => {
        expect(responseToHits({ hits: [v1Hit()] })).toEqual([
          {
            '@type': 'search:Hit',
            after: ' flew away',
            annotationId: 'http://example.com/search/anno/1',
            annotations: ['http://example.com/search/anno/1'],
            before: 'a ',
            match: 'bird',
          },
        ]);
      });

      it('returns a hit for every hit in the response', () => {
        const hits = responseToHits({
          hits: [v1Hit(), v1Hit({ annotations: ['http://example.com/search/anno/2'], match: 'birds' })],
        });

        expect(hits.map((hit) => hit.annotationId)).toEqual([
          'http://example.com/search/anno/1',
          'http://example.com/search/anno/2',
        ]);
      });

      it('returns an empty array for a response with no hits', () => {
        expect(responseToHits({ hits: [] })).toEqual([]);
      });
    });

    describe('with a Content Search 2 response', () => {
      it('converts the text quote selector into match/before/after', () => {
        expect(responseToHits({ annotations: [{ items: [v2Hit()] }] })).toEqual([
          {
            after: ' flew away',
            annotationId: 'http://example.com/anno/1',
            before: 'a ',
            match: 'bird',
          },
        ]);
      });

      it('flattens the hits of every annotation page', () => {
        const hits = responseToHits({
          annotations: [
            { items: [v2Hit(), v2Hit({ source: 'http://example.com/anno/2' })] },
            { items: [v2Hit({ source: 'http://example.com/anno/3' })] },
          ],
        });

        expect(hits.map((hit) => hit.annotationId)).toEqual([
          'http://example.com/anno/1',
          'http://example.com/anno/2',
          'http://example.com/anno/3',
        ]);
      });

      it('uses the first selector when a target has several', () => {
        const hit = v2Hit();
        hit.target.selector.push({ exact: 'ignored', type: 'TextQuoteSelector' });

        expect(responseToHits({ annotations: [{ items: [hit] }] })[0].match).toEqual('bird');
      });

      it('leaves before/after undefined when the selector has no prefix/suffix', () => {
        const hit = v2Hit();
        delete hit.target.selector[0].prefix;
        delete hit.target.selector[0].suffix;

        expect(responseToHits({ annotations: [{ items: [hit] }] })).toEqual([
          {
            after: undefined,
            annotationId: 'http://example.com/anno/1',
            before: undefined,
            match: 'bird',
          },
        ]);
      });

      it('returns an empty array for a response with no annotations', () => {
        expect(responseToHits({ annotations: [] })).toEqual([]);
        expect(responseToHits({ annotations: [{ items: [] }] })).toEqual([]);
      });
    });
  });
});
