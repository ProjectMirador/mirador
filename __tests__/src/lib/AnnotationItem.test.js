import AnnotationItem from '../../../src/lib/AnnotationItem';

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

  describe('targetId', () => {
    it('removes fragmentSelector coords from string targets', () => {
      expect(
        new AnnotationItem({ target: 'www.example.com/#xywh=10,10,100,200' }).targetId,
      ).toEqual('www.example.com/');
    });

    it('returns null when there is no target', () => {
      expect(new AnnotationItem().targetId).toBeNull();
    });
  });

  describe('motivations', () => {
    it('with no motivation', () => {
      expect(new AnnotationItem().motivations).toEqual([]);
    });
    it('with a single motivation', () => {
      expect(new AnnotationItem({ motivation: 'commenting' })
        .motivations).toEqual(['commenting']);
    });
    it('with multiple motivations', () => {
      expect(new AnnotationItem({ motivation: ['commenting', 'funstuff'] })
        .motivations).toEqual(['commenting', 'funstuff']);
    });
  });
  describe('resources/body', () => {
    it('with no body', () => {
      expect(new AnnotationItem().resources).toEqual([]);
      expect(new AnnotationItem().body).toEqual([]);
    });
    it('with a single body', () => {
      expect(new AnnotationItem({ body: 'foo' })
        .resources).toEqual(['foo']);
      expect(new AnnotationItem({ body: 'foo' })
        .body).toEqual(['foo']);
    });
    it('with multiple bodies', () => {
      expect(new AnnotationItem({ body: ['foo', 'bar'] })
        .resources).toEqual(['foo', 'bar']);
      expect(new AnnotationItem({ body: ['foo', 'bar'] })
        .body).toEqual(['foo', 'bar']);
    });
  });
  describe('target', () => {
    it('with no target', () => {
      expect(new AnnotationItem().target).toEqual([]);
    });
    it('with a single target', () => {
      expect(new AnnotationItem({ target: 'foo' })
        .target).toEqual(['foo']);
    });
    it('with multiple target', () => {
      expect(new AnnotationItem({ target: ['foo', 'bar'] })
        .target).toEqual(['foo', 'bar']);
    });
  });
  describe('selector', () => {
    it('returns the on string (for simple fragment selector)', () => {
      expect(new AnnotationItem({ target: 'yolo' }).selector).toEqual('yolo');
    });
  });
  describe('chars', () => {
    it('with no resource', () => {
      expect(new AnnotationItem().chars).toEqual('');
    });
    it('with a single body', () => {
      expect(new AnnotationItem({ body: { value: 'foo' } })
        .chars).toEqual('foo');
    });
    it('with multiple bodies', () => {
      expect(new AnnotationItem({ body: [{ value: 'foo' }, { value: 'bar' }] })
        .chars).toEqual('foo bar');
    });
  });
  describe('fragmentSelector', () => {
    it('simple string', () => {
      expect(new AnnotationItem({ target: 'www.example.com/#xywh=10,10,100,200' })
        .fragmentSelector).toEqual([10, 10, 100, 200]);
    });
  });
});
