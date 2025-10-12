import flatten from 'lodash/flatten';
import flattenDeep from 'lodash/flattenDeep';
import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'react-resize-observer';
import ReactPlayer from 'react-player';
import AnnotationItem from '../lib/AnnotationItem';
import AnnotationsOverlayVideo from '../containers/AnnotationsOverlayVideo';
import WindowCanvasNavigationControlsVideo from '../containers/WindowCanvasNavigationControlsVideo';
import { setWindowSeekTo } from '../state/actions';

/** */
export class VideoViewer extends Component {
  /** */
  constructor(props) {
    super(props);
    this.playerRef = createRef();
    this.timer = null;
    this._lastVideoId = null;

    this.state = {
      containerRatio: 1,
      handleVideoEventFunctions: { onPlay: () => {} },
      // Unified source: { url: string|null, kind: 'hls'|'file'|'youtube'|'unknown' }
      src: { url: null, kind: 'unknown' },
      start: 0,
      time: 0,
    };
  }

  /** */
  componentDidMount() {
    const { setPaused } = this.props;
    setPaused(true);
  }

  /** */
  componentDidUpdate(prevProps) {
    const {
      canvas, currentTime, paused, setCurrentTime, setPaused, setSeekTo,
    } = this.props;

    if (paused !== prevProps.paused) {
      if (paused) this.timerStop();
      else this.timerStart();
    }

    if (currentTime !== prevProps.currentTime) {
      if (prevProps.currentTime === 0 || paused === true) {
        if (this.playerRef?.current) this.playerRef.current.seekTo(currentTime);
      }
    }

    const duration = canvas.getDuration?.();
    if (duration && currentTime > duration) {
      setPaused(true);
      setCurrentTime(0);
      setSeekTo(0);
      this.timerReset();
    }

    // Recompute active video -> resolve unified source
    const vidNow = this._currentVideoIdFromCanvas();
    if (this._lastVideoId !== vidNow) {
      this._lastVideoId = vidNow;
      this.prepareSrc(vidNow);
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
      this.setState(prevState => ({ time: Date.now() - prevState.start }));
      const { time } = this.state;
      setCurrentTime(time / 1000);
    }, 100);
  }

  /** */
  timerStop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  /** */
  timerReset() {
    this.setState({ time: 0 });
  }

  // --------- Unified source resolution (PeerTube HLS, direct files, YouTube) ----------

  prepareSrc = async (rawUrl) => {
    if (!rawUrl) {
      this.setState({ src: { url: null, kind: 'unknown' } });
      return;
    }
    try {
      const src = await this.resolveUnifiedUrl(rawUrl);
      this.setState({ src });
    } catch {
      this.setState({ src: { url: rawUrl, kind: this._inferKind(rawUrl) } });
    }
  };

  _inferKind = (url) => {
    const u = String(url || '');
    if (/\.m3u8(\?|#|$)/i.test(u)) return 'hls';
    if (/(youtube\.com|youtu\.be)\//i.test(u)) return 'youtube';
    if (/\.(mp4|webm|ogg|ogv|mov)(\?|#|$)/i.test(u)) return 'file';
    return 'unknown';
  };

  /**
     * Returns { url, kind }
     * - PeerTube watch URLs -> HLS master playlist
     * - Direct .m3u8 -> {kind:'hls'}
     * - Direct files -> {kind:'file'}
     * - YouTube -> {kind:'youtube'}
     */
  resolveUnifiedUrl = async (inputUrl) => {
    const kind0 = this._inferKind(inputUrl);
    if (kind0 === 'hls' || kind0 === 'file' || kind0 === 'youtube') {
      return { url: inputUrl, kind: kind0 };
    }

    // Attempt PeerTube resolution for watch URLs
    try {
      const u = new URL(inputUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      const host = u.origin;
      const parts = u.pathname.split('/').filter(Boolean);
      let id = null;

      // PeerTube patterns: /w/:id, /videos/watch/:id
      if (parts[0] === 'w' && parts[1]) id = parts[1];
      if (parts[0] === 'videos' && parts[1] === 'watch' && parts[2]) id = parts[2];

      if (id) {
        const res = await fetch(`${host}/api/v1/videos/${id}`);
        if (!res.ok) throw new Error('PeerTube API error');
        const data = await res.json();
        const playlists = Array.isArray(data.streamingPlaylists) ? data.streamingPlaylists : [];
        const hls = playlists.find(p => String(p?.type).toLowerCase() === 'hls') || playlists[0];
        const file = hls?.files?.find(f => f?.playlistUrl);
        let pl = file?.playlistUrl;
        if (pl) {
          if (!/^https?:\/\//i.test(pl)) pl = host + pl;
          return { url: pl, kind: 'hls' };
        }
      }
    } catch {
      // fall through
    }

    return { url: inputUrl, kind: this._inferKind(inputUrl) };
  };

  // Extract current video resource id from IIIF canvas + temporal fragment filtering
  _currentVideoIdFromCanvas = () => {
    const { canvas, currentTime } = this.props;

    const annots = canvas?.getContent?.() || [];
    const videoResources = flatten(
      flattenDeep([
        annots.map(annot => {
          const annotation = new AnnotationItem(annot.__jsonld);
          const temporalfragment = annotation.temporalfragmentSelector;
          const inRange = !temporalfragment || temporalfragment.length === 0
                        || (currentTime >= (temporalfragment[0] || 0)
                            && currentTime < ((temporalfragment.length > 1 ? temporalfragment[1] : Number.MAX_VALUE)));
          if (!inRange) return {};
          const body = annot.getBody?.();
          return { body, temporalfragment };
        }),
      ]).filter((resource) => resource.body && resource.body[0]?.__jsonld?.type === 'Video'),
    );

    if (!videoResources.length) return null;
    const video = videoResources[videoResources.length - 1].body[0]; // last one wins
    return video?.id || null;
  };

  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  render() {
    const {
      canvas, currentTime, windowId, paused, muted, debug,
    } = this.props;

    const { containerRatio, handleVideoEventFunctions, src } = this.state;

    // Build current video + temporal fragment for overlay
    const annots = canvas?.getContent?.() || [];
    const videoResources = flatten(
      flattenDeep([
        annots.map(annot => {
          const annotation = new AnnotationItem(annot.__jsonld);
          const temporalfragment = annotation.temporalfragmentSelector;
          const inRange = !temporalfragment || temporalfragment.length === 0
                        || (currentTime >= (temporalfragment[0] || 0)
                            && currentTime < ((temporalfragment.length > 1 ? temporalfragment[1] : Number.MAX_VALUE)));
          if (!inRange) return {};
          const body = annot.getBody?.();
          return { body, temporalfragment };
        }),
      ]).filter((resource) => resource.body && resource.body[0]?.__jsonld?.type === 'Video'),
    );

    const len = videoResources.length;
    const video = len > 0 ? videoResources[len - 1].body[0] : null;
    const videoTargetTemporalfragment = len > 0 ? videoResources[len - 1].temporalfragment : [];

    let videoAspectRatio;
    if (video) videoAspectRatio = video.getWidth?.() / video.getHeight?.();

    const videoStyle = {
      height: (videoAspectRatio < containerRatio ? '100%' : 'auto'),
      width: (videoAspectRatio < containerRatio ? 'auto' : '100%'),
    };

    const playerStyle = {
      aspectRatio: `${videoAspectRatio || 16 / 9}`,
      height: (videoAspectRatio < containerRatio ? '100%' : 'auto'),
      width: (videoAspectRatio < containerRatio ? 'auto' : '100%'),
    };

    // Ensure src prepared when a video appears (first render after canvas change)
    const currentVideoId = this._currentVideoIdFromCanvas();
    if (this._lastVideoId !== currentVideoId) {
      this._lastVideoId = currentVideoId;
      this.prepareSrc(currentVideoId);
    }

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
          <div
            style={{
              alignItems: 'center',
              backgroundColor: 'black',
              border: debug ? '6px solid red' : 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginBottom: '122px', // space for navigation controls
              position: 'relative',
              width: '100%',
            }}
          >
            <ResizeObserver onResize={this.setContainerRatio} />
            <div
              style={{
                aspectRatio: playerStyle.aspectRatio,
                border: debug ? '6px solid green' : 'none',
                height: playerStyle.height,
                maxHeight: '100%',
                maxWidth: '100%',
                width: playerStyle.width,
                position: 'relative',
              }}
            >
              <ReactPlayer
                width={videoStyle.width}
                height={videoStyle.height}
                ref={this.playerRef}
                url={src.url || currentVideoId || undefined}
                controls={false} // hide native controls; custom overlay remains in charge
                pip={false}
                playbackRate={1}
                playing={!paused}
                muted={muted}
                loop={false}
                config={{
                  // Only force HLS when needed; MP4/WebM unaffected; YouTube uses its own provider
                  file: src.kind === 'hls' ? { forceHLS: true } : {},
                  youtube: {
                    playerVars: { controls: 0, modestbranding: 1, rel: 0 },
                  },
                }}
                iiifVideoInfos={video}
                style={{
                  aspectRatio: `${videoAspectRatio || 16 / 9}`,
                  border: debug ? '6px solid pink' : 'none',
                  height: (containerRatio < (videoAspectRatio || 16 / 9) ? 'auto' : '100%'),
                  maxHeight: '100%',
                  maxWidth: '100%',
                  position: 'absolute',
                  width: (containerRatio < (videoAspectRatio || 16 / 9) ? '100%' : 'auto'),
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

          <WindowCanvasNavigationControlsVideo
            windowId={windowId}
            playerRef={this.playerRef}
          />
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
  setSeekTo: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

VideoViewer.defaultProps = {
  canvas: {},
  currentTime: 0,
  muted: false,
  paused: true,
  setCurrentTime: () => {},
  setPaused: () => {},
};

export default VideoViewer;
