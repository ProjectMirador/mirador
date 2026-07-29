import {
  compact,
  difference,
  flatten,
  flattenDeep,
  groupBy,
  isEqual,
  keyBy,
  omit,
  setPath,
  union,
  unsetPath,
  updatePath,
  without,
} from '../../../src/lib/utils';

describe('native JavaScript utilities', () => {
  it('supports the array collection operations used by Mirador', () => {
    expect(compact([0, 1, false, 2, null])).toEqual([1, 2]);
    expect(flatten([[1], [2, 3]])).toEqual([1, 2, 3]);
    expect(flattenDeep([1, [2, [3]]])).toEqual([1, 2, 3]);
    expect(difference([1, 2, 3], [2])).toEqual([1, 3]);
    expect(without([1, 2, 3], 1, 3)).toEqual([2]);
    expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
  });

  it('groups and indexes collections', () => {
    const values = [
      { id: 'a', type: 'odd' },
      { id: 'b', type: 'even' },
      { id: 'c', type: 'odd' },
    ];
    expect(groupBy(values, ({ type }) => type)).toEqual({
      even: [values[1]],
      odd: [values[0], values[2]],
    });
    expect(groupBy(undefined, ({ type }) => type)).toEqual({});
    expect(keyBy(values, ({ id }) => id)).toEqual({ a: values[0], b: values[1], c: values[2] });
  });

  it('immutably updates and removes nested values', () => {
    const object = { nested: { count: 1, keep: true } };
    expect(setPath(['nested', 'count'], 2, object)).toEqual({ nested: { count: 2, keep: true } });
    expect(setPath([undefined, 'value'], 2, {})).toEqual({ undefined: { value: 2 } });
    expect(updatePath(['nested', 'count'], (count) => count + 1, object)).toEqual({
      nested: { count: 2, keep: true },
    });
    expect(unsetPath(['nested', 'count'], object)).toEqual({ nested: { keep: true } });
    expect(omit({ a: 1, b: 2 }, 'a')).toEqual({ b: 2 });
    expect(object).toEqual({ nested: { count: 1, keep: true } });
  });

  it('compares nested arrays and objects', () => {
    expect(isEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(isEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 3 }] })).toBe(false);
  });
});
