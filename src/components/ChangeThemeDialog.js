import { Component } from 'react';
import {
  DialogTitle,
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  DialogContent,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/PaletteSharp';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { WorkspaceDialog } from './WorkspaceDialog';

const ThemeIcon = styled(PaletteIcon, { name: 'ThemeIcon', slot: 'icon' })(({ theme }) => ({
  color: '#BDBDBD',
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
      <WorkspaceDialog onClose={handleClose} open={open} variant="menu">
        <DialogTitle>
          {t('changeTheme')}
        </DialogTitle>
        <DialogContent>
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
                  <ThemeIcon ownerState={{ value }} />
                </ListItemIcon>
                <ListItemText>{t(value)}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </DialogContent>
      </WorkspaceDialog>
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
