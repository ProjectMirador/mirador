import { isDraftAnnotation } from '../../../src/lib/draftAnnotations';

describe('isDraftAnnotation', () => {
  it('is false when no marker is configured', () => {
    expect(isDraftAnnotation({ status: 'draft' }, null)).toBe(false);
    expect(isDraftAnnotation({ status: 'draft' }, {})).toBe(false);
    expect(isDraftAnnotation(undefined, { property: 'status', value: 'draft' })).toBe(false);
  });

  it('matches a property value', () => {
    const marker = { property: 'mmu:status', value: 'draft' };
    expect(isDraftAnnotation({ 'mmu:status': 'draft' }, marker)).toBe(true);
    expect(isDraftAnnotation({ 'mmu:status': 'published' }, marker)).toBe(false);
    expect(isDraftAnnotation({}, marker)).toBe(false);
  });

  it('accepts a list of values, and true by default', () => {
    expect(isDraftAnnotation({ s: 'b' }, { property: 's', value: ['a', 'b'] })).toBe(true);
    expect(isDraftAnnotation({ isDraft: true }, { property: 'isDraft' })).toBe(true);
    expect(isDraftAnnotation({ isDraft: 'yes' }, { property: 'isDraft' })).toBe(false);
  });
});
