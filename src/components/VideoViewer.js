import flatten from 'lodash/flatten';
import flattenDeep from 'lodash/flattenDeep';
import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'react-resize-observer';
import ReactPlayer from '@celluloid/react-player';
import AnnotationItem from '../lib/AnnotationItem';
import AnnotationsOverlayVideo from '../containers/AnnotationsOverlayVideo';
import WindowCanvasNavigationControlsVideo from '../containers/WindowCanvasNavigationControlsVideo';

/** */
export class VideoViewer extends Component {
  /** */
  constructor(props) {
    super(props);
    this.playerRef = createRef();

    this.state = {
      containerRatio: 1,
      handleVideoEventFunctions: {
        onPlay: () => {
          console.log('onPlay');
        },
      },
      start: 0,
      time: 0,
    };
  }

  /** */
  componentDidMount() {
    const { setPaused } = this.props;
    setPaused(true);

    // TODO Implement text track support
  }

  /** */
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate in VideoViewer.js');
    const {
      canvas, currentTime, paused,
      setCurrentTime, setPaused,
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
  }

  /** */
  componentWillUnmount() {
    this.timerStop();
  }

  /**
   * @param {S[string]} handleVideoEventFunctions
   */
  handleVideoEventFunctions = (handleVideoEventFunctions) => {
    this.setState({ handleVideoEventFunctions });
  };

  setContainerRatio = (ref) => {
    this.setState({ containerRatio: ref.width / ref.height });
  };

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

  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  render() {
    const {
      canvas, currentTime, windowId, paused, muted, debug,
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

    const videoStyle = {
      height: (videoAspectRatio < containerRatio ? '100%' : 'auto'),
      width: (videoAspectRatio < containerRatio ? 'auto' : '100%'),
    };

    const playerStyle = {
      aspectRatio: `${videoAspectRatio}`,
      height: (videoAspectRatio < containerRatio ? '100%' : 'auto'),
      width: (videoAspectRatio < containerRatio ? 'auto' : '100%'),
    };

    const { handleVideoEventFunctions } = this.state;

    return (
      <div
        className="outerContainer"
        style={{
          border: debug ? '6px solid blue' : 'none',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        {video && (
        <>
          <div style={{
            alignItems: 'center',
            backgroundColor: 'black',
            border: debug ? '6px solid red' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: '122px', // TODO Space for navigation controls
            position: 'relative',
            width: '100%',
          }}
          >
            <ResizeObserver onResize={this.setContainerRatio} />
            <div style={{
              aspectRatio: playerStyle.aspectRatio,
              border: debug ? '6px solid green' : 'none',
              height: playerStyle.height,
              maxHeight: '100%',
              maxWidth: '100%',
              width: playerStyle.width,
            }}
            >
              <ReactPlayer
                width={videoStyle.width}
                height={videoStyle.height}
                ref={this.playerRef}
                url={video.id}
                controls={false} // Hide default controls
                pip={false}
                playbackRate={1}
                playing={!paused}
                muted={muted}
                loop={false}
                config={{
                  peertube: {
                    controls: 0,
                    mode: 'p2p-media-loader',
                  },
                  youtube: {
                    controls: 0,
                    modestbranding: 0,
                  },
                }}
                iiifVideoInfos={{ height: video.getHeight(), width: video.getWidth() }}
                style={{
                  aspectRatio: `${videoAspectRatio}`,
                  border: debug ? '6px solid pink' : 'none', // 'absolute' or 'block
                  height: (containerRatio < videoAspectRatio ? 'auto' : '100%'),
                  maxHeight: '100%',
                  maxWidth: '100%',
                  position: 'absolute',
                  width: (containerRatio < videoAspectRatio ? '100%' : 'auto'),
                }}
                onPlay={handleVideoEventFunctions.onPlay}
              />
              {this.playerRef.current && (
              <AnnotationsOverlayVideo
                onFunctionsReady={this.handleVideoEventFunctions}
                windowId={windowId}
                playerRef={this.playerRef.current}
                videoRef={this.playerRef.current.getInternalPlayer()}
                videoTarget={videoTargetTemporalfragment}
                key={`${windowId} ${video.id}`}
                highlightAllAnnotations
                style={{
                  border: debug ? '6px solid yellow' : 'none',
                  height: '100%',
                  objectFit: 'contain',
                  width: '100%',
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
  // eslint-disable-next-line react/forbid-prop-types
  canvas: PropTypes.object,
  currentTime: PropTypes.number,
  debug: PropTypes.bool.isRequired,
  muted: PropTypes.bool,
  paused: PropTypes.bool,
  setCurrentTime: PropTypes.func,
  setPaused: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

VideoViewer.defaultProps = {
  canvas: {},
  currentTime: 0,
  muted: false,
  paused: true,
  setCurrentTime: () => {
  },
  setPaused: () => {
  },
};
