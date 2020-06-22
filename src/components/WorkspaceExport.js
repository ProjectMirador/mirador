import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';

/**
 */
export class WorkspaceExport extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { copied: false };
    this.onCopy = this.onCopy.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /** Show the snackbar */
  onCopy() {
    this.setState({ copied: true });
  }

  /** Handle closing after the content is copied and the snackbar is done */
  handleClose() {
    const { handleClose } = this.props;

    handleClose();
  }

  /**
   * @private
   */
  exportedState() {
    const { exportableState } = this.props;

    return JSON.stringify(exportableState, null, 2);
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      children, container, open, t,
    } = this.props;
    const { copied } = this.state;

    if (copied) {
      return (
        <Snackbar
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
          open
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={t('exportCopied')}
          action={(
            <IconButton size="small" aria-label={t('dismiss')} color="inherit" onClick={this.handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        />
      );
    }

    return (
      <Dialog
        id="workspace-settings"
        container={container}
        open={open}
        onClose={this.handleClose}
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title" disableTypography>
          <Typography variant="h2">{t('downloadExport')}</Typography>
        </DialogTitle>
        <ScrollIndicatedDialogContent>
          {children}
          <pre>
            {this.exportedState()}
          </pre>
        </ScrollIndicatedDialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>{t('cancel')}</Button>
          <CopyToClipboard
            onCopy={this.onCopy}
            text={this.exportedState()}
          >
            <Button variant="contained" color="primary">{t('copy')}</Button>
          </CopyToClipboard>
        </DialogActions>
      </Dialog>
    );
  }
}

WorkspaceExport.propTypes = {
  children: PropTypes.node,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  exportableState: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func,
};

WorkspaceExport.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
