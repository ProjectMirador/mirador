import Annotation from '../../../src/lib/Annotation';
import AnnotationResource from '../../../src/lib/AnnotationResource';

describe('Annotation', () => {
  describe('id', () => {
    it('returns the @id', () => {
      expect(new Annotation({ '@id': 'foo' }).id).toEqual('foo');
    });
  });
  describe('present', () => {
    it('checks for json', () => {
      expect(new Annotation().present()).toEqual(false);
    });
    it('checks for resources', () => {
      expect(new Annotation({ '@id': 'foo' }).present()).toEqual(false);
      expect(new Annotation({ resources: [] }).present()).toEqual(false);
    });
  });
  describe('resources', () => {
    it('maps resources to AnnotationResource', () => {
      new Annotation(
        { resources: [{ foo: 'bar' }] },
      ).resources.forEach(resource => expect(resource).toBeInstanceOf(AnnotationResource));
    });

    it('handles resources that are just a single object instead of an array of objects', () => {
      new Annotation(
        { resources: { foo: 'bar' } },
      ).resources.forEach(resource => expect(resource).toBeInstanceOf(AnnotationResource));
    });
  });
});
