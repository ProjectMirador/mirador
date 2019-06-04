import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockSharp';
import { SanitizedHtml } from './SanitizedHtml';

/**
 */
export class WindowAuthenticationControl extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      showFailureMessage: true,
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
    this.setState({ open: false, showFailureMessage: false });
  }

  /** */
  handleConfirm() {
    const {
      handleAuthInteraction, infoId, serviceId, windowId,
    } = this.props;
    handleAuthInteraction(windowId, infoId, serviceId);
    this.setState({ showFailureMessage: true });
  }

  /** */
  isInteractive() {
    const {
      profile,
    } = this.props;

    return profile.value === 'http://iiif.io/api/auth/1/clickthrough' || profile.value === 'http://iiif.io/api/auth/1/login';
  }

  /** */
  dialogActions(localProps) {
    const {
      classes,
      confirmLabel,
      t,
    } = this.props;

    const {
      hideCancelButton,
    } = localProps || {};

    if (!this.isInteractive()) return <></>;

    return (
      <DialogActions>
        { !hideCancelButton && (
          <Button onClick={this.handleClose} color="inherit">
            {t('cancel')}
          </Button>
        )}
        <Button onClick={this.handleConfirm} className={classes.buttonInvert} autoFocus color="secondary">
          {confirmLabel || t('login') }
        </Button>
      </DialogActions>
    );
  }

  /** */
  renderFailure() {
    const {
      classes,
      failureHeader,
      failureDescription,
      t,
    } = this.props;

    return (
      <Paper square elevation={4} color="secondary" classes={{ root: classes.paper }}>
        <Button fullWidth className={classes.topBar} component="div" color="inherit">
          <LockIcon className={classes.icon} />
          <Typography component="h3" variant="body1" color="inherit" inline>
            <SanitizedHtml htmlString={failureHeader || t('authenticationFailed')} ruleSet="iiif" />
          </Typography>
        </Button>
        {failureDescription && (
          <Typography variant="body1" color="inherit" className={classes.expanded}>
            <SanitizedHtml htmlString={failureDescription} ruleSet="iiif" />
          </Typography>
        )}
        {this.dialogActions()}
      </Paper>
    );
  }

  /** */
  render() {
    const {
      classes,
      degraded,
      description,
      header,
      label,
      profile,
      status,
      t,
    } = this.props;

    if ((!degraded || !profile) && status !== 'fetching') return <></>;

    const { showFailureMessage, open } = this.state;

    if (showFailureMessage && status === 'failed') return this.renderFailure();

    const hasCollapsedContent = header || description;

    return (
      <Paper square elevation={4} color="secondary" classes={{ root: classes.paper }}>
        <Button fullWidth className={classes.topBar} onClick={this.handleClickOpen} component="div" color="inherit">
          <LockIcon className={classes.icon} />
          <Typography className={classes.label} component="h3" variant="body1" color="inherit" inline>
            <SanitizedHtml htmlString={label || t('authenticationRequired')} ruleSet="iiif" />
          </Typography>
          {hasCollapsedContent && !open && (
            <Typography className={classes.fauxButton} variant="button" color="inherit">
              { t('continue') }
            </Typography>
          )}
        </Button>
        {
          hasCollapsedContent
            ? (
              <Collapse
                in={open}
                onClose={this.handleClose}
              >
                <Typography variant="body1" color="inherit" className={classes.expanded}>
                  <SanitizedHtml htmlString={header || ''} ruleSet="iiif" />
                  { header && description ? ': ' : '' }
                  <SanitizedHtml htmlString={description || ''} ruleSet="iiif" />
                </Typography>
                {this.dialogActions()}
              </Collapse>
            )
            : this.dialogActions({ hideCancelButton: true })
      }
      </Paper>
    );
  }
}

WindowAuthenticationControl.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
