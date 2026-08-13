import { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import { List, Grid } from 'react-window';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useCanvasWorldService } from '../hooks';
import ThumbnailCanvasGrouping from '../containers/ThumbnailCanvasGrouping';
import ns from '../config/css-ns';
/**
 */
export function ThumbnailNavigation({
  canvasGroupings,
  canvasIndex,
  hasNextCanvas = false,
  hasPreviousCanvas = false,
  position,
  setNextCanvas = () => {},
  setPreviousCanvas = () => {},
  thumbnailNavigation,
  view = undefined,
  viewingDirection = '',
  windowId,
}) {
  const { t } = useTranslation();
  const scrollbarSize = 6;
  const spacing = 12; // 2 * (2px margin + 2px border + 2px padding)
  const gridRef = useRef();
  const previousView = useRef(view);
  const canvasWorlds = useCanvasWorldService();

  useEffect(() => {
    if (previousView.current !== view && position !== 'off') {
      previousView.current = view;
      // Note: resetAfterIndex is not available in react-window v2 List API
      // The list will re-render automatically when rowHeight function changes
    }
  }, [view, position]);

  useEffect(() => {
    let index = canvasIndex;
    if (view === 'book') index = Math.ceil(index / 2);
    // Only scroll if the index is valid
    if (gridRef.current && index >= 0 && index < canvasGroupings.length) {
      // For horizontal Grid, scroll to column; for vertical List, scroll to row
      if (position === 'far-bottom') {
        // react-window Grid API in v2
        gridRef.current.scrollToCell({
          columnIndex: index,
          rowIndex: 0,
          columnAlign: 'center',
          rowAlign: 'center',
        });
      } else {
        // react-window List API in v2
        gridRef.current.scrollToRow({ index, align: 'center' });
      }
    }
  }, [canvasIndex, view, canvasGroupings.length, position]);

  // Prevent loss of focus when navigating thumbnails
  const paperRef = useRef(null);

  useEffect(() => {
    if (paperRef.current && document.activeElement !== paperRef.current) {
      paperRef.current.focus();
    }
  }, [canvasIndex]);

  /** */
  const handleKeyDown = (e) => {
    let nextKey = 'ArrowRight';
    let previousKey = 'ArrowLeft';
    if (position === 'far-right') {
      nextKey = 'ArrowDown';
      previousKey = 'ArrowUp';
    }
    switch (e.key) {
      case nextKey:
        nextCanvas();
        break;
      case previousKey:
        previousCanvas();
        break;
      default:
        break;
    }
  };

  /**
   * When on bottom, column width
   */
  const calculateScaledWidth = (index) => {
    const canvases = canvasGroupings[index];
    if (!canvases) return thumbnailNavigation.width + spacing;

    const world = canvasWorlds.get(canvases);
    const bounds = world.worldBounds();
    // calculate the correct canvas width based on the height + aspect ratio.
    const availableHeight = thumbnailNavigation.height - spacing - scrollbarSize;
    const calc = Math.ceil((availableHeight * bounds[2]) / bounds[3]);

    if (!Number.isInteger(calc)) return thumbnailNavigation.width + spacing;
    return calc + spacing;
  };

  /**
   * When on right, row height
   */
  const calculateScaledHeight = (index) => {
    const canvases = canvasGroupings[index];
    if (!canvases) return thumbnailNavigation.height + spacing;

    const world = canvasWorlds.get(canvases);
    const bounds = world.worldBounds();

    // calculate the correct canvas height based on the aspect ratio + width.
    const availableWidth = thumbnailNavigation.width - spacing - scrollbarSize;
    const calc = Math.ceil((availableWidth * canvases.length * bounds[3]) / bounds[2]);

    if (!Number.isInteger(calc)) return thumbnailNavigation.height + spacing;
    return calc + spacing;
  };

  /** */
  const style = useCallback(() => {
    const width = view === 'book' ? thumbnailNavigation.width * 2 : thumbnailNavigation.width;

    switch (position) {
      case 'far-right':
        return {
          width: `${width}px`,
        };
      // Default case bottom
      default:
        return {
          width: '100%',
        };
    }
  }, [position, thumbnailNavigation, view]);

  /**
   */
  const nextCanvas = () => {
    if (hasNextCanvas) setNextCanvas();
  };

  /**
   */
  const previousCanvas = () => {
    if (hasPreviousCanvas) setPreviousCanvas();
  };

  if (position === 'off') {
    return null;
  }
  const htmlDir = viewingDirection === 'right-to-left' ? 'rtl' : 'ltr';
  const itemData = {
    canvasGroupings,
    position,
    windowId,
  };

  return (
    <Paper
      className={classNames(ns('thumb-navigation'))}
      sx={{
        '&:focus': {
          boxShadow: 0,
          outline: 0,
        },
        scrollbarGutter: 'stable',
      }}
      aria-label={t('thumbnailNavigation')}
      square
      elevation={0}
      style={style()}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={paperRef}
    >
      {canvasGroupings.length > 0 && position === 'far-bottom' && (
        <Grid
          columnCount={canvasGroupings.length}
          columnWidth={calculateScaledWidth}
          rowCount={1}
          rowHeight={thumbnailNavigation.height - spacing - scrollbarSize}
          style={{
            direction: htmlDir === 'rtl' ? 'rtl' : 'ltr',
            height: thumbnailNavigation.height,
          }}
          cellProps={itemData}
          gridRef={gridRef}
          cellComponent={ThumbnailCanvasGrouping}
        />
      )}
      {canvasGroupings.length > 0 && position === 'far-right' && (
        <List
          defaultHeight={100}
          rowCount={canvasGroupings.length}
          rowHeight={calculateScaledHeight}
          style={{
            paddingBottom: spacing,
            direction: htmlDir === 'rtl' ? 'rtl' : 'ltr',
          }}
          rowProps={itemData}
          listRef={gridRef}
          rowComponent={ThumbnailCanvasGrouping}
        />
      )}
    </Paper>
  );
}

ThumbnailNavigation.propTypes = {
  canvasGroupings: PropTypes.array.isRequired,
  canvasIndex: PropTypes.number.isRequired,
  hasNextCanvas: PropTypes.bool,
  hasPreviousCanvas: PropTypes.bool,
  position: PropTypes.string.isRequired,
  setNextCanvas: PropTypes.func,
  setPreviousCanvas: PropTypes.func,
  thumbnailNavigation: PropTypes.object.isRequired,
  view: PropTypes.string,
  viewingDirection: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};
