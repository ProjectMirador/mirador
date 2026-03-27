import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
});

const StyledAudio = styled('audio')({
  width: '100%',
});

/** */
export function AudioViewer({ audioOptions = {}, audioResources = [], captions = [] }) {
  return (
    <StyledContainer>
      <StyledAudio {...audioOptions}>
        {audioResources.map((audio) => (
          <Fragment key={audio.id}>
            <source src={audio.id} type={audio.getFormat()} />
          </Fragment>
        ))}
        {captions.map((caption) => (
          <Fragment key={caption.id}>
            <track src={caption.id} label={caption.getDefaultLabel()} srcLang={caption.getProperty('language')} />
          </Fragment>
        ))}
      </StyledAudio>
    </StyledContainer>
  );
}

AudioViewer.propTypes = {
  audioOptions: PropTypes.object,
  audioResources: PropTypes.arrayOf(PropTypes.object),
  captions: PropTypes.arrayOf(PropTypes.object),
};
