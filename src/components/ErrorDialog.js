import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

/**
 */
class ErrorDialog extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      error, removeError, open, t,
    } = this.props;

    return (
      <div>
        { error && (
          <Dialog id="workspace-settings" open={open} onClose={() => removeError(error.id)}>
            <DialogTitle id="form-dialog-title">{t('errorDialogTitle')}</DialogTitle>
            <DialogContent>
              <Typography variant="body2" noWrap color="inherit">
                {error.message}
              </Typography>
              <div>
                <Button onClick={() => removeError(error.id)}>
                  {t('errorDialogConfirm')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }
}

ErrorDialog.propTypes = {
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  removeError: PropTypes.func.isRequired,
  t: PropTypes.func,
};

ErrorDialog.defaultProps = {
  error: null,
  open: false,
  t: key => key,
};

export default ErrorDialog;
