import React, { Component, Children } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

/**
 */
export class WorkspaceExport extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

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
      children, container, handleClose, open, t,
    } = this.props;
    return (
      <Dialog
        id="workspace-settings"
        container={container}
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle id="form-dialog-title" disableTypography>
          <Typography variant="h2">{t('downloadExport')}</Typography>
        </DialogTitle>
        <DialogContent>
          {children}
          <pre>
            {this.exportableState()}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>{t('cancel')}</Button>
          <CopyToClipboard
            // eslint-disable-next-line react/destructuring-assignment
            text={this.state.value}
            // eslint-disable-next-line react/no-unused-state
          >
            <Button variant="contained" color="secondary" onClick={() => this.setState({ value: this.exportableState() })}>Copy to clipboard</Button>
          </CopyToClipboard>
        </DialogActions>
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
