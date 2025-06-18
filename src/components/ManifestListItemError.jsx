import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/ErrorOutlineSharp';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

/**
 * ManifestListItemError renders a component displaying a
 * message to the user about a problem loading a manifest
*/
export function ManifestListItemError({
  manifestId, onDismissClick, onTryAgainClick,
}) {
  const { t } = useTranslation();
  return (
    <Grid container sx={{ width: '100%', alignItems: 'center' }}>
      <Grid container size={{ sm: 5, xs: 12 }} sx={{alignItems: 'center'}}>
        <ErrorIcon sx={{
          color: 'error.main',
          height: '2rem',
          width: '2rem',
          marginRight: '0.5rem',
        }}
        />
          <Typography>{t('manifestError')}</Typography>
          <Typography sx={{ wordBreak: 'break-all' }}>{manifestId}</Typography>
      </Grid>

      <Grid container size={{ sm: 7, xs: 12 }}>
        <Button onClick={() => { onDismissClick(manifestId); }}>
          {t('dismiss')}
        </Button>
        <Button onClick={() => { onTryAgainClick(manifestId); }}>
          {t('tryAgain')}
        </Button>
      </Grid>
    </Grid>
  );
}

ManifestListItemError.propTypes = {
  manifestId: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  onTryAgainClick: PropTypes.func.isRequired,
};
