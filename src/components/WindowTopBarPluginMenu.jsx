import { useContext, useId, useState } from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVertSharp';
import Menu from '@mui/material/Menu';
import { useTranslation } from 'react-i18next';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import { PluginHook } from './PluginHook';
import WorkspaceContext from '../contexts/WorkspaceContext';

/**
 *
 */
export function WindowTopBarPluginMenu({
  PluginComponents = [], windowId, menuIcon = <MoreVertIcon />, moreButtons = null,
}) {
  const { t } = useTranslation();
  const container = useContext(WorkspaceContext);
  const pluginProps = arguments[0]; // eslint-disable-line prefer-rest-params
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const windowPluginMenuId = useId();

  /**
   * Set the anchorEl state to the click target
  */
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  /**
   * Set the anchorEl state to null (closing the menu)
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <MiradorMenuButton
        aria-haspopup="true"
        aria-label={t('windowPluginMenu')}
        aria-owns={open ? windowPluginMenuId : undefined}
        selected={open}
        onClick={handleMenuClick}
      >
        {menuIcon}
      </MiradorMenuButton>
      <Menu
        id={windowPluginMenuId}
        container={container?.current}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        open={open}
        onClose={handleMenuClose}
      >
        {moreButtons}
        <PluginHook handleClose={handleMenuClose} {...pluginProps} />
      </Menu>
    </>
  );
}

WindowTopBarPluginMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  menuIcon: PropTypes.element,
  moreButtons: PropTypes.element,
  open: PropTypes.bool,
  PluginComponents: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};
