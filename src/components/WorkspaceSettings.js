import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

/**
 */
class WorkspaceSettings extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  /**
   * Propagate theme selection into the global state
   */
  handleThemeChange(event) {
    const { updateConfig } = this.props;

    updateConfig({ theme: event.target.value });
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, open, children, theme,
    } = this.props;
    return (
      <Dialog id="workspace-settings" open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <DialogContent>
          {children}
          <FormControl>
            <InputLabel htmlFor="theme-simple">Theme</InputLabel>
            <Select
              value={theme}
              onChange={this.handleThemeChange}
              inputProps={{
                name: 'theme',
                id: 'theme-simple',
              }}
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    );
  }
}

WorkspaceSettings.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  children: PropTypes.node,
  updateConfig: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

WorkspaceSettings.defaultProps = {
  open: false,
  children: null,
};

export default WorkspaceSettings;
