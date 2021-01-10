import React, { Component } from 'react';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/** ViewerNavigationVideo - based on ViewerNavigation */
export class ViewerNavigationVideo extends Component {
  /** */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /** */
  handleChange = (event, newValue) => {
    const { paused, setCurrentTime, setPaused } = this.props;
    if (!paused) {
      // In the flow of pausing, adjusting currentTime, and resuming playback,
      // it is necessary to handle cases where the user explicitly pauses playback.
      setPaused(true);
      setCurrentTime(newValue);
      setPaused(false);
    } else {
      setCurrentTime(newValue);
    }
  };

  /**
   * Renders things
   */
  render() {
    const {
      classes,
      currentTime,
      duration,
      muted,
      paused,
      setMuted,
      setPaused,
    } = this.props;

    const start = (duration > 3600 || duration === undefined) ? 11 : 14;
    const len = (duration > 3600 || duration === undefined) ? 8 : 5;
    let durationLabel = new Date(currentTime * 1000).toISOString().substr(start, len);
    let slider = '';
    if (duration !== undefined) {
      durationLabel = `${durationLabel} / ${new Date(duration * 1000).toISOString().substr(start, len)}`;
      slider = (
        <div className={classes.sliderDiv}>
          <Slider value={currentTime} min={0} max={duration} onChange={this.handleChange} />
        </div>
      );
    }
    return (
      <div className={classes.play_controls}>
        <MiradorMenuButton
          aria-label={paused ? 'Play' : 'Pause'}
          className={paused ? ns('next-canvas-button') : ns('next-canvas-button')}
          onClick={() => { setPaused(!paused); }}
        >
          { paused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon /> }
        </MiradorMenuButton>
        {slider}
        <span className={classes.timeLabel}>
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
        <span className={classes.divider} />
      </div>
    );
  }
}

ViewerNavigationVideo.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  muted: PropTypes.bool,
  paused: PropTypes.bool,
  setCurrentTime: PropTypes.func,
  setMuted: PropTypes.func,
  setPaused: PropTypes.func,
};

ViewerNavigationVideo.defaultProps = {
  currentTime: 0,
  duration: undefined,
  muted: false,
  paused: true,
  setCurrentTime: () => {},
  setMuted: () => {},
  setPaused: () => {},
};
