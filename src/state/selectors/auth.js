import { miradorSlice } from './utils';

/** */
export const getAccessTokens = state => miradorSlice(state).accessTokens || {};

/** */
export const getAuth = state => miradorSlice(state).auth || {};
