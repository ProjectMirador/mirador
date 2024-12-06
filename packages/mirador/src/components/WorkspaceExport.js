import { useState } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WorkspaceDialog } from './WorkspaceDialog';

/**
 */
export function WorkspaceExport({
  children = null, container = null, open = false, t = k => k, handleClose, exportableState,
}) {
  const [copied, setCopied] = useState(false);
  const exportedState = JSON.stringify(exportableState, null, 2);

  if (copied) {
    return (
      <Snackbar
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        open
        autoHideDuration={6000}
        onClose={handleClose}
        message={t('exportCopied')}
        action={(
          <IconButton size="small" aria-label={t('dismiss')} color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      />
    );
  }

  return (
    <WorkspaceDialog
      id="workspace-export"
      container={container}
      open={open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        {t('downloadExport')}
      </DialogTitle>

      <DialogContent>
        <Accordion elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h4">{t('viewWorkspaceConfiguration')}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ overflow: 'scroll' }}>
            {children}
            <pre>
              {exportedState}
            </pre>
          </AccordionDetails>
        </Accordion>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <CopyToClipboard
          onCopy={() => setCopied(true)}
          text={exportedState}
        >
          <Button variant="contained" color="primary">{t('copy')}</Button>
        </CopyToClipboard>
      </DialogActions>
    </WorkspaceDialog>
  );
}

WorkspaceExport.propTypes = {
  children: PropTypes.node,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  exportableState: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func,
};
