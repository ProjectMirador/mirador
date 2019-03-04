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
export class WorkspaceSelectionDialog extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, open, children, workspaceType, updateConfig, t,
    } = this.props;
    return (
      <Dialog id="workspace-settings" open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{t('workspaceSelectionTitle')}</DialogTitle>
        <DialogContent>
          {children}
          <FormControl>
            <InputLabel htmlFor="workspace-type">{t('workspace')}</InputLabel>
            <Select
              value={workspaceType}
              onChange={(event) => {
                updateConfig({
                  workspace: {
                    type: event.target.value,
                  },
                });
              }}
              inputProps={{
                name: 'workspace',
                id: 'workspace-type',
              }}
            >
              <MenuItem value="elastic">{t('elastic')}</MenuItem>
              <MenuItem value="mosaic">{t('mosaic')}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    );
  }
}

WorkspaceSelectionDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
  updateConfig: PropTypes.func.isRequired,
  workspaceType: PropTypes.string.isRequired,
  t: PropTypes.func,
};

WorkspaceSelectionDialog.defaultProps = {
  open: false,
  children: null,
  t: key => key,
};
