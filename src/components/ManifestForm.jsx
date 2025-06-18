import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

/**
 * Provides a form for user input of a manifest url
 * @prop {Function} fetchManifest
 */
export function ManifestForm({
  addResourcesOpen, addResource, onSubmit = () => {}, onCancel = null,
}) {
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState('');

  /** */
  const handleCancel = () => {
    onCancel();
    setFormValue('');
  };

  /** */
  const handleInputChange = (event) => {
    event.preventDefault();
    setFormValue(event.target.value);
  };

  /** */
  const formSubmit = (event) => {
    event.preventDefault();
    addResource(formValue);
    onSubmit();
    setFormValue('');
  };

  if (!addResourcesOpen) return null;

  return (
    <form onSubmit={formSubmit}>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mt: 0.5 }}
      >
        <Grid size={{ sm: 'grow', xs: 12 }}>
          <TextField
            autoFocus
            fullWidth
            value={formValue}
            id="manifestURL"
            type="text"
            onChange={handleInputChange}
            variant="filled"
            label={t('addManifestUrl')}
            helperText={t('addManifestUrlHelp')}
            slotProps={{
              inputLabel: { shrink: true },
              inputProps: { style: { typography: 'body1' } },
            }}
          />
        </Grid>
        {onCancel && (
          <Grid size="auto">
            <Button onClick={handleCancel}>
              {t('cancel')}
            </Button>
          </Grid>
        )}
        <Grid size="auto">
          <Button 
            id="fetchBtn"
            type="submit"
            variant="contained"
            color="primary"
          >
            {t('fetchManifest')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

ManifestForm.propTypes = {
  addResource: PropTypes.func.isRequired,
  addResourcesOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};
