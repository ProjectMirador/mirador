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
    <Grid container>
      <Grid container>
        <Grid container size={{ sm: 6, xs: 12 }}>
          <Grid size={{ sm: 3, xs: 4 }}>
            <Grid container justifyContent="center">
              <ErrorIcon sx={{
                color: 'error.main',
                height: '2rem',
                width: '2rem',
              }}
              />
            </Grid>
          </Grid>
          <Grid size={{ sm: 9, xs: 8 }}>
            <Typography>{t('manifestError')}</Typography>
            <Typography sx={{ wordBreak: 'break-all' }}>{manifestId}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid container justifyContent="flex-end" size={{ sm: 6, xs: 12 }}>
          <Grid>
            <Button onClick={() => { onDismissClick(manifestId); }}>
              {t('dismiss')}
            </Button>
            <Button onClick={() => { onTryAgainClick(manifestId); }}>
              {t('tryAgain')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ManifestListItemError.propTypes = {
  manifestId: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  onTryAgainClick: PropTypes.func.isRequired,
};
