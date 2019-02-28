import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

/**
 */
class WorkspaceImport extends Component {
  /**
   *
   * constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      configImportValue: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @private
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      configImportValue: event.target.value,
    });
  }

  /**
   * @private
   */
  handleClick(event) {
    const { importConfig } = this.props;
    const { configImportValue } = this.state;
    event.preventDefault();
    try {
      const configJSON = JSON.parse(configImportValue);
      importConfig(configJSON);
    } catch (ex) {
      const { addError } = this.props;
      addError(ex.message);
    }
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      handleClose, open, t,
    } = this.props;
    return (
      <Dialog id="workspace-settings" open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{t('import')}</DialogTitle>
        <DialogContent>
          <TextField rows="15" multiline onChange={this.handleChange} />
          <div>
            <Button onClick={this.handleClick}>
              {t('importWorkspace')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

WorkspaceImport.propTypes = {
  addError: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  importConfig: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceImport.defaultProps = {
  open: false,
  t: key => key,
};

export default WorkspaceImport;
