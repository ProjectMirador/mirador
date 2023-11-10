import { Component } from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/MenuSharp';
import CloseIcon from '@mui/icons-material/CloseSharp';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import classNames from 'classnames';
import WindowTopMenuButton from '../containers/WindowTopMenuButton';
import WindowTopBarPluginArea from '../containers/WindowTopBarPluginArea';
import WindowTopBarPluginMenu from '../containers/WindowTopBarPluginMenu';
import WindowTopBarTitle from '../containers/WindowTopBarTitle';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import FullScreenButton from '../containers/FullScreenButton';
import WindowMaxIcon from './icons/WindowMaxIcon';
import WindowMinIcon from './icons/WindowMinIcon';
import ns from '../config/css-ns';

/**
 * WindowTopBar
 */
export class WindowTopBar extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      removeWindow, windowId, toggleWindowSideBar, t, windowDraggable,
      maximizeWindow, maximized, minimizeWindow, focused, allowClose, allowMaximize,
      focusWindow, allowFullscreen, allowTopMenuButton, allowWindowSideBar,
    } = this.props;

    return (
      <AppBar position="relative" color="default" enableColorOnDark sx={{zIndex: 1100}} >
        <nav aria-label={t('windowNavigation')}>
          <Toolbar
            disableGutters
            onMouseDown={focusWindow}
            sx={{
              backgroundColor: 'shades.main',
              borderTop: '2px solid ',
              borderTopColor: focused ? 'primary.main' : 'transparent',
              minHeight: 32,
              paddingLeft: 0.5,
              paddingRight: 0.5,
              ...(windowDraggable && {
                cursor: 'move',
              }),
            }}
            className={classNames(ns('window-top-bar'))}
            variant="dense"
          >
            {allowWindowSideBar && (
              <MiradorMenuButton
                aria-label={t('toggleWindowSideBar')}
                onClick={toggleWindowSideBar}
                className={ns('window-menu-btn')}
              >
                <MenuIcon />
              </MiradorMenuButton>
            )}
            <WindowTopBarTitle
              windowId={windowId}
            />
            {allowTopMenuButton && (
              <WindowTopMenuButton windowId={windowId} className={ns('window-menu-btn')} />
            )}
            <WindowTopBarPluginArea windowId={windowId} />
            <WindowTopBarPluginMenu windowId={windowId} />
            {allowMaximize && (
              <MiradorMenuButton
                aria-label={(maximized ? t('minimizeWindow') : t('maximizeWindow'))}
                className={classNames(ns('window-maximize'), ns('window-menu-btn'))}
                onClick={(maximized ? minimizeWindow : maximizeWindow)}
              >
                {(maximized ? <WindowMinIcon /> : <WindowMaxIcon />)}
              </MiradorMenuButton>
            )}
            {allowFullscreen && (
              <FullScreenButton className={ns('window-menu-btn')} />
            )}
            {allowClose && (
              <MiradorMenuButton
                aria-label={t('closeWindow')}
                className={classNames(ns('window-close'), ns('window-menu-btn'))}
                onClick={removeWindow}
              >
                <CloseIcon />
              </MiradorMenuButton>
            )}
          </Toolbar>
        </nav>
      </AppBar>
    );
  }
}

WindowTopBar.propTypes = {
  allowClose: PropTypes.bool,
  allowFullscreen: PropTypes.bool,
  allowMaximize: PropTypes.bool,
  allowTopMenuButton: PropTypes.bool,
  allowWindowSideBar: PropTypes.bool,
  focused: PropTypes.bool,
  focusWindow: PropTypes.func,
  maximized: PropTypes.bool,
  maximizeWindow: PropTypes.func,
  minimizeWindow: PropTypes.func,
  removeWindow: PropTypes.func.isRequired,
  t: PropTypes.func,
  toggleWindowSideBar: PropTypes.func.isRequired,
  windowDraggable: PropTypes.bool,
  windowId: PropTypes.string.isRequired,
};

WindowTopBar.defaultProps = {
  allowClose: true,
  allowFullscreen: false,
  allowMaximize: true,
  allowTopMenuButton: true,
  allowWindowSideBar: true,
  focused: false,
  focusWindow: () => {},
  maximized: false,
  maximizeWindow: () => {},
  minimizeWindow: () => {},
  t: key => key,
  windowDraggable: true,
};
