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
      classes,
      handleClose,
      open,
      selectedTheme,
      t,
      themeIds,
    } = this.props;
    return (
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>
          <Typography variant="h2">
            {t('changeTheme')}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <MenuList autoFocusItem>
            {
              themeIds.map(value => (
                <MenuItem
                  key={value}
                  className={classes.listitem}
                  onClick={() => { this.handleThemeChange(value); }}
                  selected={value === selectedTheme}
                  value={value}
                >
                  <ListItemIcon>
                    <PaletteIcon className={classes[value]} />
                  </ListItemIcon>
                  <ListItemText>{t(value)}</ListItemText>
                </MenuItem>
              ))
            }
          </MenuList>
        </DialogContent>
      </Dialog>
    );
  }
}

ChangeThemeDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
