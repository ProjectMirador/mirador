import AnnotationResource from '../../../src/lib/AnnotationResource';
import { Utils } from 'manifesto.js';

describe('AnnotationResource', () => {
  describe('id', () => {
    it('returns the @id', () => {
      expect(new AnnotationResource({ '@id': 'foo' }).id).toEqual('foo');
    });
    it('creates a memoized uuid', () => {
      const annoResource = new AnnotationResource();
      const expected = annoResource.id;
      expect(annoResource.id).toEqual(expected);
    });
    it('handles the case where an id is only present in the resource', () => {
      expect(new AnnotationResource({ resource: [{ '@id': 'bar' }] }).id).toEqual('bar');
    });
  });

  describe('isOnlyTag', () => {
    it('when the only motivation is tagging', () => {
      expect(new AnnotationResource({ motivation: 'oa:tagging' }).isOnlyTag()).toBe(true);
    });
    it('when there are other motivations besides tagging', () => {
      expect(new AnnotationResource({ motivation: ['oa:commenting', 'oa:tagging'] }).isOnlyTag()).toBe(false);
    });
  });

  describe('tags', () => {
    it('when only motivation', () => {
      expect(
        new AnnotationResource({
          resource: [
            { '@type': 'oa:Tag', chars: 'yo' },
            { '@type': 'oa:Tag', chars: 'lo' },
          ],
        }).tags,
      ).toEqual(['yo', 'lo']);
    });
    it('when multiple motivations', () => {
      expect(
        new AnnotationResource({
          motivation: ['oa:commenting', 'oa:tagging'],
          resource: [
            { '@type': 'oa:commenting', chars: 'yo' },
            { '@type': 'oa:Tag', chars: 'lo' },
          ],
        }).tags,
      ).toEqual(['lo']);
    });
  });

  describe('targetId', () => {
    it('removes fragmentSelector coords from string targets', () => {
      expect(new AnnotationResource({ on: 'www.example.com/#xywh=10,10,100,200' }).targetId).toEqual('www.example.com/');
    });

    it('can target an array of selectors', () => {
      expect(new AnnotationResource({ on: [{ full: 'www.example.com/#xywh=10,10,100,200' }] }).targetId).toEqual(
        'www.example.com/',
      );
    });

    it('removes fragmentSelector coords from object targets', () => {
      expect(new AnnotationResource({ on: { full: 'www.example.com/#xywh=10,10,100,200' } }).targetId).toEqual(
        'www.example.com/',
      );
    });

    it('returns null when there is no target', () => {
      expect(new AnnotationResource().targetId).toBeNull();
    });
  });

  describe('motivations', () => {
    it('with no motivation', () => {
      expect(new AnnotationResource().motivations).toEqual([]);
    });
    it('with a single motivation', () => {
      expect(new AnnotationResource({ motivation: 'oa:commenting' }).motivations).toEqual(['oa:commenting']);
    });
    it('with multiple motivations', () => {
      expect(new AnnotationResource({ motivation: ['oa:commenting', 'sc:funstuff'] }).motivations).toEqual([
        'oa:commenting',
        'sc:funstuff',
      ]);
    });
  });
  describe('resources', () => {
    it('with no resource', () => {
      expect(new AnnotationResource().resources).toEqual([]);
    });
    it('with a single resource', () => {
      expect(new AnnotationResource({ resource: 'foo' }).resources).toEqual(['foo']);
    });
    it('with multiple resources', () => {
      expect(new AnnotationResource({ resource: ['foo', 'bar'] }).resources).toEqual(['foo', 'bar']);
    });
  });
  describe('on', () => {
    it('with no on', () => {
      expect(new AnnotationResource().on).toEqual([]);
    });
    it('with a single on', () => {
      expect(new AnnotationResource({ on: 'foo' }).on).toEqual(['foo']);
    });
    it('with multiple on', () => {
      expect(new AnnotationResource({ on: ['foo', 'bar'] }).on).toEqual(['foo', 'bar']);
    });
  });
  describe('selector', () => {
    it('returns the on string (for simple fragment selector)', () => {
      expect(new AnnotationResource({ on: 'yolo' }).selector).toEqual('yolo');
    });
    it('picks the default selector when given a choice', () => {
      expect(
        new AnnotationResource({
          on: {
            selector: {
              '@type': 'oa:Choice',
              default: { value: 'www.example.com/#xywh=10,10,100,200' },
            },
          },
        }).selector,
      ).toEqual({ value: 'www.example.com/#xywh=10,10,100,200' });
    });
    it('returns the selector when not given a choice', () => {
      expect(
        new AnnotationResource({
          on: { selector: { value: 'www.example.com/#xywh=10,10,100,200' } },
        }).selector,
      ).toEqual({ value: 'www.example.com/#xywh=10,10,100,200' });
    });
    it('percentage selector', () => {
      const canvas = Utils.parseManifest({
        '@context': 'http://iiif.io/api/presentation/2/context.json',
        '@id': 'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
        '@type': 'sc:Manifest',
        sequences: [
          {
            canvases: [
              {
                '@id': 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json',
                height: 1800,
                width: 1200,
                images: [
                  {
                    resource: {
                      height: 3820,
                      width: 5426,
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
      expect(
        new AnnotationResource(
          {
            on: { selector: 'http://iiif.io/api/presentation/2.0/example/fixtures/canvas/24/c1.json#xywh=percent:10,10,100,200' },
          },
          canvas.getSequences()[0].getCanvases()[0],
        ).fragmentSelector,
      ).toEqual([120, 180, 1200, 3600]);
    });
  });
  describe('chars', () => {
    it('with no resource', () => {
      expect(new AnnotationResource().chars).toEqual('');
    });
    it('with a single resource', () => {
      expect(new AnnotationResource({ resource: { chars: 'foo' } }).chars).toEqual('foo');
    });
    it('with multiple resources', () => {
      expect(new AnnotationResource({ resource: [{ chars: 'foo' }, { chars: 'bar' }] }).chars).toEqual('foo bar');
    });
  });
  describe('fragmentSelector', () => {
    it('simple string', () => {
      expect(new AnnotationResource({ on: 'www.example.com/#xywh=10,10,100,200' }).fragmentSelector).toEqual([10, 10, 100, 200]);
    });

    it('array of selectors', () => {
      expect(
        new AnnotationResource({
          on: [{ selector: { value: 'www.example.com/#xywh=10,10,100,200' } }],
        }).fragmentSelector,
      ).toEqual([10, 10, 100, 200]);
    });

    it('more complex selector', () => {
      expect(
        new AnnotationResource({
          on: { selector: { value: 'www.example.com/#xywh=10,10,100,200' } },
        }).fragmentSelector,
      ).toEqual([10, 10, 100, 200]);
    });

    it('choice selector', () => {
      expect(
        new AnnotationResource({
          on: {
            selector: {
              '@type': 'oa:Choice',
              default: { value: 'www.example.com/#xywh=10,10,100,200' },
            },
          },
        }).fragmentSelector,
      ).toEqual([10, 10, 100, 200]);
    });

    it('url without a fragment', () => {
      expect(new AnnotationResource({ on: { selector: { value: 'www.example.com' } } }).fragmentSelector).toEqual(null);
    });
  });
  describe('svgSelector', () => {
    it('simple string', () => {
      expect(new AnnotationResource({ on: 'www.example.com/#xywh=10,10,100,200' }).svgSelector).toEqual(null);
    });

    it('array of selectors', () => {
      expect(new AnnotationResource({ on: [{ selector: { item: { '@type': 'oa:SvgSelector' } } }] }).svgSelector).toEqual({
        '@type': 'oa:SvgSelector',
      });
    });

    it('without specified type', () => {
      expect(new AnnotationResource({ on: [{ selector: { item: {} } }] }).svgSelector).toEqual(null);
    });
  });
});
