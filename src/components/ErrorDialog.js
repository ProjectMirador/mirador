import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { DialogActions, DialogContentText, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
  first,
  isUndefined,
  omit,
  values,
} from 'lodash';

/**
 */
export class ErrorDialog extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      errors, removeError, t,
    } = this.props;

    /* extract 'items' value and get first key-value-pair (an error) */
    const error = first(values(omit(errors, 'items')));
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
            {error.message}
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
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  removeError: PropTypes.func,
  t: PropTypes.func,
};

ErrorDialog.defaultProps = {
  errors: null,
  removeError: () => {},
  t: key => key,
};
