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
      container, handleClose, open, children, workspaceType, updateConfig, t,
    } = this.props;
    return (
      <Dialog id="workspace-settings" container={container} open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{t('workspaceSelectionTitle')}</DialogTitle>
        <DialogContent>
          {children}
          <FormControl>
            <InputLabel htmlFor="workspace-type">{t('workspace')}</InputLabel>
            <Select
              MenuProps={{
                anchorOrigin: {
                  horizontal: 'left',
                  vertical: 'bottom',
                },
                getContentAnchorEl: null,
              }}
              value={workspaceType}
              onChange={(event) => {
                updateConfig({
                  workspace: {
                    type: event.target.value,
                  },
                });
              }}
              inputProps={{
                id: 'workspace-type',
                name: 'workspace',
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
  children: PropTypes.node,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
  updateConfig: PropTypes.func.isRequired,
  workspaceType: PropTypes.string.isRequired,
};

WorkspaceSelectionDialog.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
