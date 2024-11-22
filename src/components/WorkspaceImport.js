import { useState } from 'react';
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
export function WorkspaceImport({
  addError, importConfig, classes = {}, handleClose, open = false, t = k => k,
}) {
  const [configImportValue, setConfigImportValue] = useState('');

  /** */
  const handleChange = (event) => {
    event.preventDefault();
    setConfigImportValue(event.target.value);
  };

  /** */
  const handleImportConfig = (_event) => {
    try {
      const configJSON = JSON.parse(configImportValue);
      importConfig(configJSON);
      handleClose();
    } catch (ex) {
      addError(ex.toString());
    }
  };

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
          onChange={handleChange}
          minRows={15}
          variant="filled"
          sx={{
            '& .MuiInputBase-input': { fontFamily: 'monospace' },
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
        <Button color="primary" onClick={handleImportConfig} variant="contained">
          {t('import')}
        </Button>
      </DialogActions>
    </WorkspaceDialog>
  );
}

WorkspaceImport.propTypes = {
  addError: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  handleClose: PropTypes.func.isRequired,
  importConfig: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func,
};
