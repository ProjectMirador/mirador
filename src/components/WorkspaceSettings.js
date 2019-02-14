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
   * Propagate theme palette type selection into the global state
   */
  handleThemeChange(event) {
    const { updateConfig } = this.props;

    updateConfig({
      theme: {
        palette: {
          type: event.target.value,
        },
      },
    });
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, open, children, theme, t,
    } = this.props;
    return (
      <Dialog id="workspace-settings" open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{t('settings')}</DialogTitle>
        <DialogContent>
          {children}
          <FormControl>
            <InputLabel htmlFor="theme-simple">{t('theme')}</InputLabel>
            <Select
              value={theme.palette.type}
              onChange={this.handleThemeChange}
              inputProps={{
                name: 'theme',
                id: 'theme-simple',
              }}
            >
              <MenuItem value="light">{t('light')}</MenuItem>
              <MenuItem value="dark">{t('dark')}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    );
  }
}

WorkspaceSettings.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
  updateConfig: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceSettings.defaultProps = {
  open: false,
  children: null,
  t: key => key,
};

export default WorkspaceSettings;
