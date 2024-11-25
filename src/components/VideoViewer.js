import flatten from 'lodash/flatten';
import flattenDeep from 'lodash/flattenDeep';
import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'react-resize-observer';
import AnnotationItem from '../lib/AnnotationItem';
import AnnotationsOverlayVideo from '../containers/AnnotationsOverlayVideo';
import WindowCanvasNavigationControlsVideo from '../containers/WindowCanvasNavigationControlsVideo';
import ReactPlayer from '@celluloid/react-player';

export const ORIENTATIONS = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait',
};

/** */
export class VideoViewer extends Component {
  /** */
  constructor(props) {
    super(props);
    this.videoRef = createRef();
    this.playerRef = createRef();

    this.state = {
      containerRatio: 1,
      start: 0,
      time: 0,
    };

  }

  /** */
  componentDidMount() {
    const { setPaused, setHasTextTrack } = this.props;
    setPaused(true);

    // TODO Implement text track support
   /* const video = this.videoRef.current;
    if (video && video.textTracks.length > 0) setHasTextTrack(true);*/
  }

  /** */
  componentDidUpdate(prevProps) {
    const {
      canvas, currentTime, muted, paused,
      setCurrentTime, setPaused,
      textTrackDisabled,
    } = this.props;

    if (paused !== prevProps.paused) {
      if (currentTime === 0) {
        this.timerReset();
      }
      if (paused) {
        this.timerStop();
      } else {
        this.timerStart();
      }
    }
    if (currentTime !== prevProps.currentTime) {
      const duration = canvas.getDuration();
      if (duration && duration < currentTime) {
        if (!paused) {
          setPaused(true);
          setCurrentTime(0);
          this.timerReset();
        }
      }
    }
    // const video = this.videoRef.current;
    // if (video) {
    //   if (video.muted !== muted) {
    //     video.muted = muted;
    //   }
    //   // TODO Implement text track support
    //  /* if (video.textTracks && video.textTracks.length > 0) {
    //     const newMode = textTrackDisabled ? 'disabled' : 'showing';
    //     if (video.textTracks[0].mode !== newMode) {
    //       video.textTracks[0].mode = newMode;
    //     }
    //   }*/
    // }
  }

  /** */
  componentWillUnmount() {
    this.timerStop();
  }

  /** */
  timerStart() {
    const { currentTime } = this.props;
    this.setState({
      start: Date.now() - currentTime * 1000,
      time: currentTime * 1000,
    });
    this.timer = setInterval(() => {
      const { setCurrentTime } = this.props;
      this.setState(prevState => ({
        time: Date.now() - prevState.start,
      }));
      const { time } = this.state;
      setCurrentTime(time / 1000);
    }, 100);
  }

  /** */
  timerStop() {
    clearInterval(this.timer);
  }

  /** */
  timerReset() {
    this.setState({ time: 0 });
  }


  setContainerRatio = (ref) => {
    this.setState({ containerRatio: ref.width / ref.height });
  };

  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  render() {
    const {
      annotations, canvas, currentTime, videoOptions, windowId, paused,
    } = this.props;

    const { containerRatio } = this.state;

    const videoResources = flatten(
        flattenDeep([
          canvas.getContent().map(annot => {
            const annotaion = new AnnotationItem(annot.__jsonld);
            const temporalfragment = annotaion.temporalfragmentSelector;
            if (temporalfragment && temporalfragment.length > 0) {
              const start = temporalfragment[0] || 0;
              const end = (temporalfragment.length > 1) ? temporalfragment[1] : Number.MAX_VALUE;
              if (start <= currentTime && currentTime < end) {
                //
              } else {
                return {};
              }
            }
            const body = annot.getBody();
            return { body, temporalfragment };
          }),
        ]).filter((resource) => resource.body && resource.body[0].__jsonld && resource.body[0].__jsonld.type === 'Video'),
    );

    // const vttContent = annotations
    //     .flatMap(annoPage => annoPage.json.items.map(anno => anno.body))
    //     .flat().filter((body) => body.format === 'text/vtt');

    // Only one video can be displayed at a time in this implementation.
    const len = videoResources.length;
    const video = len > 0
        ? videoResources[len - 1].body[0] : null;
    const videoTargetTemporalfragment = len > 0
        ? videoResources[len - 1].temporalfragment : [];

    let videoAspectRatio;

    if (video) {
      videoAspectRatio = video.getWidth() / video.getHeight();
    }

    const debugPositionning = true;

    return (
        <div
            className="outerContainer"
            style={{
              border: debugPositionning ? '6px solid blue' : 'none',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
        >
          {video && (
              <>
                <div style={{
                  border: debugPositionning ? '6px solid red' : 'none',
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '122px', // TODO Space for navigation controls
                  flexDirection: 'column',
                  backgroundColor: 'black',
                }}
                >
                  <ResizeObserver onResize={this.setContainerRatio} />
                  <div style={{
                    border: debugPositionning ? '6px solid green' : 'none',
                    height: 'auto',
                    maxWidth: '100%',
                    width: '100%',
                    maxHeight: '100%',
                  }}
                  >
                    {/*<video
                        style={{
                          border: debugPositionning ? '6px solid pink' : 'none',
                          // top: 0,
                          position: 'absolute', // 'absolute' or 'block
                          width: (containerRatio < videoAspectRatio ? '100%' : 'auto'),
                          height: (containerRatio < videoAspectRatio ? 'auto' : '100%'),
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
                        key={video.id}
                        ref={this.videoRef}
                        {...videoOptions}
                    >
                      <source src={video.id} type={video.getFormat()} />
                      {vttContent.map(vttc => (
                          <track key={vttc.id} src={vttc.id} srcLang={vttc.language} />))}
                    </video>*/}
                    <ReactPlayer
                        // width={(containerRatio < videoAspectRatio ? '100%' : 'auto')}
                        // height={(containerRatio < videoAspectRatio ? 'auto' : '100%')}width={(containerRatio < videoAspectRatio ? '100%' : 'auto')}
                        width={'100%'}
                        height={'100%'}
                        ref={this.playerRef}
                        url={video.id}
                        controls={false} // Hide default controls
                        pip={false}
                        playbackRate={1}
                        playing={!paused}
                        config={{
                          peertube: {
                            controls: 0,
                            mode: 'p2p-media-loader',
                          },
                        }}
                        style={{
                          border: debugPositionning ? '6px solid pink' : 'none',
                          // position: 'absolute', // 'absolute' or 'block
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: (containerRatio < videoAspectRatio ? '100%' : 'auto'),
                          height: (containerRatio < videoAspectRatio ? 'auto' : '100%'),
                        }}
                    />
                    { this.playerRef.current && (
                    <AnnotationsOverlayVideo
                        windowId={windowId}
                        videoRef={this.playerRef.current.getInternalPlayer()}
                        videoTarget={videoTargetTemporalfragment}
                        key={`${windowId} ${video.id}`}
                        highlightAllAnnotations
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'contain',
                          border: debugPositionning ? '6px solid yellow' : 'none',
                        }}
                    />
                    )}
                  </div>
                </div>
                <WindowCanvasNavigationControlsVideo windowId={windowId} />
              </>
          )}
        </div>
    );
  }

  /* eslint-enable jsx-a11y/media-has-caption */
}

VideoViewer.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  // eslint-disable-next-line react/forbid-prop-types
  canvas: PropTypes.object,
  captions: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  currentTime: PropTypes.number,
  muted: PropTypes.bool,
  paused: PropTypes.bool,
  setCurrentTime: PropTypes.func,
  setHasTextTrack: PropTypes.func,
  setPaused: PropTypes.func,
  textTrackDisabled: PropTypes.bool,
  videoOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};

VideoViewer.defaultProps = {
  annotations: [],
  canvas: {},
  captions: [],
  currentTime: 0,
  muted: false,
  paused: true,
  setCurrentTime: () => {
  },
  setHasTextTrack: () => {
  },
  setPaused: () => {
  },
  textTrackDisabled: true,
  videoOptions: {},
};
