import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MiradorIcon from './icons/MiradorIcon';

/* eslint-disable react/prop-types */
/**
 * Display a branding icon
 */
export default function Branding({ t = (k) => k, variant = 'default', ...ContainerProps }) {
  return (
    <Stack alignItems="center" {...ContainerProps}>
      {variant === 'wide' && (
        <div>
          <Typography align="center" component="p" variant="h3">
            {t('mirador')}
          </Typography>
        </div>
      )}
      <Typography align="center">
        <IconButton
          component="a"
          href="https://projectmirador.org"
          target="_blank"
          rel="noopener"
          size="large"
        >
          <MiradorIcon
            aria-label={t('aboutMirador')}
            titleAccess={t('aboutMirador')}
            fontSize="large"
          />
        </IconButton>
      </Typography>
    </Stack>
  );
}
