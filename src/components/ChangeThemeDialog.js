import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  Typography,
  DialogContent,
} from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/PaletteSharp';
import PropTypes from 'prop-types';

/**
 * a simple dialog providing the possibility to switch the theme
 */
export class ChangeThemeDialog extends Component {
  /**
   * Set the initial focus when the dialog enters
   * Find the selected item by using the current theme
   * in a selector on the value attribute (which we need to set)
  */
  static setInitialFocus(dialogElement, selectedTheme) {
    const selectedListItem = dialogElement.querySelectorAll(`li[value="${selectedTheme}"]`);
    if (!selectedListItem || selectedListItem.length === 0) return;

    selectedListItem[0].focus();
  }

  /**
  */
  constructor(props) {
    super(props);
    this.selectedItemRef = React.createRef();
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
        onEntered={dialog => ChangeThemeDialog.setInitialFocus(dialog, selectedTheme)}
        open={open}
      >
        <DialogTitle id="change-the-dialog-title" disableTypography>
          <Typography variant="h2">
            {t('changeTheme')}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <MenuList>
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
