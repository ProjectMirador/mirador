import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import ns from '../config/css-ns';
import 'react-virtualized/styles.css';

/**
 */
export class ThumbnailNavigation extends Component {
  /**
   */
  constructor(props) {
    super(props);

    this.scrollbarSize = 10;
    this.spacing = 12; // 2 * (2px margin + 2px border + 2px padding)
    this.cellRenderer = this.cellRenderer.bind(this);
    this.calculateScaledHeight = this.calculateScaledHeight.bind(this);
    this.calculateScaledWidth = this.calculateScaledWidth.bind(this);
    this.gridRef = React.createRef();
  }

  /**
   * If the view has changed and the thumbnailNavigation is open, recompute all
   * of the grids
   */
  componentDidUpdate(prevProps) {
    const { position, window } = this.props;
    if (prevProps.window.view !== window.view && position !== 'off') {
      this.gridRef.current.recomputeGridSize();
    }
  }

  /**
   * Determines whether the current index is the rendered canvas, providing
   * a useful class.
   */
  currentCanvasClass(canvasIndices) {
    const { window } = this.props;
    if (canvasIndices.includes(window.canvasIndex)) return 'current-canvas';
    return '';
  }

  /**
   * Renders a given "cell" for a react-virtualized Grid. This is a grouping of
   * canvases.
   * https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md
   */
  cellRenderer(options) {
    const {
      columnIndex, key, style, rowIndex,
    } = options;
    const {
      classes, window, setCanvas, config, canvasGroupings, position,
    } = this.props;
    const currentIndex = (position === 'far-right') ? rowIndex : columnIndex;
    const maxHeight = (position === 'far-right') ? null : config.thumbnailNavigation.height - (this.scrollbarSize + 12);
    const maxWidth = (position === 'far-right') ? config.thumbnailNavigation.width : null;
    const currentGroupings = canvasGroupings.groupings()[currentIndex];
    return (
      <div
        key={key}
        style={style}
        className={ns('thumbnail-nav-container')}
      >
        <GridList
          component="div"
          spacing={0}
          className={classNames(
            ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${currentIndex}`, this.currentCanvasClass(currentGroupings.map(canvas => canvas.index))]),
            classes.canvas,
            {
              [classes.currentCanvas]: currentGroupings
                .map(canvas => canvas.index).includes(window.canvasIndex),
            },
          )}
        >
          {currentGroupings.map((canvas, i) => {
            const manifestoCanvas = new ManifestoCanvas(canvas);
            return (
              <GridListTile
                component="div"
                key={canvas.index}
                onClick={() => setCanvas(window.id, currentGroupings[0].index)}
                style={{
                  height: style.height - this.spacing / 2,
                  width: currentGroupings.length === 2 ? '50%' : '100%',
                }}
              >
                <CanvasThumbnail
                  imageUrl={manifestoCanvas.thumbnail(null, maxHeight)}
                  isValid={manifestoCanvas.hasValidDimensions}
                  maxHeight={maxHeight}
                  maxWidth={maxWidth}
                  aspectRatio={manifestoCanvas.aspectRatio}
                />
                <GridListTileBar
                  classes={{ root: classes.root }}
                  title={(
                    <Typography classes={{ root: classes.title }} variant="caption">
                      {manifestoCanvas.getLabel()}
                    </Typography>
                  )}
                />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }

  /**
   * calculateScaledWidth - calculates the scaled width of a column for a Grid
   * in a simple case, a column == canvas. In a book view, a group (or two)
   * canvases. When in the "right" position, this value is static.
   */
  calculateScaledWidth(options) {
    const { config, canvasGroupings, position } = this.props;
    switch (position) {
      case 'far-right':
        return this.rightWidth();
      // Default case bottom
      default:
        return canvasGroupings.getCanvases(options.index)
          .map(canvas => new ManifestoCanvas(canvas))
          .reduce((acc, currentCanvas) => { return acc + (currentCanvas.hasValidDimensions ? Math.floor((config.thumbnailNavigation.height - this.scrollbarSize) * currentCanvas.aspectRatio) : config.thumbnailNavigation.width); }, 0); // eslint-disable-line arrow-body-style, max-len
    }
  }

  /**
   * calculateScaledHeight - calculates the scaled height of a row for a Grid
   * in a simple case, a row == canvas. In a book view, a group (or two)
   * canvases. When in the "bottom" position, this value is static.
   */
  calculateScaledHeight(options) {
    const { config, canvasGroupings, position } = this.props;
    switch (position) {
      case 'far-right':
        return Math.max(
          ...canvasGroupings.getCanvases(options.index)
            .map(canvas => new ManifestoCanvas(canvas))
            .map(canvas => (canvas.hasValidDimensions ? Math.floor((config.thumbnailNavigation.width - this.spacing) / canvas.aspectRatio) : config.thumbnailNavigation.height - 12)), // eslint-disable-line arrow-body-style, max-len
        );
      // Default case bottom
      default:
        return config.thumbnailNavigation.height - this.scrollbarSize;
    }
  }

  /**
   * In book view, this is halved to represent the proxy between the "canvasIndex"
   * and the columnIndex (in this case the index of grouped canvases)
   */
  scrollToColumn() {
    const { window } = this.props;
    switch (window.view) {
      case 'book':
        return Math.ceil(window.canvasIndex / 2);
      default:
        return window.canvasIndex;
    }
  }

  /** */
  style() {
    const { position, config } = this.props;
    switch (position) {
      case 'far-right':
        return {
          height: '100%',
          width: `${this.rightWidth() + this.scrollbarSize + this.spacing}px`,
          display: 'flex',
          minHeight: 0,
        };
      // Default case bottom
      default:
        return {
          height: `${config.thumbnailNavigation.height}px`,
          width: '100%',
        };
    }
  }

  /** */
  rightWidth() {
    const { window, config } = this.props;
    switch (window.view) {
      case 'book':
        return (config.thumbnailNavigation.width * 2);
      default:
        return config.thumbnailNavigation.width;
    }
  }

  /** */
  columnCount() {
    const { position, canvasGroupings } = this.props;
    switch (position) {
      case 'far-right':
        return 1;
      // Default case bottom
      default:
        return canvasGroupings.groupings().length;
    }
  }

  /** */
  rowCount() {
    const { position, canvasGroupings } = this.props;
    switch (position) {
      case 'far-right':
        return canvasGroupings.groupings().length;
      // Default case bottom
      default:
        return 1;
    }
  }

  /** */
  areaHeight(height) {
    const { config, position } = this.props;
    switch (position) {
      case 'far-right':
        return height;
      // Default case bottom
      default:
        return config.thumbnailNavigation.height;
    }
  }

  /**
   * Renders things
   */
  render() {
    const { t, position } = this.props;
    if (position === 'off') {
      return <></>;
    }
    return (
      <nav
        className={ns('thumb-navigation')}
        aria-label={t('thumbnailNavigation')}
        style={this.style()}
      >
        <AutoSizer
          defaultHeight={100}
          defaultWidth={400}
        >
          {({ height, width }) => (
            <Grid
              cellRenderer={this.cellRenderer}
              columnCount={this.columnCount()}
              columnWidth={this.calculateScaledWidth}
              height={this.areaHeight(height)}
              rowCount={this.rowCount()}
              rowHeight={this.calculateScaledHeight}
              scrollToAlignment="center"
              scrollToColumn={this.scrollToColumn()}
              width={width}
              ref={this.gridRef}
            />
          )}
        </AutoSizer>
      </nav>
    );
  }
}

ThumbnailNavigation.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  canvasGroupings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  position: PropTypes.string.isRequired,
  setCanvas: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
};
