import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IIIFThumbnail from '../containers/IIIFThumbnail';
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
    setCanvas(e.currentTarget.dataset.canvasId);
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
      index, style, data, classes, currentCanvasId,
    } = this.props;
    const {
      canvasGroupings, position, height,
    } = data;
    const currentGroupings = canvasGroupings[index];
    const SPACING = 8;
    return (
      <div
        style={{
          ...style,
          boxSizing: 'content-box',
          height: (Number.isInteger(style.height)) ? style.height - SPACING : null,
          left: (Number.isInteger(style.left)) ? style.left + SPACING : null,
          top: style.top + SPACING,
          width: (Number.isInteger(style.width)) ? style.width - SPACING : null,
        }}
        className={ns('thumbnail-nav-container')}
        role="gridcell"
        aria-colindex={index + 1}
      >
        <div
          role="button"
          data-canvas-id={currentGroupings[0].id}
          data-canvas-index={currentGroupings[0].index}
          onKeyUp={this.setCanvas}
          onClick={this.setCanvas}
          tabIndex={-1}
          style={{
            height: (position === 'far-right') ? 'auto' : `${height - SPACING}px`,
            width: (position === 'far-bottom') ? 'auto' : `${style.width}px`,
          }}
          className={classNames(
            ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${index}`, this.currentCanvasClass(currentGroupings.map(canvas => canvas.index))]),
            classes.canvas,
            {
              [classes.currentCanvas]: currentGroupings
                .map(canvas => canvas.id).includes(currentCanvasId),
            },
          )}
        >
          {currentGroupings.map((canvas, i) => (
            <IIIFThumbnail
              key={canvas.id}
              resource={canvas}
              labelled
              maxHeight={(position === 'far-right') ? style.height - (1.5 * SPACING) : height - (1.5 * SPACING)}
              variant="inside"
            />
          ))}
        </div>
      </div>
    );
  }
}

ThumbnailCanvasGrouping.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  currentCanvasId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  index: PropTypes.number.isRequired,
  setCanvas: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
