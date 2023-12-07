import { Component } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import {
  DialogActions,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import { WorkspaceDialog } from './WorkspaceDialog';
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
      <WorkspaceDialog
        aria-labelledby="workspace-import-title"
        id="workspace-import"
        onClose={handleClose}
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="workspace-import-title">
          {t('importWorkspace')}
        </DialogTitle>
        <ScrollIndicatedDialogContent>
          <TextField
            className={classes.textField}
            id="workspace-import-input"
            multiline
            onChange={this.handleChange}
            minRows={15}
            variant="filled"
            sx={{
              '.MuiInput-input': { fontFamily: 'monospace' },
              width: '100%',
            }}
            inputProps={{ autoFocus: 'autofocus' }}
            helperText={t('importWorkspaceHint')}
          />
        </ScrollIndicatedDialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button color="primary" onClick={this.handleImportConfig} variant="contained">
            {t('import')}
          </Button>
        </DialogActions>
      </WorkspaceDialog>
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
