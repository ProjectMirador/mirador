import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
          <List>
            <ListItem className={classes.listitem} onClick={() => this.handleThemeChange('light')} selected={theme === 'light'}>
              <ListItemIcon>
                <PaletteIcon className={classes.lightColor} />
              </ListItemIcon>
              <ListItemText>{t('light')}</ListItemText>
            </ListItem>
            <ListItem className={classes.listitem} onClick={() => this.handleThemeChange('dark')} selected={theme === 'dark'}>
              <ListItemIcon>
                <PaletteIcon className={classes.darkColor} />
              </ListItemIcon>
              <ListItemText>{t('dark')}</ListItemText>
            </ListItem>
          </List>
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
  updateConfig: PropTypes.func.isRequired,
};

ChangeThemeDialog.defaultProps = {
  open: false,
};
