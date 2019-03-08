import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

/**
 */
export class WorkspaceExport extends Component {
  /**
   * @private
   */
  exportableState() {
    const { state } = this.props;
    const { config, viewers, windows } = state;

    return JSON.stringify({
      config,
      viewers,
      windows,
    }, null, 2);
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      container, handleClose, open, children, t,
    } = this.props;
    return (
      <Dialog id="workspace-settings" container={container} open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title" disableTypography>
          <Typography variant="h2">{t('downloadExport')}</Typography>
        </DialogTitle>
        <DialogContent>
          {children}
          <pre>
            {this.exportableState()}
          </pre>
        </DialogContent>
      </Dialog>
    );
  }
}

WorkspaceExport.propTypes = {
  children: PropTypes.node,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceExport.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
