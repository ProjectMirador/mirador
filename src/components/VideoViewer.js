import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'react-resize-observer';
import flatten from 'lodash/flatten';
import flattenDeep from 'lodash/flattenDeep';
import AnnotationItem from '../lib/AnnotationItem';
import AnnotationsOverlayVideo from '../containers/AnnotationsOverlayVideo';
import WindowCanvasNavigationControlsVideo from '../containers/WindowCanvasNavigationControlsVideo';

export function VideoViewer({
  annotations = [],
  canvas = {},
  currentTime = 0,
  muted = false,
  paused = true,
  setCurrentTime = () => {},
  setHasTextTrack = () => {},
  setPaused = () => {},
  textTrackDisabled = true,
  videoOptions = {},
  windowId,
}) {
  const videoRef = useRef(null);
  const [containerRatio, setContainerRatio] = useState(1);
  const [timeState, setTimeState] = useState({ start: 0, time: 0 });
  const timerRef = useRef();

  const [viewerCurrentTime, setViewerCurrentTime] = useState(currentTime);

  /* useEffect(() => {

    const video = videoRef.current;
    if (video && video.textTracks.length > 0) {
      setHasTextTrack(true);
    }
  }, [setPaused, setHasTextTrack]); */

  useEffect(() => {
    const video = videoRef.current;

    if (paused) {
      timerStop();
    } else {
      timerStart();
    }

    if (currentTime !== viewerCurrentTime) {
      setViewerCurrentTime(currentTime);
      const duration = canvas.getDuration();
      if (duration && duration < currentTime) {
        if (!paused) {
          setPaused(true);
          setCurrentTime(0);
          timerReset();
        }
      }
    }

    if (video) {
      if (video.muted !== muted) {
        video.muted = muted;
      }
      if (video.textTracks && video.textTracks.length > 0) {
        const newMode = textTrackDisabled ? 'disabled' : 'showing';
        if (video.textTracks[0].mode !== newMode) {
          video.textTracks[0].mode = newMode;
        }
      }
    }
  }, [paused, currentTime, muted, canvas, textTrackDisabled]);

  /* useEffect(() => () => {
    timerStop();
  }, []); */

  const timerStart = () => {
    setTimeState({ start: Date.now() - currentTime * 1000, time: currentTime * 1000 });
    timerRef.current = setInterval(() => {
      setTimeState((prevState) => ({
        ...prevState,
        time: Date.now() - prevState.start,
      }));
      setCurrentTime((Date.now() - timeState.start) / 1000);
    }, 100);
  };

  const timerStop = () => {
    clearInterval(timerRef.current);
  };

  const timerReset = () => {
    setTimeState({ start: 0, time: 0 });
  };

  const handleContainerResize = (ref) => {
    setContainerRatio(ref.width / ref.height);
  };

  const videoResources = flatten(
    flattenDeep(
      canvas.getContent().map((annot) => {
        const annotation = new AnnotationItem(annot.__jsonld);
        const temporalfragment = annotation.temporalfragmentSelector;

        if (temporalfragment && temporalfragment.length > 0) {
          const start = temporalfragment[0] || 0;
          const end = temporalfragment[1] || Number.MAX_VALUE;
          if (!(start <= currentTime && currentTime < end)) return {};
        }

        const body = annot.getBody();
        return { body, temporalfragment };
      }),
    ).filter(
      (resource) => resource.body && resource.body[0].__jsonld && resource.body[0].__jsonld.type === 'Video',
    ),
  );

  const vttContent = annotations
    .flatMap((annoPage) => annoPage.json.items.map((anno) => anno.body))
    .flat()
    .filter((body) => body.format === 'text/vtt');

  const video = videoResources.length > 0 ? videoResources[videoResources.length - 1].body[0] : null;
  const videoTargetTemporalfragment = videoResources.length > 0
    ? videoResources[videoResources.length - 1].temporalfragment : [];

  const videoAspectRatio = video ? video.getWidth() / video.getHeight() : null;

  const debugPositioning = false;

  return (
    <div
      className="outerContainer"
      style={{
        border: debugPositioning ? '6px solid blue' : 'none',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {video && (
        <>
          <div
            style={{
              border: debugPositioning ? '6px solid red' : 'none',
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '122px',
              flexDirection: 'column',
              backgroundColor: 'black',
            }}
          >
            <ResizeObserver onResize={handleContainerResize} />
            <div
              style={{
                border: debugPositioning ? '6px solid green' : 'none',
                height: 'auto',
                maxWidth: '100%',
                width: 'fit-content',
              }}
            >
              <video
                style={{
                  border: debugPositioning ? '6px solid pink' : 'none',
                  position: 'absolute',
                  width: containerRatio < videoAspectRatio ? '100%' : 'auto',
                  height: containerRatio < videoAspectRatio ? 'auto' : '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
                key={video.id}
                ref={videoRef}
                {...videoOptions}
              >
                <source src={video.id} type={video.getFormat()} />
                {vttContent.map((vttc) => (
                  <track key={vttc.id} src={vttc.id} srcLang={vttc.language} />
                ))}
              </video>
              <AnnotationsOverlayVideo
                windowId={windowId}
                videoRef={videoRef}
                videoTarget={videoTargetTemporalfragment}
                key={`${windowId} ${video.id}`}
                highlightAllAnnotations
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                  border: debugPositioning ? '6px solid yellow' : 'none',
                }}
              />
            </div>
          </div>
          <WindowCanvasNavigationControlsVideo windowId={windowId} />
        </>
      )}
    </div>
  );
}

VideoViewer.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object),
  canvas: PropTypes.object,
  currentTime: PropTypes.number,
  muted: PropTypes.bool,
  paused: PropTypes.bool,
  setCurrentTime: PropTypes.func,
  setHasTextTrack: PropTypes.func,
  setPaused: PropTypes.func,
  textTrackDisabled: PropTypes.bool,
  videoOptions: PropTypes.object,
  windowId: PropTypes.string.isRequired,
};
