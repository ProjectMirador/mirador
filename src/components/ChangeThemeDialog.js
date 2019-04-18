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
          <List>
            {
              themeIds.map(value => (
                <ListItem
                  button
                  className={classes.listitem}
                  component="li"
                  key={value}
                  onClick={() => this.handleThemeChange(value)}
                  selected={value === selectedTheme}
                  value={value}
                >
                  <ListItemIcon>
                    <PaletteIcon className={classes[value]} />
                  </ListItemIcon>
                  <ListItemText>{t(value)}</ListItemText>
                </ListItem>
              ))
            }
          </List>
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
