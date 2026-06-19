import parseFragmentSelector from '../../../src/lib/parseFragmentSelector';

describe('parseFragmentSelector', () => {
  it('parses a bare xywh fragment as pixels', () => {
    expect(parseFragmentSelector('www.example.com/#xywh=10,10,100,200')).toEqual({
      dimensions: [10, 10, 100, 200],
      unit: 'pixel',
    });
  });

  it('parses an explicit pixel: prefix', () => {
    expect(parseFragmentSelector('www.example.com/#xywh=pixel:10,10,100,200')).toEqual({
      dimensions: [10, 10, 100, 200],
      unit: 'pixel',
    });
  });

  it('parses a percent: prefix without scaling the values', () => {
    expect(parseFragmentSelector('www.example.com/#xywh=percent:25,25,50,50')).toEqual({
      dimensions: [25, 25, 50, 50],
      unit: 'percent',
    });
  });

  it('supports fractional values', () => {
    expect(parseFragmentSelector('#xywh=percent:12.5,0,75,50').dimensions)
      .toEqual([12.5, 0, 75, 50]);
  });

  it('returns null when there is no fragment', () => {
    expect(parseFragmentSelector('www.example.com')).toBeNull();
  });

  it('returns null for non-string input', () => {
    expect(parseFragmentSelector(undefined)).toBeNull();
    expect(parseFragmentSelector(null)).toBeNull();
  });
});
