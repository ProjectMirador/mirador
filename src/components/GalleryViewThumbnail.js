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

const GalleryViewItem = styled('div')(({
  theme, selected, hasAnnotations, config,
}) => ({
  '&:focus': {
    outline: 'none',
  },
  '&:has(annotations)': {
    border: `2px solid ${theme.palette.action.selected}`,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:selected, &:selected:has(annotations)': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  border: '2px solid transparent',
  cursor: 'pointer',
  display: 'inline-block',
  margin: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
  maxHeight: config.height + 45,
  minWidth: '60px',
  overflow: 'hidden',
  padding: theme.spacing(0.5),
  position: 'relative',
  width: 'min-content',

  ...(selected && {
    border: `2px solid ${theme.palette.primary.main}`,
  }),

  ...(hasAnnotations && {
    border: `2px solid ${theme.palette.action.selected}`,
  }),
}));

const SearchChip = styled(Chip)(({ theme }) => ({
  ...theme.typography.caption,
  '&.Mui-selected .MuiAvatar-circle': {
    backgroundColor: theme.palette.highlights?.primary,
  },
  marginTop: 2,
}));

const AnnotationsChip = styled(Chip)(({ theme }) => ({
  ...theme.typography.caption,
}));

const AvatarIcon = styled(Avatar)(() => ({
  backgroundColor: 'transparent',
}));

const ChipsContainer = styled('div')(() => ({
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
        <GalleryViewItem
          key={canvas.index}
          sx={{
            ...(selected && {
              border: `2px solid ${theme => theme.palette.primary.main}`,
            }),
            ...(searchAnnotationsCount > 0 && {
              border: `2px solid ${theme => theme.palette.action.selected}`,
            }),
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
            <ChipsContainer>
              {searchAnnotationsCount > 0 && (
                <SearchChip
                  avatar={(
                    <AvatarIcon>
                      <SearchIcon fontSize="small" />
                    </AvatarIcon>
                  )}
                  label={searchAnnotationsCount}
                  sx={{
                    '&.Mui-selected .MuiAvatar-circle': {
                      backgroundColor: theme => theme.palette.highlights?.primary,
                    },
                  }}
                  size="small"
                />
              )}
              {annotationsCount > 0 && (
                <AnnotationsChip
                  avatar={(
                    <AvatarIcon>
                      <AnnotationIcon
                        sx={{
                          height: '1rem',
                          width: '1rem',
                        }}
                      />
                    </AvatarIcon>
                  )}
                  label={annotationsCount}
                  sx={{
                    '&.Mui-selected .MuiAvatar-circle': {
                      backgroundColor: theme => theme.palette.highlights?.primary,
                    },
                  }}
                  size="small"
                />
              )}
            </ChipsContainer>
          </IIIFThumbnail>
        </GalleryViewItem>
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
