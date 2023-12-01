import { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  Typography,
  DialogContent,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/PaletteSharp';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .dark': {
    color: '#000000',
  },
  '& .dialogContent': {
    padding: 0,
  },
  '& .light': {
    color: '#BDBDBD',
  },
  '& .listitem': {
    '&:focus': {
      backgroundColor: theme.palette.action.focus,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: 'pointer',
  },
}));

/**
 * a simple dialog providing the possibility to switch the theme
 */
export class ChangeThemeDialog extends Component {
  /**
  */
  constructor(props) {
    super(props);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  /**
   * Propagate theme palette type selection into the global state
   */
  handleThemeChange(theme) {
    const { setSelectedTheme, handleClose } = this.props;

    setSelectedTheme(theme);
    handleClose();
  }

  /** */
  render() {
    const {
      handleClose,
      open,
      selectedTheme,
      t,
      themeIds,
    } = this.props;
    return (
      <StyledDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ typography: 'h2' }}>
          {t('changeTheme')}
        </DialogTitle>
        <DialogContent className="dialogContent">
          <MenuList autoFocusItem>
            {themeIds.map((value) => (
              <MenuItem
                key={value}
                className="listitem"
                onClick={() => this.handleThemeChange(value)}
                selected={value === selectedTheme}
                value={value}
              >
                <ListItemIcon>
                  <PaletteIcon sx={{ color: value === 'dark' ? '#000000' : '#BDBDBD' }} />
                </ListItemIcon>
                <ListItemText>{t(value)}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </DialogContent>
      </StyledDialog>
    );
  }
}

ChangeThemeDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  selectedTheme: PropTypes.string.isRequired,
  setSelectedTheme: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  themeIds: PropTypes.arrayOf(PropTypes.string),
};

ChangeThemeDialog.defaultProps = {
  open: false,
  themeIds: [],
};
