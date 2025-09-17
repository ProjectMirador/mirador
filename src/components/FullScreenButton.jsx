import { useContext, useEffect, useState } from 'react';
import FullscreenIcon from '@mui/icons-material/FullscreenSharp';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExitSharp';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import FullScreenContext from '../contexts/FullScreenContext';

/**
 */
export function FullScreenButton({ className = undefined }) {
  const { t } = useTranslation();
  const handle = useContext(FullScreenContext);

  // iPhone Safari does not support full screen on divs,
  // Don't render the button if not supported
  const [canFullscreenDiv, setCanFullscreenDiv] = useState(false);

  useEffect(() => {
    const div = document.createElement('div');
    setCanFullscreenDiv(typeof div.requestFullscreen === 'function');
  }, []);

  if (!canFullscreenDiv) return null;

  if (handle && handle.active) {
    return <MiradorMenuButton className={className} aria-label={t('exitFullScreen')} onClick={handle.exit}><FullscreenExitIcon /></MiradorMenuButton>;
  }

  if (handle) {
    return <MiradorMenuButton className={className} aria-label={t('workspaceFullScreen')} onClick={handle.enter}><FullscreenIcon /></MiradorMenuButton>;
  }

  return null;
}

FullScreenButton.propTypes = {
  className: PropTypes.string,
};
