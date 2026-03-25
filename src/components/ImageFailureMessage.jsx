import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FailedImageContext from '../contexts/FailedImageContext';

const MessageContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  zIndex: 1000,
  pointerEvents: 'none',
}));

/**
 * Displays an accessible message when images fail to load in the OSD viewer
 */
export function ImageFailureMessage() {
  const { hasFailed } = useContext(FailedImageContext);
  const { t } = useTranslation();

  if (!hasFailed) return null;

  return (
    <MessageContainer role="status" aria-live="polite">
      <Typography variant="body2">
        {t('imageFailedToLoad')}
      </Typography>
    </MessageContainer>
  );
}
