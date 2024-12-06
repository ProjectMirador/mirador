import { useState } from 'react';
import PropTypes from 'prop-types';
import MoreHorizontalIcon from '@mui/icons-material/MoreHorizSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import WorkspaceOptionsMenu from '../containers/WorkspaceOptionsMenu';

/**
 * WorkspaceOptionsButton ~
*/
export function WorkspaceOptionsButton({ t }) {
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
        aria-label={t('workspaceOptions')}
        onClick={handleMenuClick}
        selected={open}
      >
        <MoreHorizontalIcon />
      </MiradorMenuButton>
      <WorkspaceOptionsMenu
        anchorEl={anchorEl}
        handleClose={handleMenuClose}
        open={open}
      />
    </>
  );
}

WorkspaceOptionsButton.propTypes = {
  t: PropTypes.func.isRequired,
};
