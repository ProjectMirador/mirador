import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import GridListTile from '@material-ui/core/GridListTile';
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

    this.cellRenderer = this.cellRenderer.bind(this);
    this.calculateScaledWidth = this.calculateScaledWidth.bind(this);
    this.gridRef = React.createRef();
  }

  /**
   * If the view has changed and the thumbnailNavigation is open, recompute all
   * of the grids
   */
  componentDidUpdate(prevProps) {
    const { window } = this.props;
    if (prevProps.window.view !== window.view && window.thumbnailNavigationPosition !== 'off') {
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
      columnIndex, key, style,
    } = options;
    const {
      window, setCanvas, config, canvasGroupings,
    } = this.props;
    const currentGroupings = canvasGroupings.groupings()[columnIndex];
    return (
      <div
        key={key}
        style={style}
        className={ns('thumbnail-nav-container')}
      >
        <div
          style={{
            width: style.width - 8,
          }}
          className={ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${columnIndex}`, this.currentCanvasClass(currentGroupings.map(canvas => canvas.index))])}
        >
          {currentGroupings.map((canvas, i) => {
            const { height } = config.thumbnailNavigation;
            const manifestoCanvas = new ManifestoCanvas(canvas);

            return (
              <GridListTile
                component="div"
                key={canvas.index}
                onClick={() => setCanvas(window.id, currentGroupings[0].index)}
                style={{
                  position: 'absolute', left: (style.width - 8) * i / 2, top: 2,
                }}
              >
                <CanvasThumbnail
                  imageUrl={manifestoCanvas.thumbnail(null, height)}
                  isValid={manifestoCanvas.hasValidDimensions}
                  maxHeight={config.thumbnailNavigation.height}
                  maxWidth={style.width}
                  aspectRatio={manifestoCanvas.aspectRatio}
                />
              </GridListTile>
            );
          })}
        </div>
      </div>
    );
  }

  /**
   * calculateScaledWidth - calculates the scaled width of a column for a Grid
   * in a simple case, a column == canvas. In a book view, a group (or two)
   * canvases
   */
  calculateScaledWidth(options) {
    const { config, canvasGroupings } = this.props;
    return canvasGroupings
      .getCanvases(options.index)
      .map(canvas => new ManifestoCanvas(canvas))
      .reduce((acc, currentCanvas) => { return acc + (currentCanvas.hasValidDimensions ? Math.floor(config.thumbnailNavigation.height * currentCanvas.aspectRatio) : config.thumbnailNavigation.width); }, 8); // eslint-disable-line arrow-body-style, max-len
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

  /**
   * Renders things
   */
  render() {
    const { config, window, canvasGroupings } = this.props;
    if (window.thumbnailNavigationPosition === 'off') {
      return <></>;
    }
    return (
      <div
        className={ns('thumb-navigation')}
        style={{ height: `${config.thumbnailNavigation.height}px` }}
      >
        <AutoSizer
          defaultHeight={100}
          defaultWidth={400}
        >
          {({ height, width }) => (
            <Grid
              cellRenderer={this.cellRenderer}
              columnCount={canvasGroupings.groupings().length}
              columnWidth={this.calculateScaledWidth}
              height={config.thumbnailNavigation.height}
              rowCount={1}
              rowHeight={config.thumbnailNavigation.height}
              scrollToAlignment="center"
              scrollToColumn={this.scrollToColumn()}
              width={width}
              ref={this.gridRef}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

ThumbnailNavigation.propTypes = {
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  canvasGroupings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
