import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVertSharp';
import { PluginHook } from './PluginHook';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 *
 */
export function WindowTopBarPluginMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
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

  const {
    windowId, t, menuIcon, container, moreButtons,
  } = props;

  const windowPluginMenuId = `window-plugin-menu_${windowId}`;
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
        <PluginHook {...props} />
      </Menu>
    </>
  );
}
// "<rootDir>/**/__tests__/integration/mirador/plugins/add.test.js"

WindowTopBarPluginMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  container: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  menuIcon: PropTypes.element,
  moreButtons: PropTypes.element,
  open: PropTypes.bool,
  PluginComponents: PropTypes.arrayOf(
    PropTypes.node,
  ),
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowTopBarPluginMenu.defaultProps = {
  anchorEl: null,
  container: null,
  menuIcon: <MoreVertIcon />,
  moreButtons: null,
  open: false,
  PluginComponents: [],
};
