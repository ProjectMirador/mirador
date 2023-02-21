import { forwardRef } from 'react';

/** */
export const withRef = () => (Component) => {
  const WithRefs = forwardRef((props, ref) => (
    <Component innerRef={ref} {...props} />
  ));
  return WithRefs;
};
