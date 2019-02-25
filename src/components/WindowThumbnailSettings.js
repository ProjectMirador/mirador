import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import ThumbnailsOffIcon from '@material-ui/icons/CropDinSharp';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import PropTypes from 'prop-types';

/**
 *
 */
export class WindowThumbnailSettings extends Component {
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
    const { thumbnailNavigationPosition, t } = this.props;

    return (
      <>
        <Typography>{t('thumbnails')}</Typography>
        <RadioGroup aria-label={t('position')} name="position" value={thumbnailNavigationPosition} onChange={this.handleChange} row>
          <FormControlLabel
            value="off"
            control={<Radio color="primary" icon={<ThumbnailsOffIcon />} checkedIcon={<ThumbnailsOffIcon />} />}
            label={t('off')}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" icon={<ThumbnailNavigationBottomIcon />} checkedIcon={<ThumbnailNavigationBottomIcon />} />}
            label={t('bottom')}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="right"
            control={<Radio color="primary" icon={<ThumbnailNavigationRightIcon />} checkedIcon={<ThumbnailNavigationRightIcon />} />}
            label={t('right')}
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
  t: PropTypes.func,
};
WindowThumbnailSettings.defaultProps = {
  t: key => key,
};
