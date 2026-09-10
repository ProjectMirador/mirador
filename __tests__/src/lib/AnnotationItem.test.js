import AnnotationItem from '../../../src/lib/AnnotationItem';
import svgAnnotations from '../../fixtures/version-3/svg-annotations.json';
import { Utils } from 'manifesto.js';

describe('AnnotationItem', () => {
  describe('id', () => {
    it('returns the id', () => {
      expect(new AnnotationItem({ id: 'foo' }).id).toEqual('foo');
    });
    it('creates a memoized uuid', () => {
      const annoResource = new AnnotationItem();
      const expected = annoResource.id;
      expect(annoResource.id).toEqual(expected);
    });
  });

  describe('isOnlyTag', () => {
    it('when the only motivation is tagging', () => {
      expect(new AnnotationItem({ motivation: 'tagging' }).isOnlyTag()).toBe(true);
    });
    it('when there are other motivations besides tagging', () => {
      expect(new AnnotationItem({ motivation: ['commenting', 'tagging'] }).isOnlyTag()).toBe(false);
    });
  });

  describe('tags', () => {
    it('when only motivation', () => {
      expect(
        new AnnotationItem({
          body: [
            { purpose: 'tagging', value: 'yo' },
            { purpose: 'tagging', value: 'lo' },
          ],
        }).tags,
      ).toEqual(['yo', 'lo']);
    });
    it('when multiple motivations', () => {
      expect(
        new AnnotationItem({
          body: [
            { purpose: 'commenting', value: 'yo' },
            { purpose: 'tagging', value: 'lo' },
          ],
          motivation: ['commenting', 'tagging'],
        }).tags,
      ).toEqual(['lo']);
    });
    it('has mixed body types', () => {
      expect(
        new AnnotationItem({
          body: [{ purpose: 'tagging', value: 'yo' }, 'String body value'],
          motivation: 'tagging',
        }).tags,
      ).toEqual(['yo', 'String body value']);
    });
  });

  describe('targetId', () => {
    it('removes fragmentSelector coords from string targets', () => {
      expect(new AnnotationItem({ target: 'www.example.com/#xywh=10,10,100,200' }).targetId).toEqual('www.example.com/');
    });

    it('returns null when there is no target', () => {
      expect(new AnnotationItem().targetId).toBeNull();
    });

    it('supports a source id', () => {
      expect(new AnnotationItem({ target: { source: { id: 'foo' } } }).targetId).toEqual('foo');
    });
  });

  describe('motivations', () => {
    it('with no motivation', () => {
      expect(new AnnotationItem().motivations).toEqual([]);
    });
    it('with a single motivation', () => {
      expect(new AnnotationItem({ motivation: 'commenting' }).motivations).toEqual(['commenting']);
    });
    it('with multiple motivations', () => {
      expect(new AnnotationItem({ motivation: ['commenting', 'funstuff'] }).motivations).toEqual(['commenting', 'funstuff']);
    });
  });
  describe('resources/body', () => {
    it('with no body', () => {
      expect(new AnnotationItem().resources).toEqual([]);
      expect(new AnnotationItem().body).toEqual([]);
    });
    it('with a single body', () => {
      expect(new AnnotationItem({ body: 'foo' }).resources).toEqual(['foo']);
      expect(new AnnotationItem({ body: 'foo' }).body).toEqual(['foo']);
    });
    it('with multiple bodies', () => {
      expect(new AnnotationItem({ body: ['foo', 'bar'] }).resources).toEqual(['foo', 'bar']);
      expect(new AnnotationItem({ body: ['foo', 'bar'] }).body).toEqual(['foo', 'bar']);
    });
  });
  describe('target', () => {
    it('with no target', () => {
      expect(new AnnotationItem().target).toEqual([]);
    });
    it('with a single target', () => {
      expect(new AnnotationItem({ target: 'foo' }).target).toEqual(['foo']);
    });
    it('with multiple target', () => {
      expect(new AnnotationItem({ target: ['foo', 'bar'] }).target).toEqual(['foo', 'bar']);
    });
  });
  describe('selector', () => {
    it('returns the on string (for simple fragment selector)', () => {
      expect(new AnnotationItem({ target: 'yolo' }).selector).toEqual('yolo');
    });
    it('returns objects wrapped in an array', () => {
      expect(new AnnotationItem({ target: { selector: 'yolo' } }).selector).toEqual(['yolo']);
    });
    it('handles multiple selectors', () => {
      expect(new AnnotationItem({ target: { selector: ['yolo', 'foo'] } }).selector).toEqual(['yolo', 'foo']);
    });
  });
  describe('chars', () => {
    it('with no resource', () => {
      expect(new AnnotationItem().chars).toEqual('');
    });
    it('with a single body', () => {
      expect(new AnnotationItem({ body: { value: 'foo' } }).chars).toEqual('foo');
    });
    it('with a string body', () => {
      expect(new AnnotationItem({ body: 'foo' }).chars).toEqual('foo');
    });
    it('with multiple bodies', () => {
      expect(new AnnotationItem({ body: [{ value: 'foo' }, { value: 'bar' }] }).chars).toEqual('foo bar');
    });
    it('with choice bodies with no language set', () => {
      expect(
        new AnnotationItem({
          body: {
            items: [
              { language: 'en', value: 'foo' },
              { language: 'ja', value: 'bar' },
            ],
          },
        }).chars,
      ).toEqual('foo');
    });
    it('with choice bodies and language set', () => {
      expect(
        new AnnotationItem(
          {
            body: {
              items: [
                { language: 'en', value: 'foo' },
                { language: 'ja', value: 'bar' },
              ],
            },
          },
          '',
          'ja',
        ).chars,
      ).toEqual('bar');
    });
  });
  describe('fragmentSelector', () => {
    it('simple string', () => {
      expect(new AnnotationItem({ target: 'www.example.com/#xywh=10,10,100,200' }).fragmentSelector).toEqual([10, 10, 100, 200]);
    });
    it('multiple selectors', () => {
      expect(
        new AnnotationItem({
          target: { selector: [{ type: 'FragmentSelector', value: '#xywh=10,10,100,200' }] },
        }).fragmentSelector,
      ).toEqual([10, 10, 100, 200]);
    });
    it('percentage selector', () => {
      const canvas = Utils.parseManifest({
        '@context': 'http://iiif.io/api/presentation/3/context.json',
        id: 'https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json',
        type: 'Manifest',
        label: {
          en: ['Simplest Image Example (IIIF Presentation v3)'],
        },
        items: [
          {
            id: 'https://iiif.io/api/cookbook/recipe/0001-mvm-image/canvas/p1',
            type: 'Canvas',
            height: 1800,
            width: 1200,
            items: [
              {
                id: 'http://iiif.io/api/presentation/3.0/example/fixtures/canvas/24/c1.json',
                type: 'AnnotationPage',
                items: [
                  {
                    body: {
                      height: 10,
                      width: 20,
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
      expect(
        new AnnotationItem(
          { target: 'http://iiif.io/api/presentation/3.0/example/fixtures/canvas/24/c1.json#xywh=percent:10,10,100,200' },
          canvas.getSequences()[0].getCanvases()[0],
        ).fragmentSelector,
      ).toEqual([120, 180, 1200, 3600]);
    });
    it('url without a fragment', () => {
      expect(new AnnotationItem({ target: 'www.example.com' }).fragmentSelector).toEqual(null);
    });
  });
  describe('svgSelector', () => {
    it('simple string', () => {
      expect(new AnnotationItem({ target: 'www.example.com/#xywh=10,10,100,200' }).svgSelector).toEqual(null);
    });

    it('specified SvgSelector', () => {
      expect(new AnnotationItem({ target: { selector: { type: 'SvgSelector' } } }).svgSelector).toEqual({ type: 'SvgSelector' });
    });

    it('svg shape SvgSelector', () => {
      svgAnnotations.items.forEach((annotation) => {
        expect(new AnnotationItem(annotation).svgSelector.value).toContain('<svg ');
      });
    });

    it('without specified type', () => {
      expect(new AnnotationItem({ target: { selector: {} } }).svgSelector).toEqual(undefined);
    });
  });
});
