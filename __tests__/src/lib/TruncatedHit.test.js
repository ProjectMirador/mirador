import TruncatedHit from '../../../src/lib/TruncatedHit';

describe('TruncatedHit', () => {
  const th = new TruncatedHit({
    after: 'aaaaa', before: 'bbbbb', match: 'four',
  }, 10);
  const matchOnly = new TruncatedHit({ match: 'four' }, 10);
  describe('charsOnSide', () => {
    it('returns a balanced number of chars to put on each side of match', () => {
      expect(th.charsOnSide).toEqual(3);
    });
  });
  describe('before', () => {
    it('returns substring of before chars', () => {
      expect(th.before).toEqual('bbb');
    });
    it('with only a match', () => {
      expect(matchOnly.before).toEqual('');
    });
  });
  describe('after', () => {
    it('returns substring of after chars', () => {
      expect(th.after).toEqual('aaa');
    });
    it('with only a match', () => {
      expect(matchOnly.after).toEqual('');
    });
  });
  describe('match', () => {
    it('returns match', () => {
      expect(th.match).toEqual('four');
    });
  });
});
