import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getThumbnailsConfig } from '../state/selectors/config';
import { getIiifThumbnailOpts, getThumbnailFactory } from '../state/selectors/thumbnails';
import { getMiradorCanvasWrapper, getMiradorManifestWrapper } from '../state/selectors/wrappers';

/** */
export default function useThumbnailService(maxHeight, maxWidth) {
  const thumbnailsConfig = useSelector(getThumbnailsConfig);
  const getMiradorCanvas = useSelector(getMiradorCanvasWrapper);
  const getMiradorManifest = useSelector(getMiradorManifestWrapper);

  return useMemo(() => {
    const iiifOpts = getIiifThumbnailOpts(thumbnailsConfig, maxHeight, maxWidth);
    return getThumbnailFactory(iiifOpts, getMiradorCanvas, getMiradorManifest);
  }, [getMiradorCanvas, getMiradorManifest, maxHeight, maxWidth, thumbnailsConfig]);
}
