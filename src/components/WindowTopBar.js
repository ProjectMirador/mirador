import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
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

const Root = styled(AppBar, { name: 'WindowTopBar', slot: 'root' })(() => ({
  zIndex: 1100,
}));

const StyledToolbar = styled(Toolbar, { name: 'WindowTopBar', slot: 'toolbar' })(({ ownerState, theme }) => ({
  backgroundColor: theme.palette.shades?.main,
  borderTop: '2px solid',
  borderTopColor: ownerState?.focused ? theme.palette.primary.main : 'transparent',
  minHeight: 32,
  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(0.5),
  ...(ownerState?.windowDraggable && {
    cursor: 'move',
  }),
}));

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
      removeWindow, windowId, toggleWindowSideBar, t,
      maximizeWindow, maximized, minimizeWindow, allowClose, allowMaximize,
      focusWindow, allowFullscreen, allowTopMenuButton, allowWindowSideBar,
      component,
    } = this.props;

    return (
      <Root component={component} aria-label={t('windowNavigation')} position="relative" color="default" enableColorOnDark>
        <StyledToolbar
          disableGutters
          onMouseDown={focusWindow}
          ownerState={this.props}
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
        </StyledToolbar>
      </Root>
    );
  }
}

WindowTopBar.propTypes = {
  allowClose: PropTypes.bool,
  allowFullscreen: PropTypes.bool,
  allowMaximize: PropTypes.bool,
  allowTopMenuButton: PropTypes.bool,
  allowWindowSideBar: PropTypes.bool,
  component: PropTypes.elementType,
  focused: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  focusWindow: PropTypes.func,
  maximized: PropTypes.bool,
  maximizeWindow: PropTypes.func,
  minimizeWindow: PropTypes.func,
  removeWindow: PropTypes.func.isRequired,
  t: PropTypes.func,
  toggleWindowSideBar: PropTypes.func.isRequired,
  windowDraggable: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  windowId: PropTypes.string.isRequired,
};

WindowTopBar.defaultProps = {
  allowClose: true,
  allowFullscreen: false,
  allowMaximize: true,
  allowTopMenuButton: true,
  allowWindowSideBar: true,
  component: 'nav',
  focused: false,
  focusWindow: () => {},
  maximized: false,
  maximizeWindow: () => {},
  minimizeWindow: () => {},
  t: key => key,
  windowDraggable: true,
};
