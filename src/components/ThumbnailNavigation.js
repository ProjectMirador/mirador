import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import classNames from 'classnames';
import CanvasWorld from '../lib/CanvasWorld';
import ThumbnailCanvasGrouping from '../containers/ThumbnailCanvasGrouping';
import ns from '../config/css-ns';

/**
 */
export class ThumbnailNavigation extends Component {
  /**
   */
  constructor(props) {
    super(props);

    this.scrollbarSize = 15;
    this.spacing = 8; // 2 * (2px margin + 2px border + 2px padding + 2px padding)
    this.calculateScaledSize = this.calculateScaledSize.bind(this);
    this.itemCount = this.itemCount.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.nextCanvas = this.nextCanvas.bind(this);
    this.previousCanvas = this.previousCanvas.bind(this);
    this.gridRef = React.createRef();
  }

  /**
   * If the view has changed and the thumbnailNavigation is open, recompute all
   * of the grids
   */
  componentDidUpdate(prevProps) {
    const { canvasIndex, position, window } = this.props;
    if (prevProps.window.view !== window.view && position !== 'off') {
      this.gridRef.current.resetAfterIndex(0);
    }
    if (prevProps.canvasIndex !== canvasIndex) {
      let index = canvasIndex;
      if (window.view === 'book') index = Math.ceil(index / 2);
      this.gridRef.current.scrollToItem(index, 'center');
    }
  }

  /**
   * When on right, row height
   * When on bottom, column width
   */
  calculateScaledSize(index) {
    const { config, canvasGroupings, position } = this.props;
    const canvases = canvasGroupings.groupings()[index];
    const world = new CanvasWorld(canvases);
    const bounds = world.worldBounds();
    switch (position) {
      case 'far-right': {
        const calc = Math.floor(
          this.calculatingWidth(canvases.length) * bounds[3] / bounds[2],
        );
        return calc + this.spacing;
      }
      // Default case bottom
      default: {
        const calc = Math.ceil(
          (config.thumbnailNavigation.height - this.scrollbarSize - this.spacing - 4)
           * bounds[2] / bounds[3],
        );
        return calc;
      }
    }
  }

  /** */
  calculatingWidth(canvasesLength) {
    const { config } = this.props;
    if (canvasesLength === 1) {
      return config.thumbnailNavigation.width;
    }
    return config.thumbnailNavigation.width * 2;
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
  style() {
    const { position, config } = this.props;
    switch (position) {
      case 'far-right':
        return {
          height: '100%',
          minHeight: 0,
          width: `${this.rightWidth() + this.scrollbarSize + this.spacing}px`,
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

  /** */
  itemCount() {
    const { canvasGroupings } = this.props;
    return canvasGroupings.groupings().length;
  }

  /** */
  handleKeyUp(e) {
    const { position } = this.props;
    let nextKey = 'ArrowRight';
    let previousKey = 'ArrowLeft';
    if (position === 'far-right') {
      nextKey = 'ArrowDown';
      previousKey = 'ArrowUp';
    }
    switch (e.key) {
      case nextKey:
        this.nextCanvas();
        break;
      case previousKey:
        this.previousCanvas();
        break;
      default:
        break;
    }
  }

  /**
   */
  nextCanvas() {
    const { window, canvasIndex, setCanvas } = this.props;
    if (this.hasNextCanvas()) {
      setCanvas(window.id, canvasIndex + this.canvasIncrementor());
    }
  }

  /**
   */
  hasNextCanvas() {
    const { canvasIndex, canvasGroupings } = this.props;
    return canvasIndex < canvasGroupings.canvases.length - this.canvasIncrementor();
  }

  /**
   */
  previousCanvas() {
    const { window, canvasIndex, setCanvas } = this.props;
    if (this.hasPreviousCanvas()) {
      setCanvas(window.id, Math.max(0, canvasIndex - this.canvasIncrementor()));
    }
  }

  /**
   */
  hasPreviousCanvas() {
    const { canvasIndex } = this.props;
    return canvasIndex > 0;
  }

  /**
   */
  canvasIncrementor() {
    const { window } = this.props;
    switch (window.view) {
      case 'book':
        return 2;
      default:
        return 1;
    }
  }

  /**
   * Renders things
   */
  render() {
    const {
      t,
      canvasGroupings,
      classes,
      config,
      position,
      window,
    } = this.props;
    if (position === 'off') {
      return <></>;
    }
    return (
      <Paper
        className={classNames(
          ns('thumb-navigation'),
          classes.thumbNavigation,
        )}
        aria-label={t('thumbnailNavigation')}
        square
        elevation={0}
        style={this.style()}
        tabIndex={0}
        onKeyUp={this.handleKeyUp}
        role="grid"
      >
        <AutoSizer
          defaultHeight={100}
          defaultWidth={400}
        >
          {({ height, width }) => (
            <List
              height={this.areaHeight(height)}
              itemCount={this.itemCount()}
              itemSize={this.calculateScaledSize}
              width={width}
              layout={(position === 'far-bottom') ? 'horizontal' : 'vertical'}
              itemData={{
                canvasGroupings,
                config,
                height: config.thumbnailNavigation.height - this.spacing - this.scrollbarSize,
                position,
                windowId: window.id,
              }}
              ref={this.gridRef}
            >
              {ThumbnailCanvasGrouping}
            </List>
          )}
        </AutoSizer>
      </Paper>
    );
  }
}

ThumbnailNavigation.propTypes = {
  canvasGroupings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  canvasIndex: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  position: PropTypes.string.isRequired,
  setCanvas: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
