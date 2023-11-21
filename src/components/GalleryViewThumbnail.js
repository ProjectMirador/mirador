import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import AnnotationIcon from '@mui/icons-material/CommentSharp';
import SearchIcon from '@mui/icons-material/SearchSharp';
import { InView } from 'react-intersection-observer';
import MiradorCanvas from '../lib/MiradorCanvas';
import IIIFThumbnail from '../containers/IIIFThumbnail';

const StyledGalleryViewItem = styled('div')({
});

const StyledChipsContainer = styled('div')(() => ({
  opacity: 0.875,
  position: 'absolute',
  right: 0,
  textAlign: 'right',
  top: 0,
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

  // eslint-disable-next-line require-jsdoc
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

    const miradorCanvas = new MiradorCanvas(canvas);

    return (
      <InView onChange={this.handleIntersection}>
        <StyledGalleryViewItem
          key={canvas.index}
          className={selected ? 'selected' : ''}
          sx={{
            '&:focus': {
              outline: 'none',
            },
            '&:hover': {
              bgcolor: 'action.hover',
            },
            border: '2px solid',
            borderColor: selected || searchAnnotationsCount > 0 ? 'primary.main' : 'transparent',
            cursor: 'pointer',
            display: 'inline-block',
            margin: 1,
            maxHeight: config.height + 45,
            minWidth: '60px',
            overflow: 'hidden',
            padding: 0.5,
            position: 'relative',
            width: 'min-content',
          }}
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
            maxWidth={config.width}
            maxHeight={config.height}
            sx={{
              margin: '0 auto',
              maxWidth: `${() => Math.ceil(config.height * miradorCanvas.aspectRatio)}px`,
            }}
          >
            <StyledChipsContainer>
              {searchAnnotationsCount > 0 && (
                <Chip
                  avatar={(
                    <Avatar sx={{
                      backgroundColor: 'transparent',
                    }}
                    >
                      <SearchIcon fontSize="small" />
                    </Avatar>
                  )}
                  label={searchAnnotationsCount}
                  sx={{
                    '&.Mui-selected .MuiAvatar-circle': {
                      bgcolor: 'highlights.primary',
                    },
                    marginTop: 2,
                    typography: 'caption',
                  }}
                  size="small"
                />
              )}
              {annotationsCount > 0 && (
                <Chip
                  avatar={(
                    <Avatar sx={{
                      backgroundColor: 'transparent',
                    }}
                    >
                      <AnnotationIcon
                        sx={{
                          height: '1rem',
                          width: '1rem',
                        }}
                      />
                    </Avatar>
                  )}
                  label={annotationsCount}
                  sx={{
                    '&.Mui-selected .MuiAvatar-circle': {
                      bgcolor: 'highlights.primary',
                    },
                    typography: 'caption',
                  }}
                  size="small"
                />
              )}
            </StyledChipsContainer>
          </IIIFThumbnail>
        </StyledGalleryViewItem>
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
