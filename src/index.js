import init from './init';

export * from './components';
export * from './state/actions';
export * from './state/reducers';

const exports = {
  viewer: init,
  plugins: {},
};

export default exports;
