import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
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
    return (
      <div>
        { hasError && (
          <Dialog id="workspace-settings" onClose={() => removeError(error.id)} open={hasError}>
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
  errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  removeError: PropTypes.func,
  t: PropTypes.func,
};

ErrorDialog.defaultProps = {
  errors: null,
  removeError: () => {},
  t: key => key,
};
