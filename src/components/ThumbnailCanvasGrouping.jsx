import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import IIIFThumbnail from '../containers/IIIFThumbnail';
import ns from '../config/css-ns';

const StyledCanvas = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  color: theme.palette.common.white,
  cursor: 'pointer',
  display: 'inline-block',
  whiteSpace: 'nowrap',
}));
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
    const { index, columnIndex, style, canvasGroupings, position, currentCanvasId, showThumbnailLabels } = this.props;
    // For Grid (horizontal), use columnIndex; for List (vertical), use index
    const itemIndex = columnIndex !== undefined ? columnIndex : index;
    const currentGroupings = canvasGroupings[itemIndex];
    const SPACING = 12;

    const isSelected = currentGroupings.map((canvas) => canvas.id).includes(currentCanvasId);

    return (
      <div
        style={{
          ...style,
          boxSizing: 'border-box',
          height: Number.isInteger(style.height) ? style.height - SPACING : null,
          left: Number.isInteger(style.left) ? style.left + SPACING / 2 : null,
          padding: SPACING / 2,
          top: Number.isInteger(style.top) ? style.top + SPACING / 2 : null,
          width: Number.isInteger(style.width) ? style.width - SPACING : null,
        }}
        className={ns('thumbnail-nav-container')}
        role="gridcell"
        aria-selected={isSelected}
        aria-colindex={itemIndex + 1}
      >
        <StyledCanvas
          role="button"
          data-canvas-id={currentGroupings[0].id}
          data-canvas-index={currentGroupings[0].index}
          onClick={this.setCanvas}
          tabIndex={-1}
          sx={(theme) => ({
            '&:not(:hover)': {
              outline: isSelected ? `2px solid ${theme.palette.primary.main}` : 0,
              ...(isSelected && {
                outlineOffset: '3px',
              }),
            },
            '&:hover': {
              outline: isSelected ? `2px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.action.hover}`,
              outlineOffset: isSelected ? '3px' : '-2px',
            },
            height: position === 'far-right' ? 'auto' : `${style.height}px`,
            width: position === 'far-bottom' ? 'auto' : `${style.width}px`,
          })}
          className={classNames(
            ns([
              'thumbnail-nav-canvas',
              `thumbnail-nav-canvas-${itemIndex}`,
              this.currentCanvasClass(currentGroupings.map((canvas) => canvas.index)),
            ]),
          )}
        >
          {currentGroupings.map((canvas, i) => (
            <IIIFThumbnail
              key={canvas.id}
              resource={canvas}
              labelled={showThumbnailLabels}
              maxHeight={position === 'far-right' ? style.height - SPACING : style.height}
              variant="inside"
            />
          ))}
        </StyledCanvas>
      </div>
    );
  }
}

ThumbnailCanvasGrouping.propTypes = {
  canvasGroupings: PropTypes.array.isRequired,
  columnIndex: PropTypes.number,
  currentCanvasId: PropTypes.string.isRequired,
  index: PropTypes.number,
  position: PropTypes.string.isRequired,
  setCanvas: PropTypes.func.isRequired,
  showThumbnailLabels: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
};

ThumbnailCanvasGrouping.defaultProps = {
  columnIndex: undefined,
  index: undefined,
};
