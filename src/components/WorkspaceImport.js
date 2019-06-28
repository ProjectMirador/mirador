import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {
  DialogActions,
  TextField,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';

/**
 */
export class WorkspaceImport extends Component {
  /**
   *
   * constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      configImportValue: '',
    };

    this.handleImportConfig = this.handleImportConfig.bind(this);
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
  handleImportConfig(event) {
    const { handleClose, importConfig } = this.props;
    const { configImportValue } = this.state;

    try {
      const configJSON = JSON.parse(configImportValue);
      importConfig(configJSON);
      handleClose();
    } catch (ex) {
      const { addError } = this.props;
      addError(ex.toString());
    }
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      classes, handleClose, open, t,
    } = this.props;

    return (
      <Dialog
        aria-labelledby="workspace-import-title"
        id="workspace-import"
        onEscapeKeyDown={handleClose}
        onClose={handleClose}
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="workspace-import-title" disableTypography>
          <Typography variant="h2">{t('importWorkspace')}</Typography>
        </DialogTitle>
        <ScrollIndicatedDialogContent>
          <TextField
            className={classes.textField}
            id="workspace-import-input"
            multiline
            onChange={this.handleChange}
            rows="15"
            variant="filled"
            inputProps={{ autoFocus: 'autofocus', className: classes.textInput }}
            helperText={t('importWorkspaceHint')}
          />
        </ScrollIndicatedDialogContent>
        <DialogActions>
          <Button className={classes.cancelBtn} onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button color="primary" onClick={this.handleImportConfig} variant="contained">
            {t('import')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

WorkspaceImport.propTypes = {
  addError: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  handleClose: PropTypes.func.isRequired,
  importConfig: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func,
};

WorkspaceImport.defaultProps = {
  classes: {},
  open: false,
  t: key => key,
};
