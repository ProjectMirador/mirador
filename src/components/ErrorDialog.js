import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {
  DialogActions,
  DialogContentText,
  Divider,
  Typography,
} from '@material-ui/core';
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
      error, confirmError, t,
    } = this.props;

    return error ? (
      <Dialog
        aria-labelledby="error-dialog-title"
        id="error-dialog"
        onClose={() => confirmError(error.id)}
        open={!isUndefined(error)}
      >
        <DialogTitle id="error-dialog-title" disableTypography>
          <Typography variant="h2">{t('errorDialogTitle')}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body2" color="inherit">
            {error.message}
          </DialogContentText>
          <DialogActions>
            <Button color="primary" onClick={() => confirmError(error.id)} variant="contained">
              {t('errorDialogConfirm')}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    ) : null;
  }
}

ErrorDialog.propTypes = {
  confirmError: PropTypes.func,
  error: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    showDialog: PropTypes.bool,
  }),
  t: PropTypes.func,
};

ErrorDialog.defaultProps = {
  confirmError: () => {},
  error: undefined,
  t: key => key,
};
