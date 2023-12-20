import { createRef, Component } from 'react';
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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.nextCanvas = this.nextCanvas.bind(this);
    this.previousCanvas = this.previousCanvas.bind(this);
    this.gridRef = createRef();
  }

  /**
   * If the view has changed and the thumbnailNavigation is open, recompute all
   * of the grids
   */
  componentDidUpdate(prevProps) {
    const { canvasIndex, position, view } = this.props;
    if (prevProps.view !== view && position !== 'off') {
      this.gridRef.current.resetAfterIndex(0);
    }
    if (prevProps.canvasIndex !== canvasIndex) {
      let index = canvasIndex;
      if (view === 'book') index = Math.ceil(index / 2);
      this.gridRef.current.scrollToItem(index, 'center');
    }
  }

  /** */
  handleKeyDown(e) {
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
   * When on right, row height
   * When on bottom, column width
   */
  calculateScaledSize(index) {
    const { thumbnailNavigation, canvasGroupings, position } = this.props;
    const canvases = canvasGroupings[index];
    if (!canvases) return thumbnailNavigation.width + this.spacing;

    const world = new CanvasWorld(canvases);
    const bounds = world.worldBounds();
    switch (position) {
      case 'far-right': {
        const calc = Math.floor(
          this.calculatingWidth(canvases.length) * bounds[3] / bounds[2],
        );
        if (!Number.isInteger(calc)) return thumbnailNavigation.width + this.spacing;
        return calc + this.spacing;
      }
      // Default case bottom
      default: {
        if (bounds[3] === 0) return thumbnailNavigation.width + this.spacing;
        const calc = Math.ceil(
          (thumbnailNavigation.height - this.scrollbarSize - this.spacing - 4)
           * bounds[2] / bounds[3],
        );
        return calc;
      }
    }
  }

  /** */
  calculatingWidth(canvasesLength) {
    const { thumbnailNavigation } = this.props;
    if (canvasesLength === 1) {
      return thumbnailNavigation.width;
    }
    return thumbnailNavigation.width * 2;
  }

  /** */
  rightWidth() {
    const { view, thumbnailNavigation } = this.props;
    switch (view) {
      case 'book':
        return (thumbnailNavigation.width * 2);
      default:
        return thumbnailNavigation.width;
    }
  }

  /** */
  style() {
    const { position, thumbnailNavigation } = this.props;
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
          height: `${thumbnailNavigation.height}px`,
          width: '100%',
        };
    }
  }

  /** */
  areaHeight(height) {
    const { position, thumbnailNavigation } = this.props;
    switch (position) {
      case 'far-right':
        return height;
      // Default case bottom
      default:
        return thumbnailNavigation.height;
    }
  }

  /** */
  itemCount() {
    const { canvasGroupings } = this.props;
    return canvasGroupings.length;
  }

  /**
   */
  nextCanvas() {
    const { hasNextCanvas, setNextCanvas } = this.props;
    if (hasNextCanvas) {
      setNextCanvas();
    }
  }

  /**
   */
  previousCanvas() {
    const { hasPreviousCanvas, setPreviousCanvas } = this.props;
    if (hasPreviousCanvas) {
      setPreviousCanvas();
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
      position,
      thumbnailNavigation,
      viewingDirection,
    } = this.props;
    if (position === 'off') {
      return null;
    }
    const htmlDir = viewingDirection === 'right-to-left' ? 'rtl' : 'ltr';
    const itemData = {
      canvasGroupings,
      height: thumbnailNavigation.height - this.spacing - this.scrollbarSize,
      position,
    };
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
        onKeyDown={this.handleKeyDown}
        role="grid"
      >
        <div role="row" style={{ height: '100%', width: '100%' }}>
          <AutoSizer
            defaultHeight={100}
            defaultWidth={400}
          >
            {({ height, width }) => (
              <List
                direction={htmlDir}
                height={this.areaHeight(height)}
                itemCount={this.itemCount()}
                itemSize={this.calculateScaledSize}
                width={width}
                layout={(position === 'far-bottom') ? 'horizontal' : 'vertical'}
                itemData={itemData}
                ref={this.gridRef}
              >
                {ThumbnailCanvasGrouping}
              </List>
            )}
          </AutoSizer>
        </div>
      </Paper>
    );
  }
}

ThumbnailNavigation.propTypes = {
  canvasGroupings: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  canvasIndex: PropTypes.number.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  hasNextCanvas: PropTypes.bool,
  hasPreviousCanvas: PropTypes.bool,
  position: PropTypes.string.isRequired,
  setNextCanvas: PropTypes.func,
  setPreviousCanvas: PropTypes.func,
  t: PropTypes.func.isRequired,
  thumbnailNavigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  view: PropTypes.string,
  viewingDirection: PropTypes.string,
};

ThumbnailNavigation.defaultProps = {
  hasNextCanvas: false,
  hasPreviousCanvas: false,
  setNextCanvas: () => {},
  setPreviousCanvas: () => {},
  view: undefined,
  viewingDirection: '',
};
