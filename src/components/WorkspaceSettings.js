import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

/**
 */
class WorkspaceSettings extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, open, children,
    } = this.props;
    return (
      <Dialog id="workspace-settings" open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
}

WorkspaceSettings.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
};

WorkspaceSettings.defaultProps = {
  open: false,
  children: null,
};

export default WorkspaceSettings;
