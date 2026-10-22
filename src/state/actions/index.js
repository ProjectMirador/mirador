/**
 * Action Creators for Mirador
 * @namespace ActionCreators
 */
export * from './companionWindow';
export * from './config';
export * from './errors';
export * from './window';
export * from './manifest';
export * from './infoResponse';
export * from './canvas';
export * from './workspace';
export * from './annotation';
export * from './auth';
export * from './search';
export * from './catalog';

// migrated to slices
export * from './layers';
export * from './elasticLayout';

export { default as ActionTypes } from './action-types';
