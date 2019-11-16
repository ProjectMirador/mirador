import AnnotationPage from '../../../src/lib/AnnotationPage';

describe('AnnotationPage', () => {
  describe('id', () => {
    it('returns the id', () => {
      expect(new AnnotationPage({ id: 'foo' }).id).toEqual('foo');
    });
  });
  describe('present', () => {
    it('checks for json', () => {
      expect(new AnnotationPage().present()).toEqual(false);
    });
    it('checks for items', () => {
      expect(new AnnotationPage({ id: 'foo' }).present()).toEqual(false);
      expect(new AnnotationPage({ items: [] }).present()).toEqual(false);
    });
  });
  describe('items', () => {
    it('returns items', () => {
      expect(new AnnotationPage(
        { items: [{ foo: 'bar' }] },
      ).items).toEqual([{ foo: 'bar' }]);
    });
  });
  describe('resources', () => {
    it('returns items', () => {
      expect(new AnnotationPage(
        { items: [{ foo: 'bar' }] },
      ).resources).toEqual([{ foo: 'bar' }]);
    });
  });
});
