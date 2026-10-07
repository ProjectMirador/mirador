import { useEffect, useRef } from 'react';

/**
 * Seeks a time-based media element to the given start time, waiting for the
 * browser to load enough metadata to make the element seekable.
 * Returns the ref to attach to the <audio>/<video> element.
 * mediaKey should match the element's React key, so a remounted element is seeked too.
 */
export default function useMediaStartTime(startTime, mediaKey) {
  const mediaRef = useRef(null);

  useEffect(() => {
    const media = mediaRef.current;

    if (!media || startTime === undefined) return undefined;

    /** */
    const seek = () => {
      media.currentTime = startTime;
    };

    if (media.readyState >= media.HAVE_METADATA) {
      seek();
      return undefined;
    }

    media.addEventListener('loadedmetadata', seek);

    return () => media.removeEventListener('loadedmetadata', seek);
  }, [startTime, mediaKey]);

  return mediaRef;
}
