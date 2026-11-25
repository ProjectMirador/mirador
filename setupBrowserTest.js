import '@testing-library/jest-dom';
import { beforeEach } from 'vitest';
import i18next from 'i18next';
import en from './src/locales/en/translation.json';

// Disable React's act() warnings in real Chromium browser tests
// (@testing-library/react sets IS_REACT_ACT_ENVIRONMENT = true on import)
beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
});

i18next.init({
  lng: 'en',
  resources: {
    en,
  },
  showSupportNotice: false,
});
