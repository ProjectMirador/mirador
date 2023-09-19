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
      handleClose, t, thumbnailNavigationPosition, direction,
    } = this.props;

    return (
      <>
        <ListSubheader role="presentation" disableSticky tabIndex={-1}>{t('thumbnails')}</ListSubheader>

        <MenuItem sx={{ display: 'inline-block' }} onClick={() => { this.handleChange('off'); handleClose(); }}>
          <FormControlLabel
            value="off"
            sx={{
              '&.MuiFormControlLabel-label': {
                borderBottom: '2px solid',
                borderBottomColor: thumbnailNavigationPosition === 'off' ? 'secondary.main' : 'transparent',
                color: thumbnailNavigationPosition === 'off' ? 'secondary.main' : undefined,
              },
            }}
            control={
              <ThumbnailsOffIcon color={thumbnailNavigationPosition === 'off' ? 'secondary' : undefined} />
            }
            label={t('off')}
            labelPlacement="bottom"
          />
        </MenuItem>
        <MenuItem sx={{ display: 'inline-block' }} onClick={() => { this.handleChange('far-bottom'); handleClose(); }}>
          <FormControlLabel
            value="far-bottom"
            sx={{
              '&.MuiFormControlLabel-label': {
                borderBottom: '2px solid',
                borderBottomColor: thumbnailNavigationPosition === 'off' ? 'secondary.main' : 'transparent',
                color: thumbnailNavigationPosition === 'off' ? 'secondary.main' : undefined,
              },
            }}
            control={
              <ThumbnailNavigationBottomIcon color={thumbnailNavigationPosition === 'far-bottom' ? 'secondary' : undefined} />
            }
            label={t('bottom')}
            labelPlacement="bottom"
          />
        </MenuItem>
        <MenuItem sx={{ display: 'inline-block' }} onClick={() => { this.handleChange('far-right'); handleClose(); }}>
          <FormControlLabel
            value="far-right"
            sx={{
              '&.MuiFormControlLabel-label': {
                borderBottom: '2px solid',
                borderBottomColor: thumbnailNavigationPosition === 'off' ? 'secondary.main' : 'transparent',
                color: thumbnailNavigationPosition === 'off' ? 'secondary.main' : undefined,
              },
            }}
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
