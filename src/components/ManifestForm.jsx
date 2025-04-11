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
      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            sm: 8,
            md: 9
          }}>
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
        <Grid
          sx={{
            textAlign: { sm: 'inherit', xs: 'right' },
          }}
          size={{
            xs: 12,
            sm: 4,
            md: 3
          }}>
          { onCancel && (
            <Button onClick={handleCancel}>
              {t('cancel')}
            </Button>
          )}
          <Button id="fetchBtn" type="submit" variant="contained" color="primary">
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
