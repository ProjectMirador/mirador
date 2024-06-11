import { Component } from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ThumbnailsOffIcon from '@mui/icons-material/CropDinSharp';
import PropTypes from 'prop-types';
import ThumbnailNavigationBottomIcon from './icons/ThumbnailNavigationBottomIcon';
import ThumbnailNavigationRightIcon from './icons/ThumbnailNavigationRightIcon';

const ThumbnailOptions = styled(MenuItem, { name: 'WindowThumbnailSettings', slot: 'option' })(({ selected, theme }) => ({
  '& .MuiFormControlLabel-label': {
    borderBottom: '2px solid transparent',
    ...(selected && {
      borderBottomColor: theme.palette.secondary.main,
    }),
  },
  backgroundColor: 'transparent !important',
  color: selected ? theme.palette.secondary.main : undefined,
}));

const StyledMenuList = styled(MenuList, { name: 'WindowThumbnailSettings', slot: 'option' })(() => ({
  display: 'inline-flex',
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
        <ListSubheader role="presentation" disableSticky>{t('thumbnails')}</ListSubheader>
        <StyledMenuList role="menubar">
          <ThumbnailOptions
            aria-selected={thumbnailNavigationPosition === 'off'}
            selected={thumbnailNavigationPosition === 'off'}
            onClick={() => { this.handleChange('off'); handleClose(); }}
            autoFocus={thumbnailNavigationPosition === 'off'}
            key="off"
          >
            <FormControlLabel
              value="off"
              control={
                <ThumbnailsOffIcon color={thumbnailNavigationPosition === 'off' ? 'secondary' : undefined} fill="currentcolor" />
              }
              label={t('off')}
              labelPlacement="bottom"
            />
          </ThumbnailOptions>
          <ThumbnailOptions
            aria-selected={thumbnailNavigationPosition === 'far-bottom'}
            selected={thumbnailNavigationPosition === 'far-bottom'}
            onClick={() => { this.handleChange('far-bottom'); handleClose(); }}
            autoFocus={thumbnailNavigationPosition === 'far-bottom'}
            key="far-bottom"
          >
            <FormControlLabel
              value="far-bottom"
              control={
                <ThumbnailNavigationBottomIcon color={thumbnailNavigationPosition === 'far-bottom' ? 'secondary' : undefined} fill="currentcolor" />
              }
              label={t('bottom')}
              labelPlacement="bottom"
            />
          </ThumbnailOptions>
          <ThumbnailOptions
            aria-selected={thumbnailNavigationPosition === 'far-right'}
            selected={thumbnailNavigationPosition === 'far-right'}
            key="far-right"
            autoFocus={thumbnailNavigationPosition === 'far-right'}
            onClick={() => { this.handleChange('far-right'); handleClose(); }}
          >
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
          </ThumbnailOptions>
        </StyledMenuList>
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
