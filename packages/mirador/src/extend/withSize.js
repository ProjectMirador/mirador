/** This file was written to replace https://github.com/ctrlplusb/react-sizeme
 * when its dependencies went out of date and is very much inspired by its code.
 */

import {
  forwardRef, useEffect, useRef, useState,
} from 'react';

/** */
export function withSize() {
  return function WrapComponent(WrappedComponent) {
    /** */
    const SizeAwareComponent = forwardRef((props, ref) => {
      const [size, setSize] = useState({ height: undefined, width: undefined });
      const defaultElementRef = useRef(null);
      const observerRef = useRef(null);

      const elementRef = ref || defaultElementRef;

      useEffect(() => {
        /** */
        const handleResize = (entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            setSize({ height, width });
          }
        };

        observerRef.current = new ResizeObserver(handleResize);

        if (elementRef.current) {
          observerRef.current.observe(elementRef.current);
        }

        return () => {
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        };
      }, [elementRef]);

      return (
        <WrappedComponent ref={elementRef} size={size} {...props} />
      );
    });

    return SizeAwareComponent;
  };
}
