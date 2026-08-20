import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import IIIFThumbnail from '../containers/IIIFThumbnail';
import { ThumbnailLabel } from './ThumbnailLabel';
import ns from '../config/css-ns';

const StyledCanvas = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'inline-block',
  whiteSpace: 'nowrap',
}));

const Grid = styled('div', { name: 'ThumbnailCanvasGrouping', slot: 'grid' })(({ ownerState }) => ({
  gridTemplateColumns: `repeat(${ownerState.columns}, auto)`,
}));

// Width of the selected-state border,
const FRAME_BORDER = 2;
// The gap between it and the thumbnail
const FRAME_OFFSET = 3;

const ThumbnailFrame = styled('div', { name: 'ThumbnailCanvasGrouping', slot: 'thumbnailFrame' })(({ theme, ownerState }) => {
  /**
   * Returns the border style for a given side of the thumbnail frame, based on whether the thumbnail is selected and whether it is on the correct side of the grouping.
   * @param {boolean} selected - Whether the thumbnail is selected.
   * @param {boolean} correctSide - Whether the thumbnail is on the correct side of the grouping.
   * @returns {string} The border style for the given side of the thumbnail frame.
   */
  const calcBorder = (selected, correctSide) => {
    if (!correctSide) {
      return 'none';
    }

    if (!selected) {
      return `${FRAME_BORDER}px solid transparent`;
    }

    return `${FRAME_BORDER}px solid ${theme.palette.primary.main}`;
  };

  return {
    borderTop: calcBorder(ownerState.selected, true),
    borderBottom: calcBorder(ownerState.selected, true),
    // Use start and end for RTL direction
    borderInlineStart: calcBorder(ownerState.selected, ownerState.isFirst),
    borderInlineEnd: calcBorder(ownerState.selected, ownerState.isLast),
    boxSizing: 'border-box',
    display: 'inline-block',
    paddingTop: FRAME_OFFSET,
    paddingBottom: FRAME_OFFSET,
    paddingInlineStart: ownerState.isFirst ? FRAME_OFFSET : 0,
    paddingInlineEnd: ownerState.isLast ? FRAME_OFFSET : 0,
  };
});

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
    const { index, columnIndex, style, canvasGroupings, position, currentCanvasId, showThumbnailLabels, textHeight } =
      this.props;
    // For Grid (horizontal), use columnIndex; for List (vertical), use index
    const itemIndex = columnIndex !== undefined ? columnIndex : index;
    const currentGroupings = canvasGroupings[itemIndex];
    const SPACING = 12;

    // In react-window v2 Grid (horizontal layout), columnWidth is passed as style.height
    // For List (vertical layout), rowHeight is passed as style.height
    const isHorizontal = position === 'far-bottom';
    let calculatedWidth = null;
    if (isHorizontal && style.height) {
      calculatedWidth = style.height - SPACING;
    } else if (Number.isInteger(style.width)) {
      calculatedWidth = style.width - SPACING;
    }

    const thumbnailMaxHeight = style.height
      -  (position === 'far-right' ? SPACING : 0)
      -  (showThumbnailLabels ? textHeight : 0);

    const isSelected = currentGroupings.map((canvas) => canvas.id).includes(currentCanvasId);

    return (
      <div
        style={{
          ...style,
          boxSizing: 'border-box',
          height: Number.isInteger(style.height) ? style.height - SPACING : null,
          left: Number.isInteger(style.left) ? style.left + SPACING / 2 : null,
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
            '&:hover': {
              outline: isSelected ? 0 : `2px solid ${theme.palette.action.hover}`,
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
          <Grid ownerState={{ columns: currentGroupings.length }}>
            {currentGroupings.map((canvas, i) => (
              <ThumbnailFrame
                key={canvas.id}
                ownerState={{
                  isFirst: i === 0,
                  isLast: i === currentGroupings.length - 1,
                  selected: isSelected,
                }}
              >
                <IIIFThumbnail resource={canvas} maxHeight={thumbnailMaxHeight} />
              </ThumbnailFrame>
            ))}
            {showThumbnailLabels &&
              currentGroupings.map((canvas) => <ThumbnailLabel key={canvas.id} resource={canvas} variant="navigation" />)}
          </Grid>
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
  textHeight: PropTypes.number,
};

ThumbnailCanvasGrouping.defaultProps = {
  columnIndex: undefined,
  index: undefined,
  textHeight: 0,
};
