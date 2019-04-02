import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import ThumbnailsOffIcon from '@material-ui/icons/CropDinSharp';
import PropTypes from 'prop-types';
import ThumbnailNavigationBottomIcon from './icons/ThumbnailNavigationBottomIcon';
import ThumbnailNavigationRightIcon from './icons/ThumbnailNavigationRightIcon';
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
  handleChange(e) {
    const { windowId, setWindowThumbnailPosition, handleClose } = this.props;

    setWindowThumbnailPosition(windowId, e.currentTarget.dataset.value);
    handleClose();
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const {
      classes, t, thumbnailNavigationPosition,
    } = this.props;

    return (
      <>
        <ListSubheader role="presentation" tabIndex="-1">{t('thumbnails')}</ListSubheader>

        <MenuItem
          className={classes.MenuItem}
          data-value="off"
          onClick={this.handleChange}
        >
          <FormControlLabel
            value="off"
            classes={{ label: thumbnailNavigationPosition === 'off' ? classes.selectedLabel : undefined }}
            control={
              <ThumbnailsOffIcon color={thumbnailNavigationPosition === 'off' ? 'secondary' : undefined} />
            }
            label={t('off')}
            labelPlacement="bottom"
          />
        </MenuItem>
        <MenuItem
          className={classes.MenuItem}
          data-value="far-bottom"
          onClick={this.handleChange}
        >
          <FormControlLabel
            value="far-bottom"
            classes={{ label: thumbnailNavigationPosition === 'far-bottom' ? classes.selectedLabel : undefined }}
            control={
              <ThumbnailNavigationBottomIcon color={thumbnailNavigationPosition === 'far-bottom' ? 'secondary' : undefined} />
            }
            label={t('bottom')}
            labelPlacement="bottom"
          />
        </MenuItem>
        <MenuItem
          className={classes.MenuItem}
          data-value="far-right"
          onClick={this.handleChange}
        >
          <FormControlLabel
            value="far-right"
            classes={{ label: thumbnailNavigationPosition === 'far-right' ? classes.selectedLabel : undefined }}
            control={
              <ThumbnailNavigationRightIcon color={thumbnailNavigationPosition === 'far-right' ? 'secondary' : undefined} />
            }
            label={t('right')}
            labelPlacement="bottom"
          />
        </MenuItem>
      </>
    );
  }
}

WindowThumbnailSettings.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func,
  setWindowThumbnailPosition: PropTypes.func.isRequired,
  t: PropTypes.func,
  thumbnailNavigationPosition: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};
WindowThumbnailSettings.defaultProps = {
  handleClose: () => {},
  t: key => key,
};
