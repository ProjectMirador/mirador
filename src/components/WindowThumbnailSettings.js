import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import PropTypes from 'prop-types';

/**
 *
 */
export default class WindowThumbnailSettings extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @private
   */
  handleChange(event) {
    const { windowId, setWindowThumbnailPosition } = this.props;

    setWindowThumbnailPosition(windowId, event.target.value);
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const { thumbnailNavigationPosition } = this.props;

    return (
      <>
        <Typography>Thumbnails</Typography>
        <RadioGroup aria-label="position" name="position" value={thumbnailNavigationPosition} onChange={this.handleChange} row>
          <FormControlLabel
            value="off"
            control={<Radio color="primary" icon={<CancelPresentationIcon />} checkedIcon={<CancelPresentationIcon />} />}
            label="Off"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" icon={<ThumbnailNavigationBottomIcon />} checkedIcon={<ThumbnailNavigationBottomIcon />} />}
            label="Bottom"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="right"
            control={<Radio color="primary" icon={<ThumbnailNavigationRightIcon />} checkedIcon={<ThumbnailNavigationRightIcon />} />}
            label="Right"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </>
    );
  }
}

/**
 * @private
 */
function ThumbnailNavigationBottomIcon(props) {
  return (
    <VideoLabelIcon />
  );
}

/**
 * @private
 */
function ThumbnailNavigationRightIcon(props) {
  return (
    <VideoLabelIcon style={{ transform: 'rotate(-90deg)' }} />
  );
}

WindowThumbnailSettings.propTypes = {
  windowId: PropTypes.string.isRequired,
  setWindowThumbnailPosition: PropTypes.func.isRequired,
  thumbnailNavigationPosition: PropTypes.string.isRequired,
};
