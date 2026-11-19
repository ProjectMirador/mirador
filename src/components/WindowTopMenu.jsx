import { useContext } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import FocusTrap from '@mui/material/Unstable_TrapFocus';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';
import WindowViewSettings from '../containers/WindowViewSettings';
import { PluginHook } from './PluginHook';
import WorkspaceContext from '../contexts/WorkspaceContext';
import { usePlugins } from '../extend/usePlugins';
import ns from '../config/css-ns';

/** Renders plugins */
function PluginHookWithHeader({ targetName, ...props }) {
  const { PluginComponents } = usePlugins(targetName);
  const { t } = useTranslation();
  return PluginComponents?.length > 0 ? (
    <>
      <ListSubheader role="presentation" disableSticky tabIndex={-1}>
        {t('windowPluginButtons')}
      </ListSubheader>
      <PluginHook targetName={targetName} {...props} />
    </>
  ) : null;
}

PluginHookWithHeader.propTypes = {
  targetName: PropTypes.string.isRequired,
};

/**
 */
export function WindowTopMenu({
  handleClose,
  showThumbnailNavigationSettings = true,
  toggleDraggingEnabled,
  windowId,
  anchorEl = null,
  open = false,
}) {
  const container = useContext(WorkspaceContext);
  // eslint-disable-next-line prefer-rest-params
  const pluginProps = arguments[0];

  return (
    <Popper
      container={container?.current}
      placement="bottom-end"
      modifiers={[{ name: 'computeStyles', options: { adaptive: false } }]}
      anchorEl={anchorEl}
      open={open}
      role="menu"
      transition
      sx={{ zIndex: 'modal' }}
    >
      {({ TransitionProps }) => (
        <ClickAwayListener
          mouseEvent="onPointerDown"
          touchEvent="onTouchStart"
          onClickAway={(e) => {
            if (!anchorEl?.contains(e.target)) handleClose();
          }}
        >
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'right top' }}
            onEntering={toggleDraggingEnabled}
            onExit={toggleDraggingEnabled}
          >
            <Paper className={ns('window-top-menu')} elevation={8} onKeyDown={(e) => e.key === 'Escape' && handleClose()}>
              <FocusTrap open={open}>
                <div tabIndex={-1}>
                  <WindowViewSettings windowId={windowId} handleClose={handleClose} />
                  {showThumbnailNavigationSettings && <WindowThumbnailSettings windowId={windowId} handleClose={handleClose} />}
                  <PluginHookWithHeader targetName="WindowTopMenu" {...pluginProps} />
                </div>
              </FocusTrap>
            </Paper>
          </Grow>
        </ClickAwayListener>
      )}
    </Popper>
  );
}

WindowTopMenu.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  showThumbnailNavigationSettings: PropTypes.bool,
  toggleDraggingEnabled: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};
