import { createContext } from 'react';

const FailedImageContext = createContext({
  fallbackImage: '',
  hasFailed: false,
  notifyFailure: () => {},
});
export default FailedImageContext;
