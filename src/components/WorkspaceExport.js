import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

/**
 */
class WorkspaceExport extends Component {
  /**
   * @private
   */
  exportableState() {
    const { state } = this.props;
    const { config, windows } = state;

    return JSON.stringify({
      config,
      windows,
    }, null, 2);
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, open, children, t,
    } = this.props;
    return (
      <Dialog id="workspace-settings" open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{t('downloadExport')}</DialogTitle>
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
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node,
  state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceExport.defaultProps = {
  open: false,
  children: null,
  t: key => key,
};

export default WorkspaceExport;
