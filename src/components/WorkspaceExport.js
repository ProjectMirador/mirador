import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

/**
 */
export class WorkspaceExport extends Component {
  /** */
  constructor(props) {
    super(props);
    const { open } = this.props;
    this.state = {
      open,
    };
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  /**
   * @private
   */
  exportableState() {
    const { state } = this.props;
    const {
      companionWindows,
      config,
      elasticLayout,
      viewers,
      windows,
      workspace,
    } = state;

    return JSON.stringify({
      companionWindows,
      config,
      elasticLayout,
      viewers,
      windows,
      workspace,
    }, null, 2);
  }

  /**
   * handles the dialog close event
   */
  handleDialogClose() {
    this.setState({
      open: false,
    });
  }

  /**
   * handles the snackbar close event
   */
  handleSnackbarClose() {
    const { handleClose } = this.props;

    this.setState({
      open: false,
    });
    handleClose();
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      children, container, handleClose, t,
    } = this.props;
    const { open } = this.state;
    const exportableState = this.exportableState();

    return (
      <>
        <Dialog
          container={container}
          id="workspace-settings"
          onClose={handleClose}
          open={open}
          scroll="paper"
        >
          <DialogTitle id="form-dialog-title" disableTypography>
            <Typography variant="h2">{t('downloadExport')}</Typography>
          </DialogTitle>
          <DialogContent>
            {children}
            <pre>
              {exportableState}
            </pre>
          </DialogContent>
          <DialogActions>
            <Button color="primary">{t('cancel')}</Button>
            <CopyToClipboard
              text={exportableState}
              onCopy={this.handleDialogClose}
            >
              <Button variant="contained" color="primary">{t('copy')}</Button>
            </CopyToClipboard>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
          autoHideDuration={5000}
          ContentProps={{
            'aria-describedby': 'workspace-export-confirmation',
          }}
          message={<span id="workspace-export-confirmation">{t('copiedToCopyboard')}</span>}
          onClose={this.handleSnackbarClose}
          open={!open}
          action={[
            <IconButton
              key="close"
              aria-label={t('close')}
              color="inherit"
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </>
    );
  }
}

WorkspaceExport.propTypes = {
  children: PropTypes.node,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceExport.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
