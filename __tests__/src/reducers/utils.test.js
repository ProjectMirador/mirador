import { setItem, updateItem, removeItem } from '../../../src/state/reducers/utils';

describe('setItem', () => {
  it('does not change input object', () => {
    const object = { foo: { a: 1 } };
    setItem(object, 'foo', { b: 2 });
    expect(object).toEqual({ foo: { a: 1 } });
  });

  it('sets a new item with the provided props', () => {
    const object = { foo: { a: 1 } };
    const result = setItem(object, 'bar', { b: 2 });
    expect(result).toEqual({
      bar: { b: 2 },
      foo: { a: 1 },
    });
  });

  it('overrides an existing item', () => {
    const object = { foo: { a: 1 } };
    const result = setItem(object, 'foo', { b: 2 });
    expect(result).toEqual({ foo: { b: 2 } });
  });
});

describe('updateItem', () => {
  it('does not change input object', () => {
    const object = { foo: { a: 1 } };
    updateItem(object, 'foo', { b: 2 });
    expect(object).toEqual({ foo: { a: 1 } });
  });

  it('updates an item with the provided props', () => {
    const object = { bar: { b: 2, c: 3 }, foo: { a: 1 } };
    const result = updateItem(object, 'bar', { c: 4, d: 5 });
    expect(result).toEqual({
      bar: { b: 2, c: 4, d: 5 },
      foo: { a: 1 },
    });
  });

  it('updates an item based on the function passed', () => {
    const object = { bar: { b: 2, c: 3 }, foo: { a: 1 } };
    /** */ const fn = props => ({ ...props, c: props.c + 1 });
    const result = updateItem(object, 'bar', fn);
    expect(result).toEqual({
      bar: { b: 2, c: 4 },
      foo: { a: 1 },
    });
  });
});

describe('removeItem', () => {
  it('does not change input object', () => {
    const object = { foo: { a: 1 } };
    removeItem(object, 'foo');
    expect(object).toEqual({ foo: { a: 1 } });
  });

  it('removes item from object', () => {
    const object = { bar: { a: 1 }, foo: { b: 2 } };
    const result = removeItem(object, 'bar');
    expect(result).toEqual({ foo: { b: 2 } });
  });

  it('returns the same object shape if item does not exist', () => {
    const object = { bar: { a: 1 }, foo: { b: 2 } };
    const result = removeItem(object, 'bubu');
    expect(result).toEqual({ bar: { a: 1 }, foo: { b: 2 } });
  });
});
