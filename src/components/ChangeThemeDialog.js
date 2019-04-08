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
    const { updateConfig, handleClose } = this.props;

    updateConfig({
      theme: {
        palette: {
          type: theme,
        },
      },
    });
    handleClose();
  }

  /** */
  render() {
    const {
      classes,
      handleClose,
      open,
      t,
      theme,
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
          <ListKeyboardNavigation selected={theme} onChange={this.handleThemeChange}>
            <ListItem className={classes.listitem} value="light">
              <ListItemIcon>
                <PaletteIcon className={classes.lightColor} />
              </ListItemIcon>
              <ListItemText>{t('light')}</ListItemText>
            </ListItem>
            <ListItem className={classes.listitem} value="dark">
              <ListItemIcon>
                <PaletteIcon className={classes.darkColor} />
              </ListItemIcon>
              <ListItemText>{t('dark')}</ListItemText>
            </ListItem>
          </ListKeyboardNavigation>
        </DialogContent>
      </Dialog>
    );
  }
}

ChangeThemeDialog.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  updateConfig: PropTypes.func.isRequired,
};

ChangeThemeDialog.defaultProps = {
  open: false,
};
