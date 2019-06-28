import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { DialogActions, DialogContentText, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { isUndefined } from 'lodash';

/**
 */
export class ErrorDialog extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      error, removeError, t,
    } = this.props;

    const hasError = !isUndefined(error);

    return error ? (
      <Dialog
        aria-labelledby="error-dialog-title"
        id="error-dialog"
        onClose={() => removeError(error.id)}
        open={hasError}
      >
        <DialogTitle id="error-dialog-title" disableTypography>
          <Typography variant="h2">{t('errorDialogTitle')}</Typography>
        </DialogTitle>
        <DialogContent disableTypography>
          <DialogContentText variant="body2" noWrap color="inherit">
            {`${error.message}`}
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => removeError(error.id)} variant="contained">
              {t('errorDialogConfirm')}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    ) : null;
  }
}

ErrorDialog.propTypes = {
  error: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
  }),
  removeError: PropTypes.func,
  t: PropTypes.func,
};

ErrorDialog.defaultProps = {
  error: null,
  removeError: () => {},
  t: key => key,
};
