import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import CanvasThumbnail from './CanvasThumbnail';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import * as actions from '../state/actions';
import ns from '../config/css-ns';
import 'react-virtualized/styles.css';

/**
 */
export class ThumbnailNavigation extends Component {
  /**
   */
  constructor(props) {
    super(props);

    const canvases = (props.manifest.manifestation)
      ? props.manifest.manifestation.getSequences()[0].getCanvases() : [];
    this.state = { canvases, manifest: props.manifest };

    this.cellRenderer = this.cellRenderer.bind(this);
    this.calculateScaledWidth = this.calculateScaledWidth.bind(this);
  }

  /**
   */
  static getDerivedStateFromProps(props, state) {
    // Any time the manifest changes,
    // Reset any parts of state that are tied to that manifest (canvases).
    if (props.manifest !== state.manifest) {
      return {
        canvases: props.manifest.manifestation.getSequences()[0].getCanvases(),
        manifest: props.manifest,
      };
    }
    return null;
  }

  /**
   * Determines whether the current index is the rendered canvas, providing
   * a useful class.
   */
  currentCanvasClass(canvasIndex) {
    const { window } = this.props;
    if (window.canvasIndex === canvasIndex) return 'current-canvas';
    return '';
  }

  /**
   * Renders a given "cell" for a react-virtualized Grid. Right now this is a
   * "canvas" but in the future for paged items, would be connected canvases.
   * https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md
   */
  cellRenderer(options) {
    const {
      columnIndex, key, style,
    } = options;
    const {
      window, setCanvas, config,
    } = this.props;
    const { canvases } = this.state;
    const canvas = canvases[columnIndex];
    return (
      <div
        key={key}
        style={style}
        className={ns('thumbnail-nav-container')}
      >
        <div
          onClick={() => setCanvas(window.id, canvas.index)}
          onKeyPress={() => setCanvas(window.id, canvas.index)}
          role="presentation"
          style={{
            width: style.width - 8,
          }}
          className={ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${canvas.index}`, this.currentCanvasClass(canvas.index)])}
        >
          <CanvasThumbnail
            imageUrl={new ManifestoCanvas(canvas).thumbnail(config.thumbnailNavigation.height)}
            height={config.thumbnailNavigation.height}
          />
        </div>
      </div>
    );
  }

  /**
   * calculateScaledWidth - calculates the scaled width of a column for a Grid
   * in this simple case, a column == canvas.
   */
  calculateScaledWidth(options) {
    const { config } = this.props;
    const { canvases } = this.state;
    const canvas = new ManifestoCanvas(canvases[options.index]);
    return Math.floor(config.thumbnailNavigation.height * canvas.aspectRatio) + 8;
  }

  /**
   * Renders things
   */
  render() {
    const { config, window } = this.props;
    const { canvases } = this.state;
    if (!window.thumbnailNavigationDisplayed) {
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
              columnCount={canvases.length}
              columnIndex={window.canvasIndex}
              columnWidth={this.calculateScaledWidth}
              height={config.thumbnailNavigation.height}
              rowCount={1}
              rowHeight={config.thumbnailNavigation.height}
              scrollToAlignment="center"
              scrollToColumn={window.canvasIndex}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

ThumbnailNavigation.propTypes = {
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */
const mapStateToProps = ({ config }) => ({
  config,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailNavigation
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(ThumbnailNavigation);
