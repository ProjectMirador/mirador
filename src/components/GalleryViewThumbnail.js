import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import AnnotationIcon from '@mui/icons-material/CommentSharp';
import SearchIcon from '@mui/icons-material/SearchSharp';
import { InView } from 'react-intersection-observer';
import IIIFThumbnail from '../containers/IIIFThumbnail';

const Root = styled('div', { name: 'GalleryView', slot: 'thumbnail' })(({ ownerState, theme }) => ({
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  border: '2px solid transparent',
  ...(ownerState.selected && {
    borderColor: theme.palette.primary.main,
  }),
  ...(!ownerState.selected && ownerState.searchAnnotationsCount > 0 && {
    borderColor: theme.palette.action.selected,
  }),
  cursor: 'pointer',
  display: 'inline-block',
  margin: theme.spacing(1, 0.5),
  maxHeight: ownerState.config.height + 45,
  minWidth: '60px',
  overflow: 'hidden',
  padding: theme.spacing(0.5),
  position: 'relative',
  width: 'min-content',
}));

const StyledChipsContainer = styled('div', { name: 'GalleryView', slot: 'chipArea' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
  position: 'absolute',
  right: 0,
  top: 0,
}));

const AnnotationChip = styled(Chip, { name: 'GalleryView', slot: 'chip' })(({ theme }) => ({
  backgroundColor: theme.palette.annotations.chipBackground,
  opacity: 0.875,
  textAlign: 'right',
}));

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export class GalleryViewThumbnail extends Component {
  /** */
  constructor(props) {
    super(props);

    this.myRef = createRef();
    this.state = { requestedAnnotations: false };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  componentDidMount() {
    const { selected } = this.props;
    if (selected) {
      this.myRef.current?.scrollIntoView(true);
    }
  }

  /** @private */
  handleSelect() {
    const {
      canvas, selected, setCanvas, focusOnCanvas,
    } = this.props;

    if (selected) {
      focusOnCanvas();
    } else {
      setCanvas(canvas.id);
    }
  }

  /** @private */
  handleKey(event) {
    const {
      canvas, setCanvas, focusOnCanvas,
    } = this.props;

    this.keys = {
      enter: 'Enter',
      space: ' ',
    };

    this.chars = {
      enter: 13,
      space: 32,
    };

    const enterOrSpace = (
      event.key === this.keys.enter
      || event.which === this.chars.enter
      || event.key === this.keys.space
      || event.which === this.chars.space
    );

    if (enterOrSpace) {
      focusOnCanvas();
    } else {
      setCanvas(canvas.id);
    }
  }

  /** */
  handleIntersection(_inView, { isIntersecting }) {
    const {
      annotationsCount,
      requestCanvasAnnotations,
    } = this.props;

    const { requestedAnnotations } = this.state;

    if (
      !isIntersecting
      || annotationsCount === undefined
      || annotationsCount > 0
      || requestedAnnotations) return;

    this.setState({ requestedAnnotations: true });
    requestCanvasAnnotations();
  }

  /**
   * Renders things
   */
  render() {
    const {
      annotationsCount, searchAnnotationsCount,
      canvas, config, selected,
    } = this.props;

    return (
      <InView onChange={this.handleIntersection}>
        <Root
          ownerState={this.props}
          key={canvas.id || canvas.index}
          className={selected ? 'selected' : ''}
          onClick={this.handleSelect}
          onKeyUp={this.handleKey}
          ref={this.myRef}
          role="button"
          tabIndex={0}
        >
          <IIIFThumbnail
            resource={canvas}
            labelled
            variant="outside"
            maxHeight={config.height}
            maxWidth={config.width}
          >
            <StyledChipsContainer>
              {searchAnnotationsCount > 0 && (
                <AnnotationChip
                  icon={<SearchIcon fontSize="small" />}
                  label={searchAnnotationsCount}
                  size="small"
                />
              )}
              {annotationsCount > 0 && (
                <AnnotationChip
                  icon={<AnnotationIcon fontSize="small" />}
                  label={annotationsCount}
                  size="small"
                />
              )}
            </StyledChipsContainer>
          </IIIFThumbnail>
        </Root>
      </InView>
    );
  }
}

GalleryViewThumbnail.propTypes = {
  annotationsCount: PropTypes.number,
  canvas: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  focusOnCanvas: PropTypes.func.isRequired,
  requestCanvasAnnotations: PropTypes.func,
  searchAnnotationsCount: PropTypes.number,
  selected: PropTypes.bool,
  setCanvas: PropTypes.func.isRequired,
};

GalleryViewThumbnail.defaultProps = {
  annotationsCount: undefined,
  config: {
    height: 100,
    width: null,
  },
  requestCanvasAnnotations: () => {},
  searchAnnotationsCount: 0,
  selected: false,
};
