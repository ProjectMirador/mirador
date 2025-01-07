import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/SettingsSharp';
import { useTranslation } from 'react-i18next';
import WorkspaceMenu from '../containers/WorkspaceMenu';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 */
export function WorkspaceMenuButton() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  /**  */
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  /**  */
  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <MiradorMenuButton
        aria-haspopup="true"
        aria-label={t('workspaceMenu')}
        aria-owns={open ? 'workspace-menu' : undefined}
        selected={open}
        id="menuBtn"
        onClick={handleMenuClick}
      >
        <SettingsIcon />
      </MiradorMenuButton>
      <WorkspaceMenu
        anchorEl={anchorEl}
        id="workspace-menu"
        handleClose={handleMenuClose}
        open={open}
      />
    </>
  );
}
