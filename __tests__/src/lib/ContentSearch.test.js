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
      it('normalizes a hit, keeping every referenced annotation', () => {
        expect(responseToHits({ hits: [v1Hit()] })).toEqual([
          {
            after: ' flew away',
            annotationIds: ['http://example.com/search/anno/1'],
            before: 'a ',
            firstAnnotationId: 'http://example.com/search/anno/1',
            match: 'bird',
          },
        ]);
      });

      // A hit can reference more than one annotation (e.g. a match spanning
      // adjacent annotated regions) -- keep all of them, don't collapse to
      // just the first.
      it('keeps every annotation a hit references, not just the first', () => {
        const hit = v1Hit({ annotations: ['http://example.com/search/anno/1', 'http://example.com/search/anno/2'] });

        expect(responseToHits({ hits: [hit] })[0].annotationIds).toEqual([
          'http://example.com/search/anno/1',
          'http://example.com/search/anno/2',
        ]);
      });

      it('returns a hit for every hit in the response', () => {
        const hits = responseToHits({
          hits: [v1Hit(), v1Hit({ annotations: ['http://example.com/search/anno/2'], match: 'birds' })],
        });

        expect(hits.map((hit) => hit.firstAnnotationId)).toEqual([
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
            annotationIds: ['http://example.com/anno/1'],
            before: 'a ',
            firstAnnotationId: 'http://example.com/anno/1',
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

        expect(hits.map((hit) => hit.firstAnnotationId)).toEqual([
          'http://example.com/anno/1',
          'http://example.com/anno/2',
          'http://example.com/anno/3',
        ]);
      });

      // An annotation can have more than one selector (e.g. it matches the
      // query in more than one place) -- produce one hit per selector
      // rather than only the first.
      it('produces one hit per selector when a target has several', () => {
        const hit = v2Hit();
        hit.target.selector.push({ exact: 'ignored bird', type: 'TextQuoteSelector' });

        const hits = responseToHits({ annotations: [{ items: [hit] }] });

        expect(hits.map((h) => h.match)).toEqual(['bird', 'ignored bird']);
        expect(hits.every((h) => h.firstAnnotationId === 'http://example.com/anno/1')).toBe(true);
      });

      it('leaves before/after undefined when the selector has no prefix/suffix', () => {
        const hit = v2Hit();
        delete hit.target.selector[0].prefix;
        delete hit.target.selector[0].suffix;

        expect(responseToHits({ annotations: [{ items: [hit] }] })).toEqual([
          {
            after: undefined,
            annotationIds: ['http://example.com/anno/1'],
            before: undefined,
            firstAnnotationId: 'http://example.com/anno/1',
            match: 'bird',
          },
        ]);
      });

      // A selector that isn't a TextQuoteSelector (e.g. a region-based
      // FragmentSelector) has no text preview to show -- that's a fact
      // about the data, not an error.
      it('leaves match/before/after undefined for a non-text selector', () => {
        const hit = v2Hit({ type: 'FragmentSelector', value: 'xywh=0,0,100,100' });
        delete hit.target.selector[0].exact;
        delete hit.target.selector[0].prefix;
        delete hit.target.selector[0].suffix;

        expect(responseToHits({ annotations: [{ items: [hit] }] })).toEqual([
          {
            after: undefined,
            annotationIds: ['http://example.com/anno/1'],
            before: undefined,
            firstAnnotationId: 'http://example.com/anno/1',
            match: undefined,
          },
        ]);
      });

      it('returns no hits for a target with no selector at all', () => {
        const hit = v2Hit();
        delete hit.target.selector;

        expect(responseToHits({ annotations: [{ items: [hit] }] })).toEqual([]);
      });

      it('returns an empty array for a response with no annotations', () => {
        expect(responseToHits({ annotations: [] })).toEqual([]);
        expect(responseToHits({ annotations: [{ items: [] }] })).toEqual([]);
      });
    });
  });
});
