import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import useMediaStartTime from '../hooks/useMediaStartTime';

const StyledContainer = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
}));

const StyledVideo = styled('video')(() => ({
  maxHeight: '100%',
  width: '100%',
}));

/** */
export function VideoViewer({ captions = [], videoOptions = {}, videoResources = [], canvasId = '', startTime = undefined }) {
  const mediaRef = useMediaStartTime(startTime, canvasId);

  return (
    <StyledContainer>
      <StyledVideo {...videoOptions} key={canvasId} ref={mediaRef}>
        {videoResources.map((video) => (
          <source key={video.io} src={video.id} type={video.getFormat()} />
        ))}
        {captions.map((caption) => (
          <track key={caption.id} src={caption.id} label={caption.getDefaultLabel()} srcLang={caption.getProperty('language')} />
        ))}
      </StyledVideo>
    </StyledContainer>
  );
}

VideoViewer.propTypes = {
  captions: PropTypes.arrayOf(PropTypes.object),
  canvasId: PropTypes.string,
  startTime: PropTypes.number,
  videoOptions: PropTypes.object,
  videoResources: PropTypes.arrayOf(PropTypes.object),
};
