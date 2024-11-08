import { Component } from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import ThumbnailsOffIcon from '@mui/icons-material/CropDinSharp';
import PropTypes from 'prop-types';
import ThumbnailNavigationBottomIcon from './icons/ThumbnailNavigationBottomIcon';
import ThumbnailNavigationRightIcon from './icons/ThumbnailNavigationRightIcon';

const ThumbnailOption = styled(MenuItem, { name: 'WindowThumbnailSettings', slot: 'option' })(({ selected, theme }) => ({
  '& .MuiFormControlLabel-label': {
    borderBottom: '2px solid transparent',
    ...(selected && {
      borderBottomColor: theme.palette.secondary.main,
    }),
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent !important',
  },
  '&.Mui-selected.Mui-focusVisible': {
    backgroundColor: `${(theme.vars || theme).palette.action.focus} !important`,
  },
  '&:focused': {
    backgroundColor: `${(theme.vars || theme).palette.action.focus} !important`,
  },
  color: selected ? theme.palette.secondary.main : undefined,
  display: 'inline-block',
}));

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

        <ThumbnailOption selected={thumbnailNavigationPosition === 'off'} onClick={() => { this.handleChange('off'); handleClose(); }}>
          <FormControlLabel
            value="off"
            control={
              <ThumbnailsOffIcon color={thumbnailNavigationPosition === 'off' ? 'secondary' : undefined} fill="currentcolor" />
            }
            label={t('off')}
            labelPlacement="bottom"
          />
        </ThumbnailOption>
        <ThumbnailOption selected={thumbnailNavigationPosition === 'far-bottom'} onClick={() => { this.handleChange('far-bottom'); handleClose(); }}>
          <FormControlLabel
            value="far-bottom"
            control={
              <ThumbnailNavigationBottomIcon color={thumbnailNavigationPosition === 'far-bottom' ? 'secondary' : undefined} fill="currentcolor" />
            }
            label={t('bottom')}
            labelPlacement="bottom"
          />
        </ThumbnailOption>
        <ThumbnailOption selected={thumbnailNavigationPosition === 'far-right'} onClick={() => { this.handleChange('far-right'); handleClose(); }}>
          <FormControlLabel
            value="far-right"
            control={(
              <ThumbnailNavigationRightIcon
                color={thumbnailNavigationPosition === 'far-right' ? 'secondary' : undefined}
                fill="currentcolor"
                style={direction === 'rtl' ? { transform: 'rotate(180deg)' } : {}}
              />
            )}
            label={t('right')}
            labelPlacement="bottom"
          />
        </ThumbnailOption>
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
