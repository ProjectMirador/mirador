import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import init from './init';
import * as actions from './state/actions';
import * as selectors from './state/selectors';

export * from './components';
export * from './state/reducers';

whyDidYouRender(React, {
  collapseGroups: true,
  // include: [/.*/],
  // notifier: ({ Component, displayName }) => {
  //   console.warn(displayName);
  // },
  // onlyLogs: true,
});

const exports = {
  actions,
  selectors,
  viewer: init,
};

export default exports;
