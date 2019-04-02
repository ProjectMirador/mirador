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
    setCanvas(e.currentTarget.dataset.windowid, parseInt(e.currentTarget.dataset.canvasIndex, 10));
  }

  /**
   * Determines whether the current index is the rendered canvas, providing
   * a useful class.
   */
  currentCanvasClass(canvasIndices) {
    const { data } = this.props;
    const { window } = data;
    if (canvasIndices.includes(window.canvasIndex)) return 'current-canvas';
    return '';
  }

  /** */
  render() {
    const {
      index, style, data, classes,
    } = this.props;
    const {
      canvasGroupings, window, position, height,
    } = data;
    const currentIndex = index;
    const currentGroupings = canvasGroupings.groupings()[currentIndex];
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
          data-windowid={window.id}
          data-canvas-index={currentGroupings[0].index}
          onKeyUp={this.setCanvas}
          onClick={this.setCanvas}
          tabIndex={-1}
          style={{
            display: 'inline-block',
            height: (position === 'far-right') ? '100%' : `${height - SPACING}px`,
            whiteSpace: 'nowrap',
            width: (position === 'far-bottom') ? 'auto' : `${style.width}px`,
          }}
          className={classNames(
            ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${currentIndex}`, this.currentCanvasClass(currentGroupings.map(canvas => canvas.index))]),
            classes.canvas,
            {
              [classes.currentCanvas]: currentGroupings
                .map(canvas => canvas.index).includes(window.canvasIndex),
            },
          )}
        >
          {currentGroupings.map((canvas, i) => (
            <CaptionedCanvasThumbnail
              key={canvas.id}
              canvas={canvas}
              height={(position === 'far-right') ? style.height - SPACING : height - (1.5 * SPACING)}
            />
          ))}
        </div>
      </div>
    );
  }
}

ThumbnailCanvasGrouping.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  index: PropTypes.number.isRequired,
  setCanvas: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
