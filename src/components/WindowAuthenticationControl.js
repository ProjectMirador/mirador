import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
      failureOpen: true,
      open: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFailureClose = this.handleFailureClose.bind(this);
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
  handleFailureClose() {
    this.setState({ failureOpen: false });
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
  renderInteractiveAuth() {
    const {
      classes,
      confirmLabel,
      description,
      header,
      label,
      t,
    } = this.props;

    const { open } = this.state;

    return (
      <>
        <Snackbar
          classes={{ root: classes.snackbar }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          open
          message={
            <SanitizedHtml htmlString={label || ''} ruleSet="iiif" />
          }
          action={
            (
              <Button onClick={this.handleClickOpen} color="primary">
                { t('login') }
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
              {t('cancel')}
            </Button>
            <Button onClick={this.handleConfirm} autoFocus>
              {confirmLabel || t('login') }
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  /** */
  renderFailureMessages() {
    const {
      classes,
      failureHeader,
      failureDescription,
    } = this.props;

    const { failureOpen } = this.state;

    return (
      <Snackbar
        ContentProps={{ className: classes.failure }}
        classes={{ root: classes.snackbar }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={failureOpen}
        message={
          <SanitizedHtml htmlString={`${failureHeader} ${failureDescription}` || ''} ruleSet="iiif" />
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleFailureClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    );
  }

  /** */
  render() {
    const {
      degraded,
      status,
      profile,
    } = this.props;

    const { failureOpen } = this.state;

    if (!degraded || !profile) return <></>;

    const url = profile.value;


    /**
    Login: onclick, show modal dialog w/ header, description, confirmLabel
    Clickthrough: onclick show modal dialog w/ header, description, confirmLabel
    Kiosk/external: no-op
    */
    return (
      <>
        {
          (status !== 'failed' || !failureOpen)
            && (url === 'http://iiif.io/api/auth/1/clickthrough' || url === 'http://iiif.io/api/auth/1/login')
            && this.renderInteractiveAuth()
        }
        { status === 'failed' && this.renderFailureMessages() }
      </>
    );
  }
}

WindowAuthenticationControl.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  confirmLabel: PropTypes.string,
  degraded: PropTypes.bool,
  description: PropTypes.string,
  failureDescription: PropTypes.string,
  failureHeader: PropTypes.string,
  handleAuthInteraction: PropTypes.func.isRequired,
  header: PropTypes.string,
  infoId: PropTypes.string,
  label: PropTypes.string,
  profile: PropTypes.shape({ value: PropTypes.string }),
  serviceId: PropTypes.string,
  status: PropTypes.oneOf(['ok', 'fetching', 'failed', null]),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowAuthenticationControl.defaultProps = {
  confirmLabel: undefined,
  degraded: false,
  description: undefined,
  failureDescription: undefined,
  failureHeader: undefined,
  header: undefined,
  infoId: undefined,
  label: undefined,
  profile: undefined,
  serviceId: undefined,
  status: null,
  t: () => {},
};
