import { forwardRef } from 'react';

/** */
export const withRef = () => (Component) => {
  const WithRefs = forwardRef((props, ref) => (
    <Component innerRef={ref} {...props} />
  ));
  WithRefs.displayName = 'WithRefs';
  return WithRefs;
};
