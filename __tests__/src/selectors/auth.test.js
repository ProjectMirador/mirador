import {
  getAccessTokens,
} from '../../../src/state/selectors/auth';

describe('getAccessTokens', () => {
  const state = {
    accessTokens: {
      x: {},
      y: {},
    },
  };

  it('returns the stored access tokens', () => {
    const accessTokens = getAccessTokens(state);

    expect(accessTokens).toEqual(state.accessTokens);
  });
});
