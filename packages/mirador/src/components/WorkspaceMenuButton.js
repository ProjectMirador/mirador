import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/SettingsSharp';
import PropTypes from 'prop-types';
import WorkspaceMenu from '../containers/WorkspaceMenu';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 */
export function WorkspaceMenuButton({ t = k => k }) {
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

WorkspaceMenuButton.propTypes = {
  t: PropTypes.func,
};
