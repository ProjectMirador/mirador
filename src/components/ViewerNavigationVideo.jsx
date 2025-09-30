import ClosedCaption from '@mui/icons-material/ClosedCaption';
import ClosedCaptionOutlined from '@mui/icons-material/ClosedCaptionOutlined';
import { Component } from 'react';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { styled } from '@mui/material/styles';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

const StyledSliderDiv = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  paddingLeft: '10px',
  paddingRight: '15px',
  width: '200px',
}));

const StyledPlayControls = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
}));

/** ViewerNavigationVideo - based on ViewerNavigation */
export class ViewerNavigationVideo extends Component {
  /** */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /** */
  handleChange = (event, newValue) => {
    const {
      paused, setCurrentTime, setSeekTo, setPaused,
    } = this.props;
    if (!paused) {
      setPaused(true);
      setSeekTo(newValue);
      setCurrentTime(newValue);
    } else {
      setCurrentTime(newValue);
    }
  };

  /**
   * Renders things
   */
  render() {
    const {
      currentTime,
      duration,
      hasTextTrack,
      muted,
      paused,
      setMuted,
      setPaused,
      setTextTrackDisabled,
      textTrackDisabled,
    } = this.props;

    const start = (duration > 3600 || duration === undefined) ? 11 : 14;
    const len = (duration > 3600 || duration === undefined) ? 8 : 5;
    let durationLabel = new Date(currentTime * 1000).toISOString().substr(start, len);
    let slider = '';
    if (duration !== undefined) {
      durationLabel = `${durationLabel} / ${new Date(duration * 1000).toISOString().substr(start, len)}`;
      slider = (
        <StyledSliderDiv>
          <Slider value={currentTime} min={0} max={duration} onChange={this.handleChange} />
        </StyledSliderDiv>
      );
    }
    return (
      <StyledPlayControls>
        <MiradorMenuButton
          aria-label={paused ? 'Play' : 'Pause'}
          className={paused ? ns('next-canvas-button') : ns('next-canvas-button')}
          onClick={() => { setPaused(!paused); }}
        >
          { paused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon /> }
        </MiradorMenuButton>
        {slider}
        <span style={{
          alignItems: 'center',
          display: 'flex',
        }}
        >
          <Typography variant="caption">
            {durationLabel}
          </Typography>
        </span>
        <MiradorMenuButton
          aria-label={muted ? 'Unmute' : 'Mute'}
          className={muted ? ns('next-canvas-button') : ns('next-canvas-button')}
          onClick={() => { setMuted(!muted); }}
        >
          { muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
        </MiradorMenuButton>
        { hasTextTrack && (
          <MiradorMenuButton
            aria-label={textTrackDisabled ? 'CC show' : 'CC hide'}
            className={textTrackDisabled ? ns('next-canvas-button') : ns('next-canvas-button')}
            onClick={() => { setTextTrackDisabled(!textTrackDisabled); }}
          >
            { textTrackDisabled ? <ClosedCaptionOutlined /> : <ClosedCaption /> }
          </MiradorMenuButton>
        )}
        <span style={{
          borderRight: '1px solid #808080',
          display: 'inline-block',
          height: '24px',
          margin: '12px 6px',
        }}
        />
      </StyledPlayControls>
    );
  }
}

ViewerNavigationVideo.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  hasTextTrack: PropTypes.bool,
  muted: PropTypes.bool,
  paused: PropTypes.bool,
  setCurrentTime: PropTypes.func,
  setMuted: PropTypes.func,
  setPaused: PropTypes.func,
  setSeekTo: PropTypes.func,
  setTextTrackDisabled: PropTypes.func,
  textTrackDisabled: PropTypes.bool,
};

ViewerNavigationVideo.defaultProps = {
  currentTime: 0,
  duration: undefined,
  hasTextTrack: false,
  muted: false,
  paused: true,
  setCurrentTime: () => {},
  setMuted: () => {},
  setPaused: () => {},
  setSeekTo: () => {},
  setTextTrackDisabled: () => {},
  textTrackDisabled: true,
};
