import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CaptionedCanvasThumbnail from '../containers/CaptionedCanvasThumbnail';
import ns from '../config/css-ns';


/** */
export class ThumbnailCanvasGrouping extends PureComponent {
  /** */
  constructor(props) {
    super(props);
    this.setCanvas = this.setCanvas.bind(this);
  }

  /** */
  setCanvas(e) {
    const { setCanvas } = this.props;
    setCanvas(parseInt(e.currentTarget.dataset.canvasIndex, 10));
  }

  /**
   * Determines whether the current index is the rendered canvas, providing
   * a useful class.
   */
  currentCanvasClass(canvasIndices) {
    const { index } = this.props;
    if (canvasIndices.includes(index)) return 'current-canvas-grouping';
    return '';
  }

  /** */
  render() {
    const {
      index, style, data, classes, canvasIndex,
    } = this.props;
    const {
      canvasGroupings, position, height,
    } = data;
    const currentGroupings = canvasGroupings.groupings()[index];
    const SPACING = 8;
    return (
      <div
        style={{
          ...style,
          boxSizing: 'content-box',
          height: (Number.isInteger(style.height)) ? style.height - SPACING : null,
          left: style.left + SPACING,
          top: style.top + SPACING,
          width: (Number.isInteger(style.width)) ? style.width - SPACING : null,
        }}
        className={ns('thumbnail-nav-container')}
      >
        <div
          role="button"
          data-canvas-index={currentGroupings[0].index}
          onKeyUp={this.setCanvas}
          onClick={this.setCanvas}
          tabIndex={-1}
          style={{
            display: 'inline-block',
            height: (position === 'far-right') ? 'auto' : `${height - SPACING}px`,
            whiteSpace: 'nowrap',
            width: (position === 'far-bottom') ? 'auto' : `${style.width}px`,
          }}
          className={classNames(
            ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${index}`, this.currentCanvasClass(currentGroupings.map(canvas => canvas.index))]),
            classes.canvas,
            {
              [classes.currentCanvas]: currentGroupings
                .map(canvas => canvas.index).includes(canvasIndex),
            },
          )}
        >
          {currentGroupings.map((canvas, i) => (
            <CaptionedCanvasThumbnail
              key={canvas.id}
              canvas={canvas}
              height={(position === 'far-right') ? style.height - (1.5 * SPACING) : height - (1.5 * SPACING)}
            />
          ))}
        </div>
      </div>
    );
  }
}

ThumbnailCanvasGrouping.propTypes = {
  canvasIndex: PropTypes.number.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  index: PropTypes.number.isRequired,
  setCanvas: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
