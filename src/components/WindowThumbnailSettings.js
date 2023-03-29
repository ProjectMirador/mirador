import { Component } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import ThumbnailsOffIcon from '@mui/icons-material/CropDinSharp';
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
  handleChange(value) {
    const { windowId, setWindowThumbnailPosition } = this.props;

    setWindowThumbnailPosition(windowId, value);
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const {
      classes, handleClose, t, thumbnailNavigationPosition, direction,
    } = this.props;

    return (
      <>
        <ListSubheader role="presentation" disableSticky tabIndex={-1}>{t('thumbnails')}</ListSubheader>

        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('off'); handleClose(); }}>
          <FormControlLabel
            value="off"
            classes={{ label: thumbnailNavigationPosition === 'off' ? classes.selectedLabel : classes.label }}
            control={
              <ThumbnailsOffIcon color={thumbnailNavigationPosition === 'off' ? 'secondary' : undefined} />
            }
            label={t('off')}
            labelPlacement="bottom"
          />
        </MenuItem>
        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('far-bottom'); handleClose(); }}>
          <FormControlLabel
            value="far-bottom"
            classes={{ label: thumbnailNavigationPosition === 'far-bottom' ? classes.selectedLabel : classes.label }}
            control={
              <ThumbnailNavigationBottomIcon color={thumbnailNavigationPosition === 'far-bottom' ? 'secondary' : undefined} />
            }
            label={t('bottom')}
            labelPlacement="bottom"
          />
        </MenuItem>
        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('far-right'); handleClose(); }}>
          <FormControlLabel
            value="far-right"
            classes={{ label: thumbnailNavigationPosition === 'far-right' ? classes.selectedLabel : classes.label }}
            control={(
              <ThumbnailNavigationRightIcon
                color={thumbnailNavigationPosition === 'far-right' ? 'secondary' : undefined}
                style={direction === 'rtl' ? { transform: 'rotate(180deg)' } : {}}
              />
            )}
            label={t('right')}
            labelPlacement="bottom"
          />
        </MenuItem>
      </>
    );
  }
}

WindowThumbnailSettings.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  direction: PropTypes.string.isRequired,
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
