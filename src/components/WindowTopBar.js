import { Component } from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/MenuSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
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
      removeWindow, classes, toggleWindowSideBar, t, windowDraggable,
      maximizeWindow, maximized, minimizeWindow, focused, allowClose, allowMaximize,
      focusWindow, allowFullscreen, allowTopMenuButton, allowWindowSideBar,
    } = this.props;

    return (
      <AppBar position="relative" color="default">
        <nav aria-label={t('windowNavigation')}>
          <Toolbar
            disableGutters
            onMouseDown={focusWindow}
            className={classNames(
              classes.windowTopBarStyle,
              windowDraggable ? classes.windowTopBarStyleDraggable : null,
              focused ? classes.focused : null,
              ns('window-top-bar'),
            )}
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
            <WindowTopBarTitle />
            {allowTopMenuButton && (
              <WindowTopMenuButton className={ns('window-menu-btn')} />
            )}
            <WindowTopBarPluginArea />
            <WindowTopBarPluginMenu />
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  focused: PropTypes.bool,
  focusWindow: PropTypes.func,
  maximized: PropTypes.bool,
  maximizeWindow: PropTypes.func,
  minimizeWindow: PropTypes.func,
  removeWindow: PropTypes.func.isRequired,
  t: PropTypes.func,
  toggleWindowSideBar: PropTypes.func.isRequired,
  windowDraggable: PropTypes.bool,
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
