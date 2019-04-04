import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SanitizedHtml } from './SanitizedHtml';

/**
 */
export class WindowAuthenticationControl extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  /** */
  handleClickOpen() {
    this.setState({ open: true });
  }

  /** */
  handleClose() {
    this.setState({ open: false });
  }

  /** */
  handleConfirm() {
    const {
      handleAuthInteraction, infoId, serviceId, windowId,
    } = this.props;
    handleAuthInteraction(windowId, infoId, serviceId);

    this.handleClose();
  }

  /** */
  render() {
    const {
      confirmLabel,
      description,
      degraded,
      header,
      label,
      profile,
    } = this.props;

    if (!degraded || !profile) return <></>;

    const { open } = this.state;

    /**
    Login: onclick, show modal dialog w/ header, description, confirmLabel
    Clickthrough: onclick show modal dialog w/ header, description, confirmLabel
    Kiosk/external: no-op
    */
    return (
      <>
        <Snackbar
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          open
          message={label}
          action={
            (
              <Button onClick={this.handleClickOpen} color="primary">
              Login
              </Button>
            )
          }
        />
        <Dialog
          open={open}
          onClose={this.handleClose}
        >
          <DialogTitle>{header || ''}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <SanitizedHtml htmlString={description || ''} ruleSet="iiif" />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.handleConfirm} autoFocus>
              {confirmLabel || 'Login' }
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

WindowAuthenticationControl.propTypes = {
  confirmLabel: PropTypes.string,
  degraded: PropTypes.bool,
  description: PropTypes.string,
  handleAuthInteraction: PropTypes.func.isRequired,
  header: PropTypes.string,
  infoId: PropTypes.string,
  label: PropTypes.string,
  profile: PropTypes.shape({ value: PropTypes.string }),
  serviceId: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

WindowAuthenticationControl.defaultProps = {
  confirmLabel: undefined,
  degraded: false,
  description: undefined,
  header: undefined,
  infoId: undefined,
  label: undefined,
  profile: undefined,
  serviceId: undefined,
};
