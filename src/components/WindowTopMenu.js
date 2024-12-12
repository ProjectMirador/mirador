import { useContext } from 'react';
import Menu from '@mui/material/Menu';
import ListSubheader from '@mui/material/ListSubheader';
import PropTypes from 'prop-types';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';
import WindowViewSettings from '../containers/WindowViewSettings';
import { PluginHook } from './PluginHook';
import WorkspaceContext from '../contexts/WorkspaceContext';
import { usePlugins } from '../extend/usePlugins';
import { useTranslation } from 'react-i18next';

/** Renders plugins */
function PluginHookWithHeader({ targetName, ...props }) {
  const PluginComponents = usePlugins(targetName);
  const { t } = useTranslation();
  return PluginComponents ? (
    <>
      <ListSubheader role="presentation" disableSticky tabIndex={-1}>{t('windowPluginButtons')}</ListSubheader>
      <PluginHook targetName={targetName} {...props} />
    </>
  ) : null;
}

/**
 */
export function WindowTopMenu({
  handleClose, showThumbnailNavigationSettings = true,
  toggleDraggingEnabled, windowId, anchorEl = null, open = false,
}) {
  const container = useContext(WorkspaceContext);
  const pluginProps = arguments[0]; // eslint-disable-line prefer-rest-params

  return (
    <Menu
      container={container?.current}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      onClose={handleClose}
      TransitionProps={{
        onEntering: toggleDraggingEnabled,
        onExit: toggleDraggingEnabled,
      }}
      orientation="horizontal"
      anchorEl={anchorEl}
      open={open}
    >
      <WindowViewSettings windowId={windowId} handleClose={handleClose} />
      {showThumbnailNavigationSettings
        && <WindowThumbnailSettings windowId={windowId} handleClose={handleClose} />}
      <PluginHookWithHeader targetName="WindowTopMenu" {...pluginProps} />
    </Menu>
  );
}

WindowTopMenu.propTypes = {
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  showThumbnailNavigationSettings: PropTypes.bool,
  toggleDraggingEnabled: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};
