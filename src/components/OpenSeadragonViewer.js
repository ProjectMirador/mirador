import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import OpenSeadragon from 'openseadragon';
import debounce from 'lodash/debounce';
import ns from '../config/css-ns';
import ZoomControls from '../containers/ZoomControls';

/**
 * usePrevious Hook
 * @param value
 * @returns {any}
 */
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/**
 * Represents an OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
const OpenSeadragonViewer = (props) => {
  const {
    tileSources, viewer, windowId, children, updateViewport,
  } = props;
  const osdRef = useRef();
  const viewerInstance = useRef();
  const wholeBounds = useRef();
  const prevTileSources = usePrevious(tileSources);

  useEffect(() => {
    if (!viewerInstance.current) {
      viewerInstance.current = new OpenSeadragon({
        id: osdRef.current.id,
        preserveViewport: true,
        blendTime: 0.1,
        alwaysBlend: false,
        showNavigationControl: false,
        preserveImageSizeOnResize: true,
      });
    }

    if (viewerInstance.current) {
      // set update viewer state handler
      viewerInstance.current.addHandler('viewport-change', debounce(onViewportChange, 300));
      if (viewer) {
        const { viewport } = viewerInstance.current;
        // set initial zoom
        viewport.panTo(viewer, false);
        viewport.zoomTo(viewer.zoom, viewer, false);
        if (viewer.x !== viewport.centerSpringX.target.value
          || viewer.y !== viewport.centerSpringY.target.value) {
          viewport.panTo(viewer, false);
        }
        if (viewer.zoom !== viewport.zoomSpring.target.value) {
          viewport.zoomTo(viewer.zoom, viewer, false);
        }
      }
      // build bounds for all tile sources
      wholeBounds.current = boundsFromTileSources();
      // add tile sources to viewerInstance
      tileSources.forEach((tileSource, i) => addTileSource(tileSource, i));
    }

    // check for new tile sources
    if (!tileSourcesMatch()) {
      viewerInstance.current.close();
      Promise.all(
        tileSources.map((tileSource, i) => addTileSource(tileSource, i)),
      ).then(() => {
        if (tileSources[0]) {
          fitBounds(...boundsFromTileSources(), true);
        }
      });
    }
    // clean up
    return () => {
      viewerInstance.current.removeAllHandlers();
    };
  });

  /**
   *
   * @param tileSource
   * @param i
   * @returns {Promise<any>}
   */
  const addTileSource = (tileSource, i = 0) => new Promise((resolve, reject) => {
    const bounds = boundingRectFromTileSource(tileSource, i);
    const rect = new OpenSeadragon.Rect(...bounds);
    viewerInstance.current.addTiledImage({
      tileSource,
      fitBounds: rect,
      success: event => resolve(event),
      error: event => reject(event),
    });
  });


  /**
   * Forward OSD state to redux
   */
  const onViewportChange = (e) => {
    const { viewport } = e.eventSource;
    updateViewport(windowId, {
      x: viewport.centerSpringX.target.value,
      y: viewport.centerSpringY.target.value,
      zoom: viewport.zoomSpring.target.value,
    });
  };

  /**
   * boundsFromTileSources - calculates the overall width/height
   * based on 0 -> n tileSources
   */
  const boundsFromTileSources = () => {
    const heights = [];
    const dimensions = [];
    if (tileSources.length) {
      tileSources.forEach((tileSource) => {
        heights.push(tileSource.height);
        dimensions.push({
          width: tileSource.width, height: tileSource.height,
        });
      });
      const minHeight = Math.min(...heights);
      let scaledWidth = 0;
      dimensions.forEach((dim) => {
        const aspectRatio = dim.width / dim.height;
        scaledWidth += Math.floor(minHeight * aspectRatio);
      });
      return [0, 0, scaledWidth, minHeight];
    }
    return null;
  };

  /**
   * boundingRectFromTileSource - Creates a bounding rectangle
   * in the Viewports space, using the current tileSource and the tileSource
   * total area. Limitation, can only handle tileSources with a length of 1 or 2
   */
  const boundingRectFromTileSource = (tileSource, i) => {
    if (wholeBounds.current) {
      const aspectRatio = tileSource.width / tileSource.height;
      const scaledWidth = Math.floor(wholeBounds.current[3] * aspectRatio);
      let x = 0;
      if (i === 1) {
        x = wholeBounds.current[2] - scaledWidth;
      }
      return [x, 0, scaledWidth, wholeBounds.current[3]];
    }
    return null;
  };

  /**
   *
   * @param x
   * @param y
   * @param w
   * @param h
   */
  const fitBounds = (x, y, w, h) => {
    viewerInstance.current.viewport.fitBounds(
      new OpenSeadragon.Rect(x, y, w, h),
      true,
    );
  };

  /**
   * tileSourcesMatch - compares previous tileSources to current to determine
   * whether a refresh of the OSD viewer is needed.
   * @return {Boolean}
   */
  const tileSourcesMatch = () => tileSources.some((tileSource, index) => {
    if (prevTileSources) {
      if (!prevTileSources[index]) {
        return false;
      }
      return tileSource['@id'] === prevTileSources[index]['@id'];
    }
    return null;
  });

  return (
    <>
      <div
        className={ns('osd-container')}
        id={`${windowId}-osd`}
        ref={osdRef}
      >
        { children }
      </div>
      <ZoomControls windowId={windowId} />
    </>
  );
};

OpenSeadragonViewer.defaultProps = {
  children: null,
  tileSources: [],
  viewer: null,
};

OpenSeadragonViewer.propTypes = {
  children: PropTypes.element,
  tileSources: PropTypes.arrayOf(PropTypes.object),
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  updateViewport: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default OpenSeadragonViewer;
