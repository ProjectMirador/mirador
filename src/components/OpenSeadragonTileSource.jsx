import Openseadragon from 'openseadragon';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import OpenSeadragonViewerContext from '../contexts/OpenSeadragonViewerContext';
import FailedImageContext from '../contexts/FailedImageContext';

/** OSD tile source shim that adds + updates its tile source data */
export default function OpenSeadragonTileSource({
  index = undefined, opacity = undefined, fitBounds = undefined, tileSource = {}, url = undefined,
}) {
  const viewer = useContext(OpenSeadragonViewerContext);
  const { markFailed, isFailed, fallbackImage } = useContext(FailedImageContext);
  const tiledImage = useRef(undefined);

  useEffect(() => {
    if (opacity == null) return;

    tiledImage.current?.setOpacity(opacity);
  }, [opacity]);

  useEffect(() => {
    if (!fitBounds) return;

    tiledImage.current?.fitBounds(new Openseadragon.Rect(...fitBounds));
  }, [fitBounds]);

  useEffect(() => {
    if (!tiledImage.current || !viewer?.current || index == null) return;

    viewer.current.world.setItemIndex(tiledImage.current, index);
  }, [index, viewer]);

  useEffect(() => {
    if (!viewer?.current) return undefined;

    const loadFallback = () => {
      if (!fallbackImage) {
        console.warn('[Mirador: no fallback image configured]');
        return;
      }
      
      viewer.current.addTiledImage({
        tileSource: { type: 'image', url: fallbackImage },
        index,
        opacity,
        fitBounds: fitBounds ? new Openseadragon.Rect(...fitBounds) : undefined,
        success: (ev) => { tiledImage.current = ev.item; },
        error: (err) => console.error('[Mirador: failed to load fallback image]', err),
      });
    };

    if (url && isFailed(url)) {
      loadFallback();
      return;
    }

    const promise = new Promise((resolve, reject) => {
      const localTileSource = (url && { type: 'image', url })
        || (((typeof tileSource === 'string' || tileSource instanceof String) && tileSource)
        // OSD mutates this object, so we give it a shallow copy
        || { ...tileSource });

      viewer.current?.addTiledImage({
        tileSource: localTileSource,
        index,
        opacity,
        fitBounds: fitBounds ? new Openseadragon.Rect(...fitBounds) : undefined,

        success: (event) => resolve(event),

        error: (event) => {
          const failedUrl = localTileSource.url || tileSource;
          markFailed(failedUrl);

          // Remove partially added image if needed
          if (tiledImage.current) {
            viewer.current.world.removeItem(tiledImage.current);
            tiledImage.current = undefined;
          }

          // Always load fallback once failure occurs
          loadFallback();

          reject(event);
        },
      });
    }).then((event) => { tiledImage.current = event.item;
    }).catch((err) => {
      console.warn('[Mirador: OSD tile image load failed]', err);
    });

    const osd = viewer.current;
    return () => (
      promise.finally(() => {
        if (osd && tiledImage.current) {
          osd.world.removeItem(tiledImage.current);
        }
      })
    );
  }, [viewer?.current, url]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

OpenSeadragonTileSource.propTypes = {
  fitBounds: PropTypes.arrayOf(PropTypes.number),
  index: PropTypes.number,
  opacity: PropTypes.number,
  tileSource: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  url: PropTypes.string,
};
