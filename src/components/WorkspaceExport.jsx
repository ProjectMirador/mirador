import { useCallback, useId, useMemo, useState } from 'react';
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
import copy from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { WorkspaceDialog } from './WorkspaceDialog';

/**
 */
export function WorkspaceExport({
  children = null, container = null, id = undefined, open = false, handleClose, exportableState,
}) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const titleId = useId();
  const exportedState = useMemo(() => JSON.stringify(exportableState, null, 2), [exportableState]);
  const onCopyClick = useCallback(() => {
    copy(exportedState);
    setCopied(true)
  }, [exportedState, setCopied])


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
      aria-labelledby={titleId}
      id={id}
      container={container}
      open={open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id={titleId}>
        {t('downloadExport')}
      </DialogTitle>

      <DialogContent>
        <Accordion slotProps={{ heading: { component: 'h4' } }} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>{t('viewWorkspaceConfiguration')}</Typography>
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
        <Button onClick={onCopyClick} variant="contained" color="primary">{t('copy')}</Button>
      </DialogActions>
    </WorkspaceDialog>
  );
}

WorkspaceExport.propTypes = {
  children: PropTypes.node,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  exportableState: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string,
  open: PropTypes.bool,
};
