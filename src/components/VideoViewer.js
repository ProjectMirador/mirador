import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

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
export class VideoViewer extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  render() {
    const {
      captions, videoOptions, videoResources,
    } = this.props;
    return (
      <StyledContainer>
        <StyledVideo {...videoOptions}>
          {videoResources.map(video => (
            <Fragment key={video.id}>
              <source src={video.id} type={video.getFormat()} />
            </Fragment>
          ))}
          {captions.map(caption => (
            <Fragment key={caption.id}>
              <track src={caption.id} label={caption.getDefaultLabel()} srcLang={caption.getProperty('language')} />
            </Fragment>
          ))}
        </StyledVideo>
      </StyledContainer>
    );
  }
  /* eslint-enable jsx-a11y/media-has-caption */
}

VideoViewer.propTypes = {
  captions: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  videoOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  videoResources: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
};

VideoViewer.defaultProps = {
  captions: [],
  videoOptions: {},
  videoResources: [],
};
