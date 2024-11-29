import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import xor from 'lodash/xor';
import ResizeObserver from 'react-resize-observer';
import CircularProgress from '@mui/material/CircularProgress';
import CanvasOverlayVideo from '../lib/CanvasOverlayVideo';
import CanvasWorld from '../lib/CanvasWorld';
import CanvasAnnotationDisplay from '../lib/CanvasAnnotationDisplay';
import { VideosReferences } from '../plugins/VideosReferences';

/** AnnotationsOverlayVideo - based on AnnotationsOverlay */
export class AnnotationsOverlayVideo extends Component {
  /**
   * annotationsMatch - compares previous annotations to current to determine
   * whether to add a new updateCanvas method to draw annotations
   * @param  {Array} currentAnnotations
   * @param  {Array} prevAnnotations
   * @return {Boolean}
   */
  static annotationsMatch(currentAnnotations, prevAnnotations) {
    if (!currentAnnotations && !prevAnnotations) return true;
    if (
      (currentAnnotations && !prevAnnotations)
      || (!currentAnnotations && prevAnnotations)
    ) return false;

    if (currentAnnotations.length === 0 && prevAnnotations.length === 0) return true;
    if (currentAnnotations.length !== prevAnnotations.length) return false;
    return currentAnnotations.every((annotation, index) => {
      const newIds = annotation.resources.map(r => r.id);
      const prevIds = prevAnnotations[index].resources.map(r => r.id);
      if (newIds.length === 0 && prevIds.length === 0) return true;
      if (newIds.length !== prevIds.length) return false;

      if ((annotation.id === prevAnnotations[index].id) && (isEqual(newIds, prevIds))) {
        return true;
      }
      return false;
    });
  }

  /** @private */
  static isAnnotationInTemporalSegment(resource, time) {
    const temporalfragment = resource.temporalfragmentSelector;
    if (temporalfragment && temporalfragment.length > 0) {
      const start = temporalfragment[0] || 0;
      const end = (temporalfragment.length > 1) ? temporalfragment[1] : Number.MAX_VALUE;
      if (start <= time && time < end) {
        //
      } else {
        return false;
      }
    }
    return true;
  }

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    // eslint-disable-next-line react/no-unused-class-component-methods
    this.drawAnnotations = true; // TODO force
    // eslint-disable-next-line react/no-unused-class-component-methods
    this.highlightAllAnnotations = true; // TODO force
    // eslint-disable-next-line react/no-unused-class-component-methods
    this.drawSearchAnnotations = true; // TODO force

    this.ref = createRef();
    VideosReferences.set(props.windowId, this);
    this.canvasOverlay = null;
    // An initial value for the updateCanvas method
    this.updateCanvas = () => {};
    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onCanvasMouseMove = debounce(this.onCanvasMouseMove.bind(this), 10);
    this.onCanvasExit = this.onCanvasExit.bind(this);

    this.onVideoTimeUpdate = this.onVideoTimeUpdate.bind(this);
    this.onVideoLoadedMetadata = this.onVideoLoadedMetadata.bind(this);
    this.onVideoWaiting = this.onVideoWaiting.bind(this);
    this.onVideoPlaying = this.onVideoPlaying.bind(this);

    this.onCanvasResize = this.onCanvasResize.bind(this);

    const { onFunctionsReady } = this.props;

    onFunctionsReady({
      onPlay: this.onVideoPlaying,
    });

    this.imagesLoading = [];
    this.imagesReady = [];

    const { videoTarget: temporalfragment } = this.props;
    if (temporalfragment && temporalfragment.length > 0) {
      this.temporalOffset = temporalfragment[0] || 0;
    } else {
      this.temporalOffset = 0;
    }
    // eslint-disable-next-line react/no-unused-class-component-methods
    this.currentTimeNearestAnnotationId = null;

    this.state = {
      showProgress: false,
    };
  }

  /**
   * React lifecycle event
   */
  componentDidMount() {
    this.initializeViewer();
  }

  /** */
  componentDidUpdate(prevProps) {
    const {
      canvasWorld,
      currentTime,
      drawAnnotations,
      drawSearchAnnotations,
      annotations, searchAnnotations,
      hoveredAnnotationIds, selectedAnnotationId,
      highlightAllAnnotations,
      paused,
      seekToTime,
    } = this.props;

    let prevVideoPausedState;

    this.initializeViewer();
    //     const promise = this.video.play();
    //     if (promise !== undefined) {
    //       promise.catch((e) => {});
    //     }
    //   } else if (!this.video.paused && paused) {
    //     this.video.pause();
    //   }
    //   if (seekToTime !== prevProps.seekToTime) {
    //     if (seekToTime !== undefined) {
    //       this.seekTo(seekToTime, true);
    //       return;
    //     }
    //   }
    //   if (this.video.seeking) {
    //     return;
    //   }
    //   if (currentTime !== prevProps.currentTime) {
    //     if (paused && this.video.paused) {
    //       this.video.currentTime = currentTime - this.temporalOffset;
    //     }
    //   }
    // }

    const annotationsUpdated = !AnnotationsOverlayVideo.annotationsMatch(annotations, prevProps.annotations);
    // eslint-disable-next-line max-len
    const searchAnnotationsUpdated = !AnnotationsOverlayVideo.annotationsMatch(searchAnnotations, prevProps.searchAnnotations);

    const hoveredAnnotationsUpdated = (
      xor(hoveredAnnotationIds, prevProps.hoveredAnnotationIds).length > 0
    );

    if (this.canvasOverlay && this.canvasOverlay.canvas && hoveredAnnotationsUpdated) {
      if (hoveredAnnotationIds.length > 0) {
        this.canvasOverlay.canvas.style.cursor = 'pointer';
      } else {
        this.canvasOverlay.canvas.style.cursor = '';
      }
    }

    const selectedAnnotationsUpdated = selectedAnnotationId !== prevProps.selectedAnnotationId;
    if (selectedAnnotationsUpdated && selectedAnnotationId) {
      annotations.forEach((annotation) => {
        annotation.resources.forEach((resource) => {
          if (resource.id !== selectedAnnotationId) return;
          if (!canvasWorld.canvasIds.includes(resource.targetId)) return;
          const temporalfragment = resource.temporalfragmentSelector;
          if (temporalfragment && temporalfragment.length > 0 && this.player) {
            const seekto = temporalfragment[0] || 0;
            this.seekTo(seekto, false);
          }
        });
      });
    }

    // auto scroll
    // if (this.video && !this.video.paused) {
    //   let minElapsedTimeAfterStart = Number.MAX_VALUE;
    //   let candidateAnnotation;
    //   annotations.forEach((annotation) => {
    //     annotation.resources.forEach((resource) => {
    //       if (!canvasWorld.canvasIds.includes(resource.targetId)) return;
    //       if (AnnotationsOverlayVideo.isAnnotationInTemporalSegment(resource, currentTime)) {
    //         const temporalfragment = resource.temporalfragmentSelector;
    //         if (temporalfragment && temporalfragment.length > 0 && this.video) {
    //           const seekto = temporalfragment[0] || 0;
    //           const elapsedTimeAfterStart = currentTime - seekto;
    //           if (elapsedTimeAfterStart >= 0 && elapsedTimeAfterStart < minElapsedTimeAfterStart) {
    //             minElapsedTimeAfterStart = elapsedTimeAfterStart;
    //             candidateAnnotation = resource.resource;
    //           }
    //         }
    //       }
    //     });
    //   });
    //   if (candidateAnnotation) {
    //     if (candidateAnnotation.id !== prevProps.selectedAnnotationId) {
    //       const {
    //         selectAnnotation,
    //         windowId,
    //       } = this.props;
    //       if (selectedAnnotationId !== candidateAnnotation.id) {
    //         selectAnnotation(windowId, candidateAnnotation.id);
    //       }
    //       this.currentTimeNearestAnnotationId = candidateAnnotation.id;
    //     }
    //   }
    // }

    const redrawAnnotations = drawAnnotations !== prevProps.drawAnnotations
      || drawSearchAnnotations !== prevProps.drawSearchAnnotations
      || highlightAllAnnotations !== prevProps.highlightAllAnnotations;

    if (
      searchAnnotationsUpdated
      || annotationsUpdated
      || selectedAnnotationsUpdated
      || hoveredAnnotationsUpdated
      || redrawAnnotations
    ) {
      this.updateCanvas = this.canvasUpdateCallback();
      this.updateCanvas();
    }
  }

  /**
   */
  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.video) {
      // this.video.removeEventListener('timeupdate', this.onVideoTimeUpdate);
      // this.video.removeEventListener('loadedmetadata', this.onVideoLoadedMetadata);
      // this.video.removeEventListener('waiting', this.onVideoWaiting);
      // this.video.removeEventListener('playing', this.onVideoPlaying);
      // this.video.removeEventListener('seeked', this.onVideoPlaying);
    }
    if (this.canvasOverlay && this.canvasOverlay.canvas) {
      this.canvasOverlay.canvas.removeEventListener('click', this.onCanvasClick);
      this.canvasOverlay.canvas.removeEventListener('mouseleave', this.onCanvasExit);
      this.canvasOverlay.canvas.removeEventListener('mousemove', this.onCanvasMouseMove);
    }
  }

  /** */
  onVideoTimeUpdate(event) {
    this.updateCanvas();
  }

  /**
   * @event event
   * */
  onVideoLoadedMetadata(event) { // eslint-disable-line class-methods-use-this
    // if (this.video) {
    //   const { currentTime } = this.props;
    //   const { temporalOffset } = this;
    //   this.video.currentTime = currentTime - temporalOffset;
    // }
  }

  /** */
  onVideoPlaying(event) {
    if (this.player && this.player.getCurrentTime() !== 0) {
      const { currentTime, seekToTime } = this.props;
      const currentTimeToVideoTime = currentTime - this.temporalOffset;
      const diff = Math.abs(currentTimeToVideoTime - this.player.getCurrentTime());
      const acceptableDiff = 1; // sec.
      // if (diff > acceptableDiff && seekToTime === undefined) {
      // TODO Remove seekToTime because it introduce problem and i dont know why it is used
      if (diff > acceptableDiff) {
        this.seekTo(currentTime, true);
      }
    }
    this.setState({ showProgress: false });
  }

  /** */
  onVideoWaiting(event) {
    this.setState({ showProgress: true });
  }

  /**
   * @event click event
   * */
  onCanvasClick(event) {
    const { canvas: canvas_, canvasWorld, currentTime } = this.props;

    const scale = (this.canvasOverlay ? this.canvasOverlay.scale : 1) || 1;
    const point = { x: event.layerX / scale, y: event.layerY / scale };

    const canvas = this.isCanvasSizeSpecified() ? canvasWorld.canvasAtPoint(point) : canvas_;
    if (!canvas) return;

    // get all the annotations that contain the click
    // const currentTime = this.video ? this.video.currentTime : undefined;
    const annos = this.annotationsAtPoint(canvas, point, currentTime);

    if (annos.length > 0) {
      event.preventDefaultAction = true; // eslint-disable-line no-param-reassign
    }

    if (annos.length === 1) {
      this.toggleAnnotation(annos[0].id);
    } else if (annos.length > 0) {
      /**
       * Try to find the "right" annotation to select after a click.
       *
       * This is perhaps a naive method, but seems to deal with rectangles and SVG shapes:
       *
       * - figure out how many points around a circle are inside the annotation shape
       * - if there's a shape with the fewest interior points, it's probably the one
       *       with the closest boundary?
       * - if there's a tie, make the circle bigger and try again.
       */
      const annosWithClickScore = (radius) => {
        const degreesToRadians = Math.PI / 180;

        return (anno) => {
          let score = 0;
          for (let degrees = 0; degrees < 360; degrees += 1) {
            const x = Math.cos(degrees * degreesToRadians) * radius + point.x;
            const y = Math.sin(degrees * degreesToRadians) * radius + point.y;

            if (this.isAnnotationAtPoint(anno, canvas, { x, y })) score += 1;
          }

          return { anno, score };
        };
      };

      let annosWithScore = [];
      let radius = 1;
      annosWithScore = sortBy(annos.map(annosWithClickScore(radius)), 'score');

      const { width: canvasWidth, height: canvasHeight } = this.getCurrentCanvasSize();
      while (radius < Math.max(canvasWidth, canvasHeight)
        && annosWithScore[0].score === annosWithScore[1].score) {
        radius *= 2;
        annosWithScore = sortBy(annos.map(annosWithClickScore(radius)), 'score');
      }

      this.toggleAnnotation(annosWithScore[0].anno.id);
    }
  }

  /** */
  onCanvasMouseMove(event) {
    const {
      annotations,
      canvas: canvas_,
      canvasWorld,
      currentTime,
      hoverAnnotation,
      hoveredAnnotationIds,
      searchAnnotations,
      windowId,
    } = this.props;

    if (annotations.length === 0 && searchAnnotations.length === 0) return;

    const scale = (this.canvasOverlay ? this.canvasOverlay.scale : 1) || 1;
    const point = { x: event.layerX / scale, y: event.layerY / scale };

    const canvas = this.isCanvasSizeSpecified() ? canvasWorld.canvasAtPoint(point) : canvas_;
    if (!canvas) {
      hoverAnnotation(windowId, []);
      return;
    }

    // const currentTime = this.video ? this.video.currentTime : undefined;
    const annos = this.annotationsAtPoint(canvas, point, currentTime);

    if (xor(hoveredAnnotationIds, annos.map(a => a.id)).length > 0) {
      hoverAnnotation(windowId, annos.map(a => a.id));
    }
  }

  /** If the cursor leaves the canvas, wipe out highlights */
  onCanvasExit(event) {
    const { hoverAnnotation, windowId } = this.props;

    // a move event may be queued up by the debouncer
    this.onCanvasMouseMove.cancel();
    hoverAnnotation(windowId, []);
  }

  /**
   * Make sure that the annotation position on the Canvas is correct even when the video
   * display size is changed by opening and closing the side panel.
  */
  onCanvasResize(event) {
    this.updateCanvas();
  }

  /** @private */
  getCurrentCanvasSize() {
    const { canvas, canvasWorld } = this.props;
    const [
      _canvasX, _canvasY, _canvasWidth, _canvasHeight, // eslint-disable-line no-unused-vars
    ] = canvasWorld.canvasToWorldCoordinates(canvas.id);
    if (_canvasWidth && _canvasHeight) {
      return { height: _canvasHeight, width: _canvasWidth };
    }
    if (this.video) {
      const { videoWidth, videoHeight } = this.video;
      return { height: videoHeight, width: videoWidth };
    }
    return { height: 0, width: 0 };
  }

  /** @private - Returns the first Image body */
  getResourceImage(resource) {
    const imageSource = [];

    for (const body of resource.body.filter(b => b.type === 'Image')) {
      const src = body.id;
      if (this.imagesReady[src]) {
        imageSource.push(this.imagesReady[src]);
      } else if (!this.imagesLoading.includes(src)) {
        this.imagesLoading.push(src);
        const img = new Image();
        img.addEventListener('load', () => {
          this.imagesReady[src] = img;
        }, false);
        img.src = src;
      }
    }

    return imageSource[0];
  }

  /** @private */
  seekTo(seekTo, resume) {
    const { setCurrentTime, setPaused } = this.props;
    setPaused(true);
    this.player.seekTo(seekTo);
    setCurrentTime(seekTo);

    if (resume) {
      setPaused(false);
    }
    // this.video.addEventListener('seeked', function seeked(event) {
    //   event.currentTarget.removeEventListener(event.type, seeked);
    /* if (resume) {
        setPaused(false);
      } */
    // });
  }

  /** @private */
  isCanvasSizeSpecified() {
    const { canvas, canvasWorld } = this.props;
    const [
      _canvasX, _canvasY, _canvasWidth, _canvasHeight, // eslint-disable-line no-unused-vars
    ] = canvasWorld.canvasToWorldCoordinates(canvas.id);
    return _canvasWidth && _canvasHeight;
  }

  /** @private */
  initializeViewer() {
    if (this.canvasOverlay && this.canvasOverlay.canvas) {
      this.canvasOverlay.canvas.addEventListener('click', this.onCanvasClick);
      this.canvasOverlay.canvas.addEventListener('mouseleave', this.onCanvasExit);
      this.canvasOverlay.canvas.addEventListener('mousemove', this.onCanvasMouseMove);
    }
    if (this.canvasOverlay) return;

    const { videoRef, playerRef } = this.props;
    if (!videoRef) return;
    this.video = videoRef;
    this.player = playerRef;
    this.video.addEventListener('timeupdate', this.onVideoTimeUpdate);
    this.video.addEventListener('loadedmetadata', this.onVideoLoadedMetadata);
    this.video.addEventListener('waiting', this.onVideoWaiting);
    // this.video.addEventListener('playing', this.onVideoPlaying);
    this.video.addEventListener('seeked', this.onVideoPlaying);

    const { canvas, canvasWorld } = this.props;
    const canvasSize = canvasWorld.canvasToWorldCoordinates(canvas.id);
    this.canvasOverlay = new CanvasOverlayVideo(this.player, this.ref, canvasSize);

    this.updateCanvas = this.canvasUpdateCallback();

    // Prefetch annotation images
    const { annotations } = this.props;
    annotations.forEach((annotation) => {
      annotation.resources.forEach((resource) => {
        if (!canvasWorld.canvasIds.includes(resource.targetId)) return;
        this.getResourceImage(resource);
      });
    });
  }

  /** */
  canvasUpdateCallback() {
    return () => {
      this.canvasOverlay.clear();
      this.canvasOverlay.resize();
      this.canvasOverlay.canvasUpdate(this.renderAnnotations.bind(this));
    };
  }

  /** @private */
  isAnnotationAtPoint(resource, canvas, point, time) {
    const { canvasWorld } = this.props;

    const [canvasX, canvasY] = canvasWorld.canvasToWorldCoordinates(canvas.id);
    const relativeX = point.x - canvasX;
    const relativeY = point.y - canvasY;

    if (resource.temporalfragmentSelector) {
      if (!AnnotationsOverlayVideo.isAnnotationInTemporalSegment(resource, time)) {
        return false;
      }
    }

    if (resource.svgSelector) {
      const context = this.canvasOverlay.context2d;
      const { svgPaths } = new CanvasAnnotationDisplay({ resource });
      return [...svgPaths].some(path => (
        context.isPointInPath(new Path2D(path.attributes.d.nodeValue), relativeX, relativeY)
      ));
    }

    if (resource.fragmentSelector) {
      const [x, y, w, h] = resource.fragmentSelector;
      return (x <= relativeX && relativeX <= (x + w) && y <= relativeY && relativeY <= (y + h));
    }

    // If there is no svgSelector or fragmentSelector, assume that the target is the entire canvas.
    return true;
  }

  /** @private */
  annotationsAtPoint(canvas, point, time) {
    const { annotations, searchAnnotations } = this.props;

    const lists = [...annotations, ...searchAnnotations];
    const annos = flatten(lists.map(l => l.resources)).filter((resource) => {
      if (canvas.id !== resource.targetId) return false;

      return this.isAnnotationAtPoint(resource, canvas, point, time);
    });

    return annos;
  }

  /** */
  toggleAnnotation(id) {
    const {
      selectedAnnotationId,
      selectAnnotation,
      deselectAnnotation,
      windowId,
    } = this.props;

    if (selectedAnnotationId === id) {
      deselectAnnotation(windowId, id);
    } else {
      selectAnnotation(windowId, id);
    }
  }

  /**
   * annotationsToContext - converts anontations to a canvas context
   */
  annotationsToContext(annotations, palette) {
    const {
      highlightAllAnnotations, hoveredAnnotationIds, selectedAnnotationId, canvasWorld, currentTime,
    } = this.props;
    const context = this.canvasOverlay.context2d;
    const zoomRatio = 1;
    annotations.forEach((annotation) => {
      annotation.resources.forEach((resource) => {
        if (!canvasWorld.canvasIds.includes(resource.targetId)) return;
        if (!AnnotationsOverlayVideo.isAnnotationInTemporalSegment(resource, currentTime)) return;

        const imageSource = this.getResourceImage(resource);
        const offset = canvasWorld.offsetByCanvas(resource.targetId);
        const canvasSize = canvasWorld.canvasToWorldCoordinates(resource.targetId);
        const canvasAnnotationDisplay = new CanvasAnnotationDisplay({
          canvasSize,
          hovered: hoveredAnnotationIds.includes(resource.id),
          imageSource,
          offset,
          palette: {
            ...palette,
            default: {
              ...palette.default,
              ...(!highlightAllAnnotations && palette.hidden),
            },
          },
          resource,
          selected: selectedAnnotationId === resource.id,
          zoomRatio,
        });
        canvasAnnotationDisplay.toContext(context);
      });
    });
  }

  /** */
  renderAnnotations() {
    const {
      annotations,
      drawAnnotations,
      drawSearchAnnotations,
      searchAnnotations,
      palette,
    } = this.props;

    if (drawSearchAnnotations) {
      this.annotationsToContext(searchAnnotations, palette.search);
    }

    if (drawAnnotations) {
      this.annotationsToContext(annotations, palette.annotations);
    }
  }

  /**
   * Renders things
   */
  render() {
    const { showProgress } = this.state;
    const {
      currentTime,
      debug,
      paused,
      seekToTime,
      selectedAnnotationId,
    } = this.props;
    const circularProgress = (<CircularProgress style={{ left: '50%', position: 'absolute', top: '50%' }} />);
    return (
      <>
        <canvas
          ref={this.ref}
          style={{
            border: debug ? '6px solid yellow' : 'none',
            height: '100%',
            left: 0,
            position: 'relative',
            top: 0,
            width: '100%',
          }}
        />
        <ResizeObserver onResize={this.onCanvasResize} />
        { debug && (
        <div style={{
          bottom: 30,
          color: 'white',
          left: 0,
          position: 'absolute',
        }}
        >
          <span>
            {' '}
            Selected Annot
            {' '}
            {' '}
            {selectedAnnotationId}
            {' '}
          </span>
          <br />
          <span>
            {' '}
            Current Time
            {' '}
            {' '}
            {currentTime}
            {' '}
          </span>
          {' '}
          <br />
          <span>
            {' '}
            Player Time
            {' '}
            {' '}
            {this.player ? this.player.getCurrentTime() : 'player not ready'}
            {' '}
          </span>
          {' '}
          <br />
          <span>
            {' '}
            Seek Time
            {' '}
            {' '}
            {seekToTime}
            {' '}
          </span>
          {' '}
          <br />
          <span>
            {' '}
            Paused
            {' '}
            {' '}
            {paused ? 'Paused' : 'Not paused'}
            {' '}
          </span>
        </div>
        )}
        { showProgress && circularProgress }
      </>
    );
  }
}

AnnotationsOverlayVideo.defaultProps = {
  annotations: [],
  canvas: {},
  currentTime: 0,
  deselectAnnotation: () => {},
  drawAnnotations: true,
  drawSearchAnnotations: true,
  highlightAllAnnotations: false,
  hoverAnnotation: () => {},
  hoveredAnnotationIds: [],
  palette: {},
  paused: true,
  searchAnnotations: [],
  seekToTime: undefined,
  selectAnnotation: () => {},
  selectedAnnotationId: undefined,
  setCurrentTime: () => {},
  setPaused: () => {},
  videoTarget: [],
};

AnnotationsOverlayVideo.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  canvas: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  currentTime: PropTypes.number,
  debug: PropTypes.bool.isRequired,
  deselectAnnotation: PropTypes.func,
  drawAnnotations: PropTypes.bool,
  drawSearchAnnotations: PropTypes.bool,
  highlightAllAnnotations: PropTypes.bool,
  hoverAnnotation: PropTypes.func, // eslint-disable-line react/forbid-prop-types
  hoveredAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  onFunctionsReady: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  palette: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  paused: PropTypes.bool,
  playerRef: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  searchAnnotations: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  seekToTime: PropTypes.number,
  selectAnnotation: PropTypes.func,
  selectedAnnotationId: PropTypes.string,
  setCurrentTime: PropTypes.func,
  setPaused: PropTypes.func, // eslint-disable-line react/forbid-prop-types
  videoRef: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  videoTarget: PropTypes.arrayOf(PropTypes.number),
  windowId: PropTypes.string.isRequired,
};
