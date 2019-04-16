import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  DialogContent,
} from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/PaletteSharp';
import PropTypes from 'prop-types';
import { ListKeyboardNavigation } from '../lib/ListKeyboardNavigation';

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
        <DialogTitle id="change-the-dialog-title" disableTypography>
          <Typography variant="h2">
            {t('changeTheme')}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <ListKeyboardNavigation selected={selectedTheme} onChange={this.handleThemeChange}>
            {
              themeIds.map(value => (
                <ListItem className={classes.listitem} value={value}>
                  <ListItemIcon>
                    <PaletteIcon className={classes[value]} />
                  </ListItemIcon>
                  <ListItemText>{t(value)}</ListItemText>
                </ListItem>
              ))
            }
          </ListKeyboardNavigation>
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
