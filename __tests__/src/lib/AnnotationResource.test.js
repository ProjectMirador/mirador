import AnnotationResource from '../../../src/lib/AnnotationResource';

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
  });
  describe('motivations', () => {
    it('with no motivation', () => {
      expect(new AnnotationResource().motivations).toEqual([]);
    });
    it('with a single motivation', () => {
      expect(new AnnotationResource({ motivation: 'oa:commenting' })
        .motivations).toEqual(['oa:commenting']);
    });
    it('with multiple motivations', () => {
      expect(new AnnotationResource({ motivation: ['oa:commenting', 'sc:funstuff'] })
        .motivations).toEqual(['oa:commenting', 'sc:funstuff']);
    });
  });
  describe('resources', () => {
    it('with no resource', () => {
      expect(new AnnotationResource().resources).toEqual([]);
    });
    it('with a single resource', () => {
      expect(new AnnotationResource({ resource: 'foo' })
        .resources).toEqual(['foo']);
    });
    it('with multiple resources', () => {
      expect(new AnnotationResource({ resource: ['foo', 'bar'] })
        .resources).toEqual(['foo', 'bar']);
    });
  });
  describe('chars', () => {
    it('with no resource', () => {
      expect(new AnnotationResource().chars).toEqual('');
    });
    it('with a single resource', () => {
      expect(new AnnotationResource({ resource: { chars: 'foo' } })
        .chars).toEqual('foo');
    });
    it('with multiple resources', () => {
      expect(new AnnotationResource({ resource: [{ chars: 'foo' }, { chars: 'bar' }] })
        .chars).toEqual('foo bar');
    });
  });
  describe('fragmentSelector', () => {
    it('simple string', () => {
      expect(new AnnotationResource({ on: 'www.example.com/#xywh=10,10,100,200' })
        .fragmentSelector).toEqual([10, 10, 100, 200]);
    });
    it('more complex selector', () => {
      expect(new AnnotationResource({ on: { selector: { value: 'www.example.com/#xywh=10,10,100,200' } } })
        .fragmentSelector).toEqual([10, 10, 100, 200]);
    });
  });
});
